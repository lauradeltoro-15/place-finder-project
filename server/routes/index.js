module.exports = app => {

  // Base URLS
  app.use('/', require('./base'))
  app.use('/', require('./auth'))
}
