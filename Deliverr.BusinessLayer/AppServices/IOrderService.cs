using Deliverr.DataAccessLayer.Models;

namespace Deliverr.BusinessLayer.AppServices
{
    public interface IOrderService
    {
       public  Task AddOrders(List<OrdersModel> orders);
       public Task<List<OrdersDetailsModel>> MyOrders(string userId);
    }
}