const express = require('express');
const router = express.Router();

const db = require('../config/database');
// get gig
const Gig = require('../models/Gig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
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
	let { title, technologies, budget, description, contact_email } = req.body;
	let errors = [];
	if (!title) {
		errors.push({ text: 'Please add a title' });
	}
	if (!technologies) {
		errors.push({ text: 'Please add some technologies' });
	}
	if (!description) {
		errors.push({ text: 'Please add a description' });
	}
	if (!contact_email) {
		errors.push({ text: 'Please add a contact_email' });
	}
	// check for errrors
	if (errors.length > 0) {
		res.render('add', {
			errors,
			title,
			technologies,
			description,
			budget,
			contact_email
		});
	} else {
		if (!budget) {
			budget = 'Unknown';
		} else {
			budget = `$${budget}`;
		}
		technologies = technologies.toLowerCase().replace(/, /g, ',');
		Gig.create({
			title,
			technologies,
			description,
			budget,
			contact_email
		})
			.then((gig) => res.redirect('/gigs'))
			.catch((err) => console.log(err));
	}
	// insert into db
});
router.get('/search', (req, res) => {
	let { term } = req.query;
	term = term.toLowerCase();
	Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } } })
		.then((gigs) => res.render('gigs', { gigs }))
		.catch((err) => console.log(err));
});
module.exports = router;
