using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.OData;
using CustomerManager.Model;
using CustomerManager.Repository;

namespace CustomerManager.Controllers
{
    public class DataServiceController : ApiController
    {
        private CustomerRepository _repository;

        public DataServiceController()
        {
            _repository = new CustomerRepository();
        }

        [HttpGet][EnableQuery]
        public HttpResponseMessage Customers()
        {
            var customers = _repository.GetCustomers();
            var totalRecords = customers.Count();
            HttpContext.Current.Response.Headers.Add(
                "X-InlineCount", totalRecords.ToString());
            return Request.CreateResponse(HttpStatusCode.OK, customers);
        }

        [HttpGet]
        [EnableQuery]
        public HttpResponseMessage CustomersSummary()
        {
            int totalRecords;
            var custSummary = _repository.GetCustomersSummary(out totalRecords);
            HttpContext.Current.Response.Headers.Add("X-InlineCount", totalRecords.ToString());
            return Request.CreateResponse(HttpStatusCode.OK, custSummary);
        }
        [HttpGet]
        public HttpResponseMessage CustomerById(int id)
        {
            var customer = _repository.GetCustomerById(id);
           return Request.CreateResponse(HttpStatusCode.OK, customer);
        }

        public HttpResponseMessage PutCustomer(int id, [FromBody] Customer customer)
        {
            var opStatus = _repository.UpdateCustomer(customer);
            if (opStatus.Status)
            {
                return Request.CreateResponse(
                    HttpStatusCode.Accepted, customer);
            }
            return Request.CreateErrorResponse(
                HttpStatusCode.NotModified, opStatus.ExceptionMessage);
        }

        [HttpGet]
        public HttpResponseMessage States()
        {
            var states = _repository.GetStates();
            return Request.CreateResponse(HttpStatusCode.OK, states);
        }
    }
}
