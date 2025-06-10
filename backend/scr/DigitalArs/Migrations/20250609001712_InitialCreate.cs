using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DigitalArs.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CUENTA",
                columns: table => new
                {
                    ID_CUENTA = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ID_USUARIO = table.Column<int>(type: "int", nullable: false),
                    SALDO = table.Column<double>(type: "float", nullable: false),
                    ALIAS = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CBU = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CUENTA", x => x.ID_CUENTA);
                });

            migrationBuilder.CreateTable(
                name: "PlazoFijo",
                columns: table => new
                {
                    ID_PLAZOFIJO = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ID_CUENTA = table.Column<int>(type: "int", nullable: false),
                    MONTO = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PLAZO = table.Column<int>(type: "int", nullable: false),
                    TASA_INTERES = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    FECHA_INICIO = table.Column<DateTime>(type: "datetime2", nullable: false),
                    fecha_vencimiento = table.Column<DateTime>(type: "datetime2", nullable: false),
                    INTERES_GENERADO = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ESTADO = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlazoFijo", x => x.ID_PLAZOFIJO);
                });

            migrationBuilder.CreateTable(
                name: "Transacciones",
                columns: table => new
                {
                    ID_TRANSACCION = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ID_CUENTA_ORIGEN = table.Column<int>(type: "int", nullable: false),
                    ID_CUENTA_DESTINO = table.Column<int>(type: "int", nullable: false),
                    MONTO = table.Column<double>(type: "float", nullable: false),
                    FECHA = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transacciones", x => x.ID_TRANSACCION);
                });

            migrationBuilder.CreateTable(
                name: "USUARIO",
                columns: table => new
                {
                    ID_USUARIO = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NOMBRE = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EMAIL = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CREATION_DATE = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PASS = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ID_ROL = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_USUARIO", x => x.ID_USUARIO);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CUENTA");

            migrationBuilder.DropTable(
                name: "PlazoFijo");

            migrationBuilder.DropTable(
                name: "Transacciones");

            migrationBuilder.DropTable(
                name: "USUARIO");
        }
    }
}
