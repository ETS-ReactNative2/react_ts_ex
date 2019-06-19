import { observer, inject } from 'mobx-react'
import {
  Form,
  Tooltip,
  Icon,
  Input,
  Button,
  message
} from 'antd'
import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { UserService } from 'src/services/user'
import { observable } from 'mobx'

interface RegistProps extends RouteComponentProps {
  form: any,
  userService: UserService
}

@inject('userService')
@observer
export class Register extends React.Component<RegistProps, {}> {

  public userService !: UserService
  @observable public isSend: boolean = false
  @observable public time: number = 60
  @observable public phoneCheckBtnName: string = '获取验证码'

  public state: {
    confirmDirty: boolean,
    autoCompleteResult: any[]
  } = {
    confirmDirty: false,
    autoCompleteResult: []
  }

  constructor (props: any) {
    super(props)
    this.userService = props.userService
  }

  public regist = (e: any) => {
    e.preventDefault()
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        if (!this.isSend) {
          message.error('请获取验证码！！')
        } else {
          this.userService.register({
            ...values,
            code: undefined,
            confirm: undefined
          }).then((res: any) => {
            if (res.status === 0) {
              message.success('注册成功')
              this.props.history.push('/login')
            } else {
              message.error(res.msg || '注册失败')
            }
          }).catch((error: any) => {
            console.log(error)
          })
        }
      }
    })
  }

  public reset = (e: any) => {
    e.preventDefault()
    this.props.form.resetFields()
  }

  public goLogin = (e: any) => {
    e.preventDefault()
    this.props.history.push('/login')
  }

  public validateToNextPassword = (rule: any, value: string, callback: Function) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  public compareToFirstPassword = (rule: any, value: string, callback: Function) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码不一致！')
    } else {
      callback()
    }
  }

  public validatePhone = (rule: any, value: string, callback: Function) => {
    const reg: RegExp = /^1(3|4|5|7|8)\d{9}$/
    if (value && !reg.test(value)) {
      callback('手机号不合法！')
    } else {
      callback()
    }
  }

  public handleConfirmBlur = (e: any) => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  public sendCode = (e: any) => {
    if (!this.props.form.getFieldValue('phone')) {
      message.error('手机号不能为空')
    } else {
      this.userService.sendMsg({
        phone: this.props.form.getFieldValue('phone')
      }).then((res: any) => {
        console.log(res)
        if (res.status === 0) {
          this.isSend = true
          const interval = window.setInterval(() => {
            this.phoneCheckBtnName = `(${this.time}秒)后重新发送`
            this.time = --this.time
            if (this.time <= 0) {
              this.phoneCheckBtnName = '重新发送'
              this.time = 60
              window.clearInterval(interval)
            }
          }, 1000)
        } else {
          this.phoneCheckBtnName = '重新发送'
          this.time = 60
          this.isSend = false
          message.error(res.msg || '发送失败')
        }
      }, (error: any) => {
        this.isSend = false
        message.error(error.msg || '发送失败')
      })
    }
  }

  public render () {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="regist-main">
        <div className="regist-form">
          <Form onSubmit={this.regist}>
            <Form.Item
              label={
                <span>
                  昵称
                  <Tooltip title="你想告诉别人的名字?">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
            >
              {
                getFieldDecorator('nickname', {
                  rules: [
                    {
                      required: true,
                      message: '昵称不能为空'
                    }
                  ]
                })(<Input placeholder="请输入昵称" />)
              }
            </Form.Item>
            <Form.Item label="用户名">
              {
                getFieldDecorator('username', {
                  rules: [
                    {
                      required: true,
                      message: '用户名不能为空'
                    }
                  ]
                })(<Input placeholder="请输入用户名" />)
              }
            </Form.Item>
            <Form.Item label="密码" hasFeedback>
              {
                getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: '密码不能为空'
                    },
                    {
                      validator: this.validateToNextPassword
                    }
                  ]
                })(<Input.Password placeholder="请输入密码" />)
              }
            </Form.Item>
            <Form.Item label="再次输入" hasFeedback>
              {
                getFieldDecorator('confirm', {
                  rules: [
                    {
                      required: true,
                      message: '再次输入密码不能为空'
                    },
                    {
                      validator: this.compareToFirstPassword,
                    }
                  ]
                })(<Input.Password placeholder="请再次输入" onBlur={this.handleConfirmBlur} />)
              }
            </Form.Item>
            <Form.Item label="手机">
              {
                getFieldDecorator('phone', {
                  rules: [
                    {
                      required: true,
                      message: '手机不能为空'
                    },
                    {
                      validator: this.validatePhone
                    }
                  ]
                })(<Input placeholder="请输入手机号" addonAfter={
                  <div className="code-btn" onClick={
                    this.sendCode
                  }>
                    {this.phoneCheckBtnName}
                  </div>
                } />)
              }
            </Form.Item>
            {
              (this.isSend) ? (
                <Form.Item label="验证码">
                  {
                    getFieldDecorator('code', {
                      rules: [
                        {
                          required: true,
                          message: '验证码不能为空',
                          whitespace: true
                        }
                      ]
                    })(<Input placeholder="请输入验证码" />)
                  }
                </Form.Item>
              ) : (null)
            }
            <Form.Item>
              <div className="rigist-box">
                <Button type="primary" htmlType="submit" onClick={this.regist}>注册</Button>
                <Button type="primary" onClick={this.reset}>重置</Button>
              </div>
              <div className="login-con">
                <span>
                  已有账号，去<em onClick={this.goLogin}>登录</em>
                </span>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

export default Form.create()(Register)