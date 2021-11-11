using Microsoft.EntityFrameworkCore.Migrations;

namespace MoveAndGo.Migrations
{
    public partial class addIdColumnToAdminNotificationsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Id",
                table: "AdminNotifications",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AdminNotifications",
                table: "AdminNotifications",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_AdminNotifications",
                table: "AdminNotifications");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "AdminNotifications");
        }
    }
}
