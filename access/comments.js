import Comments from './../model/comments';

export default class{
	static list() {
		return Comments.queryPaging(conditions, params);
	}

	static add() {
		return Comments.create(model);
	}
}
