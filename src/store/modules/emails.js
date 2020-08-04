import data from '../../assets/data/email.json';

const state = () => ({
    selectedMail: null,
    emailsAll: data.emails,
    sortDesc: {
        from: true,
        to: true,
        subject: true,
        date: false
    },
    dateRange: {
        from: new Date(-8639999978964000),
        to: new Date()
    },
    currentSortingFactor: 'date'
});

let sortingMails = {
    sortingLexicologically(arr, prop, desc) {
        let sortingFactor = desc ? -1 : 1;
        arr.sort(
            (a, b) =>
                a.headers[prop][0].localeCompare(b.headers[prop][0]) *
                sortingFactor
        );
    },
    sortNumbers(arr, prop, desc) {
        let sortingFactor = desc ? -1: 1;
        arr.sort((a, b) => (a.headers[prop] - b.headers[prop]) * sortingFactor);
    }
};

const getters = {
    computedEmails(state) {
        let dateRange = state.dateRange;
        let emails = state.emailsAll.filter(
            email =>
                dateRange.from <= email.headers.sentDate &&
                email.headers.sentDate <= dateRange.to
        );

        switch (state.currentSortingFactor) {
            case 'date':
                sortingMails.sortNumbers(
                    emails,
                    'sentDate',
                    !state.sortDesc.date
                );
                break;
            case 'subject':
                sortingMails.sortingLexicologically(
                    emails,
                    'subject',
                    state.sortDesc.subject
                );
                break;
            case 'to':
                sortingMails.sortingLexicologically(
                    emails,
                    'to',
                    state.sortDesc.to
                );
                break;
            case 'from':
                sortingMails.sortingLexicologically(
                    emails,
                    'from',
                    state.sortDesc.from
                );
                break;
        }
        return emails;
    }
};

let actions = {
    selectEmail({ commit }, selectedMail) {
        commit('setCurrentSelectedEmail', {
            selectedMail
        });
    },
    removeSelection({ commit }) {
        commit('removeSelection');
    },
    sortingAction({ commit }, e) {
        commit('setFilterStatus', {
            sortingFactor: e.target.dataset.sortingFactor
        });
    },
    onSelectDate({ commit }, dates) {
        commit('updateDateRange', dates);
    }
};

let mutations = {
    setCurrentSelectedEmail(state, { selectedMail }) {
        state.selectedMail = selectedMail;
    },
    removeSelection(state) {
        state.selectedMail = null;
    },
    setFilterStatus(state, { sortingFactor }) {
        state.currentSortingFactor = sortingFactor;
        state.sortDesc[sortingFactor] = !state.sortDesc[sortingFactor];
    },
    updateDateRange(state, dates) {
        state.dateRange = dates;
    }
};

export default {
    namespaced: true,
    actions,
    getters,
    state,
    mutations
};