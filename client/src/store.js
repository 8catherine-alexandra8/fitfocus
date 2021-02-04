import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
	settingCreateReducer,
	settingDetailsReducer,
	settingListReducer,
	settingTodayReducer,
	settingUpdateExerciseCtReducer,
	settingUpdateFocusCtReducer,
	settingUpdateRoundCtReducer,
	settingUpdateTargetsReducer
} from './reducers/settingReducers'
import { exerciseListReducer } from './reducers/exerciseReducers'

const reducer = combineReducers({
	settingList             : settingListReducer,
	settingToday            : settingTodayReducer,
	settingDetails          : settingDetailsReducer,
	settingCreate           : settingCreateReducer,
	settingUpdateTargets    : settingUpdateTargetsReducer,
	settingUpdateFocusCt    : settingUpdateFocusCtReducer,
	settingUpdateRoundCt    : settingUpdateRoundCtReducer,
	settingUpdateExerciseCt : settingUpdateExerciseCtReducer,
	exerciseList            : exerciseListReducer
})

const initialState = {}

const middleware = [ thunk ]

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
