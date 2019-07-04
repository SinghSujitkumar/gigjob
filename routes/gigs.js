const express = require('express');
const router = express.Router();

const db = require('../config/database');
// get gig
const Gig = require('../models/Gig');
router.get('/', (req, res) =>
	Gig.findAll()
		.then((gigs) => {
			res.render('gigs', {
				gigs
			});
		})
		.catch((err) => console.log('Error' + err))
);
// display add gig form
router.get('/add', (req, res) => res.render('add'));

// add
router.post('/add', (req, res) => {
	const data = {
		title: 'Looking for a wordpress developer',
		technologies: 'wordpress dfsdf fd',
		budget: '$400',
		description:
			'werwrj wowej rowe rweojrw eorwqor wor woerwsantium quo expedita tempore odio cum dolor consectetur quisquam perferendis ab dolore! Distinctio incidunt mollitia dicta nisi molestias porro consectetur?',
		contact_email: 'sujit@b.com'
	};
	let { title, technologies, budget, description, contact_email } = data;
	// insert into db
	Gig.create({
		title,
		technologies,
		description,
		budget,
		contact_email
	})
		.then((gig) => res.redirect('/gigs'))
		.catch((err) => console.log(err));
});
module.exports = router;
