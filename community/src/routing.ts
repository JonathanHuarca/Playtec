import express from 'express';
import fname from './middleware/fname'
import fn from './functions'

const router = express()

router.use('/', fname, fn)

export default router
