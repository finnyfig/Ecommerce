import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import React from 'react';
import Products from './components/products/productList';

describe('Products', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    test('renders products when API call succeeds', async () => {
        const fakeProducts = {
            products: [
                {
                    id: 1,
                    title: 'iphone 9',
                },
                {
                    id: 2,
                    title: 'iphone 14',
                },
            ],
        };
        fetchMock.mockResolvedValue({
            status: 200,
            json: jest.fn(() => fakeProducts),
        });

        render(<Products />);

        expect(await screen.findByText('iphone 9')).toBeInTheDocument();
        expect(await screen.findByText('iphone 14')).toBeInTheDocument();

        expect(screen.queryByText('No products found')).not.toBeInTheDocument();
    });

    test('renders error when API calls fails', async () => {
        // eslint-disable-next-line no-undef
        fetchMock.mockReject(() => Promise.reject('API error'));

        render(<Products />);

        expect(await screen.findByText('Something went wrong!')).toBeInTheDocument();
        expect(await screen.findByText('No products found')).toBeInTheDocument();
    });
});
