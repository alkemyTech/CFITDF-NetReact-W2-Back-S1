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
        //Busca usuario por email
        var user = await _context.USUARIO.FirstOrDefaultAsync(u => u.EMAIL == dto.Email);
        if (user == null)
            return Unauthorized("El usuario no existe");
        // Verifica si la contraseña es correcta 
        if (!_passwordService.VerifyPassword(user.PASS, dto.Password))
              return Unauthorized("Contraseña incorrecta");
         bool isPasswordValid = _passwordService.VerifyPassword(user.PASS, dto.Password); //ME BUSCA CONTRASEÑAS HASHEADAS
        // bool isPasswordValid = user.PASS == dto.Password;


        // Genera el token JWT si es todo valido
        var token = _jwtService.GenerateToken(user);

        // 4. Devolver token en el header
        Response.Headers.Add("Authorization", $"Bearer {token}");

        return Ok(new { Mensaje = "Login exitoso.", token = token });
        
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