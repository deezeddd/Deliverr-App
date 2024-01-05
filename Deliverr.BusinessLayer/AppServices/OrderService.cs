using Deliverr.DataAccessLayer.Models;
using Deliverr.DataAccessLayer.Repository.Order;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Deliverr.BusinessLayer.AppServices
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        public OrderService(IOrderRepository orderRepository) 
        { 
            _orderRepository = orderRepository;
        }

        public async Task AddOrders(List<OrdersModel> orders)
        {
            await _orderRepository.AddOrders(orders);
        }
        public async Task<List<OrdersDetailsModel>> MyOrders(string userId)
        {
            return await _orderRepository.MyOrders(userId);
        }
    }
}
