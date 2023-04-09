import { render, screen } from '@testing-library/react';
import App from './App';

test('is craig gunson there', () => {
  render(<App />);
  const linkElement = screen.getByText('Craig Gunson');
  expect(linkElement).toBeInTheDocument();
});
