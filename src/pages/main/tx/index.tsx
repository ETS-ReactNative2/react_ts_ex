import * as React from 'react'
import {
  Menu,
  Icon
} from 'antd'
import { observable } from 'mobx'
import { Route, Switch, RouteComponentProps, Redirect } from 'react-router'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

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