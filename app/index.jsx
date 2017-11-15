import React           from 'react'
import ReactDOM        from 'react-dom'
import { Provider }    from 'react-redux'
import thunk           from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'

import routes          from '$CONFIG/routes'
import * as reducers   from '$REDUX'

const store = createStore(
  combineReducers(reducers),
  compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : (func) => func)
)

ReactDOM.render(
  <Provider store={store}>
    {routes}
  </Provider>, document.getElementById('root')
)

