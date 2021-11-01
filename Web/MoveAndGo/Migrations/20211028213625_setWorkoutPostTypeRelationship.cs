using Microsoft.EntityFrameworkCore.Migrations;

namespace MoveAndGo.Migrations
{
    public partial class setWorkoutPostTypeRelationship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Workouts_PostTypes_PostType",
                table: "Workouts");

            migrationBuilder.DropForeignKey(
                name: "FK_Workouts_PostTypes_Type1",
                table: "Workouts");

            migrationBuilder.DropIndex(
                name: "IX_Workouts_PostType",
                table: "Workouts");

            migrationBuilder.DropColumn(
                name: "PostType",
                table: "Workouts");

            migrationBuilder.RenameColumn(
                name: "Type1",
                table: "Workouts",
                newName: "TypeId");

            migrationBuilder.RenameIndex(
                name: "IX_Workouts_Type1",
                table: "Workouts",
                newName: "IX_Workouts_TypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Workouts_PostTypes_TypeId",
                table: "Workouts",
                column: "TypeId",
                principalTable: "PostTypes",
                principalColumn: "Type",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Workouts_PostTypes_TypeId",
                table: "Workouts");

            migrationBuilder.RenameColumn(
                name: "TypeId",
                table: "Workouts",
                newName: "Type1");

            migrationBuilder.RenameIndex(
                name: "IX_Workouts_TypeId",
                table: "Workouts",
                newName: "IX_Workouts_Type1");

            migrationBuilder.AddColumn<string>(
                name: "PostType",
                table: "Workouts",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Workouts_PostType",
                table: "Workouts",
                column: "PostType");

            migrationBuilder.AddForeignKey(
                name: "FK_Workouts_PostTypes_PostType",
                table: "Workouts",
                column: "PostType",
                principalTable: "PostTypes",
                principalColumn: "Type",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Workouts_PostTypes_Type1",
                table: "Workouts",
                column: "Type1",
                principalTable: "PostTypes",
                principalColumn: "Type",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
