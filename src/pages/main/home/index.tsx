import { inject, observer } from 'mobx-react'
import * as React from 'react'
import Swiper from 'swiper'

@inject('home')
@observer
export default class Home extends React.Component<{}, {}> {

  public sliderList: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
  constructor (props: any) {
    super(props)
  }

  public componentDidMount () {
    new Swiper('.swiper-container', {
      effect : 'coverflow',
      slidesPerView: 3,
      centeredSlides: true,
      coverflowEffect: {
        rotate: 30,
        stretch: 10,
        depth: 60,
        modifier: 2,
        slideShadows : true
      },
      direction: 'horizontal',
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable : true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    })
  }

  public render () {
    return (
      <div className="home-body">
        <div className="swiper-container">
          <div className="swiper-wrapper">
            {
              this.sliderList.map(
                (item: any, index: number) =>
                  <div className="swiper-slide" key={index}>
                    <div className={`img-box home-bg${index + 1}`}></div>
                  </div>
              )
            }
          </div>
          <div className="swiper-pagination"></div>
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </div>
      </div>
    )
  }
}
