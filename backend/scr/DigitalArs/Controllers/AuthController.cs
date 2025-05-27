using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using DigitalArs.Data;
using DigitalArs.Dtos;
using DigitalArs.Services;
using DigitalArs.Models;

namespace DigitalArs.Controllers;

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
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        var user = await _context.USUARIO.FirstOrDefaultAsync(u => u.EMAIL == dto.Email);
        if (user == null)
            return Unauthorized("El usuario no existe");

        if (!_passwordService.VerifyPassword(user.PASS, dto.Password))
            return Unauthorized("Contraseña incorrecta");

        var token = _jwtService.GenerateToken(user);

        return Ok(new { token });
    }

    // ✅ CONSULTA DATOS DE USUARIO AUTENTICADO
    [Authorize]
    [HttpGet("datos-usuario")]
    public async Task<IActionResult> GetDatosUsuario()
    {
        var idUsuario = int.Parse(User.FindFirst("sub")?.Value!);
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