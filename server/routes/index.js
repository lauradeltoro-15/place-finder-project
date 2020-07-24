module.exports = app => {

  // Base URLS
  app.use('/', require('./base'))
  app.use('/api', require('./auth'))
  app.use('/api/user', require('./user'))
  app.use('/api/local', require('./local'))
  app.use('/api/offer', require('./offer'))
  app.use('/api/files', require('./files'))
  app.use((req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  })
}

