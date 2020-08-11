const isAdminMiddleware = (req, res, next) => {
  if (!req.user) {
    const error = new Error(
      'You are not allowed to do this. The authorities have been notified!'
    )
    next(error)
  }
  const currentUser = req.user.dataValues
  if (currentUser && currentUser.isAdmin) {
    next()
  } else {
    const error = new Error(
      'You are not allowed to do this. The authorities have been notified!'
    )
    error.status = 401
    next(error)
  }
}

module.exports = isAdminMiddleware
