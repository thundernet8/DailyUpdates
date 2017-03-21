using Microsoft.Practices.Unity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Dependencies;

namespace Aspen.DailyUpdates.Web.Application.Unity
{
    /// <summary>
    /// An implementation of the <see cref="IDependencyResolver"/> interface that wraps a Unity container.
    /// </summary>
    public sealed class WebApiDependencyResolver : System.Web.Http.Dependencies.IDependencyResolver
    {
        private SharedDependencyScope sharedScope;

        /// <summary>
        /// Initializes a new instance of the <see cref="WebApiDependencyResolver"/> class for a container.
        /// </summary>
        /// <param name="container">The <see cref="IUnityContainer"/> to wrap with the <see cref="IDependencyResolver"/>
        /// interface implementation.</param>
        public WebApiDependencyResolver()
        {
            this.sharedScope = new SharedDependencyScope(this);
        }

        /// <summary>
        /// Reuses the same scope to resolve all the instances.
        /// </summary>
        /// <returns>The shared dependency scope.</returns>
        public IDependencyScope BeginScope()
        {
            return this.sharedScope;
        }

        /// <summary>
        /// Disposes the wrapped <see cref="IUnityContainer"/>.
        /// </summary>
        public void Dispose()
        {
            this.sharedScope.Dispose();
        }

        /// <summary>
        /// Resolves an instance of the default requested type from the container.
        /// </summary>
        /// <param name="serviceType">The <see cref="Type"/> of the object to get from the container.</param>
        /// <returns>The requested object.</returns>
        public object GetService(Type serviceType)
        {
            var container = UnityContainerProvider.Current;
            if (container == null)
                return null;

            // Do not try to create interfaces or abstract types that are not registered
            if ((serviceType.IsAbstract || serviceType.IsInterface) && !container.IsRegistered(serviceType))
                return null;

            try
            {
                return container.Resolve(serviceType);
            }
            catch (ResolutionFailedException)
            {
                return null;
            }
        }


        /// <summary>
        /// Resolves multiply registered services.
        /// </summary>
        /// <param name="serviceType">The type of the requested services.</param>
        /// <returns>The requested services.</returns>
        public IEnumerable<object> GetServices(Type serviceType)
        {
            try
            {
                return UnityContainerProvider.Current.ResolveAll(serviceType);
            }
            catch (ResolutionFailedException)
            {
                return null;
            }
        }

        private sealed class SharedDependencyScope : System.Web.Http.Dependencies.IDependencyScope
        {
            WebApiDependencyResolver _parent;

            public SharedDependencyScope(WebApiDependencyResolver parent)
            {
                _parent = parent;
            }

            public object GetService(Type serviceType)
            {
                return _parent.GetService(serviceType);
            }

            public IEnumerable<object> GetServices(Type serviceType)
            {
                return _parent.GetServices(serviceType);
            }

            public void Dispose()
            {
                // NO-OP, as the container is shared.
            }
        }
    }
}