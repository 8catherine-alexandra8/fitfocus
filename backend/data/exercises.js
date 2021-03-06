const exercises = [
	{
		name        : 'Inchworm',
		description : [
			'Stand up tall with legs straight, making sure your knees aren’t locked.',
			'Slowly lower torso toward the floor, then walk hands forward.',
			'Once in a push-up position, start taking tiny steps so feet meet hands.',
			'Continue bugging out for as long as you can.'
		]
	},
	{
		name        : 'Tuck Jump',
		description : [
			'Stand with your knees slightly bent, then jump up as high as possible — pretend Jeremy Lin is watching!',
			'Bring knees in toward chest while extending arms straight out.',
			'Land with knees slightly bent and quickly jump (on it) again!'
		]
	},
	{
		name        : 'Bear Crawl',
		description : [
			'Embrace that inner grizzly.',
			'Starting on hands and knees, rise up onto your toes, tighten your core, and slowly reach forward with right arm and right knee, followed by the left side.',
			`Continue the crawl for until you just can't even(or until you scare your roommates off).`
		]
	},
	{
		name        : 'Mountain Climber',
		description : [
			'Start on your hands and knees.',
			'Bring left foot forward, directly under chest, while straightening right leg.',
			'Keeping hands on the floor and core tight, jump and switch legs.',
			'Your left leg should now be extended behind you, with your right knee forward.',
			'Next up? Everest.'
		]
	},
	{
		name        : 'Prone Walkout',
		description : [
			'Start on all fours with your core engaged.',
			'Slowly walk hands forward, staying on toes but not moving them forward.',
			'Next, gradually walk hands backward to the starting position, maintaining stability and balance.'
		]
	},
	{
		name        : 'Burpee',
		description : [
			'One of the most effective full-body exercises around, this one starts in a low squat position with your hands on the floor.',
			'Next, kick your feet back to a push-up position.',
			'Complete one push-up, then immediately return your feet to the squat position.',
			'Leap up as high as possible before squatting and moving back into the push-up portion of the show.'
		]
	},
	{
		name        : 'Plank',
		description : [
			'Nope, we’re (thankfully) not walking the plank.',
			'Lie facedown with forearms on the floor and hands clasped.',
			'Extend legs behind you and rise up on toes.',
			'Keeping back straight, tighten core and hold the position for as long as you can.'
		]
	},
	{
		name        : 'Plank to Push-Up',
		description : [
			'Start in a plank position.',
			'Place one hand at a time on the floor to lift up into a push-up position, with your back straight and core engaged.',
			'Move one arm at a time back into the plank position (forearms on the floor).',
			'Repeat, alternating the arm that makes the first move.'
		]
	},
	{
		name        : 'Wall Sit',
		description : [
			'Slowly slide your back down a wall until your thighs are parallel to the floor.',
			'Make sure knees are directly above ankles and keep back straight.',
			'Go for 60 seconds per set (or however long it takes to turn those legs to jelly).'
		]
	},
	{
		name        : 'Lunge',
		description : [
			'Stand with hands on hips and feet hip-width apart.',
			'Step your right leg forward and slowly lower your body until left (back) knee is close to or touching the floor and bent at least 90 degrees.',
			'Return to the starting position and repeat on the other side.',
			'For a variation, try stepping backward into the lunge.'
		]
	},
	{
		name        : 'Clock Lunge',
		description : [
			'Time for a challenge.',
			'Complete a traditional forward lunge, then take a big step to the right and lunge again.',
			'Finish off the semicircle with a backward lunge, then return to standing.',
			'And all that’s 1 rep! Aim for 10 reps, then switch legs.'
		]
	},
	{
		name        : 'Lunge to Row',
		description : [
			'Start by doing a normal lunge.',
			'Instead of bringing that forward leg back to the starting position, raise it off the floor while lifting your arms overhead.',
			'The leg should remain bent at about 90 degrees.',
			'Add weights to really bring the heat.'
		]
	},
	{
		name        : 'Pistol Squat',
		description : [
			'There may be no gun permit necessary for this one, but it’s still no joke.',
			'Stand holding your arms straight out in front of your body.',
			'Raise right leg, flexing right ankle and pushing hips back.',
			'Lower your body while keeping right leg raised.',
			'Hold (have fun with that), then return to standing.'
		]
	},
	{
		name        : 'Lunge Jump',
		description : [
			'Ready to impress some friends?',
			'Stand with feet together and lunge forward with right foot.',
			'Jump straight up, propelling arms forward while keeping elbows bent.',
			'While in the air, switch legs and land in a lunge with the opposite leg forward.',
			'Repeat and continue switching legs.'
		]
	},
	{
		name        : 'Curtsy Lunge',
		description : [
			'Let’s show a little respect.',
			'When lunging, step left leg back behind right leg, bending knees and lowering hips until right thigh is almost parallel to the floor.',
			'Remember to keep your torso upright and your hips square.'
		]
	},
	{
		name        : 'Squat',
		description : [
			'Stand with feet parallel or turned out 15 degrees — whatever is most comfortable.',
			'Slowly start to crouch by bending hips and knees until thighs are at least parallel to the floor.',
			'Make sure your heels do not rise off the floor.',
			'Press through your heels to return to a standing position.'
		]
	},
	{
		name        : 'Single-Leg Deadlift',
		description : [
			'Start in a standing position with feet together.',
			'Lift right leg slightly.',
			'Lower arms and torso while raising right leg behind you.',
			'Keep left knee slightly bent and reach arms as close to the floor as possible.',
			'Raise torso while lowering right leg.',
			'Switch legs.'
		]
	},
	{
		name        : 'Squat Reach and Jump',
		description : [
			'Ready to add some pizzazz (and cardio!) to that squat?',
			'Perform a normal squat, but immediately jump up, reaching your arms straight overhead.',
			'Aim for 15 reps, then take a quick breather before the next set.'
		]
	},
	{
		name        : 'Chair Pose Squat',
		description : [
			'Stand with feet hip-width apart and squat until thighs are parallel to the floor while swinging arms up.',
			'Straighten legs, then lift right knee while swinging left arm outside right knee.',
			'Return to standing and repeat on the other side.'
		]
	},
	{
		name        : 'Quadruped Leg Lift',
		description : [
			'Start on hands and knees, with back flat and core engaged.',
			'Raise left leg straight back, stopping when foot is at hip level and thigh is parallel to the floor.',
			'Balance for as long as possible, then raise your bottom right toe off the floor, tightening butt, back, and abs — try to be graceful here!',
			'Hold for up to 10 seconds, then switch legs.'
		]
	},
	{
		name        : 'Calf Raise',
		description : [
			'From a standing position, slowly rise up on your toes, keeping knees straight and heels off the floor.',
			'Hold briefly, then come back down. Aaaand repeat.',
			'Try standing on something elevated (like a step) to achieve a wider range of motion.'
		]
	},
	{
		name        : 'Standard Push-Up',
		description : [
			'There’s a reason this one’s a classic.',
			'With hands shoulder-width apart, keep feet flexed at hip distance and tighten your core.',
			'Bend elbows until chest reaches the floor, then push back up.',
			'Make sure to keep your elbows tucked close to your body.',
			'That’s one!'
		]
	},
	{
		name        : 'Dolphin Push-Up',
		description : [
			'Start out in Dolphin Pose (think Downward-Facing Dog Pose with elbows on the floor).',
			'Lean forward, lowering shoulders until head is over hands.',
			'Push up with your arms and return to the starting position.',
			'No ocean necessary.'
		]
	},
	{
		name        : 'Contralateral Limb Raise',
		description : [
			'Sounds fancy, huh?',
			'Here’s the breakdown: Lie facedown with arms outstretched and palms facing each other.',
			'Slowly lift one arm a few inches off the floor, keeping it straight without rotating your shoulders and keeping head and torso still.',
			'Hold the position, then lower your arm back down.',
			'Repeat on the other side.',
			'For an extra challenge, lift the opposite leg a few inches off the floor at the same time.'
		]
	},
	{
		name        : 'Donkey Kick',
		description : [
			'It’s time to embrace that wild side.',
			'Start in a push-up position with your legs together.',
			'Tighten core and kick both legs into the air with knees bent, reaching feet back toward glutes.',
			'Try to land gently when returning to the starting position.'
		]
	},
	{
		name        : 'Handstand Push-Up',
		description : [
			'Fair warning: This move is for the pros. Get set in a handstand position against a wall.',
			'Bend your elbows at a 90-degree angle, doing an upside-down push-up so your head moves toward the floor and your legs remain against the wall.',
			'First-timer? Grab a friend to spot you — safety first!'
		]
	},
	{
		name        : 'Judo Push-Up',
		description : [
			'From a push-up position, raise those hips and in one swift movement — hai-yah! — use your arms to lower the front of your body until your chin comes close to the floor.',
			'Swoop head and shoulders upward and lower hips, keeping knees off the floor.',
			'Reverse the move to come back to the raised-hip position.'
		]
	},
	{
		name        : 'Superman',
		description : [
			'Want some superpowers?',
			'Lie facedown with arms and legs extended.',
			'Keeping the torso as still as possible, simultaneously raise your arms and legs to form a small curve in your body.',
			'Cape optional.'
		]
	},
	{
		name        : 'Triceps Dip',
		description : [
			'Sit on the floor near a step or bench, with knees slightly bent.',
			'Grab the edge of the elevated surface and straighten your arms.',
			'Bend your arms to a 90-degree angle and straighten again while your heels push into the floor.',
			'For some extra fire, reach right arm out while lifting left leg.'
		]
	},
	{
		name        : 'Diamond Push-Up',
		description : [
			'Rhianna would approve of this one!',
			'Get into a push-up position with diamond-shaped hands, so that your thumbs and index fingers touch.',
			'Then do push-ups!',
			'This hand position will give those triceps some extra (burning) love.'
		]
	},
	{
		name        : 'Boxer',
		description : [
			'Time to make Muhammad Ali proud.',
			'Stand with feet hip-width apart and knees bent.',
			'Bend forward until your torso is almost parallel to the floor.',
			'Keep your elbows in and extend one arm forward and the other arm back.',
			'Hug your arms back in and switch arms like you’re in the ring!'
		]
	},
	{
		name        : 'Shoulder Stabilization I-Y-T-W-O',
		description : [
			'OK, it may look ridiculous, but stay with us.',
			'Lie facedown with arms extended overhead and palms facing each other.',
			'Move your arms into each letter formation.',
			'Gimme a Y — you know you want to!'
		]
	},
	{
		name        : 'Arm Circles',
		description : [
			'Remember PE class?',
			'Stand with arms extended by your sides, perpendicular to your torso.',
			'Slowly make clockwise circles about 1 foot in diameter for 20 to 30 seconds.',
			'Then reverse the movement, going counterclockwise.'
		]
	},
	{
		name        : 'L Seat',
		description : [
			'Take a load off (well, not exactly).',
			'Sit with legs extended and feet flexed.',
			'Place your hands on the floor and slightly round your torso.',
			'Lift your hips off the floor, hold for 5 seconds, and release.',
			'Repeat!'
		]
	},
	{
		name        : 'Rotational Push-Up',
		description : [
			'Standard push-ups not cutting it?',
			'For a variation, after coming back up into a starting push-up position, rotate your body to the right and extend your right hand overhead, forming a T with your arms and torso.',
			'Return to the starting position, do a regular push-up, and then rotate to the left.'
		]
	},
	{
		name        : 'Flutter Kick',
		description : [
			'Lie faceup with arms at your sides and palms facing down.',
			'With legs extended, lift your heels about 6 inches off the floor.',
			'Make quick, small up-and-down pulses with your legs while keeping your core engaged.',
			'Keep kickin’ it for a minute straight!'
		]
	},
	{
		name        : 'Dynamic Prone Plank',
		description : [
			'Starting in a standard plank position, raise your hips as high as they can go, then lower them back down.',
			'Continue this movement for as long as possible.',
			'Make sure your back stays straight and your hips don’t droop.'
		]
	},
	{
		name        : 'Side Plank',
		description : [
			'Lie faceup and roll to the side.',
			'Come up onto one foot and elbow. Make sure your hips are lifted and your core is engaged.',
			'Hang tight for 30 to 60 seconds — or as long as you can stomach!'
		]
	},
	{
		name        : 'Russian Twist',
		description : [
			'Sit on the floor with knees bent and feet together, lifted a few inches off the floor.',
			'With your back at a 45-degree angle to the floor, move your arms from side to side in a twisting motion.',
			'Here, slow and steady wins the race: The slower the twist, the deeper the burn.',
			'Feel like a fitness czar yet?'
		]
	},
	{
		name        : 'Bicycle',
		description : [
			'Lie faceup with knees bent and hands behind your head.',
			'Bring knees in toward chest.',
			'Bring right elbow toward left knee as right leg straightens.',
			'Continue alternating sides like you’re pedaling a bike.',
			'Just keep the helmet in the closet.'
		]
	},
	{
		name        : 'Crunch',
		description : [
			'Before anyone’s crowned Cap’n Crunch, remember: Form is key.',
			'Lie faceup with knees bent and feet flat on the floor.',
			'With hands behind head, lower your chin slightly.',
			'Peel head and shoulders off the floor while engaging your core.',
			'Continue curling up until your upper back is off the mat.',
			'Hold briefly, then slowly lower torso back toward the floor.'
		]
	},
	{
		name        : 'Segmental Rotation',
		description : [
			'Let’s target those obliques!',
			'Lying faceup with your knees bent and core tight, let your knees fall gradually to the left until you feel a good stretch.',
			'Hold for 5 seconds, return to center, and repeat on the right.'
		]
	},
	{
		name        : 'Shoulder Bridge',
		description : [
			'Lie faceup with knees bent and feet hip-width apart.',
			'Place arms at your sides and lift your spine and hips.',
			'Only your head, feet, arms, and shoulders should be on the floor.',
			'Lift one leg, keeping your core tight.',
			'Slowly bring leg back down, then lift back up.',
			'Try to do 10 reps per leg, then lower your spine back onto the floor.'
		]
	},
	{
		name        : 'Single Leg Ab Press',
		description : [
			'Lie faceup with knees bent and feet flat on the floor.',
			'Tighten abs and raise right leg, with knee bent at a 90-degree angle.',
			'Push right hand on top of lifted knee, using core to create pressure between hand and knee.',
			'Hold for 5 seconds, then lower back down.',
			'Repeat with left hand and knee.'
		]
	},
	{
		name        : 'Double Leg Ab Press',
		description : [
			'Lie faceup with knees bent and feet flat on the floor.',
			'Tighten abs and raise both legs, with knees bent at a 90-degree angle.',
			'Push hands on top of lifted knees, using core to create pressure between each hand and knee.',
			'Hold for 5 seconds, then lower back down.',
			'Repeat.'
		]
	},
	{
		name        : 'Sprinter Situp',
		description : [
			'Want to be a speed demon without getting off the floor?',
			'Lie faceup with legs straight and arms by your sides, elbows bent at a 90-degree angle.',
			'Now, sit up and bring left knee toward right elbow.',
			'Return to the starting position. Repeat on the other side.'
		]
	},
	{
		name        : 'Single Leg Balance',
		description : [
			'Start standing with hands on hips.',
			'Shift weight to left leg and bring right knee up so hip, knee, and ankle form 90-degree angles.',
			'Hold this position for 30 to 60 seconds, then repeat on other leg.'
		]
	},
	{
		name        : 'Bird Dog',
		description : [
			'Start on all fours, knees under hips and shoulders over wrists.',
			'Keeping back flat, extend right arm and left leg straight out.',
			'Draw right elbow and left knee toward each other, hovering just above the floor.',
			'Repeat for 10 to 15 reps.',
			'Then switch sides.'
		]
	},
	{
		name        : 'Windshield Wiper',
		description : [
			'Lie faceup on the mat with arms straight out so body forms a “T” and extend legs straight up toward ceiling.',
			'Keep your abs braced and lower your legs to the right as far as you can without lifting your shoulders off the floor.',
			'Swing legs to the left and lower as far as possible without lifting shoulders.',
			'Continue alternating from side to side with control.'
		]
	},
	{
		name        : 'Groiners',
		description : [
			'Start in a pushup position.',
			`Jump feet forward so they land next to your hands and you're in a low frog squat position.`,
			'Jump feet back to push up position.',
			'Repeat, keeping core and low back engaged throughout all movements.'
		]
	},
	{
		name        : 'Skater Hops',
		description : [
			'Starting at the left of your space, squat slightly then jump to the right as far as you can.',
			'Land on your right foot and try not to touch your left foot down.',
			'Jump back across to land on your left foot.'
		]
	}
]
export default exercises
