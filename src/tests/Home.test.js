import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Home from '../components/Home';

describe('Home component tests', () => {
  it('Render imageDiv, Title, Button ', () => {
    const { container } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );

    const image = container.querySelector('.home-logo');
    const homeTitle = screen.getByRole('heading', { name: 'ShapeShop' });
    const homeButton = screen.getByRole('button', { name: 'Go Shopping' });

    expect(image).toBeInTheDocument();
    expect(homeTitle).toBeInTheDocument();
    expect(homeButton).toBeInTheDocument();
  });
});
