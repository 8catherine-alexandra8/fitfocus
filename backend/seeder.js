import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import settings from './data/settings.js'
import exercises from './data/exercises.js'
import Setting from './models/settingModel.js'
import Exercise from './models/exerciseModel.js'
import connectDB from './config/db.js'

dotenv.config()
connectDB()

const importData = async () => {
	try {
		await Setting.deleteMany()
		await Exercise.deleteMany()

		const createdExercises = await Exercise.insertMany(exercises)
		const createdSettings = await Setting.insertMany(settings)

		console.log('Data imported!'.green.inverse)
		process.exit()
	} catch (error) {
		console.error(`${error}`.red.inverse)
		process.exit(1)
	}
}

const destroyData = async () => {
	try {
		await Setting.deleteMany()
		await Exercise.deleteMany()

		console.log('Data destroyed!'.red.inverse)
		process.exit()
	} catch (error) {
		console.error(`${error}`.red.inverse)
		process.exit(1)
	}
}

if (process.argv[2] === '-d') {
	destroyData()
} else {
	importData()
}
