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

    public CuentaController(ICuentaRepository cuentaRepository)
    {
        _cuentaRepository = cuentaRepository;
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
    public ActionResult<Cuenta> GetCuenta(string alias)
    {
        if (_cuentaRepository.GetCuentaByAlias(alias) is Cuenta cuenta)
        {
            return Ok(cuenta);
        }

        return NotFound();
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
}