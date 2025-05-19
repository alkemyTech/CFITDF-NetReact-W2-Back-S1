using Microsoft.AspNetCore.Builder;
using Microsoft.Data.SqlClient;
using Prometheus;
using System.Diagnostics;


// PRUBEBA DE CONECTIVIDAD BASE DATOS
namespace PruebaStressDB
{
    internal class Program
    {
        static readonly Counter conexionesTotales = Metrics.CreateCounter("db_conexiones_totales", "Cantidad total de pruebas de conexión ejecutadas");
        static readonly Counter erroresConexion = Metrics.CreateCounter("db_conexiones_error", "Cantidad de errores al intentar conectar");
        static readonly Gauge conexionExitosa = Metrics.CreateGauge("db_conexion_exitosa", "Indica si la última conexión fue exitosa (1) o falló (0)");

        static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var app = builder.Build();

            app.UseHttpMetrics();
            app.MapMetrics();

            app.Lifetime.ApplicationStarted.Register(() =>
            {
                Task.Run(async () =>
                {
                    while (true)
                    {
                        await TestearConexionAsync();
                        await Task.Delay(5000);
                    }
                });
            });

            app.Run();
        }

        static async Task<bool> TestearConexionAsync()
        {
            conexionesTotales.Inc();

            try
            {
                using (SqlConnection conexion = new SqlConnection("Server=localhost,1433;Database=walletDB;User Id=sa;Password=Admin1234.; TrustServerCertificate=True;"))
                {
                    await conexion.OpenAsync();
                    Console.WriteLine("✅ Conectado a la base de datos.");
                    conexionExitosa.Set(1);
                    return true;
                }
            }
            catch (Exception ex)
            {
                erroresConexion.Inc();
                conexionExitosa.Set(0);
                Console.WriteLine($"❌ Error al conectar: {ex.Message}");
                return false;
            }
        }
    }
}
