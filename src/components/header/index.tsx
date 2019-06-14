import * as React from 'react'
import {
  Icon,
  Menu
} from 'antd'
import { inject, observer } from 'mobx-react'
import { observable } from 'mobx'
import { RouteComponentProps, withRouter } from 'react-router'

import Utils from 'src/utils'

@inject('user')
@observer
class HeaderNav extends React.Component<RouteComponentProps<{}>, {}> {

  public pathMap: any = {
    home: '/main/home',
    tx: '/main/tx',
    person: '/main/person'
  }
  @observable public userData !: any
  @observable public current: string = 'home'

  constructor (props: any) {
    super(props)
    this.userData = props.user.getAccount()
    console.log(this.props.location)
    const math: string[] = Utils.getMapKeyByValue(this.pathMap, this.props.location.pathname)
    console.log(math)
    if (math.length > 0) {
      this.current = math[0]
    }
  }

  public chooseMenu = (e: any): void => {
    this.current = e.key
    this.props.history.push(this.pathMap[e.key])
  }
  
  public render () {
    return (
      <div className="header-main">
        <div className="header-body">
          <div className="header-left">
            <div className="logo"></div>
          </div>
          <div className="header-con">
            <div className="menu-box">
              <Menu onClick={this.chooseMenu} className="menu-con" mode="horizontal" selectedKeys={[this.current]}>
                <Menu.Item key="home">
                  <span>首页</span>
                </Menu.Item>
                <Menu.Item key="tx">
                  <span>天下盒子</span>
                </Menu.Item>
                <Menu.Item key="person">
                  <span>个人中心</span>
                </Menu.Item>
              </Menu>
            </div>
          </div>
          <div className="header-right">
            <div className="user-con">
              <span className="user-icon">
                <Icon type="user" />
              </span>
              <span className="user-text">
                {this.userData ? this.userData.nickname : '未知'}
              </span>
            </div>
            <div className="user-op">
              <Icon type="setting" theme="twoTone" />
              <Icon type="poweroff" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(HeaderNav)