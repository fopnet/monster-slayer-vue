import Vue from "vue";
import Vuex from "vuex";
import { axiosAuth, FB_KEY } from "./axios-auth";
import globalAxios from "axios";
import router from "./routes";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null,
    recordScore: 0,
  },
  mutations: {
    authUser(state, authData) {
      state.idToken = authData.token;
      state.userId = authData.userId;

      // console.log("authUser", authData);
    },
    storeUser(state, user) {
      state.user = user;
    },
    clearAuthData(state) {
      state.idToken = state.userId = state.user = null;
    },
    storeRecord(state, recordScore) {
      state.recordScore = recordScore;
    },
  },
  actions: {
    setLogoutTimer({ commit }, expirationTime) {
      setTimeout(() => {
        commit("clearAuthData");
      }, expirationTime * 1000);
    },
    logout({ commit }) {
      localStorage.removeItem("token");
      localStorage.removeItem("expirationDate");
      localStorage.removeItem("userId");
      commit("clearAuthData");
      router.replace("/login");
    },
    signup({ commit, dispatch }, authData) {
      axiosAuth
        .post(`accounts:signUp${FB_KEY}`, {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true,
        })
        .then(res => {
          commit("authUser", {
            token: res.data.idToken,
            userId: res.data.localId,
          });
          const expirationDate = new Date(
            new Date().getTime() + res.data.expiresIn * 1000,
          );
          localStorage.setItem("token", res.data.idToken);
          localStorage.setItem("userId", res.data.localId);
          localStorage.setItem("expirationDate", expirationDate);

          dispatch("storeUser", authData);
          dispatch("setLogoutTimer", res.data.expiresIn);
        })
        .catch(error => console.log(error));
    },
    tryAutoLogin({ commit }) {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      const expirationDate = localStorage.getItem("expirationDate");
      if (new Date() > expirationDate) {
        return;
      }

      commit("authUser", {
        token: token,
        userId: localStorage.getItem("userId"),
      });

      router.push("/app");
    },
    login({ commit, dispatch }, authData) {
      axiosAuth
        .post(`accounts:signInWithPassword${FB_KEY}`, {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true,
        })
        .then(res => {
          // console.log("login ", res.data);

          commit("authUser", {
            token: res.data.idToken,
            userId: res.data.localId,
          });

          const expirationDate = new Date(
            new Date().getTime() + res.data.expiresIn * 1000,
          );
          localStorage.setItem("token", res.data.idToken);
          localStorage.setItem("userId", res.data.localId);
          localStorage.setItem("expirationDate", expirationDate);

          dispatch("setLogoutTimer", res.data.expiresIn);
          router.push("/app");
        })
        .catch(error => console.log(error));
    },
    storeUser({ commit, state }, userData) {
      if (!state.idToken) {
        return;
      }
      globalAxios
        .put(`users/${state.userId}.json?auth=${state.idToken}`, userData)
        .then(data => commit("storeUser", data))
        .catch(err => console.error(err));
    },
    fetchUser({ commit, state }) {
      globalAxios
        .get(`users/${state.userId}.json?auth=${state.idToken}`)
        .then(res => {
          commit("storeUser", res.data);
        })
        .catch(error => console.log(error));
    },
    fetchRecordScore({ commit, state }) {
      //
      globalAxios
        .get(
          `scores/${state.userId}.json?auth=${state.idToken}&orderBy="score"&limitToLast=1`,
        )
        .then(res => {
          commit("storeRecord", res.json() ? res.json().score : 0);
        });
    },
    saveScore({ commit, state, dispatch }, data) {
      return globalAxios
        .post(`scores/${state.userId}.json?auth=${state.idToken}`, data)
        .then(res => {
          // console.log("saveScore Saved", res.data, data);
          // commit("storeRecord", data.score);
          dispatch("fetchRecordScore");
          return res;
        });
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
    isAuthenticated(state) {
      return state.idToken !== null;
    },
    recordScore(state) {
      return state.recordScore;
    },
  },
});
