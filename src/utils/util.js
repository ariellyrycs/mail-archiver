Date.prototype.monthDays = function() {
    var d= new Date(this.getFullYear(), this.getMonth()+1, 0);
    return d.getDate();
};

Date.prototype.firstMonthWeekDay = function () {
    return new Date(this.getFullYear(), this.getMonth(), 1).getDay();
};

Date.prototype.roundDownDate = function () {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate());
};