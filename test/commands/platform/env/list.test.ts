import {OrgManager, renderTable, ScConnection} from '@dishantlangayan/sc-cli-core'
import {runCommand} from '@oclif/test'
import {expect} from 'chai'
import * as sinon from 'sinon'

import PlatformEnvList from '../../../../src/commands/platform/env/list.js'
import {Environment} from '../../../../src/types/environment'
import {anEnv, restoreStdoutIsTTY, setStdoutIsTTY} from '../../../util/test-utils'

const aPagination = (pageNumber: number, pageSize: number, count: number, totalPages: number) => ({
  pagination: {count, nextPage: null, pageNumber, pageSize, totalPages},
})

describe('platform:env:list', () => {
  const defaultPageSize = 10
  const defaultPageNumber = 1

  let orgManagerStub: sinon.SinonStubbedInstance<OrgManager>
  let getOrgManagerStub: sinon.SinonStub
  let scConnStub: sinon.SinonStub

  let stdoutIsTTY: PropertyDescriptor | undefined

  beforeEach(() => {
    // Default to non-TTY output so results don't depend on where the tests are run
    stdoutIsTTY = Object.getOwnPropertyDescriptor(process.stdout, 'isTTY')
    setStdoutIsTTY(false)

    // Stub OrgManager
    orgManagerStub = sinon.createStubInstance(OrgManager)
    getOrgManagerStub = sinon.stub(
      PlatformEnvList.prototype as unknown as Record<string, unknown>,
      'getOrgManager',
    ).resolves(orgManagerStub)

    // Set up default org behavior
    orgManagerStub.getDefaultOrg.resolves({
      accessToken: 'test-token',
      orgId: 'default-org',
    })

    // Set up getOrg behavior for specific org/alias lookups
    orgManagerStub.getOrg.callsFake(async (identifier: string) => {
      if (identifier === 'test-org' || identifier === 'test-alias' || identifier === 'my-org') {
        return {
          accessToken: 'test-token',
          alias: identifier === 'test-alias' ? 'test-alias' : undefined,
          orgId: identifier === 'my-org' ? 'my-org' : 'test-org-id',
        }
      }

      return null
    })

    // Stub createConnection to return a mock ScConnection
    const mockConnection = new ScConnection('https://api.solace.cloud', 'test-token')
    orgManagerStub.createConnection.resolves(mockConnection)

    // Stub ScConnection.get
    scConnStub = sinon.stub(ScConnection.prototype, 'get')
  })

  afterEach(() => {
    getOrgManagerStub.restore()
    scConnStub.restore()
    restoreStdoutIsTTY(stdoutIsTTY)
  })

  it('runs platform:env:list', async () => {
    // Arrange
    const envs = {
      data: [anEnv('Default', true, false), anEnv('Dev', false, false), anEnv('Prod', false, true)],
      meta: {
        pagination: {
          count: 3,
          nextPage: null,
          pageNumber: 1,
          pageSize: 10,
          totalPages: 1,
        },
      },
    }
    scConnStub.returns(Promise.resolve(envs))

    // Expected
    const envArray = [
      ['Name', 'Id', 'Is Default', 'Is Production', 'Description'],
      ...envs.data.map((item: Environment) => [
        item.name,
        item.id,
        item.isDefault,
        item.isProduction,
        item.description,
      ]),
    ]

    // Act
    const {stdout} = await runCommand('platform:env:list')

    // Assert
    expect(orgManagerStub.getDefaultOrg.calledOnce).to.be.true
    expect(orgManagerStub.createConnection.calledWith('default-org')).to.be.true
    expect(scConnStub.getCall(0).args[0]).to.contain(`?pageSize=${defaultPageSize}&pageNumber=${defaultPageNumber}`)
    expect(stdout).to.contain(renderTable(envArray, {4: {width: 50, wrapWord: true}}))
  })

  it('runs platform:env:list --page-size=5 --page-number=1', async () => {
    // Arrange
    const pageSize = 5
    const pageNumber = 1
    const envs = {
      data: [anEnv('Default', true, false), anEnv('Dev', false, false), anEnv('Prod', false, true)],
      meta: {
        pagination: {
          count: 3,
          nextPage: null,
          pageNumber: 1,
          pageSize: 5,
          totalPages: 1,
        },
      },
    }
    scConnStub.returns(Promise.resolve(envs))

    // Expected
    const envArray = [
      ['Name', 'Id', 'Is Default', 'Is Production', 'Description'],
      ...envs.data.map((item: Environment) => [
        item.name,
        item.id,
        item.isDefault,
        item.isProduction,
        item.description,
      ]),
    ]

    // Act
    const {stdout} = await runCommand(`platform:env:list --page-size=${pageSize} --page-number=${pageNumber}`)

    // Assert
    expect(scConnStub.getCall(0).args[0]).to.contain(`?pageSize=${pageSize}&pageNumber=${pageNumber}`)
    expect(stdout).to.contain(renderTable(envArray, {4: {width: 50, wrapWord: true}}))
  })

  it('runs platform:env:list --all and fetches every page', async () => {
    // Arrange
    const page1 = [anEnv('Default', true, false), anEnv('Dev', false, false)]
    const page2 = [anEnv('Prod', false, true)]
    scConnStub.onCall(0).resolves({data: page1, meta: aPagination(1, 2, 2, 2)})
    scConnStub.onCall(1).resolves({data: page2, meta: aPagination(2, 2, 1, 2)})

    // Expected
    const envArray = [
      ['Name', 'Id', 'Is Default', 'Is Production', 'Description'],
      ...[...page1, ...page2].map((item: Environment) => [
        item.name,
        item.id,
        item.isDefault,
        item.isProduction,
        item.description,
      ]),
    ]

    // Act
    const {stdout} = await runCommand('platform:env:list --all -s 2')

    // Assert
    expect(scConnStub.callCount).to.equal(2)
    expect(scConnStub.getCall(0).args[0]).to.contain('?pageSize=2&pageNumber=1')
    expect(scConnStub.getCall(1).args[0]).to.contain('?pageSize=2&pageNumber=2')
    expect(stdout).to.contain(renderTable(envArray, {4: {width: 50, wrapWord: true}}))
  })

  it('returns all pages combined with --all --json', async () => {
    // Arrange
    scConnStub.onCall(0).resolves({data: [anEnv('Default', true, false)], meta: aPagination(1, 1, 1, 2)})
    scConnStub.onCall(1).resolves({data: [anEnv('Prod', false, true)], meta: aPagination(2, 1, 1, 2)})

    // Act
    const {stdout} = await runCommand('platform:env:list --all --page-size=1 --json')

    // Assert
    const json = JSON.parse(stdout)
    expect(json.data.map((e: Environment) => e.name)).to.deep.equal(['Default', 'Prod'])
  })

  it('rejects legacy --pageSize and --pageNumber flags', async () => {
    // Act
    const result = await runCommand('platform:env:list --pageSize=5 --pageNumber=2')

    // Assert
    expect(result.error).to.exist
    expect(scConnStub.called).to.be.false
  })

  it('uses specified org when --org provided', async () => {
    // Arrange
    orgManagerStub.getOrg.resolves({
      accessToken: 'test-token',
      orgId: 'my-org',
    })
    const envs = {
      data: [anEnv('Test', false, false)],
      meta: {
        pagination: {
          count: 1,
          nextPage: null,
          pageNumber: 1,
          pageSize: 10,
          totalPages: 1,
        },
      },
    }
    scConnStub.returns(Promise.resolve(envs))

    // Act
    await runCommand('platform:env:list --org=my-org')

    // Assert
    expect(orgManagerStub.getOrg.calledWith('my-org')).to.be.true
    expect(orgManagerStub.createConnection.calledWith('my-org')).to.be.true
    expect(orgManagerStub.getDefaultOrg.called).to.be.false
  })

  it('uses specified alias when --alias provided', async () => {
    // Arrange
    const envs = {
      data: [anEnv('Test', false, false)],
      meta: {
        pagination: {
          count: 1,
          nextPage: null,
          pageNumber: 1,
          pageSize: 10,
          totalPages: 1,
        },
      },
    }
    scConnStub.returns(Promise.resolve(envs))

    // Act
    await runCommand('platform:env:list --alias=test-alias')

    // Assert
    expect(orgManagerStub.getOrg.calledWith('test-alias')).to.be.true
    expect(orgManagerStub.createConnection.calledWith('test-alias')).to.be.true
    expect(orgManagerStub.getDefaultOrg.called).to.be.false
  })

  it('throws error when no default org exists', async () => {
    // Arrange
    orgManagerStub.getDefaultOrg.resolves(null)
    orgManagerStub.getAllOrgs.resolves([{accessToken: 'token', orgId: 'some-org'}])

    // Act
    const result = await runCommand('platform:env:list')

    // Assert
    expect(result.error).to.exist
    if (result.error) {
      expect(result.error.message).to.contain('No default organization set')
    }
  })

  it('throws error when no orgs exist', async () => {
    // Arrange
    orgManagerStub.getDefaultOrg.resolves(null)
    orgManagerStub.getAllOrgs.resolves([])

    // Act
    const result = await runCommand('platform:env:list')

    // Assert
    expect(result.error).to.exist
    if (result.error) {
      expect(result.error.message).to.contain('No organizations found')
    }
  })
})
