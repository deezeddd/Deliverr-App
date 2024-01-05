using Deliverr.BusinessLayer.AppServices;
using Deliverr.DataAccessLayer.Models;
using Deliverr.DataAccessLayer.Repository.Cart;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Exit_Test_WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : Controller
    {
        private readonly ICartRepository _cartService;
        public CartController(ICartRepository cartService)
        { 
            _cartService = cartService;
        }

        [Authorize]
        [HttpPost("AddUserCart")]
        public async Task<IActionResult> AddUserCart(CartModel cart)
        {
            await _cartService.AddUserCart(cart);
            return Ok(new
            {
                message = "Product Added to Cart"
            });
        }

        [Authorize]
        [HttpPost("UpdateUserCart")]
        public async Task<IActionResult> UpdateUserCart(CartModel cart)
        {
            await _cartService.UpdateUserCart(cart);

            return Ok(new
            {
                message = "Cart Updated Sucessfully"
            });
        }


        //All carts of all users ->Debug
        [HttpGet("GetAllUsersCart")]
        public async Task<IActionResult> GetUserAllCart()
        {

            var cartList = _cartService.GetAllUsersCart();
            var cartItems = cartList.Select(cart => new
            {
                cart.ProductId,
                cart.Quantity,
            });

            return Ok(new
            {
                message = "Users cart",
                cartList,
                cart = cartItems
            });
        }

        [Authorize]
        //current users cart list
        [HttpGet("UserCartList")]
        public async Task<ActionResult<List<ProductsInCartModel>>> GetProductsFromCart(string userid)
        {
            var cartList = _cartService.GetAllUsersCart().ToList();


            var productsInCart = await _cartService.GetProductsFromCartList(cartList, userid);

            return Ok(productsInCart);
        }


        [Authorize]
        [HttpDelete("RemoveFromCart")]
        public async Task<IActionResult> RemoveFromCart(string userId, int productId)
        {
            try
            {
                await _cartService.RemoveFromCart(userId, productId);
                return Ok(new
                {
                    message = "removed from cart successfully",
                    userId,
                    productId
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [Authorize]
        [HttpDelete("RemoveAllItemsFromCart")]
        public async Task<IActionResult> RemoveAllItemFromCart(string userId)
        {
            await _cartService.RemoveAllItemFromCart(userId);
            return Ok(new
            {
                message = "Products Removed From Cart Successfully"
            });
        }

    }
}
