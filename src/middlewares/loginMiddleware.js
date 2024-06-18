export const validateUsernameOrEmail = (req, res, next) => {
  const { username, email, password } = req.body
  if (!password) return res.send({ error: 'Password is required at this endpoint' })
  if (!username && !email) return res.send({ error: 'Username or email are required at this endpoint' })
  req.body.input = username || email
  req.body.key = username ? 'username' : 'email'
  next()
}
