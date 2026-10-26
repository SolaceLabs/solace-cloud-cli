import {OrgManager, renderTable, ScConnection} from '@dishantlangayan/sc-cli-core'
import {runCommand} from '@oclif/test'
import {expect} from 'chai'
import * as sinon from 'sinon'

import PlatformUsersList from '../../../../src/commands/platform/users/list.js'
import {User} from '../../../../src/types/user'
import {aUser, restoreStdoutIsTTY, setStdoutIsTTY} from '../../../util/test-utils'

const aPagination = (pageNumber: number, pageSize: number, count: number, totalPages: number) => ({
  pagination: {count, nextPage: null, pageNumber, pageSize, totalPages},
})

const expectedTable = (users: User[]) =>
  renderTable(
    [
      ['Email', 'First Name', 'Last Name', 'Id', 'State'],
      ...users.map((item: User) => [item.email, item.firstName, item.lastName, item.id, item.state]),
    ],
    {0: {width: 30, wrapWord: true}},
  )

describe('platform:users:list', () => {
  const defaultPageSize = 10
  const defaultPageNumber = 1

  let orgManagerStub: sinon.SinonStubbedInstance<OrgManager>
  let getOrgManagerStub: sinon.SinonStub
  let scConnStub: sinon.SinonStub

  let stdoutIsTTY: PropertyDescriptor | undefined

  beforeEach(() => {
    // Default to non-TTY output so results don't depend on where the tests are run
    stdoutIsTTY = Object.getOwnPropertyDescriptor(process.stdout, 'isTTY')
    setStdoutIsTTY(false)

    // Stub OrgManager
    orgManagerStub = sinon.createStubInstance(OrgManager)
    getOrgManagerStub = sinon.stub(
      PlatformUsersList.prototype as unknown as Record<string, unknown>,
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

    // Stub ScConnection.get
    scConnStub = sinon.stub(ScConnection.prototype, 'get')
  })

  afterEach(() => {
    getOrgManagerStub.restore()
    scConnStub.restore()
    restoreStdoutIsTTY(stdoutIsTTY)
  })

  it('runs platform:users:list', async () => {
    // Arrange
    const users = [aUser('Jane', 'Doe'), aUser('John', 'Smith')]
    scConnStub.resolves({data: users, meta: aPagination(1, 10, 2, 1)})

    // Act
    const {stdout} = await runCommand('platform:users:list')

    // Assert
    expect(orgManagerStub.getDefaultOrg.calledOnce).to.be.true
    expect(orgManagerStub.createConnection.calledWith('default-org')).to.be.true
    expect(scConnStub.getCall(0).args[0]).to.contain(`pageSize=${defaultPageSize}&pageNumber=${defaultPageNumber}`)
    expect(stdout).to.contain(expectedTable(users))
  })

  it('runs platform:users:list --name=Jane --email=jane.doe@example.com', async () => {
    // Arrange
    const users = [aUser('Jane', 'Doe')]
    scConnStub.resolves({data: users, meta: aPagination(1, 10, 1, 1)})

    // Act
    const {stdout} = await runCommand('platform:users:list --name=Jane --email=jane.doe@example.com')

    // Assert
    const url = scConnStub.getCall(0).args[0]
    expect(url).to.contain('name=Jane')
    expect(url).to.contain('email=jane.doe%40example.com')
    expect(stdout).to.contain(expectedTable(users))
  })

  it('repeats the ids, roles, and groups query parameters for array filters', async () => {
    // Arrange
    scConnStub.resolves({data: [aUser('Jane', 'Doe')], meta: aPagination(1, 10, 1, 1)})

    // Act
    await runCommand('platform:users:list --id=id-1 --id=id-2 --role=role-1 --group=group-1')

    // Assert
    const url = scConnStub.getCall(0).args[0]
    expect(url).to.contain('ids=id-1')
    expect(url).to.contain('ids=id-2')
    expect(url).to.contain('roles=role-1')
    expect(url).to.contain('groups=group-1')
  })

  it('runs platform:users:list --all and fetches every page', async () => {
    // Arrange
    const page1 = [aUser('Jane', 'Doe')]
    const page2 = [aUser('John', 'Smith')]
    scConnStub.onCall(0).resolves({data: page1, meta: aPagination(1, 1, 1, 2)})
    scConnStub.onCall(1).resolves({data: page2, meta: aPagination(2, 1, 1, 2)})

    // Act
    const {stdout} = await runCommand('platform:users:list --all -s 1')

    // Assert
    expect(scConnStub.callCount).to.equal(2)
    expect(scConnStub.getCall(0).args[0]).to.contain('pageSize=1&pageNumber=1')
    expect(scConnStub.getCall(1).args[0]).to.contain('pageSize=1&pageNumber=2')
    expect(stdout).to.contain(expectedTable([...page1, ...page2]))
  })

  it('uses specified alias when --alias provided', async () => {
    // Arrange
    scConnStub.resolves({data: [aUser('Jane', 'Doe')], meta: aPagination(1, 10, 1, 1)})

    // Act
    await runCommand('platform:users:list --alias=test-alias')

    // Assert
    expect(orgManagerStub.getOrg.calledWith('test-alias')).to.be.true
    expect(orgManagerStub.createConnection.calledWith('test-alias')).to.be.true
    expect(orgManagerStub.getDefaultOrg.called).to.be.false
  })
})
