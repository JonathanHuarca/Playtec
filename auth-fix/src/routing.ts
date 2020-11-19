import { Router } from 'express';
import fname from './middleware/fname'
import fn from './functions'

const router = Router()

router.post('/', fname, fn)

export default router

