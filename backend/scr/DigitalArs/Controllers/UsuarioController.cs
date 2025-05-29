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
    public UsuarioController(IUsuarioRepository usuarioRepository, PasswordService passwordService)
    {
        _usuarioRepository = usuarioRepository;
        _passwordService = passwordService;
    }



    [HttpGet]
    public ActionResult<Usuario[]> GetAllUser()
    {
        return Ok(_usuarioRepository.GetAllUser());
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

    [HttpPost]
    public ActionResult<Usuario> CreateUser(CreateUsuarioDto createUsuarioDto)
    {
        var usuario = new Usuario()
        {
            NOMBRE = createUsuarioDto.NOMBRE,
            EMAIL = createUsuarioDto.EMAIL,
            CREATION_DATE = createUsuarioDto.CREATION_DATE,
            //PASS = _passwordService.HashPassword(createUsuarioDto.PASS), // PASSWORD HASHEADA
            PASS = createUsuarioDto.PASS, // PASSWORD SIN HASHEAR
            ID_ROL = createUsuarioDto.ID_ROL
        };

        _usuarioRepository.AddUser(usuario);

        return CreatedAtAction(nameof(GetUserById), new { id = usuario.ID_USUARIO }, usuario);
    }

    [HttpPut("{id}")]
    public ActionResult UpdateUser(int id, UpdateUsuarioDto updateUsuarioDto)
    {
        var usuario = _usuarioRepository.GetUserById(id);
        if (usuario == null)
        {
            return NotFound();
        }

        usuario.NOMBRE = updateUsuarioDto.NOMBRE;
        usuario.EMAIL = updateUsuarioDto.EMAIL;
        usuario.PASS = updateUsuarioDto.PASS;

        _usuarioRepository.UpdateUser(usuario);
        return NoContent();
    }

        [HttpDelete("{id}")]
        public ActionResult RemoveUser(int id)
        {
            if (_usuarioRepository.GetUserById(id) is Usuario usuario)
            {
                _usuarioRepository.RemoveUser(id);
                return NoContent();
            }
            return NotFound();
        }
    }


