import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Nav from '$APP/Nav'
import { MainContainer } from '$CONTAINERS'
import TestContainer from '$APP/TestContainer'

const routes = (
  <BrowserRouter>
    <div className='app'>
      <Switch>
        <Route exact={true} path='/' component={MainContainer} />
        <Route path='/link-2' component={TestContainer} />
        <Route path='/link-3' component={TestContainer} />
      </Switch>
    </div>
  </BrowserRouter>
)

export default routes
