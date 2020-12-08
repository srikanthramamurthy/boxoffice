import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '.';

test('renders Movie World BoxOffice', () => {
  render(<App />);
  const linkElement = screen.getByText(/Movie World BoxOffice/i);
  expect(linkElement).toBeInTheDocument();
});
