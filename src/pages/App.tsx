import * as React from 'react'
import { inject } from 'mobx-react'

@inject('user')
class App extends React.Component<{}, {}> {

  constructor (props: any) {
    super(props)
    if (!props.user.getAccount()) {
      if (location.pathname !== '/login') {
        location.replace('/login')
      }
    }
  }

  public renderDevTool () {
    if (process.env.NODE_ENV !== 'production') {
      const DevTools = require('mobx-react-devtools').default
      return (<DevTools />)
    }
    return null
  }

  public render () {
    return (
      <div className="app">
        {this.props.children}
        {this.renderDevTool()}
      </div>
    )
  }
}

export default App
