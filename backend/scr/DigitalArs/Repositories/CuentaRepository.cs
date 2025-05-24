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
            return _dbContext.Cuentas.ToList();
        }

        public Cuenta? GetCuentaById(int id)
        {
            return _dbContext.Cuentas.FirstOrDefault(t => t.ID_CUENTA == id);
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
            var cuenta = _dbContext.Cuentas.FirstOrDefault(t => t.ID_CUENTA == id);
            if (cuenta != null)
            {
                _dbContext.Cuentas.Remove(cuenta);
                _dbContext.SaveChanges();
            }
        }

        public IEnumerable<Cuenta> GetAllTransacciones()
        {
            throw new NotImplementedException();
        }
    }
}
