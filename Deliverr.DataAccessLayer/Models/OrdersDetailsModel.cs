using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Deliverr.DataAccessLayer.Models
{
    public class OrdersDetailsModel
    {
        public OrdersModel Orders { get; set; }
        public ProductModel Product { get; set; }

    }
}
