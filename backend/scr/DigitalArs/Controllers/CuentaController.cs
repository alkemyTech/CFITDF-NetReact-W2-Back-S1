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

    // ---- Helper para obtener el ID del usuario desde el token ----
    private int GetIdUsuarioFromToken()
    {
        var claim = User.Claims.FirstOrDefault(c =>
            c.Type == "ID_USUARIO" ||
            c.Type == "sub" || // El estándar JWT para Subject (ID)
            c.Type.EndsWith("nameidentifier")
        );
        if (claim != null && int.TryParse(claim.Value, out int id))
            return id;
        return 0;
    }

    [HttpGet]
    public ActionResult<Cuenta[]> GetCuentas()
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

        return Ok(_cuentaRepository.GetAllCuentas() ?? new List<Cuenta>());
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
        int? idUsuarioToken = GetIdUsuarioFromToken();

        if (_cuentaRepository.GetCuentaByAlias(alias) is Cuenta cuenta)
        {
            var usuario = _usuarioRepository.GetUserById(cuenta.ID_USUARIO);

            if (usuario == null)
            {
                return BadRequest(new { message = "Usuario no encontrado para la cuenta especificada." });
            }

            if (usuario.ID_USUARIO == idUsuarioToken)
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
        int? idUsuarioToken = GetIdUsuarioFromToken();

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
        int idUsuarioToken = GetIdUsuarioFromToken();

        if (_cuentaRepository.GetCuentaById(idUsuarioToken) is Cuenta admin)
        {
            var usuario = _usuarioRepository.GetUserById(admin.ID_USUARIO);

            if (usuario.ID_ROL != 1)
            {
                return BadRequest(new { message = "Acceso no autorizado. " });
            }
        }

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
        int idUsuarioToken = GetIdUsuarioFromToken();

        if (_cuentaRepository.GetCuentaById(idUsuarioToken) is Cuenta admin)
        {
            var usuario = _usuarioRepository.GetUserById(admin.ID_USUARIO);

            if (usuario.ID_ROL != 1)
            {
                return BadRequest(new { message = "Acceso no autorizado. " });
            }
        }

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
