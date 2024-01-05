using Deliverr.BusinessLayer.AppServices;
using Deliverr.DataAccessLayer.Models;
using Deliverr.DataAccessLayer.Repository.Comment;
using Microsoft.AspNetCore.Mvc;

namespace Exit_Test_WebApi.Controllers
{
    public class CommentController: Controller
    {
        private readonly ICommentService _commentService;
        public CommentController(ICommentService commentService) 
        {
            _commentService = commentService;
        }

        [HttpPost("AddComment")]

        public async Task<IActionResult> AddComment(CommentModel comment)
        {
            await _commentService.AddComment(comment);
            return Ok(new
            {
                message = "Comment Added Successfully"
            });
        }
        [HttpGet("ViewComments/{ProductId}")]

        public async Task<IActionResult> ViewComments([FromRoute] int ProductId)
        {
            var Comments = await _commentService.ViewComments(ProductId);
            return Ok(new
            {
                Comments,
                message = "Comments"
            });
        }

        [HttpDelete("DeleteComment")]
        public async Task<IActionResult> DeleteComments(int Id, string UserId)
        {
            await _commentService.DeleteComment(Id, UserId);

            return Ok(new
            {
                message = "DeleteComments Method Called Successfully"
            });
        }

        [HttpGet("Rating/{ProductId}")]

        public async Task<IActionResult> AverageRatingForProduct([FromRoute] int ProductId)
        {
            var Rating = await _commentService.AverageRatingForProduct(ProductId);
            return Ok(Rating);
        }


    }
}
