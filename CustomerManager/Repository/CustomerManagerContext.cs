using System.Data.Entity;
using CustomerManager.Model;

namespace CustomerManager.Repository
{
    public class CustomerManagerContext : DbContext
    {
        public CustomerManagerContext()
        {
            Configuration.ProxyCreationEnabled = false;
            Configuration.LazyLoadingEnabled = false;
        }

        static CustomerManagerContext()
        {
            System.Data.Entity.Database.SetInitializer(new CustomerManagerDatabaseInitializer());
        }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<State> States { get; set; }
    }
}