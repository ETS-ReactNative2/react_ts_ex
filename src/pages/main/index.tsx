import * as React from 'react'
import { Route, Switch, RouteComponentProps, Redirect } from 'react-router'

import Home from './home'
import Person from './person'
import TX from './tx'
import HeaderNav from '../../components/header'

export default class Main extends React.Component<RouteComponentProps<{}>, {}> {

  public render () {
    const location = this.props.location
    return (
      <div className="main" >
        <HeaderNav />
        <div className="main-body">
          <div className="main-route">
            <Switch location={location}>
              <Route
                path="/main/home"
                component={Home}
              />
              <Route
                path="/main/person"
                component={Person}
              />
              <Route
                path="/main/tx"
                component={TX}
              />
              <Redirect to="/main/home" />
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}