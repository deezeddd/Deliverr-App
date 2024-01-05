using Deliverr.DataAccessLayer.Models;

namespace Deliverr.DataAccessLayer.Repository.Comment
{
    public interface ICommentRepository
    {
        public Task AddComment(CommentModel comment);
        public Task<IEnumerable<CommentModel>> ViewComments(int ProductId);

        public Task DeleteComment(int Id, string UserId);

        public Task<double> AverageRatingForProduct(int ProductId);

    }
}