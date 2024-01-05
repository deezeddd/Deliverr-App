using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Exit_Test_WebApi.Migrations
{
    public partial class CartModelAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CartModel_ProductModel_ProductId",
                table: "CartModel");

            migrationBuilder.DropIndex(
                name: "IX_CartModel_ProductId",
                table: "CartModel");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_CartModel_ProductId",
                table: "CartModel",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_CartModel_ProductModel_ProductId",
                table: "CartModel",
                column: "ProductId",
                principalTable: "ProductModel",
                principalColumn: "ProductId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
