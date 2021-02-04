import asyncHandler from 'express-async-handler'
import Setting from '../models/settingModel.js'
const today = new Date().toLocaleDateString('en-US')

// @desc   Fetch all settings
// @route  GET /api/settings
// @access Public
const getSettings = asyncHandler(async (req, res) => {
	const settings = await Setting.find({})

	res.json(settings)
})

// @desc   Fetch single setting by id
// @route  GET /api/:id
// @access Public
const getSettingById = asyncHandler(async (req, res) => {
	const setting = await Setting.findById(req.params.id)
	if (setting) {
		res.json(setting)
	} else {
		res.status(404)
		throw new Error(`setting with _id:${req.params.id} notfound`)
	}
})

// @desc   Fetch today's setting
// @route  GET /api/todaySetting
// @access Public
const getTodaySetting = asyncHandler(async (req, res) => {
	const todaySetting = await Setting.findOne({ date: today })
	if (todaySetting) {
		res.json(todaySetting)
	} else {
		res.status(404)
		throw new Error('Today setting not found')
	}
})

// @desc   Create a setting
// @route  POST /api/settings
// @access Public
const createSetting = asyncHandler(async (req, res) => {
	const setting = new Setting({
		date              : today,
		//pause             : true,
		focusIntvlLgth    : 25,
		focusIntvlCt      : 0,
		focusRoundCt      : 0,
		focusIntvlGoal    : 8,
		shortBrkIntvlLgth : 5,
		//exerciseBrk       : true,
		exerciseBrkCt     : 0,
		longBrkIntvlLgth  : 25
	})
	const createdSetting = await setting.save()
	res.status(201).json(createdSetting)
})

// // @desc   Update a setting
// // @route  PUT /api/settings/:id
// // @access Public
// const updateSetting = asyncHandler(async (req, res) => {
// 	const {
// 		pause,
// 		focusIntvlLgth,
// 		focusIntvlCt,
// 		focusRoundCt,
// 		focusIntvlGoal,
// 		shortBrkIntvlLgth,
// 		exerciseBrk,
// 		exerciseBrkCt,
// 		longBrkIntvlLgth
// 	} = req.body
// 	const setting = await Setting.findById(req.params.id)

// 	if (setting) {
// 		if (setting) {
// 			setting.pause = pause || setting.pause
// 			setting.focusIntvlLgth = focusIntvlLgth || setting.focusIntvlLgth
// 			setting.focusIntvlCt = focusIntvlCt || setting.focusIntvlCt
// 			setting.focusRoundCt = focusRoundCt
// 			setting.focusIntvlGoal = focusIntvlGoal || setting.focusIntvlGoal
// 			setting.shortBrkIntvlLgth =
// 				shortBrkIntvlLgth || setting.shortBrkIntvlLgth
// 			setting.exerciseBrk = exerciseBrk || setting.exerciseBrk
// 			setting.exerciseBrkCt = exerciseBrkCt || setting.exerciseBrkCt
// 			setting.longBrkIntvlLgth =
// 				longBrkIntvlLgth || setting.longBrkIntvlLgth
// 		}
// 		//|| setting.focusRoundCt
// 		const updatedSetting = await setting.save()
// 		res.json(updatedSetting)
// 	} else {
// 		res.status(404)
// 		throw new Error('Setting not found')
// 	}
// })

// @desc   Update a setting's targets
// @route  PUT /api/settings/:id
// @access Public
const updateSettingTargets = asyncHandler(async (req, res) => {
	const {
		focusIntvlLgth,
		focusIntvlGoal,
		shortBrkIntvlLgth,
		longBrkIntvlLgth
	} = req.body
	const setting = await Setting.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true, runValidators: true, context: 'query' }
	)

	if (setting) {
		setting.focusIntvlLgth = focusIntvlLgth
		setting.focusIntvlGoal = focusIntvlGoal
		setting.shortBrkIntvlLgth = shortBrkIntvlLgth
		setting.longBrkIntvlLgth = longBrkIntvlLgth

		const updatedSetting = await setting.save()
		res.json(updatedSetting)
	} else {
		res.status(404)
		throw new Error('Setting not found')
	}
})

// @desc   Update focus counts
// @route  PUT /api/settings/:id
// @access Public
const updateSettingFocusCt = asyncHandler(async (req, res) => {
	const { focusIntvlCt, focusRoundCt } = req.body
	const setting = await Setting.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true, runValidators: true, context: 'query' }
	)

	if (setting) {
		setting.focusIntvlCt = focusIntvlCt
		setting.focusRoundCt = focusRoundCt

		const updatedSetting = await setting.save()
		res.json(updatedSetting)
	} else {
		res.status(404)
		throw new Error('Setting not found')
	}
})

// @desc   Update round count
// @route  PUT /api/settings/:id
// @access Public
const updateSettingRoundCt = asyncHandler(async (req, res) => {
	const { focusRoundCt } = req.body
	const setting = await Setting.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true, runValidators: true, context: 'query' }
	)

	if (setting) {
		setting.focusRoundCt = focusRoundCt

		const updatedSetting = await setting.save()
		res.json(updatedSetting)
	} else {
		res.status(404)
		throw new Error('Setting not found')
	}
})

// @desc   Update exercise count
// @route  PUT /api/settings/:id
// @access Public
const updateSettingExerciseCt = asyncHandler(async (req, res) => {
	const { exerciseBrkCt } = req.body
	const setting = await Setting.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true, runValidators: true, context: 'query' }
	)

	if (setting) {
		setting.exerciseBrkCt = exerciseBrkCt

		const updatedSetting = await setting.save()
		res.json(updatedSetting)
	} else {
		res.status(404)
		throw new Error('Setting not found')
	}
})

export {
	getSettings,
	getSettingById,
	getTodaySetting,
	createSetting,
	updateSettingFocusCt,
	updateSettingTargets,
	updateSettingRoundCt,
	updateSettingExerciseCt
}
