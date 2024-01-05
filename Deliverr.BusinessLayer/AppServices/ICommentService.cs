using Deliverr.DataAccessLayer.Models;

namespace Deliverr.BusinessLayer.AppServices
{
    public interface ICommentService
    {
        Task AddComment(CommentModel comment);
        Task<double> AverageRatingForProduct(int productId);
        Task DeleteComment(int Id, string UserId);
        Task<IEnumerable<CommentModel>> ViewComments(int ProductId);
    }
}