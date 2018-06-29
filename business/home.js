import Articles from './../access/articles';
import Categories from './../access/categories';
import Intros from './../access/intros';
import intros from './../access/intros';
export default class {
	 getAll(req, res, next) {
		 Promise.all([
			 Articles.timeline(),
			 intros.list(),
		 ]).then((res) => {
			 next(res);
		 });
	 }

	 
}	