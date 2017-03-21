using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Aspen.DailyUpdates.DBModel
{
    public static class Utils
    {
        public static string GetSetting(string key)
        {
            var assembly = Assembly.GetExecutingAssembly();
            var resourceName = "DBModel.db.config";
            //string configFilePath = Path.Combine(System.IO.Directory.GetCurrentDirectory(), "db.config");
            //if (!File.Exists(configFilePath))
            //{
            //    throw new Exception("missing db.config for DBModel project");
            //}

            using (Stream stream = assembly.GetManifestResourceStream(resourceName))
            {
                try
                {
                    XElement lRoot = XElement.Load(stream);
                    XElement appSetting = lRoot.Element("appSettings").Elements("add").Where(x => x.Attribute("key").Value == key).FirstOrDefault();
                    if (appSetting != null)
                    {
                        return appSetting.Attribute("value").Value;
                    }
                    return "";
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }
    }
}
