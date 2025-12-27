import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders main search heading', () => {
  render(<App />);

  expect(screen.getByText(/Believe in Finding it/i)).toBeInTheDocument();
});
