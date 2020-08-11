function isAdminMiddleware(req, res, next) {
  const currentUser = req.session.user
  if (currentUser && currentUser.isAdmin) {
    next()
  } else {
    const error = new Error(
      'You are not allowed to do this. The authorities have been notified.'
    )
    error.status = 401
    next(error)
  }
}

module.exports = isAdminMiddleware
