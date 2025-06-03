using DigitalArs.Dtos;
using DigitalArs.Interfaces;
using DigitalArs.Models;
using Microsoft.AspNetCore.Http.Timeouts;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Diagnostics.Contracts;
using System.Threading.Tasks.Dataflow;
namespace DigitalArs.Controllers;
using Microsoft.AspNetCore.Authorization;

[Authorize]
[Route("/api/[controller]")]
[ApiController]
public class CuentaController : ControllerBase
{
    private ICuentaRepository _cuentaRepository;
    private IUsuarioRepository _usuarioRepository;

    public CuentaController(ICuentaRepository cuentaRepository, IUsuarioRepository usuarioRepository)
    {
        _cuentaRepository = cuentaRepository;
        _usuarioRepository = usuarioRepository;
    }

    [HttpGet]
    public ActionResult<Cuenta[]> GetCuentas()
    {
        return Ok(_cuentaRepository.GetAllCuentas());
    }

    [HttpGet("id/{id}")]
    public ActionResult<Cuenta> GetCuenta(int id)
    {
        if (_cuentaRepository.GetCuentaById(id) is Cuenta cuenta)
        {
            return Ok(cuenta);
        }

        return NotFound();
    }
    [HttpGet("alias/{alias}")]
    public ActionResult<Dictionary<string, object>> GetCuenta(string alias)
    {
        if (_cuentaRepository.GetCuentaByAlias(alias) is Cuenta cuenta)
        {
            var usuario = _usuarioRepository.GetUserById(cuenta.ID_USUARIO);

            if (usuario == null)
            {
                return BadRequest(new { message = "Usuario no encontrado para la cuenta especificada." });
            }

            var info = new Dictionary<string, object>
            {
                { "ID_CUENTA", cuenta.ID_CUENTA },
                { "NOMBRE", usuario.NOMBRE }
            };

            return Ok(info);
        }

        return BadRequest(new { message = "Alias no encontrado." });
    }
    [HttpGet("cbu/{cbu}")]
    public ActionResult<Dictionary<string, object>> GetCuentaCBU(string cbu)
    {
        if (_cuentaRepository.GetCuentaByCbu(cbu) is Cuenta cuenta)
        {
            var usuario = _usuarioRepository.GetUserById(cuenta.ID_USUARIO);

            if (usuario == null)
            {
                return BadRequest(new { message = "Usuario no encontrado para la cuenta especificada." });
            }

            var info = new Dictionary<string, object>
            {
                { "ID_CUENTA", cuenta.ID_CUENTA },
                { "NOMBRE", usuario.NOMBRE }
            };

            return Ok(info);
        }

        return BadRequest(new { message = "CBU no encontrado." });
    }
    [AllowAnonymous]
    [HttpPost]
    public ActionResult<Cuenta> CreateCuenta([FromBody] CreateCuentaDto dto)
    {
        var cuenta = new Cuenta()
        {
            ID_USUARIO = dto.ID_USUARIO,
            SALDO = dto.SALDO,
            ALIAS = dto.ALIAS,
            CBU = dto.CBU,
        };

        _cuentaRepository.AddCuenta(cuenta);

        return Ok(cuenta);
    }

    [HttpPut("{id}")]
    public ActionResult UpdateCuenta(int id, UpdateCuentaDto updateCuentaDto)
    {
        if (_cuentaRepository.GetCuentaById(id) is Cuenta cuenta)
        {
            cuenta.SALDO = updateCuentaDto.SALDO;
            cuenta.ALIAS = updateCuentaDto.ALIAS;
            cuenta.CBU = updateCuentaDto.CBU;

            _cuentaRepository.UpdateCuenta(cuenta);
            return NoContent();
        }

        return NotFound();
    }

    [HttpDelete("{id}")]
    public ActionResult RemoveCuenta(int id)
    {
        if (_cuentaRepository.GetCuentaById(id) is Cuenta cuenta)
        {
            _cuentaRepository.RemoveCuenta(id);
            return NoContent();
        }

        return NotFound();
    }
    [HttpGet("usuario/{idUsuario}")]
    public ActionResult<Cuenta> GetCuentaPorUsuario(int idUsuario)
    {
        var cuenta = _cuentaRepository.GetCuentaByUsuarioId(idUsuario);
        if (cuenta == null)
            return NotFound("Cuenta no encontrada para el usuario.");

        return Ok(cuenta);
    }
}