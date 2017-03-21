using Aspen.DailyUpdates.DBModel.Models;
using Aspen.DailyUpdates.DBModel.Services;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;

namespace Aspen.DailyUpdates.Web.Application.Controllers
{
    [Authorize]
    [RoutePrefix("api/v1/projects")]
    public class ProjectsController : ApiController
    {
        private IModelsManager _modelsManager;

        public ProjectsController(IModelsManager modelsManager)
        {
            _modelsManager = modelsManager;
        }

        [Route("")]
        public HttpResponseMessage GetAllProjects()
        {
            
            try
            {
                List<Project> projects = _modelsManager.GetProjects().ToList();
                return new Response(JArray.FromObject(projects));
            }
            catch (Exception ex)
            {
                return new Response(ex);
            }
        }

        [HttpPost]
        [Route("")]
        [ResponseType(typeof(JObject))]
        public HttpResponseMessage CreateProject([FromBody]Project project)
        {
            try
            {
                Project newProject = _modelsManager.AddProject(project.Name, project.Description);
                return new Response(JObject.FromObject(newProject));
            }
            catch (Exception ex)
            {
                return new Response(ex);
            }
        }
    }
}
