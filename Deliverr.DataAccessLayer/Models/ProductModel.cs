using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Deliverr.DataAccessLayer.Models
{
    public class ProductModel
    {
        [Key]
        public int ProductId { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "Product Name must not exceed 100 characters.")]

        public string ProductName { get; set; } = "";

        [Required]
        [StringLength(255, ErrorMessage = "Description must not exceed 255 characters.")]

        public string Description { get; set; } = "";

        [Required]
        [StringLength(100, ErrorMessage = "Category must not exceed 100 characters.")]

        public string Category { get; set; } = "";

        [Required]
        public string ProductImage { get; set; } = "";

        [Required]
        public int AvailableQuantity { get; set; }
        [Required]
        public int Price { get; set; }
        [Required]

        public int Discount { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "Specification must not exceed 100 characters.")]
        public string Specification { get; set; } = "";

    }
}
