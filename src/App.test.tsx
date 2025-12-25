import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
// Mock child components to avoid testing their internals
jest.mock('./components/Home/Home',()=><div data-testid="home">Home Mock</div>)
jest.mock('./components/Grid/Grid',()=><div data-testid="grid">Grid Mock</div>)
jest.mock('./components/TrafficLight/TrafficLight',()=><div data-testid="traffic">Traffic Mock</div>)

describe('App routing',()=>{
  const renderWithRoute=(initialEntries=["/"])=>{
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <App/>
      </MemoryRouter>
    )
  }
})
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
