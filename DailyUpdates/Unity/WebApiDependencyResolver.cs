using DailyUpdates.Controllers;
using DBModel.Services;
using Microsoft.Practices.Unity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Dependencies;

namespace DailyUpdates.Unity
{
    public class WebApiDependencyResolver : IDependencyResolver
    {
        protected IUnityContainer container;

        public WebApiDependencyResolver(IUnityContainer container)
        {
            if (container == null)
            {
                throw new ArgumentNullException("container");
            }
            this.container = container;
        }

        public object GetService(Type serviceType)
        {
            try
            {
                return container.Resolve(serviceType);
            }
            catch (ResolutionFailedException)
            {
                return null;
            }
        }

        public IEnumerable<object> GetServices(Type serviceType)
        {
            try
            {
                return container.ResolveAll(serviceType);
            }
            catch (ResolutionFailedException)
            {
                return new List<object>();
            }
        }

        public IDependencyScope BeginScope()
        {
            var child = container.CreateChildContainer();
            return new WebApiDependencyResolver(child);
        }

        public void Dispose()
        {
            container.Dispose();
        }

        public static void Register(HttpConfiguration config)
        {
            //// create container for modelsManger dependency injection
            //var container = new UnityContainer();
            //container.RegisterType<IModelsManager, ModelsManager>("DomainName", new HierarchicalLifetimeManager(), new InjectionConstructor(HttpContext.Current.User.Identity.Name));
            //config.DependencyResolver = new WebApiDependencyResolver(container);

            // Create a new Unity dependency injection container
            var unity = new UnityContainer();

            // Register the Controllers that should be injectable
            unity.RegisterType<IModelsManager, ModelsManager>(new HierarchicalLifetimeManager());

            // Register instances to be used when resolving constructor parameter dependencies
            unity.RegisterInstance(new DomainName());

            // Finally, override the default dependency resolver with Unity
            GlobalConfiguration.Configuration.DependencyResolver = new WebApiDependencyResolver(unity);
        }
    }
}