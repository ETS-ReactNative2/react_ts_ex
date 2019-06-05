import { createBrowserHistory } from 'history'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import * as React from 'react'
import { Route, Router, Switch } from 'react-router'

import Login from '../pages/login'
import Regist from '../pages/regist'
import Main from '../pages/main'

const browserHistory = createBrowserHistory()
const routerStore = new RouterStore()
const history = syncHistoryWithStore(browserHistory, routerStore)

export default class AppRouter extends React.Component<{}, {}> {
  public render () {
    return (
      <Router history={history}>
        <Switch>
          <Route
            path="/"
            exact={true}
            strict={true}
            component={Main}
          />
          <Route
            path="/main"
            component={Main}
          />
          <Route
            path="/login"
            component={Login}
          />
          <Route
            path="/regist"
            component={Regist}
          />
        </Switch>
      </Router>
    )
  }
}