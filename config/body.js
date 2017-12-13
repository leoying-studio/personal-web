module.exports = function(data, code, state, msg) {
	this.code = code ||　200;
	this.msg = msg || "success";
	this.data = data || {};
}