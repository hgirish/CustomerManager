using System.Linq;
using CustomerManager.Model;

namespace CustomerManager.Repository
{
    public class CustomerRepository
    {
        private CustomerManagerContext _context;

        public CustomerRepository()
        {
            _context = new CustomerManagerContext();
        }


        public IQueryable<Customer> GetCustomers()
        {
            var query = _context.Customers
                .Include("Orders")
                .Include("State")
                .OrderBy(c => c.LastName);
            return query.AsQueryable();
        }
    }
}