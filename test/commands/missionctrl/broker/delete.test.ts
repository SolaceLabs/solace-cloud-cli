import {OrgManager, printObjectAsKeyValueTable, ScConnection} from '@dishantlangayan/sc-cli-core'
import {runCommand} from '@oclif/test'
import {expect} from 'chai'
import * as sinon from 'sinon'

import MissionctrlBrokerDelete from '../../../../src/commands/missionctrl/broker/delete.js'
import {EventBrokerListApiResponse, EventBrokerOperationApiResponse} from '../../../../src/types/broker.js'
import {aBroker, createTestOperationResponse} from '../../../util/test-utils'

describe('missionctrl:broker:delete', () => {
  let orgManagerStub: sinon.SinonStubbedInstance<OrgManager>
  let getOrgManagerStub: sinon.SinonStub
  let scConnDeleteStub: sinon.SinonStub
  let scConnGetStub: sinon.SinonStub
  const brokerId: string = 'MyTestBrokerId'
  const brokerName: string = 'MyTestBrokerName'

  beforeEach(() => {
    // Stub OrgManager
    orgManagerStub = sinon.createStubInstance(OrgManager)
    getOrgManagerStub = sinon.stub(
      MissionctrlBrokerDelete.prototype as unknown as Record<string, unknown>,
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

  it('runs missionctrl:broker:delete cmd', async () => {
    const {stdout} = await runCommand('missionctrl:broker:delete')
    expect(stdout).to.contain('')
  })

  it(`runs missionctrl:broker:delete -b ${brokerId}`, async () => {
    // Arrange
    const expectBrokerOpResponse: EventBrokerOperationApiResponse = createTestOperationResponse(
      brokerId,
      1,
      'MyTestOperationId',
      'PENDING',
    )

    scConnDeleteStub.returns(expectBrokerOpResponse)

    // Act
    const {stdout} = await runCommand(`missionctrl:broker:delete -b ${brokerId}`)

    // Assert
    expect(orgManagerStub.getDefaultOrg.calledOnce).to.be.true
    expect(orgManagerStub.createConnection.calledWith('default-org')).to.be.true
    expect(scConnDeleteStub.getCall(0).calledWith(`/missionControl/eventBrokerServices/${brokerId}`)).to.be.true
    expect(stdout).to.contain(printObjectAsKeyValueTable(expectBrokerOpResponse.data as unknown as Record<string, unknown>))
  })

  it(`runs missionctrl:broker:delete -n ${brokerName}`, async () => {
    // Arrange
    const expectBrokerOpResponse: EventBrokerOperationApiResponse = createTestOperationResponse(
      brokerId,
      1,
      'MyTestOperationId',
      'PENDING',
    )

    const expectBrokerListResponse: EventBrokerListApiResponse = {
      data: [aBroker(brokerId, brokerName)],
      meta: {},
    }

    scConnGetStub.returns(Promise.resolve(expectBrokerListResponse))
    scConnDeleteStub.returns(expectBrokerOpResponse)

    // Act
    const {stdout} = await runCommand(`missionctrl:broker:delete -n ${brokerName}`)

    // Assert
    expect(scConnGetStub.getCall(0).args[0]).to.contain(`customAttributes=name=="${brokerName}"`)
    expect(scConnDeleteStub.getCall(0).calledWith(`/missionControl/eventBrokerServices/${brokerId}`)).to.be.true
    expect(stdout).to.contain(printObjectAsKeyValueTable(expectBrokerOpResponse.data as unknown as Record<string, unknown>))
  })

  it(`runs missionctrl:broker:delete --alias=test-alias -b ${brokerId}`, async () => {
    // Arrange
    const expectBrokerOpResponse: EventBrokerOperationApiResponse = createTestOperationResponse(
      brokerId,
      1,
      'MyTestOperationId',
      'PENDING',
    )

    scConnDeleteStub.returns(expectBrokerOpResponse)

    // Act
    const {stdout} = await runCommand(`missionctrl:broker:delete --alias=test-alias -b ${brokerId}`)

    // Assert
    expect(orgManagerStub.getOrg.calledWith('test-alias')).to.be.true
    expect(orgManagerStub.createConnection.calledWith('test-alias')).to.be.true
    expect(scConnDeleteStub.getCall(0).calledWith(`/missionControl/eventBrokerServices/${brokerId}`)).to.be.true
    expect(stdout).to.contain(printObjectAsKeyValueTable(expectBrokerOpResponse.data as unknown as Record<string, unknown>))
  })
})
