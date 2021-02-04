import express, { Router } from 'express'
const router = express.Router()
import { getExercises } from '../controllers/exerciseController.js'

router.route('/').get(getExercises)

export default router
