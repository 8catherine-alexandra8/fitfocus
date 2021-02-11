import mongoose from 'mongoose'

const settingSchema = mongoose.Schema(
	{
		date              : {
			type : String
		},
		userIp            : {
			type : String
		},
		focusIntvlLgth    : {
			type    : Number,
			default : 25
		},
		focusIntvlCt      : {
			type : Number
		},
		focusRoundCt      : {
			type    : Number,
			default : 0
		},
		focusIntvlGoal    : {
			type : Number
		},
		shortBrkIntvlLgth : {
			type    : Number,
			default : 5
		},
		exerciseBrkCt     : {
			type : Number
		},
		longBrkIntvlLgth  : {
			type : Number
		}
	},
	{
		timestamps : true
	}
)
const Setting = mongoose.model('Setting', settingSchema)

export default Setting
