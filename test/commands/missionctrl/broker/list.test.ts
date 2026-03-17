import {OrgManager, renderTable, ScConnection} from '@dishantlangayan/sc-cli-core'
import {runCommand} from '@oclif/test'
import {expect} from 'chai'
import * as sinon from 'sinon'

import MissionctrlBrokerList from '../../../../src/commands/missionctrl/broker/list.js'
import {EventBrokerListApiResponse, EventBrokerServiceDetail} from '../../../../src/types/broker.js'
import {aBroker} from '../../../util/test-utils.js'

describe('missionctrl:broker:list', () => {
  let orgManagerStub: sinon.SinonStubbedInstance<OrgManager>
  let getOrgManagerStub: sinon.SinonStub
  let scConnStub: sinon.SinonStub

  const defaultPageSize = 10
  const defaultPageNumber = 1

  beforeEach(() => {
    // Stub OrgManager
    orgManagerStub = sinon.createStubInstance(OrgManager)
    getOrgManagerStub = sinon.stub(
      MissionctrlBrokerList.prototype as unknown as Record<string, unknown>,
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

  it('runs missionctrl:broker:list cmd', async () => {
    // Arrange
    const expectBrokerResponse: EventBrokerListApiResponse = {
      data: [aBroker('BrokerId1', 'Broker1'), aBroker('BrokerId2', 'Broker2'), aBroker('BrokerId3', 'Broker3')],
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
    scConnStub.returns(Promise.resolve(expectBrokerResponse))

    // Expected
    const expectBrokerArray = [
      ['Name', 'Id', 'Type', 'Version', 'Owned By', 'Datacenter Id', 'Service Class Id'],
      ...expectBrokerResponse.data.map((item: EventBrokerServiceDetail) => [
        item.name,
        item.id,
        item.type,
        item.eventBrokerServiceVersion,
        item.ownedBy,
        item.datacenterId,
        item.serviceClassId,
      ]),
    ]

    // Act
    const {stdout} = await runCommand('missionctrl:broker:list')

    // Assert
    expect(orgManagerStub.getDefaultOrg.calledOnce).to.be.true
    expect(orgManagerStub.createConnection.calledWith('default-org')).to.be.true
    expect(scConnStub.getCall(0).calledWith(`/missionControl/eventBrokerServices?pageSize=${defaultPageSize}&pageNumber=${defaultPageNumber}`)).to.be.true
    expect(stdout).to.contain(renderTable(expectBrokerArray))
  })

  it('runs missionctrl:broker:list --pageSize=1 --pageNumber=2', async () => {
    // Arrange
    const pageSize = 1
    const pageNumber = 2
    const expectBrokerResponse: EventBrokerListApiResponse = {
      data: [aBroker('BrokerId2', 'Broker2')],
      meta: {
        pagination: {
          count: 1,
          nextPage: null,
          pageNumber: 2,
          pageSize: 1,
          totalPages: 3,
        },
      },
    }
    scConnStub.returns(Promise.resolve(expectBrokerResponse))

    // Expected
    const expectBrokerArray = [
      ['Name', 'Id', 'Type', 'Version', 'Owned By', 'Datacenter Id', 'Service Class Id'],
      ...expectBrokerResponse.data.map((item: EventBrokerServiceDetail) => [
        item.name,
        item.id,
        item.type,
        item.eventBrokerServiceVersion,
        item.ownedBy,
        item.datacenterId,
        item.serviceClassId,
      ]),
    ]

    // Act
    const {stdout} = await runCommand(`missionctrl:broker:list --pageSize=${pageSize} --pageNumber=${pageNumber}`)

    // Assert
    expect(scConnStub.getCall(0).args[0]).to.contain(`?pageSize=${pageSize}&pageNumber=${pageNumber}`)
    expect(stdout).to.contain(renderTable(expectBrokerArray))
  })

  it('runs missionctrl:broker:list --name=Broker2', async () => {
    // Arrange
    const brokerName = 'Broker2'
    const expectBrokerResponse: EventBrokerListApiResponse = {
      data: [aBroker('BrokerId2', brokerName)],
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
    scConnStub.returns(Promise.resolve(expectBrokerResponse))

    // Expected
    const expectBrokerArray = [
      ['Name', 'Id', 'Type', 'Version', 'Owned By', 'Datacenter Id', 'Service Class Id'],
      ...expectBrokerResponse.data.map((item: EventBrokerServiceDetail) => [
        item.name,
        item.id,
        item.type,
        item.eventBrokerServiceVersion,
        item.ownedBy,
        item.datacenterId,
        item.serviceClassId,
      ]),
    ]

    // Act
    const {stdout} = await runCommand(`missionctrl:broker:list --name=${brokerName}`)

    // Assert
    expect(scConnStub.getCall(0).args[0]).to.contain(`customAttributes=name=="${brokerName}"`)
    expect(stdout).to.contain(renderTable(expectBrokerArray))
  })

  it('runs missionctrl:broker:list --alias=test-alias', async () => {
    // Arrange
    const expectBrokerResponse: EventBrokerListApiResponse = {
      data: [aBroker('BrokerId1', 'Broker1')],
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
    scConnStub.returns(Promise.resolve(expectBrokerResponse))

    // Expected
    const expectBrokerArray = [
      ['Name', 'Id', 'Type', 'Version', 'Owned By', 'Datacenter Id', 'Service Class Id'],
      ...expectBrokerResponse.data.map((item: EventBrokerServiceDetail) => [
        item.name,
        item.id,
        item.type,
        item.eventBrokerServiceVersion,
        item.ownedBy,
        item.datacenterId,
        item.serviceClassId,
      ]),
    ]

    // Act
    const {stdout} = await runCommand('missionctrl:broker:list --alias=test-alias')

    // Assert
    expect(orgManagerStub.getOrg.calledWith('test-alias')).to.be.true
    expect(orgManagerStub.createConnection.calledWith('test-alias')).to.be.true
    expect(scConnStub.getCall(0).calledWith(`/missionControl/eventBrokerServices?pageSize=${defaultPageSize}&pageNumber=${defaultPageNumber}`)).to.be.true
    expect(stdout).to.contain(renderTable(expectBrokerArray))
  })
})
