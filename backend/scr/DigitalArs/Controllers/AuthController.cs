using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using DigitalArs.Data;
using DigitalArs.Dtos;
using DigitalArs.Services;
using System.Security.Claims;
using DigitalArs.Models;

namespace DigitalArs.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly JwtService _jwtService;
    private readonly PasswordService _passwordService;

    public AuthController(AppDbContext context, JwtService jwtService, PasswordService passwordService)
    {
        _context = context;
        _jwtService = jwtService;
        _passwordService = passwordService;
    }

    // 🔐 LOGIN
    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        Console.WriteLine("🔐 Intentando login para: " + dto.Email);

        var user = await _context.USUARIO.FirstOrDefaultAsync(u => u.EMAIL == dto.Email);

        if (user == null)
        {
            Console.WriteLine("❌ Usuario no encontrado: " + dto.Email);
            return Unauthorized("El usuario no existe");
        }

        Console.WriteLine("✅ Usuario encontrado: " + user.EMAIL);

        if (!_passwordService.VerifyPassword(user.PASS, dto.Password))
        {
            Console.WriteLine("❌ Contraseña incorrecta para usuario: " + dto.Email);
            return Unauthorized("Contraseña incorrecta");
        }

        Console.WriteLine("🔐 Contraseña correcta, generando token...");

        var token = _jwtService.GenerateToken(user);

        Response.Headers.Add("Authorization", $"Bearer {token}");

        var rolName = user.ID_ROL == 1 ? "Administrador" : "Usuario";

        Console.WriteLine("✅ Login exitoso. Rol: " + rolName);

        return Ok(new
        {
            Mensaje = "Login exitoso.",
            token = token,
            usuario = new
            {
                ID_USUARIO = user.ID_USUARIO,
                NOMBRE = user.NOMBRE,
                EMAIL = user.EMAIL,
                ID_ROL = user.ID_ROL,
                NOMBRE_ROL = rolName
            }
        });
    }

    // CONSULTA DATOS DE USUARIO AUTENTICADO
    [Authorize]
    [HttpGet("datos-usuario")]
    public async Task<IActionResult> GetDatosUsuario()
    {
        var sub = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var idUsuario = int.Parse(sub!);
        var usuario = await _context.USUARIO.FindAsync(idUsuario);

        if (usuario == null)
            return NotFound("Usuario no encontrado");

        return Ok(new
        {
            usuario.ID_USUARIO,
            usuario.NOMBRE,
            usuario.EMAIL,
            usuario.ID_ROL
        });
    }
}