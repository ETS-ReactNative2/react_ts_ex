import * as React from 'react'
import { observable } from 'mobx'

import Beans from 'src/beans'

export default class Home extends React.Component<{}, {}> {

  @observable public totalNum: number = 4900000
  @observable public mpMap = [
    {
      icon: 'hh'
    }
  ]

  public render () {
    return (
      <div className="tx-home-main">
        <div className="home-con">
          <div className="home-logo"></div>
          <div className="home-total">
            <span>全部玩家</span>
            <span>{this.totalNum}</span>
          </div>
          <div className="mp-num">
            {
              Beans.MP_MAP.map((item: any, index: number) => {
                return (
                  <div 
                    className={`mp-item ${item.icon}-icon`}
                    key={index}>
                    <i></i>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}