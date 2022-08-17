import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Button from '../components/Button';

describe('Button component', () => {
  it('Render Button with correct name', () => {
    render(
      <Button name="TestName" onAddToCart={() => {}} />,
    );

    const button = screen.getByRole('button', { name: 'TestName' });

    expect(button).toBeInTheDocument();
  });

  it('Call function when clicked', () => {
    const mockFunction = jest.fn();
    render(
      <Button name="TestName" onAddToCart={mockFunction} />,
    );
    const button = screen.getByRole('button', { name: 'TestName' });

    userEvent.click(button);

    expect(mockFunction).toHaveBeenCalled();
  });
});
