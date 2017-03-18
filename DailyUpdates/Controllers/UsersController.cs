using Newtonsoft.Json.Linq;
using System.Web.Http;
using System.Web;
using DBModel.Services;

namespace DailyUpdates.Controllers
{
    [Authorize]
    [RoutePrefix("api/v1/users")]
    public class UsersController : ApiController
    {
        private ModelsManager _modelsManager = null;

        public UsersController()
        {
            _modelsManager = new ModelsManager(RequestContext.Principal.Identity.Name /* HttpContext.Current.User.Identity.Name */);
        }

        [HttpGet]
        [Route("me")]
        public JObject GetCurrentUser()
        {
            
            var currentUser = _modelsManager.GetCurrentUser();
            if (currentUser == null)
            {
                return null;
            }
            return JObject.FromObject(currentUser);
        }

        // GET: api/Users/5
        // [AllowAnonymous]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Users
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Users/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Users/5
        public void Delete(int id)
        {
        }
    }
}
