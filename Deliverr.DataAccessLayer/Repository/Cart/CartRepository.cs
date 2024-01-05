using Deliverr.DataAccessLayer.Models;
using Exit_Test_WebApi.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace Deliverr.DataAccessLayer.Repository.Cart
{

    public class CartRepository : ICartRepository
    {
        private readonly AppDbContext _appDbContext;
        public CartRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public async Task AddUserCart(CartModel cart)
        {
            if (cart != null)
            {
                var existingCart = _appDbContext.CartModel
                    .FirstOrDefault(c => c.UserId == cart.UserId && c.ProductId == cart.ProductId);

                if (existingCart != null)
                {
                    var product = await _appDbContext.ProductModel.FindAsync(existingCart.ProductId);

                    if (existingCart.Quantity + cart.Quantity <= product.AvailableQuantity)
                    {
                        existingCart.Quantity += cart.Quantity;
                    }
                    else
                    {

                        throw new InvalidOperationException("Total quantity exceeds available quantity.");
                    }
                }
                else
                {
                    _appDbContext.CartModel.Add(cart);
                }

                await _appDbContext.SaveChangesAsync();
            }
        }

        public async Task UpdateUserCart(CartModel cart)
        {
            if (cart != null)
            {
                var existingCart = _appDbContext.CartModel
                    .FirstOrDefault(c => c.UserId == cart.UserId && c.ProductId == cart.ProductId);

                if (existingCart != null)
                {
                    var product = await _appDbContext.ProductModel.FindAsync(existingCart.ProductId);

                    if (cart.Quantity <= product.AvailableQuantity)
                    {
                        existingCart.Quantity = cart.Quantity;
                    }
                    else
                    {

                        throw new InvalidOperationException("Updated quantity exceeds available quantity.");
                    }
                }

                await _appDbContext.SaveChangesAsync();
            }
        }


        public IEnumerable<CartModel> GetAllUsersCart()
        {
            return _appDbContext.CartModel.ToList();
        }

        public async Task<List<ProductsInCartModel>> GetProductsFromCartList(List<CartModel> cartList, string userId)
        {
            var query = from cart in _appDbContext.CartModel
                        join product in _appDbContext.ProductModel on cart.ProductId equals product.ProductId
                        where cart.UserId == userId
                        select new ProductsInCartModel { Cart = cart, Product = product };

            var products = await query.ToListAsync();

            return products;
        }

        public async Task RemoveFromCart(string userId, int productId)
        {
            var cartItem = _appDbContext.CartModel
                .FirstOrDefault(item => item.UserId == userId && item.ProductId == productId);

            if (cartItem != null)
            {
                _appDbContext.CartModel.Remove(cartItem);
                await _appDbContext.SaveChangesAsync();
            }

        }

        public async Task RemoveAllItemFromCart(string userId)
        {
            var cartItems = _appDbContext.CartModel.Where(item => item.UserId == userId).ToList();

            if (cartItems.Any())
            {
                _appDbContext.CartModel.RemoveRange(cartItems);
                await _appDbContext.SaveChangesAsync();
            }
        }
    }
}
