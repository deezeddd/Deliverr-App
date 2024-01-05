using Deliverr.BusinessLayer.AppServices;
using Deliverr.DataAccessLayer.Models;
using Deliverr.DataAccessLayer.Repository.Order;
using Microsoft.AspNetCore.Mvc;

namespace Exit_Test_WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController: Controller
    {
        private readonly IOrderService _orderService;
        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost("AddOrders")]

        public async Task<IActionResult> AddOrders(List<OrdersModel> orders)
        {
            await _orderService.AddOrders(orders);

            return Ok(new
            {
                message = "Order Placed"
            });

        }


        [HttpGet("MyOrders")]
        public async Task<ActionResult<List<OrdersDetailsModel>>> MyOrders(string userId)
        {
            var MyOrders = await _orderService.MyOrders(userId);
            if (MyOrders != null)
            {
                return Ok(MyOrders);
            }
            else
            {
                return BadRequest();
            }

        }

    }
}
