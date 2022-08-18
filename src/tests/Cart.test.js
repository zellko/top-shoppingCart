import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Cart from '../components/Cart';

// Fake data
const fakeCart = [
  [2,
    {
      name: 'Test Name', type: 'Test Type', price: 100, id: 1,
    },
  ],
];

const fakeCart2 = [
  [2,
    {
      name: 'Test Name', type: 'Test Type', price: 100, id: 1,
    },
  ],
  [1,
    {
      name: 'Test Name3', type: 'Test Type', price: 200, id: 2,
    },
  ],
  [3,
    {
      name: 'Test Name5', type: 'Test Type', price: 100, id: 3,
    },
  ],
];

describe('Cart component tests', () => {
  it('render Cart header', () => {
    render(
      <Cart cart={fakeCart} onRemoveItem={() => {}} />,
    );

    const cartHeader = screen.getByRole('heading', { name: 'Your shopping cart' });
    const cartHeaderProduct = screen.getByText('PRODUCT');
    const cartHeaderPrice = screen.getByText('PRICE');
    const shopHeaderSubtotal = screen.getByText('SUBTOTAL');
    expect(cartHeader.textContent).toMatch(/Your shopping cart/i);
    expect(cartHeaderProduct.textContent).toMatch(/PRODUCT/i);
    expect(cartHeaderPrice.textContent).toMatch(/PRICE/i);
    expect(shopHeaderSubtotal.textContent).toMatch(/SUBTOTAL/i);
  });

  it('render Cart items', () => {
    render(
      <Cart cart={fakeCart} onRemoveItem={() => {}} />,
    );

    const cartItem = screen.getByText('Test Name');
    const cartPrice = screen.getAllByText('$100');
    const cartSubtotal = screen.getAllByText('$200');

    expect(cartItem).toBeInTheDocument();
    expect(cartPrice[0]).toBeInTheDocument();
    expect(cartSubtotal[0]).toBeInTheDocument();
  });

  it('Handle empty cart', () => {
    render(
      <Cart cart={[]} onRemoveItem={() => {}} />,
    );

    const cartItem = screen.getByRole('heading', { name: 'Your shopping cart is empty' });

    expect(cartItem).toBeInTheDocument();
  });

  it('render Cart total', () => {
    render(
      <Cart cart={fakeCart2} onRemoveItem={() => {}} />,
    );

    const cartTotal = screen.getByText('TOTAL');
    const cartTotalSum = screen.getByText('$700');
    const cartCheckoutBtn = screen.getByRole('button', { name: 'Checkout' });
    expect(cartTotal).toBeInTheDocument();
    expect(cartTotalSum).toBeInTheDocument();
    expect(cartCheckoutBtn).toBeInTheDocument();
  });

  it('Cart items: Remove button', () => {
    const mockFunction = jest.fn();
    render(
      <Cart cart={fakeCart} onRemoveItem={mockFunction} />,
    );

    const removeButton = screen.getByRole('button', { name: 'Remove' });
    userEvent.click(removeButton);

    expect(removeButton).toBeInTheDocument();
    expect(mockFunction).toHaveBeenCalled();
  });

  it('Cart items: Remove button return item', () => {
    let returnedItem;

    const mockFunction = (item) => {
      returnedItem = item;
    };

    render(
      <Cart cart={fakeCart} onRemoveItem={mockFunction} />,
    );

    const removeButton = screen.getByRole('button', { name: 'Remove' });
    userEvent.click(removeButton);

    expect(returnedItem).toStrictEqual(fakeCart[0][1]);
  });

  it('Cart items: Quantity Selector', () => {
    render(
      <Cart cart={fakeCart} onRemoveItem={() => {}} onUpdateQuanity={() => {}} />,
    );

    const qtyInput = screen.getByLabelText('QTY:');

    expect(qtyInput).toBeInTheDocument();
  });

  it('Cart items: Quantity Selector. Should call is function', () => {
    const mockFunction = jest.fn();
    render(
      <Cart cart={fakeCart} onRemoveItem={() => {}} onUpdateQuantity={mockFunction} />,
    );

    const qtyInput = screen.getByLabelText('QTY:');
    userEvent.type(qtyInput, '55');

    expect(mockFunction).toHaveBeenCalledTimes(2);
  });

  it('Cart items: Quantity Selector. Should return item and new quantity', () => {
    let returnedQty;
    let returnedItem;

    const mockFunction = (qty, item) => {
      returnedQty = qty;
      returnedItem = item;
    };

    render(
      <Cart cart={fakeCart} onRemoveItem={() => {}} onUpdateQuantity={mockFunction} />,
    );

    const qtyInput = screen.getByLabelText('QTY:');
    userEvent.type(qtyInput, '55');

    expect(returnedQty).toBe(255);
    expect(returnedItem).toStrictEqual(fakeCart[0][1]);
  });
});
