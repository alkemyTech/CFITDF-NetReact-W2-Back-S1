using DigitalArs.Data;
using DigitalArs.Dtos;
using DigitalArs.Interfaces;
using DigitalArs.Models;
using DigitalArs.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Timeouts;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Diagnostics.Contracts;
using System.Security.Claims;
using System.Threading.Tasks.Dataflow;

namespace DigitalArs.Controllers;

[Authorize]
[Route("/api/[controller]")]
[ApiController]

public class TransaccionController : ControllerBase
{
    private ITransaccionRepository _transaccionRepository;
    private ICuentaRepository _cuentaRepository;
    private IUsuarioRepository _usuarioRepository;

    public TransaccionController(ITransaccionRepository transaccionRepository, ICuentaRepository cuentaRepository, IUsuarioRepository usuarioRepository)
    {
        _transaccionRepository = transaccionRepository;
        _cuentaRepository = cuentaRepository;
        _usuarioRepository = usuarioRepository;
    }

    [HttpGet]
    public ActionResult<Transaccion[]> GetTransacciones()
    {
        // Obtener el ID_USUARIO del token JWT
        var claimIdUsuario = User.Claims.FirstOrDefault(c => c.Type == "ID_USUARIO" || c.Type.EndsWith("nameidentifier"));
        int idUsuarioToken = 0;
        if (claimIdUsuario != null && int.TryParse(claimIdUsuario.Value, out int idParsed))
        {
            idUsuarioToken = idParsed;
        }

        if (_cuentaRepository.GetCuentaById(idUsuarioToken) is Cuenta admin)
        {
            var usuario = _usuarioRepository.GetUserById(admin.ID_USUARIO);

            if (usuario.ID_ROL != 1)
            {
                return BadRequest(new { message = "Acceso no autorizado. " });
            }
        }

        return Ok(_transaccionRepository.GetAllTransacciones());
    }

    [HttpGet("cuentas")]
    public IActionResult Get()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        // Verifica si el usuario está autenticado
        if (!int.TryParse(userIdClaim, out int userId))
        {
            return BadRequest("ID de usuario inválido.");
        }
        
        var cuentas = _cuentaRepository.GetCuentasById(userId);
        var idsCuentas = cuentas.Select(c => c.ID_CUENTA).ToList();

        var todasTransacciones = _transaccionRepository.GetAllTransacciones();

        // Filtra las transacciones 
        var transaccionesUsuario = todasTransacciones
            .Where(t => idsCuentas.Contains(t.ID_CUENTA_ORIGEN) || idsCuentas.Contains(t.ID_CUENTA_DESTINO))
            .ToList();
        return Ok(transaccionesUsuario);
    }

    [HttpGet("{id}")]
    public ActionResult<Transaccion> GetTransaccion(int id)
    {
        // Obtener el ID_USUARIO del token JWT
        var claimIdUsuario = User.Claims.FirstOrDefault(c => c.Type == "ID_USUARIO" || c.Type.EndsWith("nameidentifier"));
        int idUsuarioToken = 0;
        if (claimIdUsuario != null && int.TryParse(claimIdUsuario.Value, out int idParsed))
        {
            idUsuarioToken = idParsed;
        }

        if (_cuentaRepository.GetCuentaById(idUsuarioToken) is Cuenta admin)
        {
            var usuario = _usuarioRepository.GetUserById(admin.ID_USUARIO);

            if (usuario.ID_ROL != 1)
            {
                return BadRequest(new { message = "Acceso no autorizado. " });
            }
        }

        Transaccion transaccion = _transaccionRepository.GetTransaccionById(id);

        if (transaccion != null)
        {
            return Ok(transaccion);
        }

        return NotFound();
    }

    [HttpPost]
    public ActionResult<Transaccion> CreateTransaccion(CreateTransaccionDtos createTransaccionDto)
    {
        var transaccion = new Transaccion()
        {
            ID_CUENTA_ORIGEN = createTransaccionDto.ID_CUENTA_ORIGEN,
            ID_CUENTA_DESTINO = createTransaccionDto.ID_CUENTA_DESTINO,
            MONTO = createTransaccionDto.MONTO,
            FECHA = createTransaccionDto.FECHA,
        };

        var cuentaOrigenInfo = _cuentaRepository.GetCuentaById(transaccion.ID_CUENTA_ORIGEN);
        var cuentaDestinoInfo = _cuentaRepository.GetCuentaById(transaccion.ID_CUENTA_DESTINO);

        // Verifica si la cuenta de origen existe
        if (cuentaOrigenInfo == null)
        {
            return BadRequest(new { message = "Cuenta de origen no existe." });
        }

        // Verifica si la cuenta de destino existe
        if (cuentaDestinoInfo == null)
        {
            return BadRequest(new { message = "Cuenta no encontrada." });
        }

        // Verifica si el monto es positivo
        if (transaccion.MONTO <= 0)
        {
            return BadRequest(new { message = "El monto debe ser un numero positivo mayor a 0." });
        }

        // verifica si tiene fondos suficientes
        if (transaccion.MONTO >= cuentaOrigenInfo.SALDO)
        {
            return BadRequest(new { message = "Fondos Insuficientes." });
        }

        cuentaOrigenInfo.SALDO -= transaccion.MONTO;
        cuentaDestinoInfo.SALDO += transaccion.MONTO;

        _transaccionRepository.AddTransaccion(transaccion);

        return Ok(transaccion);
    }

    /*[HttpPut("{id}")]
    public ActionResult UpdateTransaccion(int id, Transaccion updateTransaccion)
    {
        if(_transaccionRepository.GetTransaccionById(id) is Transaccion transaccion)
        {
            transaccion.MONTO = updateTransaccion.MONTO;

            _transaccionRepository.UpdateTransaccion(transaccion);
            return NoContent();
        }

        return NotFound();
    }*/

    [HttpDelete("{id}")]
    public ActionResult RemoveTransaccion(int id)
    {
        // Obtener el ID_USUARIO del token JWT
        var claimIdUsuario = User.Claims.FirstOrDefault(c => c.Type == "ID_USUARIO" || c.Type.EndsWith("nameidentifier"));
        int idUsuarioToken = 0;
        if (claimIdUsuario != null && int.TryParse(claimIdUsuario.Value, out int idParsed))
        {
            idUsuarioToken = idParsed;
        }

        if (_cuentaRepository.GetCuentaById(idUsuarioToken) is Cuenta admin)
        {
            var usuario = _usuarioRepository.GetUserById(admin.ID_USUARIO);

            if (usuario.ID_ROL != 1)
            {
                return BadRequest(new { message = "Acceso no autorizado. " });
            }
        }

        if (_transaccionRepository.GetTransaccionById(id) is Transaccion transaccion)
        {
            _transaccionRepository.RemoveTransaccion(id);
            return NoContent();
        }

        return NotFound();
    }
}
