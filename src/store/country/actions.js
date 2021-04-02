import Vue from 'vue'

const setCountries = ({ commit }) => {
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios.get(`${process.env.API}all`)
      .then((response) => {
        // chamar uma mutacao para alterar o estado de post
        commit('SET_COUNTRIES', response.data)
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export {
  setCountries
}
