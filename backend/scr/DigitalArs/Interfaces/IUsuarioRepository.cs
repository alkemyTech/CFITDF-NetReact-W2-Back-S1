using DigitalArs.Models;

namespace DigitalArs.Interfaces {
    public interface IUsuarioRepository {
        IEnumerable<Usuario> GetAllUser();
        Usuario? GetUserById(int Id);
        void AddUser(Usuario entity);
        void UpdateUser(Usuario entity);
        void RemoveUser(int id);
    }
}
