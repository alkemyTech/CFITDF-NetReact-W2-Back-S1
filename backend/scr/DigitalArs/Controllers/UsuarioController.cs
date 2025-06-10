using DigitalArs.Dtos;
using DigitalArs.Interfaces;
using DigitalArs.Models;
using DigitalArs.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace DigitalArs.Controllers;

[Authorize]
[Route("api/User")]
[ApiController]
public class UsuarioController : ControllerBase
{
    private IUsuarioRepository _usuarioRepository;
    private readonly PasswordService _passwordService;
    private ICuentaRepository _cuentaRepository;

    public UsuarioController(IUsuarioRepository usuarioRepository, PasswordService passwordService, ICuentaRepository cuentaRepository)
    {
        _usuarioRepository = usuarioRepository;
        _passwordService = passwordService;
        _cuentaRepository = cuentaRepository;
    }

    // 🔑 Helper para obtener el ID del usuario del token JWT (busca varios posibles claims)
    private int GetIdUsuarioFromToken()
    {
        var claimIdUsuario =
            User.Claims.FirstOrDefault(c => c.Type == "ID_USUARIO")
            ?? User.Claims.FirstOrDefault(c => c.Type == "sub")
            ?? User.Claims.FirstOrDefault(c => c.Type.EndsWith("nameidentifier"));

        int idUsuarioToken = 0;
        if (claimIdUsuario != null && int.TryParse(claimIdUsuario.Value, out int idParsed))
            idUsuarioToken = idParsed;

        return idUsuarioToken;
    }

    [HttpGet]
    public ActionResult<Usuario[]> GetAllUser()
    {
        int idUsuarioToken = GetIdUsuarioFromToken();

        if (_cuentaRepository.GetCuentaById(idUsuarioToken) is Cuenta admin)
        {
            var usuario = _usuarioRepository.GetUserById(admin.ID_USUARIO);

            if (usuario.ID_ROL != 1)
            {
                return BadRequest(new { message = "Acceso no autorizado. " });
            }
        }

        return Ok(_usuarioRepository.GetAllUser() ?? new List<Usuario>());
    }

    [HttpGet("{id}")]
    public ActionResult<Usuario> GetUserById(int id)
    {
        if (_usuarioRepository.GetUserById(id) is Usuario usuario)
        {
            return Ok(usuario);
        }
        return NotFound();
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public ActionResult<Usuario> CreateUser(CreateUsuarioDto createUsuarioDto)
    {
        if (string.IsNullOrWhiteSpace(createUsuarioDto.PASS) || createUsuarioDto.PASS.Length < 6)
        {
            return BadRequest("La contraseña debe tener al menos 6 caracteres.");
        }

        var usuario = new Usuario()
        {
            NOMBRE = createUsuarioDto.NOMBRE,
            EMAIL = createUsuarioDto.EMAIL,
            CREATION_DATE = DateTime.Now,
            PASS = _passwordService.HashPassword(createUsuarioDto.PASS), // PASSWORD HASHEADA
            // PASS = createUsuarioDto.PASS, // PASSWORD SIN HASHEAR
            ID_ROL = createUsuarioDto.ID_ROL
        };

        var nuevoUsuario = _usuarioRepository.AddUser(usuario); // devuelve usuario con ID_USUARIO asignado

        return CreatedAtAction(nameof(GetUserById), new { id = nuevoUsuario.ID_USUARIO }, new
        {
            Mensaje = "Usuario creado exitosamente",
            nuevoUsuario.ID_USUARIO,
            nuevoUsuario.EMAIL
        });
    }

    [HttpPut("{id}")]
    public ActionResult UpdateUser(int id, UpdateUsuarioDto updateUsuarioDto)
    {
        int idUsuarioToken = GetIdUsuarioFromToken();

        if (_cuentaRepository.GetCuentaById(idUsuarioToken) is Cuenta admin)
        {
            var user = _usuarioRepository.GetUserById(admin.ID_USUARIO);

            if (user.ID_ROL != 1)
            {
                return BadRequest(new { message = "Acceso no autorizado. " });
            }
        }

        var usuario = _usuarioRepository.GetUserById(id);
        if (usuario == null)
        {
            return NotFound();
        }

        usuario.NOMBRE = updateUsuarioDto.NOMBRE;
        usuario.EMAIL = updateUsuarioDto.EMAIL;
        usuario.PASS = _passwordService.HashPassword(updateUsuarioDto.PASS);

        _usuarioRepository.UpdateUser(usuario);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public ActionResult RemoveUser(int id)
    {
        int idUsuarioToken = GetIdUsuarioFromToken();

        if (_cuentaRepository.GetCuentaById(idUsuarioToken) is Cuenta admin)
        {
            var user = _usuarioRepository.GetUserById(admin.ID_USUARIO);

            if (user.ID_ROL != 1)
            {
                return BadRequest(new { message = "Acceso no autorizado. " });
            }
        }
        if (_usuarioRepository.GetUserById(id) is Usuario usuario)
        {
            _usuarioRepository.RemoveUser(id);
            return NoContent();
        }
        return NotFound();
    }
}
