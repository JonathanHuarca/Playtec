import { Router } from 'express';
import home from './resources/home/home.controller'


const router = Router()

router
  .route('/')
  .get(home)

export default router
