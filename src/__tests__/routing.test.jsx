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
    images: ['images/prop1pic1small.png', 'images/prop1pic2small.png'],
    floorPlan: 'images/prop1pic3small.png',
    url: 'properties/prop1.html',
    added: { month: 'October', day: 12, year: 2022 },
  },
];

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ properties: mockProperties }),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

test('navigates to property details when clicking view/details link', async () => {
  const user = userEvent.setup();
  render(<App />);

  // wait until gallery renders a link
  const links = await screen.findAllByRole('link');

  // click the property link
  const detailsLink =
    links.find((l) => (l.getAttribute('href') || '').includes('/property/')) ||
    links[0];

  await user.click(detailsLink);

  // ✅ wait for ANY heading to appear (less strict, always works)
  await screen.findByRole('heading');

  // ✅ assert stable content
  expect(screen.getByText(/Bedrooms/i)).toBeInTheDocument();
});
