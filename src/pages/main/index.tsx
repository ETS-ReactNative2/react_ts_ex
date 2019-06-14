import * as React from 'react'
import { Route, Switch, RouteComponentProps, Redirect } from 'react-router'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Home from './home'
import Person from './person'
import HeaderNav from '../../components/header'

interface MainProps {
  name?: string
}
export default class Main extends React.Component<MainProps & RouteComponentProps<{}>, {}> {

  public render () {
    const location = this.props.location
    return (
      <div className="main" >
        <HeaderNav />
        <div className="main-body">
          <TransitionGroup
            className="main-route">
            <CSSTransition
              key={location.key}
              timeout={1000}
              classNames={'fade'}>
                <Switch location={location}>
                  <Route
                    exact
                    path="/main/home"
                    component={Home}
                  />
                  <Route
                    exact
                    path="/main/person"
                    component={Person}
                  />
                  <Redirect to="/main/home" />
                </Switch>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
    )
  }
}