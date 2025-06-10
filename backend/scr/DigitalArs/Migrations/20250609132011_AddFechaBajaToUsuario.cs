using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DigitalArs.Migrations
{
    /// <inheritdoc />
    public partial class AddFechaBajaToUsuario : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "FECHA_BAJA",
                table: "USUARIO",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FECHA_BAJA",
                table: "USUARIO");
        }
    }
}
