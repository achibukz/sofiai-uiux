describe('Capture Screenshots for Progress Report', () => {
  beforeEach(() => {
    // Set viewport to a common desktop size
    cy.viewport(1280, 800)
  })

  it('captures landing page', () => {
    cy.visit('/')
    cy.wait(1000) // Allow for animations/loading
    cy.screenshot('01-landing-page', { capture: 'fullPage' })
  })

  it('captures analyze page', () => {
    cy.visit('/analyze')
    cy.wait(1000)
    cy.screenshot('02-analyze-page', { capture: 'fullPage' })
  })

  it('captures analyzing loading state', () => {
    cy.visit('/analyzing')
    cy.wait(1000)
    cy.screenshot('03-analyzing-page', { capture: 'fullPage' })
  })

  it('captures sample report - overview', () => {
    cy.visit('/report/sample')
    cy.wait(2000)
    cy.screenshot('04-report-sample-overview', { capture: 'fullPage' })
  })

  it('captures video breakdown section', () => {
    cy.visit('/report/sample')
    cy.contains('button', 'Video Breakdown').click()
    cy.contains('Videos Analysed').scrollIntoView()
    cy.wait(1000)
    // Target the specific section for a cleaner shot
    cy.get('section').contains('Videos Analysed').parents('section').first()
      .screenshot('06-video-breakdown-section')
  })

  it('captures expanded video detail', () => {
    cy.visit('/report/sample')
    cy.contains('button', 'Video Breakdown').click()
    cy.wait(500)
    // Click the first video row
    cy.contains('Ano ang pinaka-masarap na lutuin kapag tag-ulan?').click()
    cy.wait(2000) // Wait longer for expansion animation and content

    // Capture the full page to ensure nothing is cut off and context is preserved
    cy.screenshot('07-video-breakdown-expanded', { capture: 'fullPage' })
  })

  it('captures sample report - different tab if applicable', () => {
    cy.visit('/report/sample')
    cy.wait(1000)
    cy.screenshot('05-report-sample-full', { capture: 'fullPage' })
  })
})
