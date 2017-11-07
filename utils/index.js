const emailReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
export default class Utils {
	static validateEmail(email) {
		if(email.test(email)) {
			return true;
		}
		return false;
	}
} 