import React from 'react';

import { Button } from '../buttons';
import { Heading } from '../text';
import Layout from '../layout';

import { useProducts } from '../products';
import { useShoppingCart } from '../shoppingCart';

import CheckoutForm from './CheckoutForm.view';

export default function Checkout() {
  const { products } = useProducts();
  const { cartState, total, setItemQuantity } = useShoppingCart();

  const renderTableHead = () => (
    <thead>
      <tr>
        <th>Num</th>
        <th>Produto</th>
        <th>Quantidade</th>
        <th>Preço Unitário</th>
        <th>Preço Total</th>
        <th>Remover Item</th>
      </tr>
    </thead>
  );

  const renderTableBody = () => {
    if (cartState.size === 0) {
      return <Heading level={ 2 }>Seu carrinho está vazio!</Heading>;
    }

    const testIds = {
      productNumber: 'customer_checkout__element-order-table-item-number',
      productName: 'customer_checkout__element-order-table-name',
      productQuantity: 'customer_checkout__element-order-table-quantity',
      productPrice: 'customer_checkout__element-order-table-unit-price',
      productTotal: 'customer_checkout__element-order-table-sub-total',
      productRemove: 'customer_checkout__element-order-table-remove',
    };

    return (
      <tbody>
        {
          products && Array.from(cartState.entries()).map(([productId, quantity],
            index) => {
            const product = products.find((p) => p.id === productId);

            return (
              <tr key={ productId }>
                <td data-testid={ `${testIds.productNumber}-${index}` }>
                  { index + 1 }
                </td>
                <td data-testid={ `${testIds.productName}-${index}` }>
                  { product.name }
                </td>
                <td data-testid={ `${testIds.productQuantity}-${index}` }>
                  { quantity }
                </td>
                <td data-testid={ `${testIds.productPrice}-${index}` }>
                  { product.price.replace('.', ',') }
                </td>
                <td data-testid={ `${testIds.productTotal}-${index}` }>
                  { (product.price * quantity).toFixed(2).replace('.', ',') }
                </td>
                <td>
                  <Button
                    onClick={ () => setItemQuantity({ id: productId, quantity: 0 }) }
                    testId={ `${testIds.productRemove}-${index}` }
                  >
                    Remover
                  </Button>
                </td>
              </tr>
            );
          })
        }
      </tbody>
    );
  };

  return (
    <Layout context="customer">
      <main>
        <Heading level={ 1 }>Finalizar pedido</Heading>
        <section>
          <table>
            { renderTableHead() }
            { renderTableBody() }
          </table>
          <div>
            <span>Total: </span>
            <span>R$ </span>
            <span data-testid="customer_checkout__element-order-total-price">
              { total.toFixed(2).replace('.', ',') }
            </span>
          </div>
        </section>
        <section>
          <CheckoutForm />
        </section>
      </main>
    </Layout>
  );
}
