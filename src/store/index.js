import { createStore } from "vuex";

const globalModule = {
  state: {
    showAlertState: false,
    alertTitle: "",
    alertText: "",
    userData: {
      firstname: "",
      lastname: "",
      roles: [],
      email: "",
    },
  },
  mutations: {
    showAlert(state, alertArray) {
      console.log("alertArray", alertArray);
      console.log("mutation showAlert");
      console.log(alertArray[0], alertArray[1], alertArray[2]);
      state.alertText = alertArray[1];
      state.alertTitle = alertArray[0];
      state.showAlertState = !state.showAlertState;
      console.log(state.showAlertState);
    },
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
    showAlert({ commit }, alertArray) {
      console.log("action showAlert");
      commit("showAlert", alertArray);
      setTimeout(function () {
        commit("showAlert", alertArray);
      }, alertArray[2]);
    },
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
  getters: {},
};

const teachersModule = {
  state: {
    showAddTeacherForm: false,
    showEditTeacherForm: false,
    editingTeacher: {},
  },
  mutations: {
    toggleAddTeacherForm(state) {
      state.showAddTeacherForm = !state.showAddTeacherForm;
    },
    toggleEditTeacherForm(state) {
      state.showEditTeacherForm = !state.showEditTeacherForm;
    },
    changeEditingTeacher(state, teacher) {
      state.editingTeacher = teacher[0];
    },
  },
  actions: {
    toggleAddTeacherForm({ commit }) {
      commit("toggleAddTeacherForm");
    },
    toggleEditTeacherForm({ commit }, teacher = [{}]) {
      commit("changeEditingTeacher", teacher);
      commit("toggleEditTeacherForm");
    },
    changeEditingTeacher({ commit }, teacher) {
      commit("changeEditingTeacher", teacher);
    },
  },
};

const coursesModule = {
  state: {
    showAddCourseForm: false,
    showEditCourseForm: false,
    editingCourse: {},
  },
  mutations: {
    toggleAddCourseForm(state) {
      state.showAddCourseForm = !state.showAddCourseForm;
    },
    toggleEditCourseForm(state) {
      state.showEditCourseForm = !state.showEditCourseForm;
    },
    changeEditingCourse(state, course) {
      state.editingCourse = course[0];
    },
  },
  actions: {
    toggleAddCourseForm({ commit }) {
      commit("toggleAddCourseForm");
    },
    toggleEditCourseForm({ commit }, course = [{}]) {
      commit("changeEditingCourse", course);
      commit("toggleEditCourseForm");
    },
    changeEditingCourse({ commit }, course) {
      commit("changeEditingCourse", course);
    },
  },
};

const assignmentsModule = {
  state: {
    showAddAssignmentForm: false,
  },
  mutations: {
    toggleCreateAssignment(state) {
      state.showAddAssignmentForm = !state.showAddAssignmentForm;
    },
  },
  actions: {
    toggleCreateAssignment({ commit }) {
      commit("toggleCreateAssignment");
    },
  },
};

const store = createStore({
  modules: {
    global: globalModule,
    teachers: teachersModule,
    courses: coursesModule,
    assignments: assignmentsModule,
  },
});

export default store;
