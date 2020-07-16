exports.getDate = function () {
	let curDay = new Date();
	var option = {
		weekday: 'long',
		day: 'numeric',
		month: 'short',
	};
	return curDay.toLocaleDateString('en-US', option);
};

exports.getDay = function getDay() {
	let curDay = new Date();
	var option = {
		weekday: 'long',
	};
	return curDay.toLocaleDateString('en-US', option);
};
