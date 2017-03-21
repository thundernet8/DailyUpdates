using System;
using System.Reflection;

namespace Aspen.DailyUpdates.Web.Application.Areas.HelpPage.ModelDescriptions
{
    public interface IModelDocumentationProvider
    {
        string GetDocumentation(MemberInfo member);

        string GetDocumentation(Type type);
    }
}