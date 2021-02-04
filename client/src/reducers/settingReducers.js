import {
	SETTING_LIST_SUCCESS,
	SETTING_LIST_REQUEST,
	SETTING_LIST_FAIL,
	SETTING_TODAY_REQUEST,
	SETTING_TODAY_SUCCESS,
	SETTING_TODAY_FAIL,
	SETTING_DETAILS_SUCCESS,
	SETTING_DETAILS_REQUEST,
	SETTING_DETAILS_FAIL,
	SETTING_CREATE_REQUEST,
	SETTING_CREATE_SUCCESS,
	SETTING_CREATE_FAIL,
	SETTING_CREATE_RESET,
	SETTING_UPDATE_TARGETS_REQUEST,
	SETTING_UPDATE_TARGETS_SUCCESS,
	SETTING_UPDATE_TARGETS_FAIL,
	SETTING_UPDATE_TARGETS_RESET,
	SETTING_UPDATE_FOCUSCT_REQUEST,
	SETTING_UPDATE_FOCUSCT_SUCCESS,
	SETTING_UPDATE_FOCUSCT_FAIL,
	SETTING_UPDATE_FOCUSCT_RESET,
	SETTING_UPDATE_ROUNDCT_REQUEST,
	SETTING_UPDATE_ROUNDCT_SUCCESS,
	SETTING_UPDATE_ROUNDCT_FAIL,
	SETTING_UPDATE_ROUNDCT_RESET,
	SETTING_UPDATE_EXERCISECT_REQUEST,
	SETTING_UPDATE_EXERCISECT_SUCCESS,
	SETTING_UPDATE_EXERCISECT_FAIL,
	SETTING_UPDATE_EXERCISECT_RESET
} from '../constants/settingConstants'

export const settingListReducer = (state = { settings: [] }, action) => {
	switch (action.type) {
		case SETTING_LIST_REQUEST:
			return { loading: true, settings: [] }
		case SETTING_LIST_SUCCESS:
			return { loading: false, settings: action.payload }
		case SETTING_LIST_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const settingTodayReducer = (state = { setting: {} }, action) => {
	switch (action.type) {
		case SETTING_TODAY_REQUEST:
			return { loading: true, ...state }
		case SETTING_TODAY_SUCCESS:
			return { loading: false, setting: action.payload }
		case SETTING_TODAY_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const settingDetailsReducer = (state = { setting: {} }, action) => {
	switch (action.type) {
		case SETTING_DETAILS_REQUEST:
			return { loading: true, ...state }
		case SETTING_DETAILS_SUCCESS:
			return { loading: false, success: true, setting: action.payload }
		case SETTING_DETAILS_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}
export const settingUpdateTargetsReducer = (
	state = { setting: {} },
	action
) => {
	switch (action.type) {
		case SETTING_UPDATE_TARGETS_REQUEST:
			return { loading: true }
		case SETTING_UPDATE_TARGETS_SUCCESS:
			return { loading: false, success: true, setting: action.payload }
		case SETTING_UPDATE_TARGETS_FAIL:
			return { loading: false, error: action.payload }
		case SETTING_UPDATE_TARGETS_RESET:
			return { setting: {} }
		default:
			return state
	}
}

export const settingCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case SETTING_CREATE_REQUEST:
			return { loading: true }
		case SETTING_CREATE_SUCCESS:
			return { loading: false, success: true, setting: action.payload }
		case SETTING_CREATE_FAIL:
			return { loading: false, error: action.payload }
		case SETTING_CREATE_RESET:
			return {}
		default:
			return state
	}
}

export const settingUpdateFocusCtReducer = (
	state = { setting: {} },
	action
) => {
	switch (action.type) {
		case SETTING_UPDATE_FOCUSCT_REQUEST:
			return { loading: true }
		case SETTING_UPDATE_FOCUSCT_SUCCESS:
			return { loading: false, success: true, setting: action.payload }
		case SETTING_UPDATE_FOCUSCT_FAIL:
			return { loading: false, error: action.payload }
		case SETTING_UPDATE_FOCUSCT_RESET:
			return { setting: {} }
		default:
			return state
	}
}

export const settingUpdateRoundCtReducer = (
	state = { setting: {} },
	action
) => {
	switch (action.type) {
		case SETTING_UPDATE_ROUNDCT_REQUEST:
			return { loading: true }
		case SETTING_UPDATE_ROUNDCT_SUCCESS:
			return { loading: false, success: true, setting: action.payload }
		case SETTING_UPDATE_ROUNDCT_FAIL:
			return { loading: false, error: action.payload }
		case SETTING_UPDATE_ROUNDCT_RESET:
			return { setting: {} }
		default:
			return state
	}
}

export const settingUpdateExerciseCtReducer = (
	state = { setting: {} },
	action
) => {
	switch (action.type) {
		case SETTING_UPDATE_EXERCISECT_REQUEST:
			return { loading: true }
		case SETTING_UPDATE_EXERCISECT_SUCCESS:
			return { loading: false, success: true, setting: action.payload }
		case SETTING_UPDATE_EXERCISECT_FAIL:
			return { loading: false, error: action.payload }
		case SETTING_UPDATE_EXERCISECT_RESET:
			return { setting: {} }
		default:
			return state
	}
}
