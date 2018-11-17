import * as ReactDOM from 'react-dom'
import * as React from 'react'

;(async () => {
  ReactDOM.render(
    <h1>Frozen</h1>,
    document.querySelector('.root')
  )
})().catch(err => console.error(err))
