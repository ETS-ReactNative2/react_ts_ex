import { Provider } from 'mobx-react'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import 'antd/dist/antd.css'
import 'swiper/dist/css/swiper.min.css'
import './assets/sass/main.scss'
import registerServiceWorker from './pwa/registerServiceWorker'
import Routers from './router'
import App from './pages/App'

import stores from './stores'
import services from './services'

ReactDOM.render(
  <Provider {...stores} {...services}>
    <App>
      <Routers />
    </App>
  </Provider>,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
