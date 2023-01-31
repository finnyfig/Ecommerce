import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import Products from './components/products/productList';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


describe ('Products',()=>{
  beforeEach(()=>{
    fetchMock.resetMocks()
  })

  test ('renders products when API call succeeds',async () => {
    const fakeCountries =[
      {
        "uk" : {
          name : "England"
        }
      },
      {
        "in" : {
          name : "India"
        }
      }
    ]
  
    fetchMock.mockResolvedValue({status:200,json : jest.fn(()=> fakeCountries) })
  
    render(<Products/>)
  
    expect(await screen.findByText('Afghanisthan')).toBeInTheDocument()
    expect(await screen.findByText('Sudan')).toBeInTheDocument()
  
    expect(screen.queryByText('No products found')).not.toBeInTheDocument()
  })
  
  
  test('renders error when API calls fails', async() => {
    fetchMock.mockReject(()=> Promise.reject('API error'))
  
    render(<Products/>)
  
  expect(await screen.findByText('Something went wrong!')).toBeInTheDocument()
  expect(await screen.findByText('No products found')).toBeInTheDocument()
  })


})

// const fakeProducts =[
//   {
//     id:1,
//     title:'iphone 9'
//   },
//   {
//     id:2,
//     title:'iphone 14'
//   }
// ]



