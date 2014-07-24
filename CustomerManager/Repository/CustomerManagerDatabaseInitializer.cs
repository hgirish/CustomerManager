using System.Data.Entity;

namespace CustomerManager.Repository
{
    public class CustomerManagerDatabaseInitializer
        : DropCreateDatabaseAlways<CustomerManagerContext>
    {
        protected override void Seed(CustomerManagerContext context)
        {
            DataInitializer.Initialize(context);
            base.Seed(context);
        }
    }
}