import {OrgManager, ScConnection} from '@dishantlangayan/sc-cli-core'
import {runCommand} from '@oclif/test'
import {expect} from 'chai'
import * as sinon from 'sinon'

import PlatformEnvDelete from '../../../../src/commands/platform/env/delete.js'
import {anEnv} from '../../../util/test-utils'

describe('platform:env:delete', () => {
  let orgManagerStub: sinon.SinonStubbedInstance<OrgManager>
  let getOrgManagerStub: sinon.SinonStub
  let scConnDeleteStub: sinon.SinonStub
  let scConnGetStub: sinon.SinonStub
  const envName: string = 'MyTestEnvironment'

  beforeEach(() => {
    // Stub OrgManager
    orgManagerStub = sinon.createStubInstance(OrgManager)
    getOrgManagerStub = sinon.stub(
      PlatformEnvDelete.prototype as unknown as Record<string, unknown>,
      'getOrgManager',
    ).resolves(orgManagerStub)

    // Set up default org behavior
    orgManagerStub.getDefaultOrg.resolves({
      accessToken: 'test-token',
      orgId: 'default-org',
    })

    // Set up getOrg behavior for specific org/alias lookups
    orgManagerStub.getOrg.callsFake(async (identifier: string) => {
      if (identifier === 'test-org' || identifier === 'test-alias') {
        return {
          accessToken: 'test-token',
          alias: identifier === 'test-alias' ? 'test-alias' : undefined,
          orgId: 'test-org-id',
        }
      }

      return null
    })

    // Stub createConnection
    const mockConnection = new ScConnection('https://api.solace.cloud', 'test-token')
    orgManagerStub.createConnection.resolves(mockConnection)

    // Stub ScConnection methods
    scConnDeleteStub = sinon.stub(ScConnection.prototype, 'delete')
    scConnGetStub = sinon.stub(ScConnection.prototype, 'get')
  })

  afterEach(() => {
    getOrgManagerStub.restore()
    scConnDeleteStub.restore()
    scConnGetStub.restore()
  })

  it('runs platform:env:delete cmd', async () => {
    const {stdout} = await runCommand('platform:env:delete')
    expect(stdout).to.contain('')
  })

  it(`runs platform:env:delete --name ${envName}`, async () => {
    // Arrange
    const envs = {
      data: [anEnv(envName, true, false)],
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

    const deleteSuccessMsg = `Environment with id 'id${envName}' has been deleted successfully.`
    scConnGetStub.returns(Promise.resolve(envs))
    scConnDeleteStub.returns(deleteSuccessMsg)

    // Act
    const {stdout} = await runCommand(`platform:env:delete --name ${envName} --no-prompt`)

    // Assert
    expect(orgManagerStub.getDefaultOrg.calledOnce).to.be.true
    expect(orgManagerStub.createConnection.calledWith('default-org')).to.be.true
    expect(scConnGetStub.getCall(0).args[0]).to.contain(`?name=${envName}`)
    expect(scConnDeleteStub.getCall(0).calledWith(`/platform/environments/id${envName}`)).to.be.true
    expect(stdout).to.contain(deleteSuccessMsg)
  })

  it(`runs platform:env:delete --env-id id${envName}`, async () => {
    // Arrange
    const deleteSuccessMsg = `Environment with id 'id${envName}' has been deleted successfully.`
    scConnDeleteStub.returns(deleteSuccessMsg)

    // Act
    const {stdout} = await runCommand(`platform:env:delete --env-id id${envName} --no-prompt`)

    // Assert
    expect(scConnDeleteStub.getCall(0).calledWith(`/platform/environments/id${envName}`)).to.be.true
    expect(stdout).to.contain(deleteSuccessMsg)
  })

  it(`runs platform:env:delete --alias=test-alias --name ${envName}`, async () => {
    // Arrange
    const envs = {
      data: [anEnv(envName, true, false)],
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

    const deleteSuccessMsg = `Environment with id 'id${envName}' has been deleted successfully.`
    scConnGetStub.returns(Promise.resolve(envs))
    scConnDeleteStub.returns(deleteSuccessMsg)

    // Act
    const {stdout} = await runCommand(`platform:env:delete --alias=test-alias --name ${envName} --no-prompt`)

    // Assert
    expect(orgManagerStub.getOrg.calledWith('test-alias')).to.be.true
    expect(orgManagerStub.createConnection.calledWith('test-alias')).to.be.true
    expect(scConnGetStub.getCall(0).args[0]).to.contain(`?name=${envName}`)
    expect(scConnDeleteStub.getCall(0).calledWith(`/platform/environments/id${envName}`)).to.be.true
    expect(stdout).to.contain(deleteSuccessMsg)
  })
})
