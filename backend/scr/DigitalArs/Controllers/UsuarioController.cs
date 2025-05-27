using DigitalArs.Dtos;
using DigitalArs.Interfaces;
using DigitalArs.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace DigitalArs.Controllers;

[Route("api/User")]
[ApiController]
public class UsuarioController : ControllerBase
{

    private IUsuarioRepository _usuarioRepository;

    public UsuarioController(IUsuarioRepository usuarioRepository)
    {
        _usuarioRepository = usuarioRepository;
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
    public ActionResult<Usuario> CreateUser(CreateUsuarioDto createUsarioDto)
    {
        var usuario = new Usuario()
        {
            NOMBRE = createUsarioDto.NOMBRE,
            EMAIL = createUsarioDto.EMAIL,
            CREATION_DATE = createUsarioDto.CREATION_DATE,
            PASS = createUsarioDto.PASS,
            ID_ROL = createUsarioDto.ID_ROL
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


