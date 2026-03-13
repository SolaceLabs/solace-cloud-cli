import {OrgConfig, OrgError, OrgErrorCode, OrgManager} from '@dishantlangayan/sc-cli-core'
import {runCommand} from '@oclif/test'
import {expect} from 'chai'
import * as sinon from 'sinon'

import AccountLogin from '../../../src/commands/account/login.js'

describe('account:login', () => {
  let orgManagerStub: sinon.SinonStubbedInstance<OrgManager>
  let getOrgManagerStub: sinon.SinonStub

  beforeEach(() => {
    orgManagerStub = sinon.createStubInstance(OrgManager)
    getOrgManagerStub = sinon.stub(AccountLogin.prototype as any, 'getOrgManager').resolves(orgManagerStub)
  })

  afterEach(() => {
    getOrgManagerStub.restore()
    delete process.env.SC_ACCESS_TOKEN
  })

  it('runs account:login --org=test-org --no-prompt', async () => {
    // Arrange
    const testOrg = 'test-org-456'
    const testToken = 'env-access-token'
    process.env.SC_ACCESS_TOKEN = testToken

    orgManagerStub.orgExists.resolves(false)
    orgManagerStub.addOrg.resolves()

    // Act
    const {stdout} = await runCommand(`account:login --org=${testOrg} --no-prompt`)

    // Assert
    expect(orgManagerStub.orgExists.calledWith(testOrg)).to.be.true
    expect(orgManagerStub.addOrg.calledOnce).to.be.true
    const addOrgCall = orgManagerStub.addOrg.getCall(0).args[0] as OrgConfig
    expect(addOrgCall.orgId).to.equal(testOrg)
    expect(addOrgCall.accessToken).to.equal(testToken)
    expect(stdout).to.contain('Successfully logged in')
  })

  it('runs account:login --org=test-org --alias=production --no-prompt', async () => {
    // Arrange
    const testOrg = 'test-org-789'
    const testAlias = 'production'
    const testToken = 'test-token'
    process.env.SC_ACCESS_TOKEN = testToken

    orgManagerStub.orgExists.resolves(false)
    orgManagerStub.addOrg.resolves()

    // Act
    const {stdout} = await runCommand(`account:login --org=${testOrg} --alias=${testAlias} --no-prompt`)

    // Assert
    const addOrgCall = orgManagerStub.addOrg.getCall(0).args[0] as OrgConfig
    expect(addOrgCall.alias).to.equal(testAlias)
    expect(stdout).to.contain(`(${testAlias})`)
  })

  it('runs account:login --org=test-org --set-default --no-prompt', async () => {
    // Arrange
    const testOrg = 'test-org-default'
    const testToken = 'test-token'
    process.env.SC_ACCESS_TOKEN = testToken

    orgManagerStub.orgExists.resolves(false)
    orgManagerStub.addOrg.resolves()
    orgManagerStub.setDefaultOrg.resolves()

    // Act
    const {stdout} = await runCommand(`account:login --org=${testOrg} --set-default --no-prompt`)

    // Assert
    expect(orgManagerStub.setDefaultOrg.calledWith(testOrg)).to.be.true
    expect(stdout).to.contain('Set as default organization')
  })

  it('runs account:login with custom base-url and api-version --no-prompt', async () => {
    // Arrange
    const testOrg = 'test-org-custom'
    const testToken = 'test-token'
    const baseUrl = 'https://custom.api.solace.cloud'
    const apiVersion = 'v3'
    process.env.SC_ACCESS_TOKEN = testToken

    orgManagerStub.orgExists.resolves(false)
    orgManagerStub.addOrg.resolves()

    // Act
    await runCommand(`account:login --org=${testOrg} --base-url=${baseUrl} --api-version=${apiVersion} --no-prompt`)

    // Assert
    const addOrgCall = orgManagerStub.addOrg.getCall(0).args[0] as OrgConfig
    expect(addOrgCall.baseUrl).to.equal(baseUrl)
    expect(addOrgCall.apiVersion).to.equal(apiVersion)
  })

  it('overwrites existing org when user confirms --no-prompt', async () => {
    // Arrange
    const testOrg = 'existing-org'
    const testToken = 'new-token'
    process.env.SC_ACCESS_TOKEN = testToken

    orgManagerStub.orgExists.resolves(true)
    orgManagerStub.removeOrg.resolves()
    orgManagerStub.addOrg.resolves()

    // Stub confirmation to auto-accept
    const confirmStub = sinon.stub(AccountLogin.prototype as any, 'promptForConfirmation').resolves(true)

    // Act
    const {stdout} = await runCommand(`account:login --org=${testOrg} --no-prompt`)

    // Assert
    expect(confirmStub.calledOnce).to.be.true
    expect(orgManagerStub.removeOrg.calledWith(testOrg)).to.be.true
    expect(orgManagerStub.addOrg.calledOnce).to.be.true
    expect(stdout).to.contain('Successfully updated organization')

    // Cleanup
    confirmStub.restore()
  })

  it('cancels login when user declines overwrite', async () => {
    // Arrange
    const testOrg = 'existing-org'
    process.env.SC_ACCESS_TOKEN = 'some-token'

    orgManagerStub.orgExists.resolves(true)

    // Stub confirmation to decline
    const confirmStub = sinon.stub(AccountLogin.prototype as any, 'promptForConfirmation').resolves(false)

    // Act
    const {stdout} = await runCommand(`account:login --org=${testOrg} --no-prompt`)

    // Assert
    expect(confirmStub.calledOnce).to.be.true
    expect(orgManagerStub.removeOrg.called).to.be.false
    expect(orgManagerStub.addOrg.called).to.be.false
    expect(stdout).to.contain('Login cancelled')

    // Cleanup
    confirmStub.restore()
  })

  it('returns organization config for --json flag', async () => {
    // Arrange
    const testOrg = 'test-org-json'
    const testToken = 'test-token'
    const testAlias = 'staging'
    process.env.SC_ACCESS_TOKEN = testToken

    orgManagerStub.orgExists.resolves(false)
    orgManagerStub.addOrg.resolves()

    // Act
    const result: any = await runCommand(`account:login --org=${testOrg} --alias=${testAlias} --no-prompt --json`)

    // Assert
    expect(result.result).to.exist
    expect(result.result.orgId).to.equal(testOrg)
    expect(result.result.alias).to.equal(testAlias)
    expect(result.result.accessToken).to.equal(testToken)
  })
})
