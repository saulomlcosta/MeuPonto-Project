import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Cadastro from './pages/Cadastro';
import Ponto from './pages/Ponto';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        <Route path="/cadastro" component={Cadastro} />
        <Route path="/ponto" component={Ponto} />
      </Switch>
    </BrowserRouter>
  )
}