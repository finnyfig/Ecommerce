import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import React from 'react';
import Products from './components/Products/productList';
import Card from './components/Card/card';
import FilterCategory from './components/FilterCategory/filterCategory';
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

    // test('renders products when API call succeeds', async () => {
    //     const products = {
    //         id: 1,
    //         title: 'iphone 9',
    //     };

    //     fetchMock.mockResolvedValue({
    //         status: 200,
    //         json: jest.fn(() => products),
    //     }),
    //         await act(async () => render(<Card />));

    //     expect(await screen.findByText('iphone 9')).toBeInTheDocument();
    //     expect(await screen.findByText('iphone 14')).toBeInTheDocument();

    //     expect(screen.queryByText('No products found')).not.toBeInTheDocument();
    // });
    test('renders error when API calls fails', async () => {
        // eslint-disable-next-line no-undef
        fetchMock.mockReject(() => Promise.reject('API error'));

        render(<Products />);

        expect(await screen.findByText('Something went wrong!')).toBeInTheDocument();
        expect(await screen.findByText('No products found')).toBeInTheDocument();
    });
});

// describe('Filter category', () => {
//     beforeEach(() => {
//         fetchMock.resetMocks();
//     });

//  test('renders categories when API call succeeds', async () => {
//         // const fakeCategories = [
//         //     { value: 'smartphones', label: 'smartphones' },
//         //     { value: 'laptops', label: 'laptops' },
//         // ];
//         const fakeCategories = ['smartphones', 'laptops'];

//         fetchMock.mockResolvedValue({
//             status: 200,
//             json: jest.fn(() => fakeCategories),
//         }),
//             await act(async () => render(<FilterCategory />));

//         // render(<FilterCategory />);
//         expect(await screen.getByTestId('filter-id')).toHaveFormValues({ filterCategory: '' });
//         expect(await screen.findByText('Filter by category')).toBeInTheDocument();
//         expect(await screen.findByRole('combobox')).toBeInTheDocument();

//         await selectEvent.select(screen.getByLabelText('Filter category'), ['smartphones', 'laptops']);
//         // expect(await screen.getByTestId('filter-id')).toHaveFormValues({ filterCategory: ['strawberry', 'mango'] });
//         // expect(await screen.findByText('smartphones')).toBeInTheDocument();
//         // expect(await screen.findByText('laptops')).toBeInTheDocument();

//         // expect(screen.queryByText('No products found')).not.toBeInTheDocument();
//     });
// });
