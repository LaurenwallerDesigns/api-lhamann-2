import 'dotenv/config';
import express from 'express'
import { json, urlencoded } from 'body-parser'
import config from './utils/config'
import cors from 'cors'
import {connect}  from './utils/db'
import userRouter from './resources/user/user.router';
import blogRouter from './resources/blog/blog.router';
import blogRouterUn from './resources/unprotected/blog.router.un';
import { signup, signin, protect } from './auth'

export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use('/blog', blogRouterUn)
app.post('/signup', signup)
app.post('/signin', signin)
app.use('/api', protect)
app.use('/api/user', userRouter)
app.use('/api/blog', blogRouter)

export const start = async () => {
  try {
    await connect()
    app.listen(config.serverPort, () => {
      console.log(`REST API on http://localhost:${config.serverPort}/`)
    })
  } catch (e) {
    console.error(e)
  }
}
