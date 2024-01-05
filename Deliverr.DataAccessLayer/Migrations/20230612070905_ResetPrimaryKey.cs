using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Exit_Test_WebApi.Migrations
{
    public partial class ResetPrimaryKey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DBCC CHECKIDENT('ProductModel', RESEED, 0);");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
