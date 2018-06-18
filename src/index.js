import _ from 'loadsh';
import Express from 'express';
let app = Express();

function useApp() {
	let n = _.join([
		'hello', 'world'
	]);
	return n;
}

function exp() {
	app.use(() => {
		console.log('hello world');
	});
}

useApp();
exp();