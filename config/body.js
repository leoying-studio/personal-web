module.exports = function(data, code, state, msg) {
	this.code = code ||　200;
	this.msg = msg || "成功";
	this.data = data || {};
	this.state = state || true
}