import {OrgManager, printObjectAsKeyValueTable, ScConnection} from '@dishantlangayan/sc-cli-core'
import {runCommand} from '@oclif/test'
import {expect} from 'chai'
import * as sinon from 'sinon'

import PlatformEnvDisplay from '../../../../src/commands/platform/env/display.js'
import {EnvironmentApiResponse, EnvironmentListApiResponse} from '../../../../src/types/environment'
import {anEnv} from '../../../util/test-utils'

describe('platform:env:display', () => {
  const envName = 'MyTestEnvironment'
  const envId = 'MyTestEnvironmentId'
  let orgManagerStub: sinon.SinonStubbedInstance<OrgManager>
  let getOrgManagerStub: sinon.SinonStub
  let scConnStub: sinon.SinonStub

  beforeEach(() => {
    // Stub OrgManager
    orgManagerStub = sinon.createStubInstance(OrgManager)
    getOrgManagerStub = sinon.stub(
      PlatformEnvDisplay.prototype as unknown as Record<string, unknown>,
      'getOrgManager',
    ).resolves(orgManagerStub)

    // Set up default org behavior
    orgManagerStub.getDefaultOrg.resolves({
      accessToken: 'test-token',
      orgId: 'default-org',
    })

    // Stub createConnection
    const mockConnection = new ScConnection('https://api.solace.cloud', 'test-token')
    orgManagerStub.createConnection.resolves(mockConnection)

    // Stub ScConnection methods
    scConnStub = sinon.stub(ScConnection.prototype, 'get')
  })

  afterEach(() => {
    getOrgManagerStub.restore()
    scConnStub.restore()
  })

  it('runs platform:env:display', async () => {
    const {stdout} = await runCommand('platform:env:display')
    expect(stdout).to.contain('')
  })

  it(`runs platform:env:display --name=${envName}`, async () => {
    // Arrange
    const envs: EnvironmentListApiResponse = {
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
    scConnStub.returns(Promise.resolve(envs))

    // Act
    const {stdout} = await runCommand(`platform:env:display --name=${envName}`)

    // Assert
    expect(orgManagerStub.getDefaultOrg.calledOnce).to.be.true
    expect(orgManagerStub.createConnection.calledWith('default-org')).to.be.true
    expect(scConnStub.getCall(0).args[0]).to.contain(`?name=${envName}`)
    expect(stdout).to.contain(printObjectAsKeyValueTable(envs.data[0] as unknown as Record<string, unknown>))
  })

  it(`runs platform:env:display --env-id=${envId}`, async () => {
    // Arrange
    const envs: EnvironmentApiResponse = {
      data: anEnv(envName, true, false),
    }
    scConnStub.returns(Promise.resolve(envs))

    // Act
    const {stdout} = await runCommand(`platform:env:display --env-id=${envId}`)

    // Assert
    expect(scConnStub.getCall(0).args[0]).to.contain(`/${envId}`)
    expect(stdout).to.contain(printObjectAsKeyValueTable(envs.data as unknown as Record<string, unknown>))
  })
})
