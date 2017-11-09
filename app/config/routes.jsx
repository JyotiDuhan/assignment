import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Nav from '$APP/Nav'
import { MainContainer, UsersContainer } from '$CONTAINERS'
import TestContainer from '$APP/TestContainer'

const routes = (
  <BrowserRouter>
    <div className='app'>
      <Switch>
        <Route exact={true} path='/' component={MainContainer} />
        <Route path='/users' component={TestContainer} />
      </Switch>
    </div>
  </BrowserRouter>
)

export default routes
