import React from 'react';
import { render, screen } from '@testing-library/react';
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

test('filters by search term (location)', async () => {
  mockFetchOnceWith(mockProperties);

  const user = userEvent.setup();
  render(<App />);

  // wait until data appears
  await screen.findByText(/Petts Wood Road/i);
  await screen.findByText(/Crofton Road/i);

  // type into search
  const searchInput = screen.getByLabelText(/Search Gadget or Location/i);
  await user.clear(searchInput);
  await user.type(searchInput, 'Petts Wood');

  // should keep Petts Wood, hide Crofton
  expect(screen.getByText(/Petts Wood Road/i)).toBeInTheDocument();
  expect(screen.queryByText(/Crofton Road/i)).not.toBeInTheDocument();
});

test('filters by property type (House/Flat)', async () => {
  mockFetchOnceWith(mockProperties);

  const user = userEvent.setup();
  render(<App />);

  // wait until data appears
  await screen.findByText(/Petts Wood Road/i);
  await screen.findByText(/Crofton Road/i);

  const typeSelect = screen.getByLabelText(/Property Type/i);

  // choose House
  await user.selectOptions(typeSelect, 'House');

  expect(screen.getByText(/Petts Wood Road/i)).toBeInTheDocument();
  expect(screen.queryByText(/Crofton Road/i)).not.toBeInTheDocument();

  // choose Flat
  await user.selectOptions(typeSelect, 'Flat');

  expect(screen.getByText(/Crofton Road/i)).toBeInTheDocument();
  expect(screen.queryByText(/Petts Wood Road/i)).not.toBeInTheDocument();
});
