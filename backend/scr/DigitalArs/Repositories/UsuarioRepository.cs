using DigitalArs.Data;
using DigitalArs.Models;
using DigitalArs.Interfaces;

namespace DigitalArs.Repositories {

    public class UsuarioRepository : IUsuarioRepository {
       
        private AppDbContext _dbContext;

        public UsuarioRepository(AppDbContext dbContext) {
            _dbContext = dbContext;
        }

        public IEnumerable<Usuario> GetAllUser() {
            return _dbContext.USUARIO.ToList();
        }

        public Usuario? GetUserById(int Id) {
            return _dbContext.USUARIO.FirstOrDefault(u => u.ID_USUARIO == Id);
        }

        public Usuario AddUser(Usuario usuario)
        {
            _dbContext.USUARIO.Add(usuario);
            _dbContext.SaveChanges();
            return usuario;
        }

        public void UpdateUser(Usuario usuario) {
            _dbContext.USUARIO.Update(usuario);
            _dbContext.SaveChanges();
        }

        public void RemoveUser(int id)
        {
            var usuario = _dbContext.USUARIO.FirstOrDefault(u => u.ID_USUARIO == id);
            //if (usuario != null) {
            //    _dbContext.USUARIO.Remove(usuario);
            //    _dbContext.SaveChanges();
            //}

            if (usuario != null)
            {
                usuario.FECHA_BAJA = DateTime.Now;
                _dbContext.USUARIO.Update(usuario);
                _dbContext.SaveChanges();
            }
        }
    }
}
