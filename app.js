/*******Const */

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
var items = ["Eat", "bath", "shower"];
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

/***********Code */
app.get('/', (req, res) => {
	var curday = new Date();
	var option = {
		weekday: 'long',
		day: 'numeric',
		month: 'short',
	};

	today = curday.toLocaleDateString('en-US', option);

	res.render('list', { kindOfDay: today, newItem: items });
});

app.post('/', (req, res) => {
	var item = req.body.todo;
	items.push(item);
	res.redirect('/');
});

//*****************Footer */
app.listen(process.env.PORT || 301, () => {
	console.log('Server working on port 301');
});
