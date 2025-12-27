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

test('PropertyDetails shows Floor Plan and Map tabs', async () => {
  const user = userEvent.setup();
  render(<App />);

  // click the property link from gallery
  const links = await screen.findAllByRole('link');
  const detailsLink =
    links.find((l) => (l.getAttribute('href') || '').includes('/property/')) ||
    links[0];

  await user.click(detailsLink);

  // wait for details to load
  await screen.findByText(/Bedrooms/i);

  // tabs exist
  const floorTab = screen.getByRole('tab', { name: /floor plan/i });
  const mapTab = screen.getByRole('tab', { name: /map/i });

  // Floor Plan tab shows an image with src containing your floorPlan path
  await user.click(floorTab);
  const floorImg = screen.getByRole('img', { name: /floorplan/i });
  expect(floorImg.getAttribute('src')).toContain('images/prop1pic3small.png');

  // Map tab shows iframe
  await user.click(mapTab);
  const iframe = screen.getByTitle(/map/i);
  expect(iframe).toBeInTheDocument();
});
