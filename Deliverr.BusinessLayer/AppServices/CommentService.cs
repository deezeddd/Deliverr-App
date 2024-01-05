using Deliverr.DataAccessLayer.Models;
using Deliverr.DataAccessLayer.Repository.Comment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Deliverr.BusinessLayer.AppServices
{
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _commentRepository;
        public CommentService(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

        public async Task AddComment(CommentModel comment)
        {
            await _commentRepository.AddComment(comment);
        }
        public async Task<IEnumerable<CommentModel>> ViewComments(int ProductId)
        {
            return await _commentRepository.ViewComments(ProductId);
        }

        public async Task DeleteComment(int Id, string UserId)
        {
            await _commentRepository.DeleteComment(Id, UserId);
        }

        public async Task<double> AverageRatingForProduct(int productId)
        {
            return await _commentRepository.AverageRatingForProduct(productId);
        }



    }
}
