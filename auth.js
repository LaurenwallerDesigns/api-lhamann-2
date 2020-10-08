import config from './utils/config'
import { User } from './resources/user/user.model';
import jwt from 'jsonwebtoken'
const EXPIRES_IN_MINUTES = '14m'

export const newToken = user => {
  return jwt.sign({ id: user.id }, config.JWTSecret, {
    expiresIn: EXPIRES_IN_MINUTES
  })
}

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.JWTSecret, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

export const signup = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'Email and Password required' })
  }
  try {
    const user = await User.create(req.body)
    const token = newToken(user)
    return res.status(201).send({ token, user})
  } catch (e) {
    console.error(e)
    return res.status(400).end()
  }
}

export const signin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'Email and Password required' })
  }

  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return res.status(401).send({ message: 'not auth' })
  }
  try {
    const match =await user.checkPassword(req.body.password)
    if (!match) {
      return res.status(401).send({ message: 'not auth' })
    }
    const token = newToken(user)
    return res.status(201).send({ token })
  } catch (e) {
    console.error(e)
    return res.status(400).send({ message: 'not auth' })
  }
}

export const protect = async (req, res, next) => {
  if ( !req.headers.authorization){
    return res.status(401).end()
  }
  let token = req.headers.authorization.split('Bearer ')[1]
  if ( !token ) {
    return res.status(401).end()
  }

  try {
    const payload = await verifyToken(token)
    const user = await User.findById(payload.id)
    .select('-password')
    .lean()
    .exec()
    req.user = user
    next()
  } catch(e) {
    console.error(e)
    return res.status(401).end()
  }
}