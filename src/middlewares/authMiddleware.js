import jwt from 'jsonwebtoken'
export const authMiddleware = (req, res, next) => {
  const token = req.cookies.access_token
  const tokenData = jwt.decode(token)
  if (!tokenData.userId || !tokenData.username || !tokenData.name || !tokenData.lastName) return res.status(401).send({ error: 'Unexpected error ocurred' })
  req.data = tokenData
  next()
}
