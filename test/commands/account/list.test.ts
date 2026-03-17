import {OrgConfig, OrgManager, renderTable} from '@dishantlangayan/sc-cli-core'
import {runCommand} from '@oclif/test'
import {expect} from 'chai'
import * as sinon from 'sinon'

import AccountList from '../../../src/commands/account/list.js'

describe('account:list', () => {
  let orgManagerStub: sinon.SinonStubbedInstance<OrgManager>
  let getOrgManagerStub: sinon.SinonStub

  beforeEach(() => {
    // Stub OrgManager
    orgManagerStub = sinon.createStubInstance(OrgManager)
    getOrgManagerStub = sinon.stub(
      AccountList.prototype as unknown as Record<string, unknown>,
      'getOrgManager',
    ).resolves(orgManagerStub)
  })

  afterEach(() => {
    getOrgManagerStub.restore()
  })

  it('lists multiple organizations with table format', async () => {
    // Arrange
    const orgs: OrgConfig[] = [
      {
        accessToken: 'token-1',
        alias: 'production',
        apiVersion: 'v2',
        baseUrl: 'https://api.solace.cloud',
        isDefault: true,
        orgId: 'org-123',
      },
      {
        accessToken: 'token-2',
        baseUrl: 'https://api.solace.cloud',
        isDefault: false,
        orgId: 'org-456',
      },
      {
        accessToken: 'token-3',
        alias: 'dev',
        baseUrl: 'https://custom.solace.cloud',
        isDefault: false,
        orgId: 'org-789',
      },
    ]
    orgManagerStub.getAllOrgs.resolves(orgs)

    const orgArray = [
      ['Org ID', 'Alias', 'Base URL', 'API Version', 'Is Default'],
      ['org-123', 'production', 'https://api.solace.cloud', 'v2', 'Yes'],
      ['org-456', '', 'https://api.solace.cloud', '', ''],
      ['org-789', 'dev', 'https://custom.solace.cloud', '', ''],
    ]

    // Act
    const {stdout} = await runCommand('account:list')

    // Assert
    expect(orgManagerStub.getAllOrgs.calledOnce).to.be.true
    expect(stdout).to.contain(renderTable(orgArray))
  })

  it('marks the default organization correctly', async () => {
    // Arrange
    const orgs: OrgConfig[] = [
      {
        accessToken: 'token-1',
        baseUrl: 'https://api.solace.cloud',
        isDefault: true,
        orgId: 'org-default',
      },
      {
        accessToken: 'token-2',
        baseUrl: 'https://api.solace.cloud',
        isDefault: false,
        orgId: 'org-other',
      },
    ]
    orgManagerStub.getAllOrgs.resolves(orgs)

    // Act
    const {stdout} = await runCommand('account:list')

    // Assert
    const orgArray = [
      ['Org ID', 'Alias', 'Base URL', 'API Version', 'Is Default'],
      ['org-default', '', 'https://api.solace.cloud', '', 'Yes'],
      ['org-other', '', 'https://api.solace.cloud', '', ''],
    ]
    expect(stdout).to.contain(renderTable(orgArray))
  })

  it('handles no default organization', async () => {
    // Arrange
    const orgs: OrgConfig[] = [
      {
        accessToken: 'token-1',
        baseUrl: 'https://api.solace.cloud',
        isDefault: false,
        orgId: 'org-123',
      },
    ]
    orgManagerStub.getAllOrgs.resolves(orgs)

    // Act
    const {stdout} = await runCommand('account:list')

    // Assert
    const orgArray = [
      ['Org ID', 'Alias', 'Base URL', 'API Version', 'Is Default'],
      ['org-123', '', 'https://api.solace.cloud', '', ''],
    ]
    expect(stdout).to.contain(renderTable(orgArray))
  })

  it('displays message when no organizations exist', async () => {
    // Arrange
    orgManagerStub.getAllOrgs.resolves([])

    // Act
    const {stdout} = await runCommand('account:list')

    // Assert
    expect(orgManagerStub.getAllOrgs.calledOnce).to.be.true
    expect(stdout).to.contain('No organizations found')
    expect(stdout).to.contain("Run 'sc account:login' to authenticate")
  })

  it('displays alias when present and empty string when absent', async () => {
    // Arrange
    const orgs: OrgConfig[] = [
      {
        accessToken: 'token-1',
        alias: 'prod',
        baseUrl: 'https://api.solace.cloud',
        isDefault: false,
        orgId: 'org-with-alias',
      },
      {
        accessToken: 'token-2',
        baseUrl: 'https://api.solace.cloud',
        isDefault: false,
        orgId: 'org-without-alias',
      },
    ]
    orgManagerStub.getAllOrgs.resolves(orgs)

    const orgArray = [
      ['Org ID', 'Alias', 'Base URL', 'API Version', 'Is Default'],
      ['org-with-alias', 'prod', 'https://api.solace.cloud', '', ''],
      ['org-without-alias', '', 'https://api.solace.cloud', '', ''],
    ]

    // Act
    const {stdout} = await runCommand('account:list')

    // Assert
    expect(stdout).to.contain(renderTable(orgArray))
  })

  it('does not display access token in output', async () => {
    // Arrange
    const secretToken = 'super-secret-token-12345'
    const orgs: OrgConfig[] = [
      {
        accessToken: secretToken,
        baseUrl: 'https://api.solace.cloud',
        orgId: 'org-123',
      },
    ]
    orgManagerStub.getAllOrgs.resolves(orgs)
    orgManagerStub.getDefaultOrg.resolves(null)

    // Act
    const {stdout} = await runCommand('account:list')

    // Assert
    expect(stdout).to.not.contain(secretToken)
    expect(stdout).to.not.contain('accessToken')
    expect(stdout).to.not.contain('token')
  })

  it('returns organization data for --json flag', async () => {
    // Arrange
    const orgs: OrgConfig[] = [
      {
        accessToken: 'token-1',
        alias: 'prod',
        baseUrl: 'https://api.solace.cloud',
        orgId: 'org-123',
      },
    ]
    orgManagerStub.getAllOrgs.resolves(orgs)
    orgManagerStub.getDefaultOrg.resolves(orgs[0])

    // Act
    const result = await runCommand<{data: OrgConfig[]}>('account:list --json')

    // Assert
    expect(result.result).to.exist
    if (result.result) {
      expect(result.result.data).to.be.an('array')
      expect(result.result.data).to.have.lengthOf(1)
      expect(result.result.data[0].orgId).to.equal('org-123')
      expect(result.result.data[0].alias).to.equal('prod')
      expect(result.result.data[0].accessToken).to.equal('token-1')
    }
  })
})
