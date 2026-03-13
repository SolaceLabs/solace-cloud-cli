import {OrgManager, printObjectAsKeyValueTable, ScConnection} from '@dishantlangayan/sc-cli-core'
import {runCommand} from '@oclif/test'
import {expect} from 'chai'
import * as sinon from 'sinon'

import PlatformEnvUpdate from '../../../../src/commands/platform/env/update.js'
import {EnvironmentApiResponse, EnvironmentListApiResponse} from '../../../../src/types/environment'
import {anEnv} from '../../../util/test-utils'

describe('platform:env:update', () => {
  let orgManagerStub: sinon.SinonStubbedInstance<OrgManager>
  let getOrgManagerStub: sinon.SinonStub
  let scConnUpdateStub: sinon.SinonStub
  let scConnGetStub: sinon.SinonStub
  const envName: string = 'MyTestEnvironment'
  const envNewName: string = 'MyNewTestEnvironment'
  const envDescription: string = 'This is an environment description.'

  beforeEach(() => {
    // Stub OrgManager
    orgManagerStub = sinon.createStubInstance(OrgManager)
    getOrgManagerStub = sinon.stub(
      PlatformEnvUpdate.prototype as unknown as Record<string, unknown>,
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
    scConnUpdateStub = sinon.stub(ScConnection.prototype, 'put')
    scConnGetStub = sinon.stub(ScConnection.prototype, 'get')
  })

  afterEach(() => {
    getOrgManagerStub.restore()
    scConnUpdateStub.restore()
    scConnGetStub.restore()
  })

  it('runs platform:env:update cmd', async () => {
    const {stdout} = await runCommand('platform:env:update')
    expect(stdout).to.contain('')
  })

  it(`runs platform:env:update --name=${envName} --new-name=${envNewName}`, async () => {
    // Arrange
    const expectBody = {
      name: envNewName,
    }
    const expectResponse: EnvironmentApiResponse = {
      data: anEnv(envNewName, false, false),
    }
    const expectEnvListApiResponse: EnvironmentListApiResponse = {
      data: [anEnv(envName, false, false)],
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

    scConnGetStub.returns(Promise.resolve(expectEnvListApiResponse))
    scConnUpdateStub.returns(Promise.resolve(expectResponse))

    // Act
    const {stdout} = await runCommand(`platform:env:update --name=${envName} --new-name=${envNewName}`)

    // Assert
    expect(orgManagerStub.getDefaultOrg.calledOnce).to.be.true
    expect(orgManagerStub.createConnection.calledWith('default-org')).to.be.true
    expect(scConnGetStub.getCall(0).args[0]).to.contain(`?name=${envName}`)
    expect(scConnUpdateStub.getCall(0).calledWith(`/platform/environments/id${envName}`, expectBody)).to.be.true
    expect(stdout).to.contain(printObjectAsKeyValueTable(expectResponse.data as unknown as Record<string, unknown>))
  })

  it(`runs platform:env:update --env-id=id${envName} --isDefault`, async () => {
    // Arrange
    const expectBody = {
      isDefault: true,
    }
    const expectResponse: EnvironmentApiResponse = {
      data: anEnv(envName, true, false),
    }

    scConnUpdateStub.returns(Promise.resolve(expectResponse))

    // Act
    const {stdout} = await runCommand(`platform:env:update --env-id=id${envName} --isDefault`)

    // Assert
    expect(scConnUpdateStub.getCall(0).calledWith(`/platform/environments/id${envName}`, expectBody)).to.be.true
    expect(stdout).to.contain(printObjectAsKeyValueTable(expectResponse.data as unknown as Record<string, unknown>))
  })

  it(`runs platform:env:update --env-id=id${envName} --description="${envDescription}"`, async () => {
    // Arrange
    const expectBody = {
      description: envDescription,
    }
    const expectResponse: EnvironmentApiResponse = {
      data: anEnv(envName, false, false),
    }
    expectResponse.data.description = envDescription

    scConnUpdateStub.returns(Promise.resolve(expectResponse))

    // Act
    const {stdout} = await runCommand(`platform:env:update --env-id=id${envName} --description="${envDescription}"`)

    // Assert
    expect(scConnUpdateStub.getCall(0).calledWith(`/platform/environments/id${envName}`, expectBody)).to.be.true
    expect(stdout).to.contain(printObjectAsKeyValueTable(expectResponse.data as unknown as Record<string, unknown>))
  })
})
