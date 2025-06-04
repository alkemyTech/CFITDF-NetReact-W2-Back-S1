using DigitalArs.Models;

namespace DigitalArs.Interfaces
{
    public interface ICuentaRepository
    {
        IEnumerable<Cuenta> GetAllCuentas();
        Cuenta? GetCuentaById(int Id);
        IEnumerable<Cuenta> GetCuentasById(int id);
        void AddCuenta(Cuenta cuenta);
        Cuenta? GetCuentaByAlias(string alias);
        Cuenta? GetCuentaByCbu(string alias);
        void UpdateCuenta(Cuenta cuenta);
        void RemoveCuenta(int Id);
        Cuenta? GetCuentaByUsuarioId(int idUsuario);

    }
}
