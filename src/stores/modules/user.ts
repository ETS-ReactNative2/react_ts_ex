import { action, observable } from 'mobx'

export class UserStore {

  @observable private isLogin: boolean
  @observable private account !: Map<string, any> 

  constructor () {
    this.isLogin = false
  }

  public get getIsLogin (): boolean {
    return this.isLogin
  }

  public get getAccount (): Map<string, any> {
    return this.account
  }

  @action public async saveLoginData (accountInfo: Map<string, any>) {
    this.account = accountInfo
    this.isLogin = true
  }

}

export default new UserStore()