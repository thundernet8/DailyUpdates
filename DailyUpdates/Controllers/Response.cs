using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.Net.Http;
using Newtonsoft.Json.Linq;
using System.Net.Http.Formatting;
using Aspen.DailyUpdates.DBModel.Services;

namespace Aspen.DailyUpdates.Web.Application.Controllers
{
    public class Response : HttpResponseMessage
    {
        public Response(JObject jobject)
            : base(HttpStatusCode.OK)
        {
            this.Content = new ObjectContent<JObject>(jobject, new JsonMediaTypeFormatter(), "application/json");
        }

        public Response(JArray jarray)
            : base(HttpStatusCode.OK)
        {
            this.Content = new ObjectContent<JArray>(jarray, new JsonMediaTypeFormatter(), "application/json");
        }

        public Response(Exception ex)
        {
            if (ex is ClientException)
            {
                this.StatusCode = HttpStatusCode.BadRequest;
            }
            else
            {
                this.StatusCode = HttpStatusCode.InternalServerError;
            }
            this.Content = new ObjectContent<JObject>(JObject.FromObject(
                new
                {
                    error = ex.Message
                }
                ), new JsonMediaTypeFormatter(), "application/json");
        }
    }
}