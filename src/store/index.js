import { createStore } from "vuex";

export default createStore({
  state: {
    userData: {
      firstname: "",
      lastname: "",
      roles: [],
      email: "",
    },
  },
  getters: {},
  mutations: {
    store_firstname(state, data) {
      state.userData.firstname = data;
    },
    store_lastname(state, data) {
      state.userData.lastname = data;
    },
    store_email(state, data) {
      state.userData.email = data;
    },
    store_roles(state, data) {
      state.userData.roles = data;
    },
  },
  actions: {
    store_firstname({ commit }, data) {
      commit("store_firstname", data);
    },
    store_lastname({ commit }, data) {
      commit("store_lastname", data);
    },
    store_email({ commit }, data) {
      commit("store_email", data);
    },
    store_roles({ commit }, data) {
      commit("store_roles", data);
    },
  },
  modules: {},
});
