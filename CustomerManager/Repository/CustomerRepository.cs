using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data.Entity;
using System.Linq;
using System.Net.NetworkInformation;
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

        public OperationStatus UpdateCustomer(Customer customer)
        {
            var opStatus = new OperationStatus {Status = true};
            try
            {
                customer.State.Id = customer.StateId;
                _context.Customers.Attach(customer);
                _context.Entry(customer).State = EntityState.Modified;
                _context.SaveChanges();
            }
            catch (Exception exp)
            {
                opStatus.Status = false;
                opStatus.ExceptionMessage = exp.Message;
            }
            return opStatus;
        }

        public List<State> GetStates()
        {
            return _context.States.OrderBy(s => s.Name).ToList();
        }

        public OperationStatus CheckUnique(int id, string property, string value)
        {
            switch (property.ToLower())
            {
                case "email":
                    var unique = !_context.Customers.Any(c => c.Id != id && c.Email == value);
                    return new OperationStatus {Status = unique};
                default:
                    return new OperationStatus();
            }
        }
    }
}