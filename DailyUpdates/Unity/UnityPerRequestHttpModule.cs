﻿using Microsoft.Web.Infrastructure.DynamicModuleHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Aspen.DailyUpdates.Web.Application.Unity
{
    /// <summary>
    /// Implementation of the <see cref="IHttpModule"/> interface that provides support for using the
    /// <see cref="PerRequestLifetimeManager"/> lifetime manager, and enables it to
    /// dispose the instances after the HTTP request ends.
    /// </summary>
    public class UnityPerRequestHttpModule : IHttpModule
    {
        private static readonly object ModuleKey = new object();

        internal static object GetValue(object lifetimeManagerKey)
        {
            var dict = GetDictionary(HttpContext.Current);

            if (dict != null)
            {
                object obj = null;

                if (dict.TryGetValue(lifetimeManagerKey, out obj))
                {
                    return obj;
                }
            }

            return null;
        }

        internal static void SetValue(object lifetimeManagerKey, object value)
        {
            var dict = GetDictionary(HttpContext.Current);

            if (dict == null)
            {
                dict = new Dictionary<object, object>();

                HttpContext.Current.Items[ModuleKey] = dict;
            }

            dict[lifetimeManagerKey] = value;
        }

        /// <summary>
        /// Disposes the resources used by this module.
        /// </summary>
        public void Dispose()
        {
        }

        /// <summary>
        /// Initializes a module and prepares it to handle requests.
        /// </summary>
        /// <param name="application">An <see cref="HttpApplication"/> that provides access to the methods, properties,
        /// and events common to all application objects within an ASP.NET application.</param>
        public void Init(HttpApplication application)
        {
            if (application == null)
                throw new ArgumentNullException("application");

            UnityContainerProvider.Configure();

            application.EndRequest += OnEndRequest;
        }

        private void OnEndRequest(object sender, EventArgs e)
        {
            var app = (HttpApplication)sender;

            var dict = GetDictionary(app.Context);

            if (dict != null)
            {
                foreach (var disposable in dict.Values.OfType<IDisposable>())
                {
                    disposable.Dispose();
                }
            }
        }

        private static Dictionary<object, object> GetDictionary(HttpContext context)
        {
            if (context == null)
                throw new ArgumentNullException("context");

            var dict = (Dictionary<object, object>)context.Items[ModuleKey];

            return dict;
        }

        // Internal method to prepare module and register
        internal static void Register()
        {
            DynamicModuleUtility.RegisterModule(typeof(Unity.UnityPerRequestHttpModule));
        }
    }
}