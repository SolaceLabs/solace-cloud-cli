import {OrgManager, renderTable, ScConnection} from '@dishantlangayan/sc-cli-core'
import {runCommand} from '@oclif/test'
import {expect} from 'chai'
import * as sinon from 'sinon'

import PlatformEnvList from '../../../../src/commands/platform/env/list.js'
import {Environment} from '../../../../src/types/environment'
import {anEnv} from '../../../util/test-utils'

describe('platform:env:list', () => {
  const defaultPageSize = 10
  const defaultPageNumber = 1

  let orgManagerStub: sinon.SinonStubbedInstance<OrgManager>
  let getOrgManagerStub: sinon.SinonStub
  let scConnStub: sinon.SinonStub

  beforeEach(() => {
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

  it('runs platform:env:list --pageSize=5 --pageNumber=1', async () => {
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
    const {stdout} = await runCommand(`platform:env:list --pageSize=${pageSize} --pageNumber=${pageNumber}`)

    // Assert
    expect(scConnStub.getCall(0).args[0]).to.contain(`?pageSize=${pageSize}&pageNumber=${pageNumber}`)
    expect(stdout).to.contain(renderTable(envArray, {4: {width: 50, wrapWord: true}}))
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
