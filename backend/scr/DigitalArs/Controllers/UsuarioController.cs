using DigitalArs.Dtos;
using DigitalArs.Entities;
using DigitalArs.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace DigitalArs.Controllers;
[Route("api/User")]
[ApiController]
public class UsuarioController : ControllerBase {
    
    private IUsuarioRepository _usuarioRepository;
    
    public UsuarioController(IUsuarioRepository usuarioRepository) {
        _usuarioRepository = usuarioRepository;
    }

    [HttpGet]
    public ActionResult<Usuario[]> GetAllUser() {
        return Ok(_usuarioRepository.GetAllUser());
    }

    [HttpGet("{id}")]
    public ActionResult<Usuario> GetUserById(int id) {
        if (_usuarioRepository.GetUserById(id) is Usuario usuario) {
            return Ok(usuario);
        }
        return NotFound();
    }

    [HttpPost]
    public ActionResult<Usuario> CreateUser(CreateUsuarioDto createUsarioDto) {
        var usuario = new Usuario() {
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
    public ActionResult UpdateUser(int id, Usuario updatedUser) {
        if (_usuarioRepository.GetUserById(id) is Usuario usuario) {
            usuario.NOMBRE = updatedUser.NOMBRE;
            usuario.EMAIL = updatedUser.EMAIL;
            usuario.PASS = updatedUser.PASS;        

            _usuarioRepository.UpdateUser(usuario);
            return NoContent();
        }
        return NotFound();
    }

    [HttpDelete("{id}")]
    public ActionResult RemoveUser(int id) {
        if (_usuarioRepository.GetUserById(id) is Usuario usuario) {
            _usuarioRepository.RemoveUser(id);
            return NoContent();
        }
        return NotFound();
    }
}
