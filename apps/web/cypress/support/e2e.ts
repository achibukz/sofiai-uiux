import './commands'

Cypress.on('uncaught:exception', (_err, _runnable) => {
  // Prevent Cypress from failing on unhandled promise rejections from Next.js router
  return false
})
