import { defineStore } from 'pinia'
export const useAppStore = defineStore('app', {
  state: () => ({
    loginInfo: {
      loggedIn: false,
      username: '',
    }
  }),
  actions: {
    setLoginInfo({ loggedIn, username}) {
      this.loginInfo.loggedIn = loggedIn;
      this.loginInfo.username = username;
    },
    isLoggedIn(){
      return this.loginInfo.loggedIn;
    },
    getLoginInfo(){
      return this.loginInfo;
    }
  },
  persist: true
})