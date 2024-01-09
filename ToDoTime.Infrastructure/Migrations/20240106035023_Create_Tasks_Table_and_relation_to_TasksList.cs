using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ToDoTime.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Create_Tasks_Table_and_relation_to_TasksList : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Icon",
                table: "TasksLists",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "Tasks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Asap = table.Column<bool>(type: "bit", nullable: false),
                    Done = table.Column<bool>(type: "bit", nullable: false),
                    TasksListId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tasks_TasksLists_TasksListId",
                        column: x => x.TasksListId,
                        principalTable: "TasksLists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_TasksListId",
                table: "Tasks",
                column: "TasksListId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tasks");

            migrationBuilder.DropColumn(
                name: "Icon",
                table: "TasksLists");
        }
    }
}
