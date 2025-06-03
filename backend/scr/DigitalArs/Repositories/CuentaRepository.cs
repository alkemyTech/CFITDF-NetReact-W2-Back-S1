using DigitalArs.Data;
using DigitalArs.Interfaces;
using DigitalArs.Models;


namespace DigitalArs.Repositories
{
    public class CuentaRepository : ICuentaRepository
    {
        private AppDbContext _dbContext;

        public CuentaRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Cuenta> GetAllCuentas()
        {
            try
            {
                return _dbContext.Cuentas.ToList();
            }
            catch (InvalidCastException ex)
            {
                Console.WriteLine($"Error de conversion: {ex.Message}");
                return Enumerable.Empty<Cuenta>();
            }
        }

        public Cuenta? GetCuentaById(int id)
        {
            return _dbContext.Cuentas.FirstOrDefault(c => c.ID_CUENTA == id);

        }

        public Cuenta? GetCuentaByAlias(string alias)
        {
            return _dbContext.Cuentas.FirstOrDefault(c => c.ALIAS == alias);

        }

        public Cuenta? GetCuentaByCbu(string cbu)
        {
            return _dbContext.Cuentas.FirstOrDefault(c => c.CBU == cbu);

        }

        public void AddCuenta(Cuenta cuenta)
        {
            _dbContext.Cuentas.Add(cuenta);
            _dbContext.SaveChanges();
        }

        public void UpdateCuenta(Cuenta cuenta)
        {
            _dbContext.Cuentas.Update(cuenta);
            _dbContext.SaveChanges();
        }

        public void RemoveCuenta(int id)
        {
            var cuenta = _dbContext.Cuentas.FirstOrDefault(c => c.ID_CUENTA == id);
            if (cuenta != null)
            {
                _dbContext.Cuentas.Remove(cuenta);
                _dbContext.SaveChanges();
            }
        }
        public Cuenta? GetCuentaByUsuarioId(int idUsuario)
        {
            return _dbContext.Cuentas.FirstOrDefault(c => c.ID_USUARIO == idUsuario);
        }
        
    }
}
