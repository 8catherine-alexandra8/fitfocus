import express from 'express'
const router = express.Router()
import {
	getSettings,
	getTodaySetting,
	getSettingById,
	updateSettingFocusCt,
	createSetting,
	updateSettingTargets,
	updateSettingRoundCt,
	updateSettingExerciseCt
} from '../controllers/settingController.js'

router.route('/').get(getSettings).post(createSetting)
router.route('/todaySetting').get(getTodaySetting)
router.route('/focus/:id').patch(updateSettingFocusCt)
router.route('/longbreak/:id').patch(updateSettingRoundCt)
router.route('/shortbreak/:id').patch(updateSettingExerciseCt)
router.route('/:id').get(getSettingById).patch(updateSettingTargets)

export default router
