import * as React from 'react'
import { Route, Switch, RouteComponentProps } from 'react-router'

import Home from './home'
import HeaderNav from '../../components/header'

export interface MainProps extends RouteComponentProps<{}> {
}

export default class Main extends React.Component<MainProps, {}> {

  public render () {
    return (
      <div className="main" >
        <HeaderNav />
        <Switch>
          <Route
            exact={true}
            strict={true}
            component={Home}
          />
          <Route
            path="/home"
            component={Home}
          />
        </Switch>
      </div>

    )
  }
}