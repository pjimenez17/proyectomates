import { defineStore } from 'pinia'
export const useAppStore = defineStore('app', {
  state: () => ({
    loginInfo: {
      loggedIn: false,
      username: '',
      mail: '',
    },
    infoRanking: {
      ranking: []
    },
    allQuestions: {
      questions: []
    }
  }),
  actions: {
    setLoginInfo({ loggedIn, username, mail }) {
      this.loginInfo.loggedIn = loggedIn;
      this.loginInfo.username = username;
      this.loginInfo.mail = mail;
    },
    isLoggedIn() {
      return this.loginInfo.loggedIn;
    },
    getLoginInfo() {
      return this.loginInfo;
    },
    SetUsername(newusername) {
      this.loginInfo.username = newusername;
    },
    getUsername() {
      return this.loginInfo.username;
    },
    setMail(newmail) {
      this.loginInfo.mail = newmail;
    },
    getMail() {
      return this.loginInfo.mail;
    },
    setRanking(ranking) {
      this.infoRanking.ranking = ranking;
    },
    getRanking() {
      return this.infoRanking.ranking;
    },
    setQuestions(questions) {
      this.allQuestions.questions = questions;
    },
    getQuestions() {
      return this.allQuestions.questions;
    },
  },
  persist: true
})