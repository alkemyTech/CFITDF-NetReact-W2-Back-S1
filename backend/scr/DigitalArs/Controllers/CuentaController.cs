using DigitalArs.Dtos;
using DigitalArs.Interfaces;
using DigitalArs.Models;
using Microsoft.AspNetCore.Http.Timeouts;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Diagnostics.Contracts;
using System.Threading.Tasks.Dataflow;
namespace DigitalArs.Controllers;

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

    [HttpGet("{id}")]
    public ActionResult<Cuenta> GetCuenta(int id)
    {
        if (_cuentaRepository.GetCuentaById(id) is Cuenta cuenta)
        {
            return Ok(cuenta);
        }

        return NotFound();
    }

    [HttpPost]
    public ActionResult<Cuenta> CreateCuenta(CreateCuentaDtos createCuentaDto)
    {
        var cuenta = new Cuenta()
        {
            ID_USUARIO = createCuentaDto.ID_USUARIO,
            SALDO = createCuentaDto.SALDO,
            ALIAS = createCuentaDto.ALIAS,
            CBU = createCuentaDto.CBU,
        };

        _cuentaRepository.AddCuenta(cuenta);

        return Ok(cuenta);
    }

    [HttpPut("{id}")]
    public ActionResult UpdateCuenta(int id, Cuenta updateCuenta)
    {
        if (_cuentaRepository.GetCuentaById(id) is Cuenta cuenta)
        {
            cuenta.SALDO = updateCuenta.SALDO;
            cuenta.ALIAS = updateCuenta.ALIAS;
            cuenta.CBU = updateCuenta.CBU;

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