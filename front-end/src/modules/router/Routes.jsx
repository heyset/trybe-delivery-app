import React from 'react';
import { Routes as ReactRouterRoutes, Route } from 'react-router-dom';

import Checkout from '../checkout';
import Home from '../home';
import Login from '../login';
import Logout from '../logout';
import { CustomerOrders } from '../orders';
import { Products } from '../products';
import Register from '../register';

export default function Routes() {
  return (
    <ReactRouterRoutes>
      <Route exact path="/" element={ <Home /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/customer/products" element={ <Products /> } />
      <Route path="/customer/checkout" element={ <Checkout /> } />
      <Route path="/customer/logout" element={ <Logout /> } />
      <Route path="/customer/orders/:orderId" element={ <main><h1>Pedido!</h1></main> } />
      <Route path="/customer/orders" element={ <CustomerOrders /> } />
    </ReactRouterRoutes>
  );
}
