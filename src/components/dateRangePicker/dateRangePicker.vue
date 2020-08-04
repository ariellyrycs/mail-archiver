<template>
    <div class="date-range-picker-container" >
        <a href="#" class="search-box-container" @click.prevent="openDatePicker">
            <div class="picker-input">
                <img src="../../assets/imgs/icon_calender.svg" />
                <span class="text">{{headStartingDateFormat}} - {{headEndingDateFormat}}</span>
            </div>
            <div class="btn-search">
                <img src="../../assets/imgs/icon_search.svg" />
            </div>
        </a>
        <div v-if="showCalendar" class="calendar-container" v-click-outside="closeDatePicker">
            <div class="controls" aria-hidden="true">
                <a href="#" @click.prevent='goPreviousMonth'><i class="left"></i></a>
                <span>{{monthDesciption}} {{year}}</span>
                <a href="#" @click.prevent="goNextMonth"><i class="right"></i></a>
            </div>
            <div class="weekdays" aria-hidden="true">
                <span v-bind:key="index" v-for="(weekday, index) in weekdays">{{weekday}}</span>
            </div>
            <div class="days" aria-hidden="true">
                <!-- a calendar contains 5 rows -->
                <ul v-for="(row, index) in days" v-bind:key="index">
                    <li v-for="(item, o) in row"
                        v-bind:key="o"
                        v-bind:class="[item.colorClass]"
                        @click.prevent="selectNumber">
                        <div v-if="item.content !== ''">
                            <span v-if="item.disabled">{{item.content}}</span>
                            <a href="#"
                                v-bind:data-day="item.content"
                                v-else>{{item.content}}</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import vClickOutside from 'v-click-outside';
    const numberOfDaysPerWeek = 7;
    const SHORT_WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    export default {
        name: 'dateRangePicker',
        props: {
            startingPoint: {
                type: Date,
                default: () => new Date()
            },
            avaiableLastDate: {
                type: Date,
                default: () => new Date()
            },
            avaiableFirstDate: {
                type: Date,
                default: () => new Date(0)
            },
            defaultFrom: {
                type: Date,
                default: () => new Date(-8639999978964000)
            },
            defaultTo: {
                type: Date,
                default: () => new Date()
            }
        },
        directives: {
            clickOutside: vClickOutside.directive
        },
        data() {
            return {
                weekdays: SHORT_WEEK_DAYS,
                showCalendar: false,
                step: 1,
                date: this.startingPoint.roundDownDate(),
                from: this.defaultFrom,
                to: this.defaultTo
            }
        },
        computed: {
            numberOfDaysPerMonth() {
                return this.date.monthDays();
            },
            firstDayWeekday() {
                return this.date.firstMonthWeekDay();
            },
            monthDesciption() {
                return this.date.getFullWeekDay();
            },
            headStartingDateFormat() {
                return this.generateFormat(this.from);
            },
            headEndingDateFormat() {
                return this.generateFormat(this.to);
            },
            year() {
                return this.date.getFullYear();
            },
            days() {
                let currDate = new Date(this.date);
                let matrix = [];
                for(let i = 0; i < 6; i += 1) {
                    matrix.push([]);
                    for(let j = 0; j < numberOfDaysPerWeek; j += 1) {
                        let currIndex = (i * numberOfDaysPerWeek) + j;
                        matrix[i].push(this.generateCell(currDate, currIndex));
                    }
                }
                return matrix;
            }
        },
        methods: {
            goPreviousMonth(e) {
                let currDate = this.date;
                this.date = new Date(currDate.getFullYear(), currDate.getMonth() - 1, 1);
            },
            goNextMonth(e) {
                let currDate = this.date;
                this.date = new Date(currDate.getFullYear(), currDate.getMonth() + 1, 1);
            },
            generateFormat(date) {
                return date <= new Date(0) ? '----/--/--': `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
            },
            selectNumber(e) {
                let day = parseInt(e.target.dataset.day);
                if(isNaN(day)) {
                    return;
                }
                let newDate = new Date(this.date.getFullYear(), this.date.getMonth(), day);
                if(this.step === 1) {
                    this.from = newDate;
                    this.step += 1;
                } else if(this.step === 2) {
                    this.to = newDate;
                    this.step = 1;
                    this.showCalendar = false;
                }
                this.$emit('on-select-date', {
                    from: this.from,
                    to: this.to
                });
            },
            openDatePicker(e) {
                this.showCalendar = !this.showCalendar;
                this.step = 1;
            },
            closeDatePicker(e) {
                this.showCalendar = false;
            },
            sameDay(first, second) {
                return first.getFullYear() === second.getFullYear() &&
                    first.getMonth() === second.getMonth() &&
                    first.getDate() === second.getDate();
            },
            generateCell(currDate, index) {
                let options = {};
                if(index < this.firstDayWeekday || this.firstDayWeekday + this.numberOfDaysPerMonth <= index) {
                    options.content = '';
                    options.disabled = false;
                    options.colorClass = '';
                } else {
                    let dayNumber = index - this.firstDayWeekday + 1;
                    currDate.setDate(dayNumber);
                    let cellFirst = this.from && this.sameDay(this.from, currDate);
                    let cellLast = this.to && this.sameDay(this.to, currDate);
                    let invalidRange = currDate < this.avaiableFirstDate || this.avaiableLastDate < currDate;
                    options.content = dayNumber;
                    
                    options.disabled = invalidRange || 
                        (this.step === 1 && this.to < currDate) ||
                        (this.step === 2 && currDate < this.from);
                    if(!options.disabled) {
                        if(cellFirst) {
                            options.colorClass = cellLast ? 'both': 'start'; 
                        } else {
                            options.colorClass = cellLast ? 'end': 'between';
                        }
                    }
                }
                return options;
            }
        }
    }

</script>

<style scoped>

    .date-range-picker-container {
        width: 260px;
        height: 40px;
        position: relative;
        z-index: 1;
    }

    .search-box-container {
        width: 100%;
        height: 100%;
        position: relative;
        text-decoration: none;
        color: inherit;
        font-size: inherit;
        display: block;
    }

    .days > ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .days li {
        display: inline-block;
        height: 20px;
        width: 20px;
        padding: 6px;
        vertical-align: bottom;
        border-radius: 50%;
    }

    .days li.start {
        background-color: red;
    }

    .days li.end {
        background-color: aquamarine;
    }

    .days li.both {
        background-color: green;
    }
    .days li.between {
        background-color: #F5F5F5;
    }

    .days  a {
        text-decoration: none;
        color: black;
    }

    .days span {
        color: gray;
    }

    .picker-input {
        height: 100%;
        width: 100%;
        background-color: white;
        border-radius: 3px;
        border: 1px solid #D3D3D3;
        overflow: hidden;
        cursor: pointer;
        box-sizing: border-box;
    }

    .picker-input > span {
        vertical-align: middle;
        line-height: 40px;
        margin-left: 35px;
    }

    .picker-input > img {
        width: 16px;
        height: 16px;
        position: absolute;
        top: 50%;
        left: 10px;
        margin-top: -8px;
    }

    .btn-search {
        width: 40px;
        height: 100%;
        float: right;
        background-color: #F5F5F5;
        position: absolute;
        border: 1px solid #E9E9E9;
        right: 0;
        top: 0;
        box-sizing: border-box;
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
    }

    .btn-search > img {
        width: 16px;
        height: 16px;
        display: block;
        position: relative;
        left: 50%;
        top: 50%;
        margin-left: -8px;
        margin-top: -8px;
    }

    .calendar-container {
        height: 300px;
        width: 100%;
        background-color: white;
        padding: 15px;
        position: absolute;
        box-sizing: border-box;
        border-radius: 2px;
        border: 1px solid #E9E9E9;
        text-align: center;
    }

    .controls .left, .controls .right {
        width: 16px;
        height: 16px;
    }

    .controls .right {
        float: right;
        background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMxLjQ5IDMxLjQ5IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMS40OSAzMS40OTsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiPgo8cGF0aCBkPSJNMjEuMjA1LDUuMDA3Yy0wLjQyOS0wLjQ0NC0xLjE0My0wLjQ0NC0xLjU4NywwYy0wLjQyOSwwLjQyOS0wLjQyOSwxLjE0MywwLDEuNTcxbDguMDQ3LDguMDQ3SDEuMTExICBDMC40OTIsMTQuNjI2LDAsMTUuMTE4LDAsMTUuNzM3YzAsMC42MTksMC40OTIsMS4xMjcsMS4xMTEsMS4xMjdoMjYuNTU0bC04LjA0Nyw4LjAzMmMtMC40MjksMC40NDQtMC40MjksMS4xNTksMCwxLjU4NyAgYzAuNDQ0LDAuNDQ0LDEuMTU5LDAuNDQ0LDEuNTg3LDBsOS45NTItOS45NTJjMC40NDQtMC40MjksMC40NDQtMS4xNDMsMC0xLjU3MUwyMS4yMDUsNS4wMDd6IiBmaWxsPSIjMDA2REYwIi8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=);
    }
    .controls .left {
        float: left;
        background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMxLjQ5NCAzMS40OTQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDMxLjQ5NCAzMS40OTQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPHBhdGggZD0iTTEwLjI3Myw1LjAwOWMwLjQ0NC0wLjQ0NCwxLjE0My0wLjQ0NCwxLjU4NywwYzAuNDI5LDAuNDI5LDAuNDI5LDEuMTQzLDAsMS41NzFsLTguMDQ3LDguMDQ3aDI2LjU1NCAgYzAuNjE5LDAsMS4xMjcsMC40OTIsMS4xMjcsMS4xMTFjMCwwLjYxOS0wLjUwOCwxLjEyNy0xLjEyNywxLjEyN0gzLjgxM2w4LjA0Nyw4LjAzMmMwLjQyOSwwLjQ0NCwwLjQyOSwxLjE1OSwwLDEuNTg3ICBjLTAuNDQ0LDAuNDQ0LTEuMTQzLDAuNDQ0LTEuNTg3LDBsLTkuOTUyLTkuOTUyYy0wLjQyOS0wLjQyOS0wLjQyOS0xLjE0MywwLTEuNTcxTDEwLjI3Myw1LjAwOXoiIGZpbGw9IiMwMDZERjAiLz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==);
    }

    .weekdays {
        margin-top: 10px;
        margin-bottom: 10px;
    }
    
    .weekdays > span {
        margin-left: 2px;
        margin-right: 2px;
    }

    .days {
        height: 200px;
        border: 1px solid #E9E9E9;
        border-radius: 2px;
    }
</style>