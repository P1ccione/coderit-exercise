import { createStore } from "vuex";

const globalModule = {
  state: {
    showAlertState: false,
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
    changeAdmin(state) {
      state.admin = !state.admin;
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
    changeAdmin({ commit }) {
      commit("changeAdmin");
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
