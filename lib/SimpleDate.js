/**
 * Created by Ben on 7/17/2015.
 */
function SimpleDate(){
    this._monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this._monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    var tempDate = new Date();
    this.setYear(tempDate.getFullYear());
    this.setMonth(tempDate.getMonth());
    this.setDate(tempDate.getDate());

    if(arguments[0] != null) {
        if (arguments[0] instanceof Date) {
            tempDate = arguments[0];

            this.setYear(tempDate.getFullYear());
            this.setMonth(tempDate.getMonth());
            this.setDate(tempDate.getDate());
        } else if(arguments[0] instanceof SimpleDate) {
            this.setYear(arguments[0].getYear());
            this.setMonth(arguments[0].getMonth());
            this.setDate(arguments[0].getDate());
        } else if(arguments[0] instanceof Object) {
            var obj = arguments[0];
            if(obj.year != null && obj.month != null && obj.date != null) {
                this.setYear(obj.year);
                this.setMonth(obj.month);
                this.setDate(obj.date);
            } else {
                this.setYear(tempDate.getFullYear());
                this.setMonth(tempDate.getMonth());
                this.setDate(tempDate.getDate());
            }
        }else {
            try {
                this.setYear(parseInt(arguments[0]));
                this.setMonth(parseInt(arguments[1]));
                this.setDate(parseInt(arguments[2]));
            }catch(e) {
                this.setYear(tempDate.getFullYear());
                this.setMonth(tempDate.getMonth());
                this.setDate(tempDate.getDate());
            }
        }
    }
}

SimpleDate.prototype = Object.create(Object);

/**
 * gets the year
 * @returns {Number|*}
 */
SimpleDate.prototype.getYear = function(){
    return this._year;
};

/**
 * sets the year
 * @param year
 */
SimpleDate.prototype.setYear = function(year){
    try {
        if(!isNaN(year)) {
            this._year = parseInt(year);
        }
    } catch(e) {
        throw Error(e);
    }
};

/**
 * gets the month number
 * @returns {Number|*|mnth|number} - 0-11
 */
SimpleDate.prototype.getMonth = function(){
    return this._month;
};

/**
 * sets the month
 * @param month
 */
SimpleDate.prototype.setMonth = function(month){
    try{
        if(!isNaN(month)){
            var mnth = parseInt(month);
            if(mnth <= 11 && mnth >= 0) {
                this._month = mnth;
                if(this._date > this._getNumberOfDaysInMonth()) {
                    this._date = this._getNumberOfDaysInMonth();
                }
            }
        }
    }catch(e) {
        throw Error(e);
    }
};

/**
 * gets the date
 * @returns {*|Number|dt|number}
 */
SimpleDate.prototype.getDate = function(){
    return this._date;
};

/**
 * sets the month day
 * @param date - date to set
 */
SimpleDate.prototype.setDate = function(date){
    try {
        if(!isNaN(date)){
            var dt = parseInt(date);
            if(this._getNumberOfDaysInMonth() < dt) {
                this._date = this._getNumberOfDaysInMonth();
            } else {
                this._date = dt;
            }
        }
    } catch(e) {
        throw Error(e);
    }
};

/**
 * gets the day of week for this date
 * @returns {Number} - 0-6 representing the day of week on which this date falls
 */
SimpleDate.prototype.getDay = function(){
    var t = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
        var m = this._month + 1;
        var y = this._year;
        var d = this._date;
        if(m < 3) {
            y -= 1;
        }

        return parseInt((y + (y / 4) - (y / 100) + (y / 400) + t[m - 1] + d) % 7);
};

