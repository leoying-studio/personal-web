const emailReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
export default class Utils {
	static validateEmail(email) {
		if(email.test(email)) {
			return true;
		}
		return false;
	}

	static getTime(date, accuracy) {
		if (typeof date != "object") {
            console.error("请传入一个时间对象");
        }
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minutes = date.getMinutes();
        var second = date.getSeconds();
        if (accuracy == "day" || accuracy == "d") {
            return year + "-" + month + "-" + day;
        }
        else if (accuracy == "second" || accuracy == "s") {
            return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + second;
        }
        else {
            return year + "-" + month + "-" + day + " " + hour + ":" + minutes;
        }
	}
} 