using Microsoft.Data.SqlClient;

namespace PruebaStressDB;
class Program
{
    // Datos de conexión
    const string connectionString = "Server=AEMJO22;Database=walletDB;Trusted_Connection=True;TrustServerCertificate=True;";


    static async Task Main()
    {
        // Espera estado de la conexion si es verdadera o falsa.  
        bool conectado = await TestearConexionAsync();

        if (!conectado)
        {
            Console.WriteLine("¡No se pudo conectar la BASE DE DATOS!");
            return;
        }
        Console.WriteLine("Se conectó!");
    }

    // Task que ejecuta la conexion mediante SQL Connection y devuelve un booleano
    static async Task<bool> TestearConexionAsync()
    {
        try
        {
            using (SqlConnection conexion = new SqlConnection(connectionString))
            {

                await conexion.OpenAsync();
                Console.WriteLine("CONECTADOOOOO!!!");
                return true;
            }
        }

        catch (Exception ex)
        {

            Console.WriteLine($"No me pude conectar: {ex.Message}");
            return false;
        }
    }
}

