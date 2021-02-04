import asyncHandler from 'express-async-handler'
import Exercise from '../models/exerciseModel.js'

// @desc   Fetch all exercises
// @route  GET /api/exercises
// @access Public
const getExercises = asyncHandler(async (req, res) => {
	const exercises = await Exercise.find({})

	res.json(exercises)
})

export { getExercises }
