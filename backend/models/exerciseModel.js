import mongoose from 'mongoose'

const exerciseSchema = mongoose.Schema(
	{
		name        : { type: String, required: true, unique: true },
		description : [ String ]
	},
	{
		timestamps : true
	}
)

const Exercise = mongoose.model('Exercise', exerciseSchema)

export default Exercise
