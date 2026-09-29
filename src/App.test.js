import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';

const now = Math.floor(Date.now() / 1000);

const current = {
  dt: now,
  timezone: 36000,
  name: 'Sydney',
  sys: { country: 'AU', sunrise: now - 3600, sunset: now + 3600 },
  weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
  main: { temp: 18.6, feels_like: 18, temp_min: 17, temp_max: 20, humidity: 56, pressure: 1028 },
  wind: { speed: 5, deg: 90 },
  visibility: 10000,
  clouds: { all: 0 },
};

const forecast = {
  city: { timezone: 36000 },
  list: Array.from({ length: 40 }, (_, i) => ({
    dt: now + (i + 1) * 3 * 3600,
    main: { temp: 15 + (i % 8), temp_min: 14, temp_max: 22 },
    weather: [{ description: 'light rain', icon: '10d' }],
    pop: 0.5,
  })),
};

function renderApp(responder) {
  global.fetch = jest.fn((url) => Promise.resolve(responder(url)));
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  );
}

const ok = (body) => ({ ok: true, status: 200, json: () => Promise.resolve(body) });

beforeEach(() => localStorage.clear());

test('renders current weather and forecasts', async () => {
  renderApp((url) => ok(url.includes('/forecast') ? forecast : current));

  expect(await screen.findByText('Sydney, AU')).toBeInTheDocument();
  expect(screen.getByText('Clear sky')).toBeInTheDocument();
  expect(screen.getByText('5-day forecast')).toBeInTheDocument();
  expect(screen.getByText('Now')).toBeInTheDocument();
  // 5 m/s is 18 km/h
  expect(screen.getAllByText(/18 km\/h/).length).toBeGreaterThan(0);
  expect(global.fetch.mock.calls[0][0]).toContain('https://api.openweathermap.org/data/2.5/');
});

test('shows an error when the city is not found', async () => {
  renderApp(() => ({ ok: false, status: 404, json: () => Promise.resolve({}) }));

  expect(await screen.findByRole('alert')).toHaveTextContent(/couldn't find that location/i);
});
