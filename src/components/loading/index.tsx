import * as React from 'react'
import { Spin } from 'antd'
import * as Loadable from 'react-loadable'

export default class Loading extends React.Component<Loadable.LoadingComponentProps> {
  public render () {
    const loadComponent: React.ReactElement = (
        <div className="spin-main">
        <Spin tip="加载中，请稍后..." spinning delay={300} />
      </div>
    )
    if (!this.props.pastDelay) { console.log('too fast to delay') }
    return this.props.pastDelay ? loadComponent : null
  }
}
