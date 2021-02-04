import axios from 'axios'
import {
	EXERCISE_LIST_FAIL,
	EXERCISE_LIST_REQUEST,
	EXERCISE_LIST_SUCCESS
} from '../constants/exerciseConstants'

export const listExercises = () => async (dispatch) => {
	try {
		dispatch({ type: EXERCISE_LIST_REQUEST })

		const { data } = await axios.get('/api/exercises')

		dispatch({ type: EXERCISE_LIST_SUCCESS, payload: data })
	} catch (error) {
		dispatch({
			type    : EXERCISE_LIST_FAIL,
			payload :
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		})
	}
}
