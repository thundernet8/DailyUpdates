using Newtonsoft.Json.Linq;
using System.Web.Http;
using System.Web;
using DBModel.Services;
using System.Net.Http;
using System;
using DBModel.Models;

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
        public HttpResponseMessage GetCurrentUser()
        {
            
            var currentUser = _modelsManager.GetCurrentUser();
            if (currentUser == null)
            {
                return null;
            }
            return new Response(JObject.FromObject(currentUser));
        }

        [HttpGet]
        [Route("")]
        public HttpResponseMessage GetUsers()
        {
            try
            {
                var users = _modelsManager.GetUsers();
                return new Response(JArray.FromObject(users));
            }
            catch(Exception ex)
            {
                return new Response(ex);
            }
        }

        [HttpPost]
        [Route("")]
        public HttpResponseMessage CreateUser([FromBody]User user)
        {
            try
            {
                User newUser;
                if (user.Role == UserRole.Admin)
                {
                    newUser = _modelsManager.AddOwner(user.Name, user.DomainName);
                }
                else if(user.Role == UserRole.Admin) {
                    newUser = _modelsManager.AddAdmin(user.Name, user.DomainName);
                }
                else
                {
                    newUser = _modelsManager.AddUser(user.Name, user.DomainName);
                }
                return new Response(JObject.FromObject(newUser));
            }
            catch (Exception ex)
            {
                return new Response(ex);
            }
        }
    }
}
