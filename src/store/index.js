import { createStore } from "vuex";

const globalModule = {
  state: {
    showAlertState: false,
    alertTitle: "",
    alertText: "",
    alertColor: "",
    userData: {
      firstname: "",
      lastname: "",
      roles: [],
      email: "",
    },
    authorized: false,
  },
  mutations: {
    showAlert(state, alertArray) {
      console.log("alertArray", alertArray);
      console.log("mutation showAlert");
      console.log(alertArray[0], alertArray[1], alertArray[2], alertArray[3]);
      state.alertText = alertArray[1];
      state.alertTitle = alertArray[0];
      state.alertColor = alertArray[3];
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
    changeAuthorized(state, bool) {
      state.authorized = bool;
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
    changeAuthorized({ commit }, bool) {
      commit("changeAuthorized", bool);
    },
  },
  getters: {},
};

const teachersModule = {
  state: {
    showAddTeacherForm: false,
    showEditTeacherForm: false,
    editingTeacher: {},
    ariaShowTeacher: true,
  },
  mutations: {
    toggleAddTeacherForm(state) {
      state.showAddTeacherForm = !state.showAddTeacherForm;
      state.ariaShowTeacher = !state.ariaShowTeacher;
    },
    toggleEditTeacherForm(state) {
      state.showEditTeacherForm = !state.showEditTeacherForm;
      state.ariaShowTeacher = !state.ariaShowTeacher;
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

const adminsModule = {
  state: {
    showAddAdminForm: false,
    editingAdmin: {},
    ariaShowAdmin: true,
  },
  mutations: {
    toggleAddAdminForm(state) {
      state.showAddAdminForm = !state.showAddAdminForm;
      state.ariaShowAdmin = !state.ariaShowAdmin;
    },
    changeEditingAdmin(state, admin) {
      state.editingAdmin = admin[0];
    },
  },
  actions: {
    toggleAddAdminForm({ commit }) {
      commit("toggleAddAdminForm");
    },
    changeEditingAdmin({ commit }, admin) {
      commit("changeEditingAdmin", admin);
    },
  },
};

const coursesModule = {
  state: {
    showAddCourseForm: false,
    showEditCourseForm: false,
    editingCourse: {},
    ariaShowCourse: true,
  },
  mutations: {
    toggleAddCourseForm(state) {
      state.showAddCourseForm = !state.showAddCourseForm;
      state.ariaShowCourse = !state.ariaShowCourse;
    },
    toggleEditCourseForm(state) {
      state.showEditCourseForm = !state.showEditCourseForm;
      state.ariaShowCourse = !state.ariaShowCourse;
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
    ariaShowAssignment: true,
  },
  mutations: {
    toggleCreateAssignment(state) {
      state.showAddAssignmentForm = !state.showAddAssignmentForm;
      state.ariaShowAssignment = !state.ariaShowAssignment;
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
    admins: adminsModule,
    courses: coursesModule,
    assignments: assignmentsModule,
  },
});

export default store;
