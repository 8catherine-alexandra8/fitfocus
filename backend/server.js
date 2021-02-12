import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import settingRoutes from './routes/settingRoutes.js'
import exerciseRoutes from './routes/exerciseRoutes.js'

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/settings', settingRoutes)
app.use('/api/exercises', exerciseRoutes)

const __dirname = path.resolve()
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/client/build')))

	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	)
} else {
	app.get('/', (req, res) => {
		res.send('API is running')
	})
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(
	PORT,
	console.log(
		`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
			.bold
	)
)
