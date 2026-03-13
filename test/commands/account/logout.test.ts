import {OrgConfig, OrgManager} from '@dishantlangayan/sc-cli-core'
import {runCommand} from '@oclif/test'
import {expect} from 'chai'
import * as sinon from 'sinon'

import AccountLogout from '../../../src/commands/account/logout.js'

describe('account:logout', () => {
  let orgManagerStub: sinon.SinonStubbedInstance<OrgManager>
  let getOrgManagerStub: sinon.SinonStub

  beforeEach(() => {
    // Stub OrgManager
    orgManagerStub = sinon.createStubInstance(OrgManager)
    getOrgManagerStub = sinon.stub(
      AccountLogout.prototype as unknown as Record<string, unknown>,
      'getOrgManager',
    ).resolves(orgManagerStub)
  })

  afterEach(() => {
    getOrgManagerStub.restore()
  })

  it('logs out from specific org with --org flag and --no-prompt', async () => {
    // Arrange
    const orgs: OrgConfig[] = [
      {
        accessToken: 'token-1',
        alias: 'production',
        baseUrl: 'https://api.solace.cloud',
        orgId: 'org-123',
      },
      {
        accessToken: 'token-2',
        baseUrl: 'https://api.solace.cloud',
        orgId: 'org-456',
      },
    ]
    orgManagerStub.getAllOrgs.resolves(orgs)
    orgManagerStub.removeOrg.resolves()

    // Act
    const {stdout} = await runCommand('account:logout --org=org-123 --no-prompt')

    // Assert
    expect(orgManagerStub.getAllOrgs.calledOnce).to.be.true
    expect(orgManagerStub.removeOrg.calledOnceWith('org-123')).to.be.true
    expect(stdout).to.contain('Successfully logged out from: org-123 (production)')
  })

  it('logs out from all orgs with --all flag and --no-prompt', async () => {
    // Arrange
    const orgs: OrgConfig[] = [
      {
        accessToken: 'token-1',
        baseUrl: 'https://api.solace.cloud',
        orgId: 'org-123',
      },
      {
        accessToken: 'token-2',
        alias: 'staging',
        baseUrl: 'https://api.solace.cloud',
        orgId: 'org-456',
      },
      {
        accessToken: 'token-3',
        baseUrl: 'https://api.solace.cloud',
        orgId: 'org-789',
      },
    ]
    orgManagerStub.getAllOrgs.resolves(orgs)
    orgManagerStub.removeOrg.resolves()

    // Act
    const {stdout} = await runCommand('account:logout --all --no-prompt')

    // Assert
    expect(orgManagerStub.removeOrg.callCount).to.equal(3)
    expect(orgManagerStub.removeOrg.calledWith('org-123')).to.be.true
    expect(orgManagerStub.removeOrg.calledWith('org-456')).to.be.true
    expect(orgManagerStub.removeOrg.calledWith('org-789')).to.be.true
    expect(stdout).to.contain('Successfully logged out from: org-123')
    expect(stdout).to.contain('Successfully logged out from: org-456 (staging)')
    expect(stdout).to.contain('Successfully logged out from: org-789')
  })

  it('logs out from specific org by alias', async () => {
    // Arrange
    const orgs: OrgConfig[] = [
      {
        accessToken: 'token-1',
        alias: 'production',
        baseUrl: 'https://api.solace.cloud',
        orgId: 'org-123',
      },
      {
        accessToken: 'token-2',
        alias: 'staging',
        baseUrl: 'https://api.solace.cloud',
        orgId: 'org-456',
      },
    ]
    orgManagerStub.getAllOrgs.resolves(orgs)
    orgManagerStub.removeOrg.resolves()

    // Act
    const {stdout} = await runCommand('account:logout --org=production --no-prompt')

    // Assert
    expect(orgManagerStub.removeOrg.calledOnceWith('org-123')).to.be.true
    expect(stdout).to.contain('Successfully logged out from: org-123 (production)')
  })

  it('throws error when --org specifies non-existent org', async () => {
    // Arrange
    const orgs: OrgConfig[] = [
      {
        accessToken: 'token-1',
        baseUrl: 'https://api.solace.cloud',
        orgId: 'org-123',
      },
    ]
    orgManagerStub.getAllOrgs.resolves(orgs)

    // Act
    const result = await runCommand('account:logout --org=nonexistent --no-prompt')

    // Assert
    expect(result.error).to.exist
    if (result.error) {
      expect(result.error.message).to.contain("Organization 'nonexistent' not found")
    }

    expect(orgManagerStub.removeOrg.called).to.be.false
  })

  it('throws error when both --all and --org are specified', async () => {
    // Arrange
    const orgs: OrgConfig[] = [
      {
        accessToken: 'token-1',
        baseUrl: 'https://api.solace.cloud',
        orgId: 'org-123',
      },
    ]
    orgManagerStub.getAllOrgs.resolves(orgs)

    // Act
    const result = await runCommand('account:logout --all --org=org-123 --no-prompt')

    // Assert
    expect(result.error).to.exist
    if (result.error) {
      expect(result.error.message).to.contain('Cannot specify both --all and --org flags')
    }

    expect(orgManagerStub.removeOrg.called).to.be.false
  })

  it('displays message when no organizations exist', async () => {
    // Arrange
    orgManagerStub.getAllOrgs.resolves([])

    // Act
    const {stdout} = await runCommand('account:logout --no-prompt')

    // Assert
    expect(orgManagerStub.getAllOrgs.calledOnce).to.be.true
    expect(stdout).to.contain('No organizations found')
    expect(orgManagerStub.removeOrg.called).to.be.false
  })

  it('returns data for --json flag', async () => {
    // Arrange
    const orgs: OrgConfig[] = [
      {
        accessToken: 'token-1',
        alias: 'prod',
        baseUrl: 'https://api.solace.cloud',
        orgId: 'org-123',
      },
      {
        accessToken: 'token-2',
        baseUrl: 'https://api.solace.cloud',
        orgId: 'org-456',
      },
    ]
    orgManagerStub.getAllOrgs.resolves(orgs)
    orgManagerStub.removeOrg.resolves()

    // Act
    const result = await runCommand<{count: number; loggedOut: string[]}>(
      'account:logout --all --no-prompt --json',
    )

    // Assert
    expect(result.result).to.exist
    if (result.result) {
      expect(result.result.count).to.equal(2)
      expect(result.result.loggedOut).to.be.an('array')
      expect(result.result.loggedOut).to.have.lengthOf(2)
      expect(result.result.loggedOut).to.include('org-123')
      expect(result.result.loggedOut).to.include('org-456')
    }
  })
})
