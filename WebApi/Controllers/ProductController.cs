using Deliverr.BusinessLayer.AppServices;
using Deliverr.DataAccessLayer.Models;
using Deliverr.DataAccessLayer.Repository;
using Deliverr.DataAccessLayer.Repository.Comment;
using Exit_Test_WebApi.Context;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Exit_Test_WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
       
        private readonly IProductServices _productServices;
        
        private readonly ICommentRepository _commentRepository;
        public ProductController (IProductServices productServices,ICommentRepository commentRepository ) 
        { 
            _productServices = productServices;
            _commentRepository = commentRepository;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("CreateProduct")]

        public async Task<IActionResult> AddProduct([FromBody] ProductModel product) 
        {
            if(ModelState.IsValid)
            {
               await  _productServices.AddProductAsync(product);
                return Ok(new
                {
                    message = "Product Added Successfully"
                });
            }
            return BadRequest(ModelState);

        }

        [Authorize(Roles = "Admin")]
        [HttpPut("EditProduct/{id}")]

        public async Task<IActionResult> EditProduct([FromRoute] int id, [FromBody] ProductModel product)
        {
            if (ModelState.IsValid)
            {
                var existingProduct = _productServices.GetProductById(id);
                if (existingProduct == null)
                {
                    return BadRequest(new
                    {
                        message = "Product doesn't exist"
                    });
                   
                }
                existingProduct.ProductName = product.ProductName;
                existingProduct.Description = product.Description;
                existingProduct.Category = product.Category;
                existingProduct.ProductImage = product.ProductImage;
                existingProduct.AvailableQuantity = product.AvailableQuantity;
                existingProduct.Price = product.Price;
                existingProduct.Discount = product.Discount;
                existingProduct.Specification = product.Specification;


                await _productServices.EditProductAsync(existingProduct);
                    return Ok(new
                    {
                        existingProduct,
                        message = "Product Updated Successfully"
                    });
                
            }
            { return BadRequest(ModelState); }

        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("DeleteProduct/{id}")]
        
        public async Task<IActionResult> DeleteProduct([FromRoute] int id)
        {
            if(ModelState.IsValid)
            {
                var product = _productServices.GetProductById(id);
                if(product!= null) 
                {
                   await _productServices.DeleteProductAsync(id);
                    return Ok(new
                    {
                        product,
                        message = "Product deleted Successfully"
                    });
                }
                else
                {
                    return BadRequest(new
                    {
                        message = "Product doesn't exist"
                    });
                }
            }
            { return BadRequest(ModelState); }
           
        }

        [HttpGet("GetProductById/{id}")]
        public IActionResult GetProductById([FromRoute] int id)
        {
            var product = _productServices.GetProductById(id);
            if (product != null)
            {
                return Ok(product);
            }
            return BadRequest(new
            {
                message = "Product Doesn't Exist"
            });
        }

        [HttpGet("GetAllProducts")]
        
        public async Task<IActionResult> GetAllProducts()
        {
            var productsList =await _productServices.GetAllProducts();
            var count = _productServices.CountTotalProducts();
            if (count == 0)
            {
                return BadRequest(new
                {
                    message = "No Product Available"
                }) ;
            }
            return Ok(productsList);
        }

        [HttpGet("GetProductsByCategory")]

        public async Task<IActionResult> GetProductByCategory(string category)
        {
            var products = await _productServices.GetProductsByCategory(category);
            if (products == null)
            {
                return NotFound();
            }
            return Ok(products);
        }

        [HttpPut("UpdateProductQuantities")]

        public async Task<IActionResult> UpdateProductQuantities(List<OrdersModel> orders)
        {
            await _productServices.UpdateProductQuantities(orders);
            return Ok(new
            {
                message ="Quanity Updated Successfully"
            });
        }


    }


}
