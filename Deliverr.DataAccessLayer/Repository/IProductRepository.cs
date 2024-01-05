using Deliverr.DataAccessLayer.Models;

namespace Deliverr.DataAccessLayer.Repository
{
    public interface IProductRepository
    {
        public Task AddProductAsync(ProductModel product);
        public Task DeleteProductAsync(int id);
        public Task EditProductAsync(ProductModel product);

        public ProductModel GetProductById(int id);
        public Task<IEnumerable<ProductModel>> GetAllProducts();
        public int CountTotalProducts();
        public Task<IEnumerable<ProductModel>> GetProductsByCategory(string category);
        public Task UpdateProductQuantities(List<OrdersModel> orders);




    }
}