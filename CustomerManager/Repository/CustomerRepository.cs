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

        public IQueryable<CustomerSummary> GetCustomersSummary(out int totalRecords)
        {
            var query = _context.Customers
                .Include("States")
                .OrderBy(c => c.LastName);

            totalRecords = query.Count();

            return query.Select(c => new CustomerSummary
            {
                Id = c.Id,
                FirstName = c.FirstName,
                LastName = c.LastName,
                City = c.City,
                State = c.State,
                OrderCount = c.Orders.Count(),
                Gender = c.Gender
            }).AsQueryable();
        }

        public Customer GetCustomerById(int id)
        {
            return _context.Customers
                .Include("Orders")
                .Include("State")
                .SingleOrDefault(c => c.Id == id);
        }
    }
}