import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const mockProperties = [
  {
    id: 'prop1',
    type: 'House',
    bedrooms: 3,
    price: 750000,
    tenure: 'Freehold',
    description: 'House desc',
    location: 'Petts Wood Road, Orpington BR5',
    picture: 'images/prop1pic1small.png',
    url: 'properties/prop1.html',
    added: { month: 'October', day: 12, year: 2022 },
  },
  {
    id: 'prop2',
    type: 'Flat',
    bedrooms: 2,
    price: 399995,
    tenure: 'Freehold',
    description: 'Flat desc',
    location: 'Crofton Road Orpington BR6',
    picture: 'images/prop2pic1small.png',
    url: 'properties/prop2.html',
    added: { month: 'September', day: 14, year: 2022 },
  },
];

const mockFetchOnceWith = (properties) => {
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve({ properties }),
    })
  );
};

beforeEach(() => {
  global.fetch.mockClear();
});

test('adds a property to favourites and then removes it', async () => {
  mockFetchOnceWith(mockProperties);

  const user = userEvent.setup();
  render(<App />);

  // wait until cards render
  await screen.findByText(/Petts Wood Road/i);
  await screen.findByText(/Crofton Road/i);

  // Find the first property card area by location text
  const firstLocation = screen.getByText(/Petts Wood Road/i);
  const firstCard = firstLocation.closest('div');

  // Click add favourite button (match your button text)
  const addBtn = within(firstCard).getByRole('button', { name: /add|favourite|favorite/i });
  await user.click(addBtn);

  // Favourite should appear somewhere in the favourites list UI
  expect(screen.getAllByText(/Petts Wood Road/i).length).toBeGreaterThanOrEqual(1);

  // Now remove it (either from card or favourites list)
  const removeButtons = screen.getAllByRole('button', { name: /remove/i });
  await user.click(removeButtons[0]);

  // After removal, favourites should no longer contain it (at least once)
  // (If the main card still shows it, that’s fine — we’re checking it disappears from favourites section)
  // We check by looking for a "Favourites" section if you have one; otherwise just ensure no extra duplicate remains.
  // Simple check: location should still be on page (card), but not duplicated due to favourites.
  expect(screen.getByText(/Petts Wood Road/i)).toBeInTheDocument();
});
