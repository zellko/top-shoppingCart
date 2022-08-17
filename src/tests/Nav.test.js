import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Nav from '../components/Nav';

describe('Nav component tests', () => {
  it('render Nav', () => {
    const { container } = render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>,
    );

    expect(container).toMatchSnapshot();
  });
});
