const express = require('express')
const dotenv = require('dotenv')
const settings = require('./data/settings')

dotenv.config()

const app = express()
const today = new Date().toLocaleDateString('en-US')

app.get('/', (req, res) => {
	res.send('API is running')
})
app.get('/api/settings', (req, res) => {
	res.json(settings)
})
app.get('/api/settings/todaySetting', (req, res) => {
	const todaySetting = settings.find((s) => s.settingsDate === today)
	res.json(todaySetting)
})
app.get('/api/settings/:id', (req, res) => {
	const setting = settings.find((s) => s._id === req.params.id)
	res.json(setting)
})
// app.get('/api/settings/:id', (req, res) => {
// 	const currentSetting = settings.find((s) => s.settingsDate === today)
// 	const currentSettingId = currentSetting._id
// 	res.json(currentSetting)
// })
const PORT = process.env.PORT || 5000
app.listen(
	PORT,
	console.log(
		`server running in ${process.env.NODE_ENV} mode on port ${PORT}`
	)
)
