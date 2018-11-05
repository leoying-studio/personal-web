const Utils = {
     time: {
        get: function(date, objectification) {
            if (typeof date != "object") {
                date = new Date();
            }
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let hour = date.getHours();
            let minutes = date.getMinutes();
            let second = date.getSeconds();
            month = month < 10 ? '0' + month :　month;
            day = day < 10 ? '0' + day :day;
            if (!objectification) {
                return year + "-" + month + "-" + day + " " + hour + ":" + minutes;
            } 
            return {
                year,
                month,
                day,
                hour,
                minutes,
                second
            };
        }
     },
} 

module.exports = Utils;