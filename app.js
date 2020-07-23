/*******Const */

const express = require('express');
const bodyParser = require('body-parser');
//const date = require(__dirname + '/date.js');
const mongoose = require('mongoose');
const _ = require('lodash');

/********SubItems */
const app = express();
var items = ['Eat', 'bath', 'shower'];
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

//Database
mongoose.connect('mongodb://localhost:27017/todoListDB', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
//*******Item collection */
const itemSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
});

const Item = new mongoose.model('Item', itemSchema);
const Eating = new Item({
	name: 'Eating',
});
const Dance = new Item({
	name: 'Dance',
});
const Drink = new Item({
	name: 'Drink',
});
const defaultItems = [Eating, Dance, Drink];

//*******List Collection */
const listSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	items: [itemSchema],
});

const List = new mongoose.model('List', listSchema);

// Item.insertMany(defaultItems, (err) => {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log('Inserted successfully');
// 	}
// });

/***********Code */
app.get('/', (req, res) => {
	//let today = date.getDate();

	Item.find({}, (err, foundItems) => {
		if (foundItems.length === 0) {
			Item.insertMany(defaultItems, (err) => {
				if (err) {
					console.log(err);
				} else {
					console.log('Successfully added the default items');
				}
			});
			res.redirect('/');
		} else {
			res.render('list', { title: 'Today', todoItems: foundItems });
		}
	});
});

app.post('/', (req, res) => {
	const itemName = req.body.newItem;
	const listName = req.body.list;

	const newTodo = new Item({
		name: itemName,
	});

	if (listName === 'Today') {
		newTodo.save();
		res.redirect('/');
	} else {
		List.findOne({ name: listName }, (err, foundDoc) => {
			foundDoc.items.push(newTodo);
			foundDoc.save();
			res.redirect('/' + listName);
		});
	}
});

app.get('/:customListName', (req, res) => {
	const customListName = _.capitalize(req.params.customListName);
	List.findOne({ name: customListName }, (err, founditem) => {
		if (!err) {
			if (!founditem) {
				//create iteam
				const list = new List({
					name: customListName,
					items: defaultItems,
				});
				list.save();
				res.redirect('/' + customListName);
			} else {
				//show an existing list
				res.render('list', {
					title: founditem.name,
					todoItems: founditem.items,
				});
			}
		}
	});
});

app.get('/about', (req, res) => {
	res.render('about');
});

app.post('/delete', (req, res) => {
	const delItem = req.body.Checkbox;
	const listName = req.body.listName;
	if (listName === 'Today') {
		Item.findByIdAndRemove(delItem, (err) => {
			if (err) {
				console.log(err);
			} else {
				console.log('Removed successfully');
			}
			res.redirect('/');
		});
	} else {
		List.findOneAndUpdate(
			{ name: listName },
			{ $pull: { items: { _id: delItem } } },
			(err, foundList) => {
				if (!err) {
					res.redirect('/' + listName);
				}
			}
		);
	}
});

//*****************Footer */
app.listen(process.env.PORT || 301, () => {
	console.log('Server working on port 301');
});
