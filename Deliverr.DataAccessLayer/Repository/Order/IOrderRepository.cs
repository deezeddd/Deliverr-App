using Deliverr.DataAccessLayer.Models;

namespace Deliverr.DataAccessLayer.Repository.Order
{
    public interface IOrderRepository
    {
        public Task AddOrders(List<OrdersModel> orders);
        public Task<List<OrdersDetailsModel>> MyOrders(string userId);
    }
}