import {OrgManager, printObjectAsKeyValueTable, ScConnection} from '@dishantlangayan/sc-cli-core'
import {runCommand} from '@oclif/test'
import {expect} from 'chai'
import * as sinon from 'sinon'

import MissionctrlBrokerUpdate from '../../../../src/commands/missionctrl/broker/update.js'
import {EventBrokerListApiResponse, EventBrokerOperationApiResponse} from '../../../../src/types/broker.js'
import {aBroker, createTestOperationResponse} from '../../../util/test-utils.js'

describe('missionctrl:broker:update', () => {
  const brokerName: string = 'MyTestBrokerName'
  const newBrokerName: string = 'MyNewTestBrokerName'
  const brokerId: string = 'MyTestBrokerId'
  let orgManagerStub: sinon.SinonStubbedInstance<OrgManager>
  let getOrgManagerStub: sinon.SinonStub
  let scGetConnStub: sinon.SinonStub
  let scPatchConnStub: sinon.SinonStub

  beforeEach(() => {
    // Stub OrgManager
    orgManagerStub = sinon.createStubInstance(OrgManager)
    getOrgManagerStub = sinon.stub(
      MissionctrlBrokerUpdate.prototype as unknown as Record<string, unknown>,
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
    scGetConnStub = sinon.stub(ScConnection.prototype, 'get')
    scPatchConnStub = sinon.stub(ScConnection.prototype, 'patch')
  })

  afterEach(() => {
    getOrgManagerStub.restore()
    scGetConnStub.restore()
    scPatchConnStub.restore()
  })

  it('runs missionctrl:broker:update cmd', async () => {
    const {stdout} = await runCommand('missionctrl:broker:update')
    expect(stdout).to.contain('')
  })

  it(`runs missionctrl:broker:update -b ${brokerId} -l true`, async () => {
    // Arrange
    const expectBody = {
      locked: true,
    }
    const updatedBrokerOpResponse: EventBrokerOperationApiResponse = createTestOperationResponse(
      brokerId,
      1,
      'MyTestOperationId',
      'SUCCEEDED',
    )
    scPatchConnStub.returns(Promise.resolve(updatedBrokerOpResponse))

    // Act
    const {stdout} = await runCommand(`missionctrl:broker:update -b ${brokerId} -l true`)

    // Assert
    expect(orgManagerStub.getDefaultOrg.calledOnce).to.be.true
    expect(orgManagerStub.createConnection.calledWith('default-org')).to.be.true
    expect(scPatchConnStub.getCall(0).calledWith(`/missionControl/eventBrokerServices/${brokerId}`, expectBody)).to.be
      .true
    expect(stdout).to.contain(
      printObjectAsKeyValueTable(updatedBrokerOpResponse.data as unknown as Record<string, unknown>),
    )
  })

  it(`runs missionctrl:broker:update -n ${brokerName} -l true --new-name ${newBrokerName}`, async () => {
    // Arrange
    const expectBody = {
      locked: true,
      name: newBrokerName,
    }
    const expectBrokerResponse: EventBrokerListApiResponse = {
      data: [aBroker(brokerId, brokerName)],
    }
    const updatedBrokerOpResponse: EventBrokerOperationApiResponse = createTestOperationResponse(
      brokerId,
      1,
      'MyTestOperationId',
      'SUCCEEDED',
    )
    scGetConnStub.returns(Promise.resolve(expectBrokerResponse))
    scPatchConnStub.returns(Promise.resolve(updatedBrokerOpResponse))

    // Act
    const {stdout} = await runCommand(`missionctrl:broker:update -n ${brokerName} -l true --new-name ${newBrokerName}`)

    // Assert
    expect(scGetConnStub.getCall(0).args[0]).to.contain(`?customAttributes=name=="${brokerName}"`)
    expect(scPatchConnStub.getCall(0).calledWith(`/missionControl/eventBrokerServices/${brokerId}`, expectBody)).to.be
      .true
    expect(stdout).to.contain(
      printObjectAsKeyValueTable(updatedBrokerOpResponse.data as unknown as Record<string, unknown>),
    )
  })
})
