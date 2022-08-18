import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('App component test', () => {
  it('render Home page', () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });

  it('render Shop page', async () => {
    const { container } = render(<App />);

    const homeButton = screen.getByRole('button', { name: 'Go Shopping' });
    expect(homeButton).toBeInTheDocument();

    userEvent.click(homeButton);

    await waitFor(() => screen.getByRole('heading', { name: 'PRODUCT' }));

    const shopHeading = screen.getByRole('heading', { name: 'PRODUCT' });

    expect(shopHeading).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('render Cart page', async () => {
    const { container } = render(<App />);

    const cartButton = screen.getAllByRole('link')[2];
    expect(cartButton).toBeInTheDocument();

    userEvent.click(cartButton);

    await waitFor(() => screen.getByRole('heading', { name: 'Your shopping cart is empty' }));

    const cartHeading = screen.getByRole('heading', { name: 'Your shopping cart is empty' });

    expect(cartHeading).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
