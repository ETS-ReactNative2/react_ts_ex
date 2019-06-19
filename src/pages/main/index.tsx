import * as React from 'react'
import { Route, Switch, RouteComponentProps, Redirect } from 'react-router'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Home from './home'
import Person from './person'
import TX from './tx'
import HeaderNav from '../../components/header'

interface MainProps {
  name?: string
}
export default class Main extends React.Component<MainProps & RouteComponentProps<{}>, {}> {

  public render () {
    const location = this.props.location
    const { pathname } = location
    return (
      <div className="main" >
        <HeaderNav />
        <div className="main-body">
          <TransitionGroup className="main-route">
            <CSSTransition
              key={pathname.split('/')[2]}
              timeout={{ enter: 1000, exit: 0 }}
              classNames={'fade'}>
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
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
    )
  }
}