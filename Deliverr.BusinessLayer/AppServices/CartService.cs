using Deliverr.DataAccessLayer.Models;
using Deliverr.DataAccessLayer.Repository.Cart;

namespace Deliverr.BusinessLayer.AppServices
{
    public class CartService : ICartService
    {
        private readonly ICartRepository _cartRepository;
        public CartService(ICartRepository cartRepository)
        {
            _cartRepository = cartRepository;
        }

        public Task AddUserCart(CartModel cart)
        {
            return _cartRepository.AddUserCart(cart);
        }
        public Task UpdateUserCart(CartModel cart)
        {
            return _cartRepository.UpdateUserCart(cart);
        }

        public IEnumerable<CartModel> GetAllUsersCart()
        {
            return _cartRepository.GetAllUsersCart();
        }

        public async Task<List<ProductsInCartModel>> GetProductsFromCartList(List<CartModel> cartList, string id)
        {
            return await _cartRepository.GetProductsFromCartList(cartList, id);
        }

        public async Task RemoveFromCart(string userId, int productId)
        {
            await _cartRepository.RemoveFromCart(userId, productId);
        }

        public async Task RemoveAllItemFromCart(string userId)
        {
            await _cartRepository.RemoveAllItemFromCart(userId);
        }

    }
}