SimpleDate.prototype._getNumberOfDaysInMonth = function(){
    return [31, (this.isLeapYear() ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][this._month];
};

/**
 * is this date in a leap year
 * @returns {boolean} - true/false true if is a leap year otherwise false
 */
SimpleDate.prototype.isLeapYear = function(){
    if(this._year % 4 == 0) {
        if(this._year % 100 == 0) {
            if(this._year % 400 == 0) {
                return true;
            }
        } else {
            return true;
        }
    }
    return false;
};

/**
 * adds the specified number of days to this date
 * @param count - number of days to add
 */
SimpleDate.prototype.addDays = function(count){
    this._date += count;
    var maxDays = this._getNumberOfDaysInMonth();
    var remainingDays = 0;
    if(this._date > maxDays){
        this._month += 1;
        if(this._month > 11){
            this._month = 0;
            this._year++;
        }
        remainingDays = this._date - maxDays;
        this._date = 0;
        this.addDays(remainingDays);
    } else if (this._date < 1) {
        this._month -= 1;
        if(this._month < 0) {
            this._month = 11;
            this._year--;
        }
        remainingDays = this._date;
        this._date = this._getNumberOfDaysInMonth();
        this.addDays(remainingDays);
    }
};

/**
 * adds the specified number of months to this date
 * @param count - number of months to add
 */
SimpleDate.prototype.addMonths = function(count){
    this._addToMonth(count);
    if(this._date > this._getNumberOfDaysInMonth()) {
        this._date = this._getNumberOfDaysInMonth();
    }
};

SimpleDate.prototype._addToMonth = function(count){
    this._month += count;
    var remainingMonths = 0;
    if(this._month > 11) {
        this._year++;
        remainingMonths = this._month - 12;
        this._month = 0;
        this._addToMonth(remainingMonths);
    } else if (this._month < 0) {
        this._year--;
        remainingMonths = this._month + 1;
        this._month = 11;
        this._addToMonth(remainingMonths);
    }
};

/**
 * moves this date to the date of week in the specified direction
 * @param day - day of week to move this date to (0: Sunday - 6: Saturday)
 * @param direction - positive to move forward and negative to move back
 */
SimpleDate.prototype.moveToDayOfWeek = function(day, direction){
    var daysOfWeek = [0,1,2,3,4,5,6,0,1,2,3,4,5,6];

    if(day !== null && !isNaN(day) && (day >= 0 && day <= 6)) {
        if(direction === null || isNaN(direction)){
            direction = 1;
        }

        var offset = 0;
        var currentDay = this.getDay();
        var a, b;
        if(direction >= 0) {
            a = daysOfWeek.indexOf(currentDay);
            b = daysOfWeek.indexOf(day, a + 1);
            offset = b - a;
        } else {
            a = daysOfWeek.lastIndexOf(currentDay);
            var tempDays = daysOfWeek.slice(0, a);
            b = tempDays.lastIndexOf(day);
            offset = b - a;
        }

        this.addDays(offset);
    }
};

/**
 * gets days difference between this date and a test date
 * @param testDate - date to get days difference from this date
 * @returns {number} - the days difference, +: this date is after or greater than the test date, -: this date is in the past or less than the test date, 0: the dates are equal
 */
SimpleDate.prototype.getDaysDifference = function(testDate){
    var a = this.toJulianDayNumber();
    var b = testDate.toJulianDayNumber();
    return a - b;
};

/**
 * gets the julian calendar day number for this day since julian calendar start
 * @returns {Number} - this dates julian number
 */
SimpleDate.prototype.toJulianDayNumber = function(){
    var y = this.getYear();
    var m = this.getMonth() + 1;  //0 indexed to 1 indexed
    var d = this.getDate();

    y += 8000;
    //2 being march
    if(m < 3) {
        y--;
        m += 12;
    }
    return parseInt((y * 365) + parseInt(y/4) - parseInt(y/100) + parseInt(y/400) - 1200820 + (m * 153 + 3) / 5 - 92 + d - 1);  //TODO: do we truncate, take ceiling, floor, or just round?
};

/**
 * serializes this date into a simple json object
 * @returns {{year: (Number|*), month: (Number|*|number), date: (*|Number|number)}}
 */
SimpleDate.prototype.serialize = function(){
    return {year: this._year, month: this._month, date: this._date};
};

/**
 * returns this date as a string representation
 * @param format - format of the output string
 * @returns {string} - this date formated in the specified string format
 */
SimpleDate.prototype.toString = function(format){
    var i = 0;
    if(format == null){
        return this._year + '-' + this._month + '-' + this._date;
    }

    var yr1 = format.indexOf('y');
    var yr2 = format.lastIndexOf('y');
    var yearFrmt = '';
    for(i = 0; i < (yr2 - yr1) + 1; i++){
        yearFrmt = yearFrmt + 'y';
    }

    var m1 = format.indexOf('M');
    var m2 = format.lastIndexOf('M');
    var monthFrmt = '';
    for(i = 0; i < (m2 - m1) + 1; i++) {
        monthFrmt = monthFrmt + 'M';
    }

    var d1 = format.indexOf('d');
    var d2 = format.lastIndexOf('d');
    var dayFrmt = '';
    for(i = 0; i < (d2 - d1) + 1; i++) {
        dayFrmt = dayFrmt + 'd';
    }

    var yr = this._year;
    var mn = null;
    var dt = this._date;

    if(monthFrmt === 'M') {
        mn = this._month;
        if(mn.toString().length == 1){
            mn = '0' + mn.toString();
        }
    } else if(monthFrmt === 'MMM') {
        mn = this._monthNamesShort[this._month];
    } else if(monthFrmt === 'MMMM') {
        mn = this._monthNames[this._month];

    } else {
        mn = this._month;
    }

    if(dayFrmt == 'd' && dt.toString().length === 1) {
        dt = '0' + dt.toString();
    }

    var retVal = format;
    retVal = retVal.replace(yearFrmt, yr);
    retVal = retVal.replace(monthFrmt, mn);
    retVal = retVal.replace(dayFrmt, dt);
    return retVal;
};

SimpleDate.parse = function(date, format){
    var validDelimiters = ['-', '/', ' ', ':'];
    var month = null, year =  null, day = null;

    if(date == null || format == null){
        return null;
    }

    //what is our delimiter
    //NOTE: we are only allowing a single type of delimiter for a date to be parsed
    var delIdx = -1;
    for(var j = 0; j < validDelimiters.length; j++){
        if(format.indexOf(validDelimiters[j]) !== -1) {
            delIdx = j;
            break;
        }
    }

    if(delIdx === -1) {
        return null;
    } else {
        var dparts = date.split(validDelimiters[delIdx]);
        var fparts = format.split(validDelimiters[delIdx]);

        //does our format make sense
        if(fparts.length !== 3){
            return null;
        } else {
            //if so try to extract the parts of the date
            for(var i = 0; i < 3; i++){
                if(fparts[i].indexOf('y') !== -1){
                    year = isNaN(dparts[i]) ? null : parseInt(dparts[i]);
                } else if(fparts[i].indexOf('M') !== -1) {
                    month = isNaN(dparts[i]) ? null : parseInt(dparts[i]);
                    month -= 1; //0 based index
                } else if(fparts[i].indexOf('d') !== -1){
                    day = isNaN(dparts[i]) ? null : parseInt(dparts[i]);
                }
            }

            if(day !== null && month !== null && year !== null) {
                return new SimpleDate(year, month, day);
            } else {
                return null;
            }
        }
    }
};

//for nodejs
if(typeof module !== 'undefined') {
    module.exports = SimpleDate;
}