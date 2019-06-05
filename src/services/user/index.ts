import { Service } from '..'
import { action } from 'mobx'

export class UserService extends Service {

  constructor (path: string = '/api/users') {
    super(path)
  }

  @action public async sendMsg (data: any): Promise<any> {
    return this.get('/send_msg', data)
  }

  @action public async register (data: any): Promise<any> {
    return this.post('/', data)
  }

  @action public async sign (data: any): Promise<any> {
    return this.post('/sign', data)
  }

}

export default new UserService()
