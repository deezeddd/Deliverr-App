using Deliverr.DataAccessLayer.Models;

namespace Deliverr.BusinessLayer.AppServices
{
    public interface ICartService
    {
       public Task AddUserCart(CartModel cart);
        public IEnumerable<CartModel> GetAllUsersCart();
        public Task<List<ProductsInCartModel>> GetProductsFromCartList(List<CartModel> cartList, string id);
        public Task RemoveAllItemFromCart(string userId);
        public Task RemoveFromCart(string userId, int productId);
        public Task UpdateUserCart(CartModel cart);

    }
}