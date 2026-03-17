import {OrgManager, printObjectAsKeyValueTable, ScConnection} from '@dishantlangayan/sc-cli-core'
import {runCommand} from '@oclif/test'
import {expect} from 'chai'
import * as sinon from 'sinon'

import MissionctrlBrokerCreate from '../../../../src/commands/missionctrl/broker/create.js'
import {EventBrokerOperationApiResponse} from '../../../../src/types/broker.js'
import {aBroker, anEnv} from '../../../util/test-utils'

describe('missionctrl:broker:create', () => {
  let orgManagerStub: sinon.SinonStubbedInstance<OrgManager>
  let getOrgManagerStub: sinon.SinonStub
  let scConnPostStub: sinon.SinonStub
  let scConnGetStub: sinon.SinonStub
  const envName: string = 'MyTestEnvironment'
  const brokerName: string = 'MyEventBrokerName'
  const brokerDC: string = 'eks-ca-central-1a'
  const brokerSvcClassId: string = 'DEVELOPER'

  beforeEach(() => {
    // Stub OrgManager
    orgManagerStub = sinon.createStubInstance(OrgManager)
    getOrgManagerStub = sinon.stub(
      MissionctrlBrokerCreate.prototype as unknown as Record<string, unknown>,
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
    scConnPostStub = sinon.stub(ScConnection.prototype, 'post')
    scConnGetStub = sinon.stub(ScConnection.prototype, 'get')
  })

  afterEach(() => {
    getOrgManagerStub.restore()
    scConnPostStub.restore()
    scConnGetStub.restore()
  })

  it('runs missionctrl:broker:create cmd', async () => {
    const {stdout} = await runCommand('missionctrl:broker:create')
    expect(stdout).to.contain('')
  })

  it(`runs missionctrl:broker:create -n ${brokerName} -d ${brokerDC} -c ${brokerSvcClassId}`, async () => {
    // Arrange
    const expectBody = {
      datacenterId: brokerDC,
      locked: false,
      name: brokerName,
      redundancyGroupSslEnabled: false,
      serviceClassId: brokerSvcClassId,
    }
    const expectResponse: EventBrokerOperationApiResponse = {
      data: aBroker(brokerName, brokerDC),
      meta: {},
    }

    scConnPostStub.returns(expectResponse)

    // Act
    const {stdout} = await runCommand(
      `missionctrl:broker:create -n ${brokerName} -d ${brokerDC} -c ${brokerSvcClassId}`,
    )

    // Assert
    expect(orgManagerStub.getDefaultOrg.calledOnce).to.be.true
    expect(orgManagerStub.createConnection.calledWith('default-org')).to.be.true
    expect(scConnPostStub.getCall(0).calledWith('/missionControl/eventBrokerServices', expectBody)).to.be.true
    expect(stdout).to.contain(printObjectAsKeyValueTable(expectResponse.data as unknown as Record<string, unknown>))
  })

  it(`runs missionctrl:broker:create -n ${brokerName} -d ${brokerDC} -c ${brokerSvcClassId} -l -s 10 -m MyTestMsgVpn -r -v 10.0.0.1`, async () => {
    // Arrange
    const expectBody = {
      datacenterId: brokerDC,
      eventBrokerVersion: '10.0.0.1',
      locked: true,
      maxSpoolUsage: '10',
      msgVpnName: 'MyTestMsgVpn',
      name: brokerName,
      redundancyGroupSslEnabled: true,
      serviceClassId: brokerSvcClassId,
    }
    const expectResponse: EventBrokerOperationApiResponse = {
      data: aBroker(brokerName, brokerDC),
      meta: {},
    }

    scConnPostStub.returns(expectResponse)

    // Act
    const {stdout} = await runCommand(
      `missionctrl:broker:create -n ${brokerName} -d ${brokerDC} -c ${brokerSvcClassId} -l -s 10 -m MyTestMsgVpn -r -v 10.0.0.1`,
    )

    // Assert
    expect(scConnPostStub.getCall(0).calledWith('/missionControl/eventBrokerServices', expectBody)).to.be.true
    expect(stdout).to.contain(printObjectAsKeyValueTable(expectResponse.data as unknown as Record<string, unknown>))
  })

  it(`runs missionctrl:broker:create -e ${envName} -n ${brokerName} -d ${brokerDC} -c ${brokerSvcClassId}`, async () => {
    // Arrange
    const envId = `id${envName}`
    const expectBody = {
      datacenterId: brokerDC,
      environmentId: envId,
      locked: false,
      name: brokerName,
      redundancyGroupSslEnabled: false,
      serviceClassId: brokerSvcClassId,
    }
    const expectResponse: EventBrokerOperationApiResponse = {
      data: aBroker(brokerName, brokerDC),
      meta: {},
    }

    const expectEnvResponse = {
      data: [anEnv(envName, true, false)],
      meta: {},
    }

    scConnGetStub.returns(Promise.resolve(expectEnvResponse))
    scConnPostStub.returns(expectResponse)

    // Act
    const {stdout} = await runCommand(
      `missionctrl:broker:create -e ${envName} -n ${brokerName} -d ${brokerDC} -c ${brokerSvcClassId}`,
    )

    // Assert
    expect(scConnGetStub.getCall(0).args[0]).to.contain(`?name=${envName}`)
    expect(scConnPostStub.getCall(0).calledWith('/missionControl/eventBrokerServices', expectBody)).to.be.true
    expect(stdout).to.contain(printObjectAsKeyValueTable(expectResponse.data as unknown as Record<string, unknown>))
  })

  it(`runs missionctrl:broker:create --alias=test-alias -n ${brokerName} -d ${brokerDC} -c ${brokerSvcClassId}`, async () => {
    // Arrange
    const expectBody = {
      datacenterId: brokerDC,
      locked: false,
      name: brokerName,
      redundancyGroupSslEnabled: false,
      serviceClassId: brokerSvcClassId,
    }
    const expectResponse: EventBrokerOperationApiResponse = {
      data: aBroker(brokerName, brokerDC),
      meta: {},
    }

    scConnPostStub.returns(expectResponse)

    // Act
    const {stdout} = await runCommand(
      `missionctrl:broker:create --alias=test-alias -n ${brokerName} -d ${brokerDC} -c ${brokerSvcClassId}`,
    )

    // Assert
    expect(orgManagerStub.getOrg.calledWith('test-alias')).to.be.true
    expect(orgManagerStub.createConnection.calledWith('test-alias')).to.be.true
    expect(scConnPostStub.getCall(0).calledWith('/missionControl/eventBrokerServices', expectBody)).to.be.true
    expect(stdout).to.contain(printObjectAsKeyValueTable(expectResponse.data as unknown as Record<string, unknown>))
  })
})
