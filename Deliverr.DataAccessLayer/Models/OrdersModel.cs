using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Deliverr.DataAccessLayer.Models
{
    public class OrdersModel
    {
        [Key]
        public int Id { get; set; }
        public string UserId { get; set; }

        [ForeignKey("ProductId ")]
        public int ProductId { get; set; }

        [DataType(DataType.Date)]
        public DateTime Date { get; set; }
        public int Quantity { get; set; }


    }
}
