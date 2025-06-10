using DigitalArs.Models;
using Microsoft.AspNetCore.Identity;

namespace DigitalArs.Services
{
    public class PasswordService
    {
        private readonly PasswordHasher<Usuario> _hasher = new();

        // Para registrar: convierte el texto plano en un hash
        public string HashPassword(string password) =>
            _hasher.HashPassword(user: null, password: password);

        // Para login: compara el hash guardado con el generado a partir de la contraseña proporcionada
        public bool VerifyPassword(string hashedPassword, string providedPassword)
        {
            if (string.IsNullOrWhiteSpace(hashedPassword))
                return false;

            try
            {
                var result = _hasher.VerifyHashedPassword(
                    user: null,
                    hashedPassword: hashedPassword,
                    providedPassword: providedPassword
                );
                return result == PasswordVerificationResult.Success;
            }
            catch (FormatException)
            {
                // El hash no era Base64 válido
                return false;
            }
        }
    }
}