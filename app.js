/*******Const */

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

var homeItems = ['Eat', 'bath', 'shower'];
var workList = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

/***********Code */
app.get('/', (req, res) => {
	var curDay = new Date();
	var option = {
		weekday: 'long',
		day: 'numeric',
		month: 'short',
	};

	today = curDay.toLocaleDateString('en-US', option);

	res.render('list', { title: today, newItem: homeItems });
});

app.post('/', (req, res) => {
	let item = req.body.todo;
	let value1 = req.body.list;

	if (value1 === 'Work') {
		workList.push(item);
		res.redirect('/work');
	} else {
		homeItems.push(item);
		res.redirect('/');
	}
});

app.get('/work', (req, res) => {
	res.render('list', { title: 'Work', newItem: workList });
});
app.get('/about', (req, res) => {
	res.render('about');
});

//*****************Footer */
app.listen(process.env.PORT || 301, () => {
	console.log('Server working on port 301');
});
