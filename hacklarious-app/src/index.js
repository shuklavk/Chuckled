import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Display from './components/Display';
import {useRoutes} from 'hookrouter';
import Routes from './components/Router'
import { BrowserRouter, Route } from 'react-router-dom'

function Appz() {
  const routeResult = useRoutes(Routes)
  return routeResult
}

ReactDOM.render(
  <BrowserRouter>
    <div>
        <Route exact path="/" component={App} />
        <Route path="/joke">
          <Display img={"https://storage.googleapis.com/hacklarious/current.jpg"}/>
        </Route>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
)

