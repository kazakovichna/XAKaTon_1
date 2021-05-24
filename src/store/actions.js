import axios from "axios";

export default {
    async AUTH_USER({ commit }, formUser) {
        await axios
            .post("https://part-time.herokuapp.com/api/token/", formUser)
            .then(response => {
                //console.log(response.data.token)
                commit('SET_AUTH', formUser)
                commit('SET_TOKEN', response.data.token)
                console.log(response.data.token)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    async GET_USER_ID({ commit, state }) {
        await axios
            .get("https://part-time.herokuapp.com/api/users/", {
                headers: {
                    'Authorization': `Token ${state.token}`,
                },
                params: {
                    username: state.username
                }
            })
            .then((userId) => {
                commit('SET_ID', userId.data)
                return userId
            })
            .catch((error) => {
                console.log(error)
                return error
            })
    },
    async CREATE_USER({ commit }, formUser) {
        console.log(formUser)
        await axios
            .post("https://part-time.herokuapp.com/api/users/", formUser)
            .then(response => {
                commit()
            })
            .catch((error) => {
                console.log(error)
            })
    },
    async FETCH_VACANCIES({ commit, state }) {
        await axios
            .get("https://part-time.herokuapp.com/api/vacancies/", {
                headers: {
                    'Authorization': `Token ${state.token}`,
                }
            })
            .then((vacancies) => {
                commit('SET_VACANCIES', vacancies.data.results)
                return vacancies
            })
            .catch((error) => {
                console.log(error)
                return error
            })
    },
    async CREATE_VACANCY({ state }, formVacancy) {
        await axios
            .post("https://part-time.herokuapp.com/api/vacancies/", formVacancy, {
                headers: {
                    'Authorization': `Token ${state.token}`,
                }
            })
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    async DELETE_VACANCIES({ state }, id) {
        await axios
            .delete(`http://part-time.herokuapp.com/api/vacancies/${id}/`, {
                headers: {
                    'Authorization': `Token ${state.token}`,
                }
            })
            .then((response) => {
                console.log(resronse)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    async GET_VAC({ state }, item) {
        const vacanties = {
            user: state.userData.id,
            vacancy: item.id,
            status: "pending"
        }
        console.log(vacanties)
        await axios
            .post("http://part-time.herokuapp.com/api/vacancy_applications/", vacanties, {
                headers: {
                    'Authorization': `Token ${state.token}`,
                }
            })
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    async GET_VAC_APP({ commit, state }) {
        await axios
            .get("http://part-time.herokuapp.com/api/vacancy_applications/", {
                headers: {
                    'Authorization': `Token ${state.token}`,
                }
            })
            .then((response) => {
                console.log(response)
                commit('SET_VAC_APP', response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }
}