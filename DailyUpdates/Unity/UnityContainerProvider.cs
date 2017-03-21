using Aspen.DailyUpdates.DBModel.Services;
using Microsoft.Practices.Unity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;

namespace Aspen.DailyUpdates.Web.Application.Unity
{
    public static class UnityContainerProvider
    {
        private static IUnityContainer _rootContainer;

        internal static void Configure()
        {
            if (_rootContainer != null)
                return;

            _rootContainer = new UnityContainer();


            _rootContainer.RegisterTypes(SelectTypesToRegister(),
                getFromTypes: SelectInterfacesToRegister,
                getName: SelectNameToRegister,
                getLifetimeManager: WithLifetime.None);

            // Register instances to be used when resolving constructor parameter dependencies
            _rootContainer.RegisterInstance(new DomainName());

            ConfigureWebApi();
        }

        private static IEnumerable<Assembly> SelectAssembliesToRegister()
        {
            return from assembly in System.Web.Compilation.BuildManager.GetReferencedAssemblies().Cast<Assembly>()
                   where assembly.FullName.StartsWith("Aspen.DailyUpdates")
                   select assembly;
        }

        private static IEnumerable<Type> SelectTypesToRegister()
        {
            return from type in AllClasses.FromAssemblies(SelectAssembliesToRegister(), skipOnError: true)
                   where IsPart(type)
                   select type;
        }

        private static IEnumerable<Type> SelectInterfacesToRegister(Type type)
        {
            var allInterfaces = WithMappings.FromAllInterfaces(type);
            return from intf in allInterfaces where IsInNamespace(intf, "Aspen.DailyUpdates") select intf;
        }

        private static string SelectNameToRegister(Type type)
        {
            var attributes = type.GetCustomAttributes(false);

            return WithName.Default(type);
        }

        private static bool IsPart(Type type)
        {
            if (type == null || type.IsAssignableFrom(typeof(Attribute)))
                return false;

            if (IsInNamespace(type, "Services") || IsInNamespace(type, "Controllers") || IsInNamespace(type, "SingletonServices"))
                return true;

            return false;
        }

        public static bool IsInNamespace(Type type, string namespaceFragment)
        {
            if (type == null)
                return false;

            if (string.IsNullOrEmpty(namespaceFragment))
                return false;

            var typeNamespace = type.Namespace;
            if (string.IsNullOrEmpty(typeNamespace))
                return false;

            return (typeNamespace.StartsWith(namespaceFragment + ".")
                || typeNamespace.EndsWith("." + namespaceFragment)
                || typeNamespace.Contains("." + namespaceFragment + "."));
        }

        static void ConfigureWebApi()
        {
            System.Web.Http.GlobalConfiguration.Configuration.DependencyResolver = new WebApiDependencyResolver();
        }

        internal static IUnityContainer Current
        {
            get
            {
                return _rootContainer;
            }
        }
    }
}