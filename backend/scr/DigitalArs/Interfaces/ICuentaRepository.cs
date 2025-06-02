using DigitalArs.Models;

namespace DigitalArs.Interfaces
{
    public interface ICuentaRepository
    {
        IEnumerable<Cuenta> GetAllCuentas();
        Cuenta? GetCuentaById(int Id);
        void AddCuenta(Cuenta cuenta);
        Cuenta? GetCuentaByAlias(string alias);
        void UpdateCuenta(Cuenta cuenta);
        void RemoveCuenta(int Id);
    }
}
