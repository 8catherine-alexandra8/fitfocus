const settings = [
	{
		_id          : '5f7cfdb4ca1',
		settingsDate : '1/28/2021',
		pause        : true,
		focus        : {
			intervalTime           : 15,
			// active                 : true,
			intervalCompleted      : false,
			completedIntervalCount : 0,
			completedIntervalGoal  : 4,
			roundTracker           : 1
		},
		shortBreak   : {
			intervalTime                   : 5,
			// active                         : false,
			intervalCompleted              : false,
			exerciseBreak                  : true,
			completedExerciseIntervalCount : 0
		},
		// lazyBreak    : {
		// 	// active : false
		// },
		longBreak    : {
			intervalTime      : 15,
			// active            : false,
			intervalCompleted : false
		}
	},
	{
		_id          : '5f7cfdb4ca2',
		settingsDate : '1/19/2021',
		focus        : {
			intervalTime           : 25,
			active                 : 'false',
			intervalCompleted      : 'false',
			completedIntervalCount : 0,
			completedIntervalGoal  : 0,
			roundTracker           : 0
		},
		shortBreak   : {
			intervalTime                   : 5,
			active                         : 'false',
			intervalCompleted              : 'false',
			exercise                       : 'true',
			completedExerciseIntervalCount : 0
		},
		lazyBreak    : {
			active : 'false'
		},
		longBreak    : {
			intervalTime      : 25,
			active            : 'false',
			intervalCompleted : 'false'
		}
	}
]
module.exports = settings
