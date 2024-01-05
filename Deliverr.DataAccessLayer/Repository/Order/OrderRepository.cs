using Deliverr.DataAccessLayer.Models;
using Exit_Test_WebApi.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Deliverr.DataAccessLayer.Repository.Order
{
    public class OrderRepository : IOrderRepository
    {
        private readonly AppDbContext _appDbContext;
        public OrderRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task AddOrders(List<OrdersModel> orders)
        {
            if (orders != null && orders.Any())
            {
                var orderDetails = orders.Select(o => new OrdersModel
                {
                    ProductId = o.ProductId,
                    Quantity = o.Quantity,
                    Date = DateTime.Now,
                    UserId = o.UserId
                }).ToList();

                _appDbContext.OrderModel.AddRange(orderDetails);

                await _appDbContext.SaveChangesAsync();
            }
        }


        public async Task<List<OrdersDetailsModel>> MyOrders(string userId)
        {
            var query = from myOrders in _appDbContext.OrderModel
                        join product in _appDbContext.ProductModel on myOrders.ProductId equals product.ProductId
                        where myOrders.UserId == userId && product != null
                        select new OrdersDetailsModel { Orders = myOrders, Product = product };

            var productsOrdered = await query.ToListAsync();

            return productsOrdered;
        }
    }
}
