import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Shop from '../components/Shop';
import Button from '../components/Button';

// Fake data
const data = [{
  name: 'Test Name', type: 'Test Type', price: 999, id: 1,
}];

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Shop component tests', () => {
  it('render shop header', () => {
    render(
      <Shop />,
    );

    const shopHeaderProduct = screen.getByRole('heading', { name: 'PRODUCT' });
    const shopHeaderPrice = screen.getByRole('heading', { name: 'PRICE' });
    expect(shopHeaderProduct.textContent).toMatch(/product/i);
    expect(shopHeaderPrice.textContent).toMatch(/price/i);
  });

  it('render shop items, fetched datas are valid', async () => {
    // Mock the Fetch function...
    // ... Return a valid response, with one element that must be rendered
    jest.spyOn(global, 'fetch').mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue(data),
    });

    render(
      <Shop />,
    );

    await waitFor(() => screen.getByText('Test Name'));

    const itemName = screen.getByText('Test Name');
    const itemPrice = screen.getByText('$999');

    expect(itemName.textContent).toBe('Test Name');
    expect(itemPrice.textContent).toBe('$999');
  });

  it('render shop items, fetching error', async () => {
    // Mock the Fetch function...
    // ... Return an invalid response, error should be rendered
    jest.spyOn(global, 'fetch').mockResolvedValue({
      status: 404,
      json: jest.fn().mockResolvedValue(data),
    });

    render(
      <Shop />,
    );

    await waitFor(() => screen.getByRole('heading', { name: 'Error, please try refreshing the page' }));

    const errorMessage = screen.getByRole('heading', { name: 'Error, please try refreshing the page' });
    expect(errorMessage).toBeInTheDocument();
  });

  it('render shop items, empty response', async () => {
    // Mock the Fetch function...
    // ... Return an invalid response, error should be rendered
    jest.spyOn(global, 'fetch').mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue([]),
    });

    render(
      <Shop />,
    );

    await waitFor(() => screen.getByRole('heading', { name: 'Error, please try refreshing the page' }));

    const errorMessage = screen.getByRole('heading', { name: 'Error, please try refreshing the page' });
    expect(errorMessage).toBeInTheDocument();
  });

  it('render "loading", when data are being fetched', async () => {
    // Mock the Fetch function...
    // ... Return an invalid response, error should be rendered
    jest.spyOn(global, 'fetch').mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue(data),
    });

    render(
      <Shop />,
    );

    const heading = screen.getByRole('heading', { name: 'Loading...' });
    expect(heading).toBeInTheDocument();

    // Wait for the fetch promise to exit test gracefully
    await waitFor(() => screen.getByText('Test Name'));
  });

  it('call function on "Add To Cart" on Button click', async () => {
    // Mock the Fetch function...
    // ... Return an invalid response, error should be rendered
    jest.spyOn(global, 'fetch').mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue(data),
    });

    const mockFunction = jest.fn();

    render(
      <Shop onAddToCart={mockFunction} />,
      <Button name="Add To Cart" onAddToCart={() => {}} />,
    );

    await waitFor(() => screen.getByRole('button', { name: 'Add To Cart' }));

    const button = screen.getByRole('button', { name: 'Add To Cart' });
    userEvent.click(button);

    expect(mockFunction).toHaveBeenCalled();
  });
});
