using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

[assembly: PreApplicationStartMethod(typeof(Aspen.DailyUpdates.Web.Application.PreApplicationStartup), "PreStart")]
namespace Aspen.DailyUpdates.Web.Application
{
    public static class PreApplicationStartup
    {
        private static bool _preStartWasCalled = false;

        public static void PreStart()
        {
            if (_preStartWasCalled)
                return;

            _preStartWasCalled = true;

            App_Start.HttpModuleConfig.Register();
        }
    }
}