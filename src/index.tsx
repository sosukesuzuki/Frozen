import * as ReactDOM from 'react-dom'
import * as React from 'react'
import 'normalize-css'
import App from './components/App'

;(async () => {
  ReactDOM.render(
    <App />,
    document.querySelector('.root')
  )
})().catch(err => console.error(err))
