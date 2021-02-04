import axios from 'axios'
import {
	SETTING_CREATE_FAIL,
	SETTING_CREATE_SUCCESS,
	SETTING_CREATE_REQUEST,
	SETTING_LIST_FAIL,
	SETTING_LIST_SUCCESS,
	SETTING_LIST_REQUEST,
	SETTING_TODAY_REQUEST,
	SETTING_TODAY_SUCCESS,
	SETTING_TODAY_FAIL,
	SETTING_DETAILS_REQUEST,
	SETTING_DETAILS_SUCCESS,
	SETTING_DETAILS_FAIL,
	SETTING_UPDATE_FOCUSCT_REQUEST,
	SETTING_UPDATE_FOCUSCT_SUCCESS,
	SETTING_UPDATE_FOCUSCT_FAIL,
	SETTING_UPDATE_TARGETS_REQUEST,
	SETTING_UPDATE_TARGETS_SUCCESS,
	SETTING_UPDATE_TARGETS_FAIL,
	SETTING_UPDATE_ROUNDCT_REQUEST,
	SETTING_UPDATE_ROUNDCT_SUCCESS,
	SETTING_UPDATE_ROUNDCT_FAIL,
	SETTING_UPDATE_EXERCISECT_REQUEST,
	SETTING_UPDATE_EXERCISECT_SUCCESS,
	SETTING_UPDATE_EXERCISECT_FAIL
} from '../constants/settingConstants'

export const listSettings = () => async (dispatch) => {
	try {
		dispatch({ type: SETTING_LIST_REQUEST })

		const { data } = await axios.get('/api/settings')

		dispatch({ type: SETTING_LIST_SUCCESS, payload: data })
	} catch (error) {
		dispatch({
			type    : SETTING_LIST_FAIL,
			payload :
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		})
	}
}

export const listTodaySetting = () => async (dispatch) => {
	try {
		dispatch({ type: SETTING_TODAY_REQUEST })

		const { data } = await axios.get('/api/settings/todaySetting')

		dispatch({ type: SETTING_TODAY_SUCCESS, payload: data })
	} catch (error) {
		dispatch({
			type    : SETTING_TODAY_FAIL,
			payload :
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		})
	}
}

export const listSettingDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: SETTING_DETAILS_REQUEST })

		const { data } = await axios.get(`/api/settings/${id}`)

		dispatch({ type: SETTING_DETAILS_SUCCESS, payload: data })
	} catch (error) {
		dispatch({
			type    : SETTING_DETAILS_FAIL,
			payload :
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		})
	}
}

export const createSetting = () => async (dispatch, getState) => {
	try {
		dispatch({ type: SETTING_CREATE_REQUEST })

		const { data } = await axios.post(`/api/settings`, {})

		dispatch({ type: SETTING_CREATE_SUCCESS, payload: data })
	} catch (error) {
		dispatch({
			type    : SETTING_CREATE_FAIL,
			payload :
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		})
	}
}

export const updateSettingTargets = (setting) => async (dispatch) => {
	try {
		dispatch({ type: SETTING_UPDATE_TARGETS_REQUEST })

		const config = {
			headers : {
				'Content-Type' : 'application/json'
			}
		}

		const { data } = await axios.patch(
			`/api/settings/${setting._id}`,
			setting,
			config
		)

		dispatch({ type: SETTING_UPDATE_TARGETS_SUCCESS, payload: data })
	} catch (error) {
		dispatch({
			type    : SETTING_UPDATE_TARGETS_FAIL,
			payload :
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		})
	}
}

export const updateSettingFocusCt = (setting) => async (dispatch) => {
	try {
		dispatch({ type: SETTING_UPDATE_FOCUSCT_REQUEST })

		const config = {
			headers : {
				'Content-Type' : 'application/json'
			}
		}

		const { data } = await axios.patch(
			`/api/settings/focus/${setting._id}`,
			setting,
			config
		)

		dispatch({ type: SETTING_UPDATE_FOCUSCT_SUCCESS, payload: data })
	} catch (error) {
		dispatch({
			type    : SETTING_UPDATE_FOCUSCT_FAIL,
			payload :
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		})
	}
}

export const updateSettingRoundCt = (setting) => async (dispatch) => {
	try {
		dispatch({ type: SETTING_UPDATE_ROUNDCT_REQUEST })

		const config = {
			headers : {
				'Content-Type' : 'application/json'
			}
		}

		const { data } = await axios.patch(
			`/api/settings/longbreak/${setting._id}`,
			setting,
			config
		)

		dispatch({ type: SETTING_UPDATE_ROUNDCT_SUCCESS, payload: data })
	} catch (error) {
		dispatch({
			type    : SETTING_UPDATE_ROUNDCT_FAIL,
			payload :
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		})
	}
}

export const updateSettingExerciseCt = (setting) => async (dispatch) => {
	try {
		dispatch({ type: SETTING_UPDATE_EXERCISECT_REQUEST })

		const config = {
			headers : {
				'Content-Type' : 'application/json'
			}
		}

		const { data } = await axios.patch(
			`/api/settings/shortbreak/${setting._id}`,
			setting,
			config
		)

		dispatch({ type: SETTING_UPDATE_EXERCISECT_SUCCESS, payload: data })
	} catch (error) {
		dispatch({
			type    : SETTING_UPDATE_EXERCISECT_FAIL,
			payload :
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		})
	}
}
