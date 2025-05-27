using DigitalArs.Models;
using Microsoft.AspNetCore.Identity;


namespace DigitalArs.Services;

    public class PasswordService
    {
    private readonly PasswordHasher<Usuario> _hasher = new();

    // Para registrar: convierte el texto plano en un hash
    public string HashPassword(string password) =>
        _hasher.HashPassword(null, password);

    // Para login: compara el hash guardado con el que genera al ingresar contraseña
    public bool VerifyPassword(string hashedPassword, string providedPassword)
    {
        var result = _hasher.VerifyHashedPassword(null, hashedPassword, providedPassword);
        return result == PasswordVerificationResult.Success;
    }
    }
