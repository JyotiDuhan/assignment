import React                            from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Header }                       from '$COMPONENTS'
import { MainContainer, CartContainer, ProductDetailsContainer } from '$CONTAINERS'

const routes = (
  <BrowserRouter>
    <div className='app'>
      <Header />
      <Switch>
        <Route exact={true} path='/' component={MainContainer} />
        <Route path='/cart' component={CartContainer} />
        <Route path='/products/:prodID' component={ProductDetailsContainer} />
      </Switch>
    </div>
  </BrowserRouter>
)

export default routes
