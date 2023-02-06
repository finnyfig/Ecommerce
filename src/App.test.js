import { render, screen, waitFor } from '@testing-library/react';

import React from 'react';
import Products from './components/products/productList';
import { act } from 'react-dom/test-utils';
import selectEvent from 'react-select-event';

describe('Products', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    test('renders categories when API call succeeds', async () => {
        const fakeCategories = ['smartphones', 'laptops'];

        fetchMock.mockResolvedValue({
            status: 200,
            json: jest.fn(() => fakeCategories),
        }),
            await act(async () => render(<Products />));

        expect(await screen.getByTestId('filter-id')).toHaveFormValues({ filterCategory: '' });
        await selectEvent.select(screen.getByLabelText('Filter category'), ['smartphones', 'laptops']);
    });

    test('renders error when API calls fails', async () => {
        fetchMock.mockReject(() => Promise.reject('API error'));

        render(<Products />);

        expect(await screen.findByText('Something went wrong!')).toBeInTheDocument();
        expect(await screen.findByText('No products found')).toBeInTheDocument();
    });
});
