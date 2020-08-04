import { mapActions } from 'vuex';

let shortMonths = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];

export default {
    props: {
        email: {
            headers: {
                type: Object,
                default: () => ({
                    sentDate: new Date().getTime()
                })
            }
        },
        startingDateFrom: {
            type: Date,
            default: () => new Date()
        }
    },
    data() {
        return {
            currentSentDate: new Date(this.email.headers.sentDate)
        };
    },
    computed: {
        dateDifference() {
            let currDiff = this.startingDateFrom - this.currentSentDate;
            let minutes = Math.floor(currDiff / 60000);
            let hours = Math.floor(minutes / 60);
            let restingMinutes = minutes % 60;
            let days = Math.floor(hours / 24);
            let restingHours = hours % 24;
            //if hours are more than 24 it means that is more than a day and should get a different format
            return {
                min: restingMinutes,
                hours: restingHours,
                days: days
            };
        },
        dateFormat() {
            let dateInfo = this.dateDifference;
            let currentDate = this.currentSentDate;
            if (dateInfo.days > currentDate.getDate()) {
                return `${currentDate.getFullYear()}/${currentDate.getMonth()}/${currentDate.getDate()}`;
            } else if (dateInfo.days > 0) {
                return `${shortMonths[currentDate.getMonth()]} ${currentDate
                    .getDate()
                    .toString()
                    .padStart(2, '0')}`;
            }
            return `${dateInfo.hours}:${dateInfo.min
                .toString()
                .padStart(2, '0')}`;
        }
    },
    methods: mapActions('emails', ['selectEmail'])
};