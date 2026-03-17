import {OrgManager, printObjectAsKeyValueTable, ScConnection} from '@dishantlangayan/sc-cli-core'
import {runCommand} from '@oclif/test'
import {expect} from 'chai'
import * as sinon from 'sinon'

import PlatformEnvCreate from '../../../../src/commands/platform/env/create.js'
import {Environment, EnvironmentApiResponse} from '../../../../src/types/environment.js'
import {anEnv} from '../../../util/test-utils'

describe('platform:env:create', () => {
  let orgManagerStub: sinon.SinonStubbedInstance<OrgManager>
  let getOrgManagerStub: sinon.SinonStub
  let scConnStub: sinon.SinonStub
  const envName: string = 'MyTestEnvironment'

  beforeEach(() => {
    // Stub OrgManager
    orgManagerStub = sinon.createStubInstance(OrgManager)
    getOrgManagerStub = sinon.stub(
      PlatformEnvCreate.prototype as unknown as Record<string, unknown>,
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
    scConnStub = sinon.stub(ScConnection.prototype, 'post')
  })

  afterEach(() => {
    getOrgManagerStub.restore()
    scConnStub.restore()
  })

  it('runs platform:env:create', async () => {
    const {stdout} = await runCommand('platform:env:create')
    expect(stdout).to.contain('')
  })

  it(`runs platform:env:create --name=${envName}`, async () => {
    // Arrange
    const expectBody = {
      isDefault: false,
      isProduction: false,
      name: envName,
    }
    const expectEnv: Environment = anEnv(envName, false, false)
    const expectResponse: EnvironmentApiResponse = {
      data: expectEnv,
    }
    scConnStub.returns(expectResponse)

    // Act
    const {stdout} = await runCommand(`platform:env:create --name=${envName}`)

    // Assert
    expect(orgManagerStub.getDefaultOrg.calledOnce).to.be.true
    expect(orgManagerStub.createConnection.calledWith('default-org')).to.be.true
    expect(scConnStub.getCall(0).calledWith('/platform/environments', expectBody)).to.be.true
    expect(stdout).to.contain(printObjectAsKeyValueTable(expectResponse.data as unknown as Record<string, unknown>))
  })

  it(`runs platform:env:create --name=${envName} --description="This is an environment description."`, async () => {
    // Arrange
    const expectBody = {
      description: 'This is an environment description.',
      isDefault: false,
      isProduction: false,
      name: envName,
    }
    const expectEnv: Environment = anEnv(envName, false, false)
    const expectResponse: EnvironmentApiResponse = {
      data: expectEnv,
    }
    expectResponse.data.description = expectBody.description
    scConnStub.returns(expectResponse)

    // Act
    const {stdout} = await runCommand(
      `platform:env:create --name=${envName} --description="This is an environment description."`,
    )

    // Assert
    expect(scConnStub.getCall(0).calledWith('/platform/environments', expectBody)).to.be.true
    expect(stdout).to.contain(printObjectAsKeyValueTable(expectResponse.data as unknown as Record<string, unknown>))
  })

  it(`runs platform:env:create --alias=test-alias --name=${envName}`, async () => {
    // Arrange
    const expectBody = {
      isDefault: false,
      isProduction: false,
      name: envName,
    }
    const expectEnv: Environment = anEnv(envName, false, false)
    const expectResponse: EnvironmentApiResponse = {
      data: expectEnv,
    }
    scConnStub.returns(expectResponse)

    // Act
    const {stdout} = await runCommand(`platform:env:create --alias=test-alias --name=${envName}`)

    // Assert
    expect(orgManagerStub.getOrg.calledWith('test-alias')).to.be.true
    expect(orgManagerStub.createConnection.calledWith('test-alias')).to.be.true
    expect(scConnStub.getCall(0).calledWith('/platform/environments', expectBody)).to.be.true
    expect(stdout).to.contain(printObjectAsKeyValueTable(expectResponse.data as unknown as Record<string, unknown>))
  })
})
