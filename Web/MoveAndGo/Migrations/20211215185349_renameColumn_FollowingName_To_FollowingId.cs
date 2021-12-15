using Microsoft.EntityFrameworkCore.Migrations;

namespace MoveAndGo.Migrations
{
    public partial class renameColumn_FollowingName_To_FollowingId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FollowingName",
                table: "FavoriteWorkouts",
                newName: "FollowingId");

            migrationBuilder.RenameColumn(
                name: "FollowingName",
                table: "FavoriteArticles",
                newName: "FollowingId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FollowingId",
                table: "FavoriteWorkouts",
                newName: "FollowingName");

            migrationBuilder.RenameColumn(
                name: "FollowingId",
                table: "FavoriteArticles",
                newName: "FollowingName");
        }
    }
}
