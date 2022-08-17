import {
  render, screen, renderHook, act,
} from '@testing-library/react';
import CartHook from '../components/CartHook';

// Fake data
const fakeItem = {
  name: 'Test Name', type: 'Test Type', price: 999, id: 1,
};
const fakeItem2 = {
  name: 'Test Name2', type: 'Test Type', price: 888, id: 2,
};

describe('Cart Hook function tests', () => {
  it('function addItemToCart: Should update State', async () => {
    const { result } = renderHook(() => CartHook());

    act(() => {
      result.current.addItemToCart(3, fakeItem);
    });

    expect(result.current.cart).toStrictEqual([[3, fakeItem]]);
  });

  it('function addItemToCart: Should update State. Two items', async () => {
    const { result } = renderHook(() => CartHook());

    act(() => {
      result.current.addItemToCart(3, fakeItem);
    });
    act(() => {
      result.current.addItemToCart(1, fakeItem2);
    });

    expect(result.current.cart).toStrictEqual([
      [3, fakeItem],
      [1, fakeItem2],
    ]);
  });

  it('function addItemToCart: Should update State. Handle the case when item is already in cart ', async () => {
    const { result } = renderHook(() => CartHook());

    act(() => {
      result.current.addItemToCart(3, fakeItem);
    });
    act(() => {
      result.current.addItemToCart(2, fakeItem);
    });

    expect(result.current.cart).toStrictEqual([[5, fakeItem]]);
  });

  it('function removeItemFromCart: Should update State', () => {
    const { result } = renderHook(() => CartHook());

    // Add an item
    act(() => {
      result.current.addItemToCart(3, fakeItem);
    });

    // Remove it
    act(() => {
      result.current.removeItemFromCart(fakeItem);
    });

    expect(result.current.cart).toStrictEqual([]);
  });

  it('function updateItemQty: Should update State', () => {
    const { result } = renderHook(() => CartHook());

    // Add an item
    act(() => {
      result.current.addItemToCart(5, fakeItem);
    });

    // Update is quantity
    act(() => {
      result.current.updateItemQty(2, fakeItem);
    });

    expect(result.current.cart).toStrictEqual([[2, fakeItem]]);
  });
});
