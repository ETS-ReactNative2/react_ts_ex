import { inject, observer } from 'mobx-react'
import * as React from 'react'

@inject('home')
@observer
export default class Home extends React.Component<{}, {}> {

  constructor (props: any) {
    super(props)
  }

  public render () {
    return (
      <div>home</div>
    )
  }
}
