import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { 
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  message
} from 'antd'
import { RouteComponentProps } from 'react-router'

import { UserStore } from 'src/types/stores'
import { UserService } from 'src/services/user'

export interface LoginProps extends RouteComponentProps<{}> {
  user: UserStore
  form: any,
  userService: UserService
}

@inject('user', 'userService')
@observer
class Login extends React.Component<LoginProps, {}> {

  public userService !: UserService

  constructor (props: any) {
    super(props)
    this.userService = props.userService
  }

  public login = (e: any) => {
    e.preventDefault()
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        this.userService.sign({
          ...values,
          remember: undefined
        }).then((res: any) => {
          if (res.status === 0) {
            message.success('登录成功')
            this.props.history.replace('/')
          }
        }).catch((error: any) => {
          console.log(error)
        })
      }
    })
  }

  public goRegist = (e: any) => {
    e.preventDefault()
    this.props.history.push('/regist')
  }

  public render () {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="login-main">
        <div className="login-form">
          <div className="logo"></div>
          <Form onSubmit={this.login}>
            <Form.Item>
              {
                getFieldDecorator('username', {
                  rules: [{
                    message: '用户名不能为空',
                    required: true
                  }]
                })(
                  <Input 
                    prefix={<Icon type="user" className="placeholder-color" />}
                    placeholder="请输入用户名"
                  />
                )
              }
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('password', {
                  rules: [{
                    message: '密码不能为空',
                    required: true
                  }],
                })(
                <Input
                  prefix={<Icon type="lock" className="placeholder-color" />}
                  type="password"
                  placeholder="请输入密码"
                />,
              )}
            </Form.Item>
            <Form.Item>
              <div className="forgot-box">
                {
                  getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true
                  })(
                  <Checkbox>记住密码</Checkbox>)
                }
                  <a className="login-form-forgot" href="">
                    忘记密码
                  </a>
              </div>
              <div className="sub-box">
                <Button type="primary" htmlType="submit" className="login-form-button">
                  登录
                </Button>
                <a href="" onClick={this.goRegist}>注册</a>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

export default Form.create()(Login)