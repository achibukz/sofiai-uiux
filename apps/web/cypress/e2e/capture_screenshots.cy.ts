describe('Capture Screenshots for Progress Report', () => {
  beforeEach(() => {
    // Set viewport to a common desktop size
    cy.viewport(1280, 800)
  })

  const hideNav = () => {
    cy.document().then((doc) => {
      const style = doc.createElement('style')
      style.id = 'screenshot-fix'
      style.innerHTML = `
        nav { display: none !important; }
        header { position: relative !important; }
        [style*="position: sticky"], [style*="position:sticky"] { position: relative !important; top: auto !important; }
        [style*="position: fixed"], [style*="position:fixed"] { display: none !important; }
        .fixed { display: none !important; }
        .sticky { position: relative !important; top: auto !important; }
      `
      doc.head.appendChild(style)
    })
  }

  const captureCleanFullPage = (name: string) => {
    cy.scrollTo('bottom', { duration: 1500 })
    cy.wait(1000)
    cy.scrollTo('top')
    cy.wait(2000)

    cy.get('nav, [style*="position: sticky"], [style*="position:sticky"]').each(($el) => {
      cy.wrap($el).invoke('attr', 'data-original-pos', $el.css('position'))
      cy.wrap($el).invoke('css', 'position', 'static')
    })

    cy.screenshot(name, { capture: 'fullPage' })

    cy.get('[data-original-pos]').each(($el) => {
      const originalPos = $el.attr('data-original-pos')
      cy.wrap($el).invoke('css', 'position', originalPos)
    })
  }

  it('captures landing page', () => {
    cy.visit('/')
    cy.wait(1000)
    captureCleanFullPage('01-landing-page')
  })

  it('captures analyze page', () => {
    cy.visit('/analyze')
    cy.wait(1000)
    hideNav()
    cy.screenshot('02-analyze-page', { capture: 'fullPage' })
  })

  it('captures analyzing loading state', () => {
    cy.visit('/analyzing')
    cy.wait(1000)
    hideNav()
    cy.screenshot('03-analyzing-page', { capture: 'fullPage' })
  })

  it('captures sample report - overview', () => {
    cy.visit('/report/sample')
    cy.wait(2000)
    captureCleanFullPage('04-report-sample-overview')
  })

  it('captures video breakdown section', () => {
    cy.visit('/report/sample')
    cy.contains('button', 'Video Breakdown').click()
    cy.contains('Videos Analysed').scrollIntoView()
    cy.wait(1000)
    hideNav()
    cy.get('section').contains('Videos Analysed').parents('section').first()
      .screenshot('06-video-breakdown-section')
  })

  it('captures expanded video detail', () => {
    cy.visit('/report/sample')
    cy.contains('button', 'Video Breakdown').click()
    cy.wait(500)
    cy.contains('Ano ang pinaka-masarap na lutuin kapag tag-ulan?').click()
    cy.wait(2000)
    hideNav()
    captureCleanFullPage('07-video-breakdown-expanded')
  })

  it('captures sample report - different tab if applicable', () => {
    cy.visit('/report/sample')
    cy.wait(1000)
    captureCleanFullPage('05-report-sample-full')
  })
})
