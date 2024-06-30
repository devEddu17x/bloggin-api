import jwt from 'jsonwebtoken'
export const authMiddleware = (req, res, next) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).send({ error: 'You must be logged in our app' })
  const tokenData = jwt.decode(token)
  if (!tokenData.userId || !tokenData.username || !tokenData.name || !tokenData.lastName) return res.status(401).send({ error: 'Unexpected error ocurred' })
  req.data = tokenData
  next()
}
