import React from 'react';
import { Link } from 'react-router-dom';

import * as localStorage from '../../localStorage';

export default function SellerNavbar() {
  return (
    <nav>
      <div>
        <Link
          data-testid="customer_products__element-navbar-link-orders"
          to="/seller/orders"
        >
          Minhas vendas
        </Link>
      </div>
      <div>
        <Link
          data-testid="customer_products__element-navbar-user-full-name"
          to="/seller/profile"
        >
          { localStorage.get('user').name }
        </Link>
        <Link
          data-testid="customer_products__element-navbar-link-logout"
          to="/seller/logout"
        >
          Sair
        </Link>
      </div>
    </nav>
  );
}
