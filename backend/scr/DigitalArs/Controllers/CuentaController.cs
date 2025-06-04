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
[Route("api/[controller]")]
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
        // Obtener el ID_USUARIO del token JWT
        var claimIdUsuario = User.Claims.FirstOrDefault(c => c.Type == "ID_USUARIO" || c.Type.EndsWith("nameidentifier"));
        int? idUsuarioToken = 0;
        if (claimIdUsuario != null && int.TryParse(claimIdUsuario.Value, out int idParsed))
        {
            idUsuarioToken = idParsed;
        }

        if (_cuentaRepository.GetCuentaByAlias(alias) is Cuenta cuenta)
        {
            var usuario = _usuarioRepository.GetUserById(cuenta.ID_USUARIO);

            if (usuario == null)
            {
                return BadRequest(new { message = "Usuario no encontrado para la cuenta especificada." });
            }

            if(usuario.ID_USUARIO == idUsuarioToken)
            {
                return BadRequest(new { message = "No podés transferirte a vos mismo usando el mismo alias." });
            }

            var info = new Dictionary<string, object>
            {
                { "ID_CUENTA", cuenta.ID_CUENTA },
                { "NOMBRE", usuario.NOMBRE },
                { "ID_CUENTA_ORIGEN", idUsuarioToken }
            };

            return Ok(info);
        }

        return BadRequest(new { message = "Alias no encontrado." });
    }
    [HttpGet("cbu/{cbu}")]
    public ActionResult<Dictionary<string, object>> GetCuentaCBU(string cbu)
    {
        // Obtener el ID_USUARIO del token JWT
        var claimIdUsuario = User.Claims.FirstOrDefault(c => c.Type == "ID_USUARIO" || c.Type.EndsWith("nameidentifier"));
        int? idUsuarioToken = 0;
        if (claimIdUsuario != null && int.TryParse(claimIdUsuario.Value, out int idParsed))
        {
            idUsuarioToken = idParsed;
        }

        if (_cuentaRepository.GetCuentaByCbu(cbu) is Cuenta cuenta)
        {
            var usuario = _usuarioRepository.GetUserById(cuenta.ID_USUARIO);

            if (usuario == null)
            {
                return BadRequest(new { message = "Usuario no encontrado para la cuenta especificada." });
            }

            if (usuario.ID_USUARIO == idUsuarioToken)
            {
                return BadRequest(new { message = "No podés transferirte a vos mismo usando el mismo cbu." });
            }

            var info = new Dictionary<string, object>
            {
                { "ID_CUENTA", cuenta.ID_CUENTA },
                { "NOMBRE", usuario.NOMBRE },
                { "ID_CUENTA_ORIGEN", idUsuarioToken }
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
    [HttpPost("Depositar")]
    public ActionResult<Cuenta> Depositar([FromBody] DepositarCuentaDto dto)
{
    var cuenta = _cuentaRepository.GetCuentaByUsuarioId(dto.ID_USUARIO);
    
    if (cuenta == null)
    {
        return NotFound("Cuenta no encontrada");
    }

    if (dto.SALDO <= 0)
    {
        return BadRequest("El monto debe ser mayor a cero.");
    }

    cuenta.SALDO += dto.SALDO; // Suma el monto al saldo actual
    
    _cuentaRepository.UpdateCuenta(cuenta);

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
        try
        {
            var cuenta = _cuentaRepository.GetCuentaByUsuarioId(idUsuario);

            if (cuenta == null)
                return NotFound("Cuenta no encontrada para el usuario.");

            return Ok(cuenta);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno: {ex.Message}");
        }
    }
}