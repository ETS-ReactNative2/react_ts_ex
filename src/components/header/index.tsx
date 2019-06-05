import * as React from 'react'

export default class HeaderNav extends React.Component<{}, {}> {
  
  public render () {
    return (
      <div className="header-main">
        <div className="header-left"></div>
        <div className="header-con"></div>
        <div className="header-right"></div>
      </div>
    )
  }
}