class ProductService {
    getallProducts = async () => {
        return await fetch(`https://dummyjson.com/products`);
    };

    searchProduct = async (value) => {
        return await fetch(`https://dummyjson.com/products/search?q=${value}`);
    };

    getAllProductCategories = async () => {
        return await fetch(`https://dummyjson.com/products/categories`);
    };

    getProductsCategory = async (category) => {
        return await fetch(`https://dummyjson.com/products/category/${category}`);
    };

    deleteProductById = async (id) => {
        return await fetch(`https://dummyjson.com/products/${id}`, {
            method: 'DELETE',
        });
    };
}
export default new ProductService();
