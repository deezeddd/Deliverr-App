using Deliverr.DataAccessLayer.Models;
using Exit_Test_WebApi.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Deliverr.DataAccessLayer.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _appDbContext;
        public ProductRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async  Task AddProductAsync(ProductModel product)
        {
            if(product!= null)
            {
                _appDbContext.ProductModel.Add(product);
                 await _appDbContext.SaveChangesAsync();
            }
        }
        public async Task DeleteProductAsync(int id)
        {
            var product = _appDbContext.ProductModel.FirstOrDefault(p => p.ProductId == id);

            if (product != null)
            {
                _appDbContext.ProductModel.Remove(product);
                await _appDbContext.SaveChangesAsync();
            }
        }
        public async Task EditProductAsync(ProductModel product)
        {
            if(product != null)
            {
                    _appDbContext.ProductModel.Update(product);
                await _appDbContext.SaveChangesAsync();
            }
            
        }


        public ProductModel GetProductById(int id)
        {
            var product = _appDbContext.ProductModel.FirstOrDefault(p => p.ProductId == id);
            if (product == null)
            {
                return null;
            }
            return product;
        }

      
        public async Task <IEnumerable<ProductModel>>  GetAllProducts()
        {
            return await _appDbContext.ProductModel.ToListAsync();
        }

        public int CountTotalProducts()
        {
            return _appDbContext.ProductModel.Count();
        }

        public async Task<IEnumerable<ProductModel>> GetProductsByCategory(string category)
        {
            var products = await _appDbContext.ProductModel.Where(x => x.Category == category).ToListAsync();
            return products;
        }

        public async Task UpdateProductQuantities(List<OrdersModel> orders)
        {
            foreach(var order in orders)
            {
                var product = await _appDbContext.ProductModel.FindAsync(order.ProductId);
                

                if (product != null)
                {
                    var UpdatedQuantity = product.AvailableQuantity - order.Quantity;

                    if (UpdatedQuantity >= 0)
                    {
                        product.AvailableQuantity = UpdatedQuantity;
                    }
                    else
                    {
                        throw new Exception($"Ordered quantity exceeds the available quantity for Product ID: {product.ProductId}");
                    }
                }
                else
                {
                    // Handle the case when the product does not exist
                    throw new Exception($"Product not found for Product ID: {order.ProductId}");
                }
            }
            await _appDbContext.SaveChangesAsync();
        }
    }
}
