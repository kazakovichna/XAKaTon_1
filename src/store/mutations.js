export default {
    SET_AUTH: (state, form) => {
        state.auth = true
        state.username = form.username
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_VACANCIES: (state, vacancies) => {
        state.vacancies = vacancies
    },
    SET_USER_DATA: (state, userData) => {
        state.userData = userData
    },
    SET_ID: (state, userId) => {
        state.userData = userId.results[0]
    },
    SET_VAC_APP: (state, data) => {
        state.vac_app = data.results
    }
}