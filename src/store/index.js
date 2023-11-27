import { createStore } from "vuex";

export default createStore({
  state: {
    showAlertState: false,
    showAddCourseForm: false,
    showEditCourseForm: false,
    showAddTeacherForm: false,
    showEditTeacherForm: false,
    showAddAssignmentForm: false,
    editingCourse: {},
    editingTeacher: {},
    alertTitle: "",
    alertText: "",
    admin: false,
  },
  mutations: {
    showAlert(state, alertArray) {
      console.log("alertArray", alertArray);
      console.log("mutation showAlert");
      console.log(alertArray[0], alertArray[1], alertArray[2]);
      state.alertText = alertArray[1];
      state.alertTitle = alertArray[0];
      state.showAlertState = !state.showAlertState;
    },

    toggleAddCourseForm(state) {
      state.showAddCourseForm = !state.showAddCourseForm;
    },

    toggleEditCourseForm(state) {
      state.showEditCourseForm = !state.showEditCourseForm;
    },

    toggleAddTeacherForm(state) {
      state.showAddTeacherForm = !state.showAddTeacherForm;
    },

    toggleEditTeacherForm(state) {
      state.showEditTeacherForm = !state.showEditTeacherForm;
    },

    toggleCreateAssignment(state) {
      state.showAddAssignmentForm = !state.showAddAssignmentForm;
    },

    changeEditingTeacher(state, teacher) {
      state.editingTeacher = teacher[0];
    },

    changeEditingCourse(state, course) {
      state.editingCourse = course[0];
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

    toggleAddCourseForm({ commit }) {
      commit("toggleAddCourseForm");
    },

    toggleEditCourseForm({ commit }, course = [{}]) {
      commit("changeEditingCourse", course);
      commit("toggleEditCourseForm");
    },

    toggleAddTeacherForm({ commit }) {
      commit("toggleAddTeacherForm");
    },

    toggleEditTeacherForm({ commit }, teacher = [{}]) {
      commit("changeEditingTeacher", teacher);
      commit("toggleEditTeacherForm");
    },

    toggleCreateAssignment({ commit }) {
      commit("toggleCreateAssignment");
    },
  },
  getters: {},
});
