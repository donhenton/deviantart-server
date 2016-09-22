function authenticationMiddleware () {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
        res.render('/', {
            title: 'Login page'
        });
  }
}

module.exports = authenticationMiddleware;