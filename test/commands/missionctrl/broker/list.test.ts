import {OrgManager, renderTable, ScConnection} from '@dishantlangayan/sc-cli-core'
import {runCommand} from '@oclif/test'
import {expect} from 'chai'
import * as sinon from 'sinon'

import MissionctrlBrokerList from '../../../../src/commands/missionctrl/broker/list.js'
import {EventBrokerListApiResponse, EventBrokerServiceDetail} from '../../../../src/types/broker.js'
import {aBroker, restoreStdoutIsTTY, setStdoutIsTTY} from '../../../util/test-utils.js'

const aPage = (data: EventBrokerServiceDetail[], pageNumber: number, pageSize: number, totalPages: number) => ({
  data,
  meta: {pagination: {count: data.length, nextPage: null, pageNumber, pageSize, totalPages}},
})

const toRows = (data: EventBrokerServiceDetail[]) =>
  data.map((item: EventBrokerServiceDetail) => [
    item.name,
    item.id,
    item.type,
    item.eventBrokerServiceVersion,
    item.ownedBy,
    item.datacenterId,
    item.serviceClassId,
  ])

describe('missionctrl:broker:list', () => {
  let orgManagerStub: sinon.SinonStubbedInstance<OrgManager>
  let getOrgManagerStub: sinon.SinonStub
  let scConnStub: sinon.SinonStub

  const defaultPageSize = 10
  const defaultPageNumber = 1

  let stdoutIsTTY: PropertyDescriptor | undefined

  beforeEach(() => {
    // Default to non-TTY output so results don't depend on where the tests are run
    stdoutIsTTY = Object.getOwnPropertyDescriptor(process.stdout, 'isTTY')
    setStdoutIsTTY(false)

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
    restoreStdoutIsTTY(stdoutIsTTY)
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

  it('runs missionctrl:broker:list --page-size=1 --page-number=2', async () => {
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
    const {stdout} = await runCommand(`missionctrl:broker:list --page-size=${pageSize} --page-number=${pageNumber}`)

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

  const header = ['Name', 'Id', 'Type', 'Version', 'Owned By', 'Datacenter Id', 'Service Class Id']

  it('rejects legacy --pageSize and --pageNumber flags', async () => {
    // Act
    const result = await runCommand('missionctrl:broker:list --pageSize=5 --pageNumber=3')

    // Assert
    expect(result.error).to.exist
    expect(scConnStub.called).to.be.false
  })

  it('runs missionctrl:broker:list --all and fetches every page', async () => {
    // Arrange
    const page1 = [aBroker('BrokerId1', 'Broker1'), aBroker('BrokerId2', 'Broker2')]
    const page2 = [aBroker('BrokerId3', 'Broker3')]
    scConnStub.onCall(0).resolves(aPage(page1, 1, 2, 2))
    scConnStub.onCall(1).resolves(aPage(page2, 2, 2, 2))

    // Act
    const {stdout} = await runCommand('missionctrl:broker:list --all --page-size=2')

    // Assert
    expect(scConnStub.callCount).to.equal(2)
    expect(scConnStub.getCall(0).args[0]).to.contain('?pageSize=2&pageNumber=1')
    expect(scConnStub.getCall(1).args[0]).to.contain('?pageSize=2&pageNumber=2')
    expect(stdout).to.contain(renderTable([header, ...toRows([...page1, ...page2])]))
  })

  it('uses max page size for --all when --page-size not provided', async () => {
    // Arrange
    scConnStub.resolves(aPage([aBroker('BrokerId1', 'Broker1')], 1, 100, 1))

    // Act
    await runCommand('missionctrl:broker:list --all')

    // Assert
    expect(scConnStub.callCount).to.equal(1)
    expect(scConnStub.getCall(0).args[0]).to.contain('?pageSize=100&pageNumber=1')
  })

  it('streams rows as each page is received with --all on a TTY', async () => {
    // Arrange
    setStdoutIsTTY(true)
    scConnStub.onCall(0).resolves(aPage([aBroker('BrokerId1', 'Broker1')], 1, 1, 2))
    scConnStub.onCall(1).resolves(aPage([aBroker('BrokerId2', 'Broker2')], 2, 1, 2))

    // Act
    const {stdout} = await runCommand('missionctrl:broker:list --all --page-size=1', undefined, {stripAnsi: false})

    // Assert
    expect(scConnStub.callCount).to.equal(2)
    expect(stdout).to.contain('Broker1')
    expect(stdout).to.contain('Broker2')
    expect(stdout.indexOf('Broker1')).to.be.lessThan(stdout.indexOf('Broker2'))
    // Stream table redraws the bottom border when appending rows
    expect(stdout).to.contain('\r\u001B[K')
  })

  it('returns all pages combined with --all --json', async () => {
    // Arrange
    scConnStub.onCall(0).resolves(aPage([aBroker('BrokerId1', 'Broker1')], 1, 1, 2))
    scConnStub.onCall(1).resolves(aPage([aBroker('BrokerId2', 'Broker2')], 2, 1, 2))

    // Act
    const {stdout} = await runCommand('missionctrl:broker:list --all --page-size=1 --json')

    // Assert
    const json = JSON.parse(stdout)
    expect(json.data.map((b: EventBrokerServiceDetail) => b.id)).to.deep.equal(['BrokerId1', 'BrokerId2'])
  })

  it('does not allow --all with --page-number', async () => {
    // Act
    const result = await runCommand('missionctrl:broker:list --all --page-number=2')

    // Assert
    expect(result.error).to.exist
    expect(scConnStub.called).to.be.false
  })
})
