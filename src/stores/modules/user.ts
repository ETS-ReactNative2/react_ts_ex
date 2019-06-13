import { action, observable } from 'mobx'
import Cookies from 'js-cookie'

export class UserStore {

  @observable private isLogin: boolean
  @observable private account !: Map<string, any> 

  constructor () {
    this.isLogin = false
  }

  public get getIsLogin (): boolean {
    return this.isLogin
  }

  public getAccount (): Map<string, any> | boolean {
    if (Cookies.get('Access_token')) {
      if (this.account) {
        return this.account
      } else if (Cookies.get('account_info')) {
        let accountInfo !: Map<string, any>
        try {
          accountInfo = JSON.parse(decodeURIComponent(<string> Cookies.get('account_info')))
        } catch (e) {}
        return accountInfo
      } else {
        return false
      }
    } else {
      return false
    }
  }

  @action public saveLoginData (accountInfo: Map<string, any>) {
    Cookies.set('account_info', encodeURIComponent(JSON.stringify(accountInfo)))
    this.account = accountInfo
    this.isLogin = true
  }

}

export default new UserStore()