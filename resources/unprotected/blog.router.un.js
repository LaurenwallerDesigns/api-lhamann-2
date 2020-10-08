import { Router } from 'express'
import controllers from './blog.controller.un'

const blogRouterUn = Router()

// /api/list
blogRouterUn
  .route('/')
  .get(controllers.getMany)

// /api/list/:id
blogRouterUn
  .route('/:id')
  .get(controllers.getOne)


export default blogRouterUn