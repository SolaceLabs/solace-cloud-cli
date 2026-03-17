import {OrgManager, printObjectAsKeyValueTable, ScConnection} from '@dishantlangayan/sc-cli-core'
import {runCommand} from '@oclif/test'
import {expect} from 'chai'
import * as sinon from 'sinon'

import MissionctrlBrokerState from '../../../../src/commands/missionctrl/broker/state.js'
import {EventBrokerListApiResponse, EventBrokerRedundancyApiResponse} from '../../../../src/types/broker.js'
import {aBroker} from '../../../util/test-utils.js'

describe('missionctrl:broker:state', () => {
  const brokerName: string = 'MyTestBrokerName'
  const brokerId: string = 'MyTestBrokerId'
  let orgManagerStub: sinon.SinonStubbedInstance<OrgManager>
  let getOrgManagerStub: sinon.SinonStub
  let scConnStub: sinon.SinonStub

  beforeEach(() => {
    // Stub OrgManager
    orgManagerStub = sinon.createStubInstance(OrgManager)
    getOrgManagerStub = sinon.stub(
      MissionctrlBrokerState.prototype as unknown as Record<string, unknown>,
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
    scConnStub = sinon.stub(ScConnection.prototype, 'get')
  })

  afterEach(() => {
    getOrgManagerStub.restore()
    scConnStub.restore()
  })

  it(`runs missionctrl:broker:state --broker-id ${brokerId}`, async () => {
    // Arrange
    const expectBrokerStateResponse: EventBrokerRedundancyApiResponse = {
      data: {
        id: brokerId,
        isHighAvailability: true,
        redundancy: {
          activeNode: 'PRIMARY',
          configSync: 'UP',
          redundancy: 'UP',
        },
        type: 'brokerState',
      },
    }
    scConnStub.returns(Promise.resolve(expectBrokerStateResponse))

    // Act
    const {stdout} = await runCommand(`missionctrl:broker:state --broker-id ${brokerId}`)

    // Assert
    expect(orgManagerStub.getDefaultOrg.calledOnce).to.be.true
    expect(orgManagerStub.createConnection.calledWith('default-org')).to.be.true
    expect(scConnStub.getCall(0).calledWith(`/missionControl/eventBrokerServices/${brokerId}/brokerState`)).to.be.true
    expect(stdout).to.contain(printObjectAsKeyValueTable(expectBrokerStateResponse.data))
  })

  it(`runs missionctrl:broker:state --name ${brokerName}`, async () => {
    // Arrange
    const expectBrokerGetResponse: EventBrokerListApiResponse = {
      data: [aBroker(brokerId, brokerName)],
      meta: {},
    }
    const expectBrokerStateResponse: EventBrokerRedundancyApiResponse = {
      data: {
        id: brokerId,
        isHighAvailability: true,
        redundancy: {
          activeNode: 'PRIMARY',
          configSync: 'UP',
          redundancy: 'UP',
        },
        type: 'brokerState',
      },
    }
    scConnStub
      .onFirstCall()
      .returns(Promise.resolve(expectBrokerGetResponse))
      .onSecondCall()
      .returns(Promise.resolve(expectBrokerStateResponse))

    // Act
    const {stdout} = await runCommand(`missionctrl:broker:state --name ${brokerName}`)

    // Assert
    expect(scConnStub.callCount).to.be.greaterThan(1) // Should make multiple API calls for progress
    expect(scConnStub.getCall(0).args[0]).to.contain(`?customAttributes=name=="${brokerName}"`)
    expect(scConnStub.getCall(1).calledWith(`/missionControl/eventBrokerServices/${brokerId}/brokerState`)).to.be.true
    expect(stdout).to.contain(printObjectAsKeyValueTable(expectBrokerStateResponse.data))
  })

  it(`runs missionctrl:broker:state --alias=test-alias --broker-id ${brokerId}`, async () => {
    // Arrange
    const expectBrokerStateResponse: EventBrokerRedundancyApiResponse = {
      data: {
        id: brokerId,
        isHighAvailability: true,
        redundancy: {
          activeNode: 'PRIMARY',
          configSync: 'UP',
          redundancy: 'UP',
        },
        type: 'brokerState',
      },
    }
    scConnStub.returns(Promise.resolve(expectBrokerStateResponse))

    // Act
    const {stdout} = await runCommand(`missionctrl:broker:state --alias=test-alias --broker-id ${brokerId}`)

    // Assert
    expect(orgManagerStub.getOrg.calledWith('test-alias')).to.be.true
    expect(orgManagerStub.createConnection.calledWith('test-alias')).to.be.true
    expect(scConnStub.getCall(0).calledWith(`/missionControl/eventBrokerServices/${brokerId}/brokerState`)).to.be.true
    expect(stdout).to.contain(printObjectAsKeyValueTable(expectBrokerStateResponse.data))
  })
})
