import * as React from 'react'
import {
  Menu,
  Icon
} from 'antd'
import { observable } from 'mobx'
import { Route, Switch, RouteComponentProps, Redirect } from 'react-router'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Utils from 'src/utils'
import Home from './home'
import Hero from './hero'
import Count from './count'

export default class TX extends React.Component<RouteComponentProps<{}>, {}> {

  @observable public current: string = 'home'
  @observable public pathMap: any = {
    home: '/main/tx',
    hero: '/main/tx/hero',
    count: '/main/tx/count'
  }

  constructor (props: any) {
    super(props)
    if (this.props.location.pathname === this.pathMap.home) {
      this.current = 'home'
    } else {
      const math: string[] = Utils.getMapKeyByValue(
        {
          ...this.pathMap,
          home: undefined
        }, this.props.location.pathname)
      if (math.length > 0) {
        this.current = math[0]
      }
    }
  }

  public chooseMenu = (e: any) => {
    this.current = e.key
    this.props.history.push(this.pathMap[e.key])
  }

  public render () {
    const location = this.props.location
    return (
      <div className="main-tx">
        <Menu
          className="menu-main"
          selectedKeys={[this.current]}
          onClick={this.chooseMenu}
          mode="inline">
            <Menu.Item
              key="home">
                <Icon type="home" />
                <span className="menu-title">首页</span>
            </Menu.Item>
            <Menu.Item
              key="hero">
                <Icon type="ordered-list" />
                <span className="menu-title">英雄榜查询</span>
            </Menu.Item>
            <Menu.Item
              key="count">
                <Icon type="pie-chart" />
                <span className="menu-title">统计</span>
            </Menu.Item>
        </Menu>
        <div className="tx-right">
          <TransitionGroup
            className="main-route">
              <CSSTransition
              key={location.key}
              timeout={1000}
              classNames={'fade'}>
                <Switch location={location}>
                  <Route
                    exact
                    path={this.pathMap.home}
                    component={Home}
                  />
                  <Route
                    exact
                    path={this.pathMap.hero}
                    component={Hero}
                  />
                  <Route
                    exact
                    path={this.pathMap.count}
                    component={Count}
                  />
                  <Redirect to="/main/tx" />
                </Switch>
              </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
    )
  }
}