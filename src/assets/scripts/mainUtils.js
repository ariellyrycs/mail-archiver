const MONTHS =  [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
const WEEK_DAY = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

Date.prototype.getFullMonth = function() {
    return MONTHS[this.getMonth()];
};

Date.prototype.getFullWeekDay = function() {
    return WEEK_DAY[this.getDay()];
};

Date.prototype.monthDays = function() {
    var d = new Date(this.getFullYear(), this.getMonth() + 1, 0);
    return d.getDate();
};

Date.prototype.firstMonthWeekDay = function() {
    return new Date(this.getFullYear(), this.getMonth(), 1).getDay();
};

Date.prototype.roundDownDate = function() {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate());
};

Date.prototype.generateFullDateFormat = function() {
    return `${this.getFullWeekDay()} ${this.getDate()
        .toString()
        .padStart(2, 0)} ${this.getFullMonth()} at ${this.getHours()
        .toString()
        .padStart(2, 0)}: ${this.getMinutes()
        .toString()
        .padStart(2, 0)}`;
};

Array.prototype.commaSeparatedFormat = function() {
    return this.reduce((str, item, i, arr) => {
        str += item;
        if (i === arr.length - 2) str += ' and ';
        else if (i < arr.length - 2) str += ', ';
        return str;
    }, '');
};
