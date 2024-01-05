using Deliverr.DataAccessLayer.Models;

namespace Deliverr.DataAccessLayer.Repository.Cart
{
    public interface ICartRepository
    {
        Task AddUserCart(CartModel cart);
        IEnumerable<CartModel> GetAllUsersCart();
        Task<List<ProductsInCartModel>> GetProductsFromCartList(List<CartModel> cartList, string userId);
        Task RemoveAllItemFromCart(string userId);
        Task RemoveFromCart(string userId, int productId);
        Task UpdateUserCart(CartModel cart);
    }
}