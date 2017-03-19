﻿using DBModel.Models;
using DBModel.Services;
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

namespace DailyUpdates.Controllers
{
    [Authorize]
    [RoutePrefix("api/v1/projects")]
    public class ProjectsController : ApiController
    {
        private ModelsManager _modelsManager = null;

        public ProjectsController()
        {
            _modelsManager = new ModelsManager(RequestContext.Principal.Identity.Name);
        }

        [Route("")]
        public JArray GetAllProjects()
        {
            List<Project> projects = _modelsManager.GetProjects().ToList();
            return JArray.FromObject(projects);
        }

        // GET: api/Projects/5
        public string Get(int id)
        {
            return "value";
        }

        [HttpPost]
        [Route("")]
        [ResponseType(typeof(JObject))]
        public HttpResponseMessage CreateProject(HttpRequestMessage request, [FromBody]Project project)
        {
            try
            {
                Project newProject = _modelsManager.AddProject(project.Name, project.Description);
                // return JObject.FromObject(newProject);
                return request.CreateResponse(HttpStatusCode.OK, JObject.FromObject(newProject));
            }
            catch (Exception ex)
            {
                return new Response(ex);
            }
        }

        // PUT: api/Projects/5
        public void Put(int id, [FromBody]string value)
        {
            
        }

        // DELETE: api/Projects/5
        public void Delete(int id)
        {
        }
    }
}
