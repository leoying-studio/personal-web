var Utils = {
     time: {
        get: function(date, accuracy) {
            if (typeof date != "object") {
                date = new Date();
            }
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hour = date.getHours();
            var minutes = date.getMinutes();
            var second = date.getSeconds();
            month = month < 10 ? '0' + month :　month;
            day = day < 10 ? '0' + day :day;
            if (accuracy == "day" || accuracy == "d") {
                return year + "-" + month + "-" + day;
            }
            else if (accuracy == "second" || accuracy == "s") {
                return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + second;
            }
            else {
                return year + "-" + month + "-" + day + " " + hour + ":" + minutes;
            }
        },
        difference: function()　{
            return Date.now() + 8 * 3600;
        }
     },
} 

module.exports = Utils;