import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import QuantitySelector from '../components/QuantitySelector';

it('Render QuantitySelector', () => {
  render(
    <QuantitySelector addtocart={() => {}} />,
  );

  const buttonPlus = screen.getByRole('button', { name: '+' });
  const buttonMinus = screen.getByRole('button', { name: '-' });
  const qtyInput = screen.getByLabelText('QTY:');

  expect(buttonPlus).toBeInTheDocument();
  expect(buttonMinus).toBeInTheDocument();
  expect(qtyInput).toBeInTheDocument();
  expect(qtyInput.value).toBe('1');
});

describe('Shop Controller input and buttons', () => {
  it('Handle positive integer input', () => {
    render(<QuantitySelector addtocart={() => {}} />);
    const qtyInput = screen.getByLabelText('QTY:');

    userEvent.type(qtyInput, '0');
    expect(qtyInput.value).toBe('10');
    userEvent.type(qtyInput, '1');
    expect(qtyInput.value).toBe('101');
  });

  it('Handle non integer input / negative (should be ignored)', () => {
    render(<QuantitySelector addtocart={() => {}} />);
    const qtyInput = screen.getByLabelText('QTY:');

    // If an negative number is enterer, convert it to pos
    userEvent.type(qtyInput, '{arrowleft}-5');
    expect(qtyInput.value).toBe('51');

    // If an non-integer is typed, should come back to his previous value
    userEvent.type(qtyInput, 'qe');
    expect(qtyInput.value).toBe('51');
  });

  it('+ button should increase QTY input value', () => {
    render(
      <QuantitySelector addtocart={() => {}} />,
    );

    const qtyInput = screen.getByLabelText('QTY:');
    const buttonIncreaseQty = screen.getByRole('button', { name: '+' });

    userEvent.type(buttonIncreaseQty, 'click');
    userEvent.type(buttonIncreaseQty, 'click');

    expect(qtyInput.value).toBe('3');
  });

  it('- button should decrease QTY input value', () => {
    render(
      <QuantitySelector addtocart={() => {}} />,
    );

    const qtyInput = screen.getByLabelText('QTY:');
    const buttonIncreaseQty = screen.getByRole('button', { name: '+' });
    const buttonDecreaseQty = screen.getByRole('button', { name: '-' });

    // Increase value to 3
    userEvent.type(buttonIncreaseQty, 'click');
    userEvent.type(buttonIncreaseQty, 'click');

    // Decrease value to 2
    userEvent.type(buttonDecreaseQty, 'click');
    expect(qtyInput.value).toBe('2');

    // QTY can not be < 1
    userEvent.type(buttonDecreaseQty, 'click');
    userEvent.type(buttonDecreaseQty, 'click');
    expect(qtyInput.value).toBe('1');
  });
});
