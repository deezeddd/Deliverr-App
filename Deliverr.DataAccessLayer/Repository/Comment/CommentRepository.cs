using Deliverr.DataAccessLayer.Models;
using Exit_Test_WebApi.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Deliverr.DataAccessLayer.Repository.Comment
{
    public class CommentRepository : ICommentRepository
    {
        private readonly AppDbContext _appDbContext;
        public CommentRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task AddComment(CommentModel comment)
        {
            if (comment != null)
            {
                comment.CommentDate = DateTime.Now;
                _appDbContext.CommentModel.Add(comment);
                await _appDbContext.SaveChangesAsync();
            }

        }
        public async Task<IEnumerable<CommentModel>> ViewComments(int ProductId)
        {
            var comments = await _appDbContext.CommentModel.Where(x => x.ProductId == ProductId).ToListAsync();
            return comments;
        }

        public async Task DeleteComment(int Id, string UserId)
        {
            var comment = await _appDbContext.CommentModel.FirstOrDefaultAsync(x => x.Id == Id && x.UserId == UserId);
            if (comment != null)
            {
                _appDbContext.CommentModel.Remove(comment);
                await _appDbContext.SaveChangesAsync();
            }
        }

        public async Task<double> AverageRatingForProduct(int productId)
        {
            var averageRating = await _appDbContext.CommentModel
                .Where(c => c.ProductId == productId)
                .AverageAsync(c => (double?)c.Rating) ?? 0;

            return averageRating;
        }


    }
}
