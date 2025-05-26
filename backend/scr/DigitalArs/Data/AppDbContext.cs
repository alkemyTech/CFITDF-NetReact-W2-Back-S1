using DigitalArs.Entities;
using DigitalArs.Models;
using Microsoft.EntityFrameworkCore;

namespace DigitalArs.Data {
    public class AppDbContext : DbContext{        
        public DbSet<Transaccion> Transacciones { get; set; }
        public DbSet<Usuario> USUARIO { get; set; }
        public DbSet<PlazoFijo> PlazoFijo { get; set; }
        public DbSet<Cuenta> Cuenta { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            optionsBuilder.UseSqlServer();
        }
    }
}
