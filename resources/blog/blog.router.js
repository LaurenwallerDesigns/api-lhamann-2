import { Router } from 'express'
import controllers from './blog.controller'

const blogRouter = Router()

// /api/list
blogRouter
  .route('/')
  .get(controllers.getAll)
  .post(controllers.createOne)

  blogRouter
  .route('/user')
  .get(controllers.getMany)
// /api/list/:id
blogRouter
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

export default blogRouter