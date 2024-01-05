using Deliverr.DataAccessLayer.Models;
using Deliverr.DataAccessLayer.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Deliverr.BusinessLayer.AppServices
{
    public class ProductServices : IProductServices
    {
        private readonly IProductRepository _productRepository;
        public ProductServices(IProductRepository productRepository) 
        {
             _productRepository = productRepository;
        }
      
        public async Task AddProductAsync(ProductModel product)
        {
          await _productRepository.AddProductAsync(product);

        }

        public async Task EditProductAsync(ProductModel product)
        {
            await _productRepository.EditProductAsync(product);
        }
        public async Task DeleteProductAsync(int id)
        {
            await _productRepository.DeleteProductAsync(id);
        }

        public ProductModel GetProductById(int id)
        {
            return _productRepository.GetProductById(id);
        }

        public async Task<IEnumerable<ProductModel>> GetAllProducts()
        {
            return await _productRepository.GetAllProducts();
        }

        public int CountTotalProducts()
        {
            return _productRepository.CountTotalProducts();
        }
        public async Task<IEnumerable<ProductModel>> GetProductsByCategory(string category)
        {
            return await _productRepository.GetProductsByCategory(category);
        }

        public async Task UpdateProductQuantities(List<OrdersModel> orders)
        {
             await _productRepository.UpdateProductQuantities(orders);
        }

    }
}
