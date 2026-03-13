import {OrgManager, printObjectAsKeyValueTable, ScConnection} from '@dishantlangayan/sc-cli-core'
import {runCommand} from '@oclif/test'
import {expect} from 'chai'
import * as sinon from 'sinon'

import MissionctrlBrokerDisplay from '../../../../src/commands/missionctrl/broker/display.js'
import {EventBrokerApiResponse, EventBrokerListApiResponse} from '../../../../src/types/broker.js'
import {aBroker} from '../../../util/test-utils.js'

describe('missionctrl:broker:display', () => {
  const brokerName: string = 'MyTestBrokerName'
  const brokerId: string = 'MyTestBrokerId'
  let orgManagerStub: sinon.SinonStubbedInstance<OrgManager>
  let getOrgManagerStub: sinon.SinonStub
  let scConnStub: sinon.SinonStub

  beforeEach(() => {
    // Stub OrgManager
    orgManagerStub = sinon.createStubInstance(OrgManager)
    getOrgManagerStub = sinon.stub(
      MissionctrlBrokerDisplay.prototype as unknown as Record<string, unknown>,
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

  it('runs missionctrl:broker:display cmd', async () => {
    const {stdout} = await runCommand('missionctrl:broker:display')
    expect(stdout).to.contain('')
  })

  it(`runs missionctrl:broker:display -b ${brokerId}`, async () => {
    // Arrange
    const expectBroker: EventBrokerApiResponse = {
      data: aBroker(brokerId, brokerName),
      meta: {},
    }
    scConnStub.returns(Promise.resolve(expectBroker))

    // Act
    const {stdout} = await runCommand(`missionctrl:broker:display -b ${brokerId}`)

    // Assert
    expect(orgManagerStub.getDefaultOrg.calledOnce).to.be.true
    expect(orgManagerStub.createConnection.calledWith('default-org')).to.be.true
    expect(scConnStub.getCall(0).calledWith(`/missionControl/eventBrokerServices/${brokerId}`)).to.be.true
    expect(stdout).to.contain(printObjectAsKeyValueTable(expectBroker.data as unknown as Record<string, unknown>))
  })

  it(`runs missionctrl:broker:display -n ${brokerName}`, async () => {
    // Arrange
    const expectBroker: EventBrokerListApiResponse = {
      data: [aBroker(brokerId, brokerName)],
      meta: {},
    }
    scConnStub.returns(Promise.resolve(expectBroker))

    // Act
    const {stdout} = await runCommand(`missionctrl:broker:display -n ${brokerName}`)

    // Assert
    expect(scConnStub.getCall(0).args[0]).to.contain(`?customAttributes=name=="${brokerName}"`)
    expect(stdout).to.contain(printObjectAsKeyValueTable(expectBroker.data[0] as unknown as Record<string, unknown>))
  })
})
