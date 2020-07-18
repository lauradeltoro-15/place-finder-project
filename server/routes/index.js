module.exports = app => {

  // Base URLS
  app.use('/', require('./base'))
  app.use('/api', require('./auth'))
}
