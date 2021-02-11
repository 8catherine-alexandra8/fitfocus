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

// @desc   Fetch today's setting for current user
// @route  GET /api/todaySetting
// @access Public
const getTodaySetting = asyncHandler(async (req, res) => {
	const request_ip = req.ip
	const todaySetting = await Setting.findOne({
		date   : today,
		userIp : request_ip
	})
	if (todaySetting) {
		res.json(todaySetting)
	} else {
		res.status(404)
		throw new Error('Today setting not found')
	}
})

// @desc   Create a setting for user @ current ip
// @route  POST /api/settings
// @access Public
const createSetting = asyncHandler(async (req, res) => {
	const request_ip = req.ip
	const setting = new Setting({
		date              : today,
		userIp            : request_ip,
		focusIntvlLgth    : 25,
		focusIntvlCt      : 0,
		focusRoundCt      : 0,
		focusIntvlGoal    : 8,
		shortBrkIntvlLgth : 5,
		exerciseBrkCt     : 0,
		longBrkIntvlLgth  : 25
	})
	const createdSetting = await setting.save()
	res.status(201).json(createdSetting)
})

// @desc   Update a setting's targets
// @route  PATCH /api/settings/:id
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
// @route  PATCH /api/settings/:id
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
// @route  PATCH /api/settings/:id
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
// @route  PATCH /api/settings/:id
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
