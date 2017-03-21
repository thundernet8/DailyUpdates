using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Aspen.DailyUpdates.Web.Application.App_Start
{
    public static class HttpModuleConfig
    {
        public static void Register()
        {
            // This module is responsible for creating per request dependency scope
            Unity.UnityPerRequestHttpModule.Register();
        }
    }
}