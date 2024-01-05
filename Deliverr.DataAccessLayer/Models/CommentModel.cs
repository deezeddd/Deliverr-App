using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Deliverr.DataAccessLayer.Models
{
    public class CommentModel
    {
        [Key]
        public int Id { get; set; }
        public string UserName { get; set; }
        public string UserId { get; set; }
        public int ProductId { get; set; }

        public int Rating { get; set; }
        public string Comment { get; set; }
        public DateTime CommentDate { get; set; }


    }
}
