import { Router } from 'express'
import { me, updateMe } from './user.controller';

const userRouter = Router()

userRouter.get('/', me)
userRouter.put('/', updateMe)

export default userRouter