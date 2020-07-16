/*******Const */

const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

/********SubItems */
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');



//***********List */
var homeItems = ['Eat', 'bath', 'shower'];
var workList = [];



/***********Code */
app.get('/', (req, res) => {
	let today = date.getDate();

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
