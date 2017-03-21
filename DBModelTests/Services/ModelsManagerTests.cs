using Microsoft.VisualStudio.TestTools.UnitTesting;
using DBModel.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DBModel.Services.Tests
{
    [TestClass()]
    public class ModelsManagerTests
    {
        [TestMethod()]
        public void AddOwnerTest()
        {
            try
            {
                var modelsManager = new ModelsManager(null);
                modelsManager.AddOwner("Xueqian", "CORP\\wuxu");
            }
            catch (Exception ex)
            {
                if (ex is ClientException)
                {
                    Assert.IsTrue(true);
                }
                else
                {
                    Assert.Fail();
                }
            }
        }

        [TestMethod()]
        public void AddAdminTest()
        {
            try
            {
                var modelsManager = new ModelsManager(new DomainName("CORP\\wuxu"));
                modelsManager.AddAdmin("Xueqian", "CORP\\wuxu");
            }
            catch (Exception ex)
            {
                if (ex is ClientException)
                {
                    Assert.IsTrue(true);
                }
                else
                {
                    Assert.Fail();
                }
            }
        }

        [TestMethod()]
        public void AddUserTest()
        {
            try
            {
                var modelsManager = new ModelsManager(new DomainName("CORP\\wuxu"));
                modelsManager.AddUser("Bolt", "CORP\\lizi");
            }
            catch (Exception ex)
            {
                if (ex is ClientException)
                {
                    Assert.IsTrue(true);
                }
                else
                {
                    Assert.Fail();
                }
            }
        }

        [TestMethod()]
        public void AddProjectTest()
        {
            try
            {
                var modelsManager = new ModelsManager(new DomainName("CORP\\wuxu"));
                modelsManager.AddProject("Scheduling Project", "APS web project");
            }
            catch (Exception ex)
            {
                if (ex is ClientException)
                {
                    Assert.IsTrue(true);
                }
                else
                {
                    Assert.Fail();
                }
            }
        }

        [TestMethod()]
        public void AddFieldTest()
        {
            try
            {
                var modelsManager = new ModelsManager(new DomainName("CORP\\wuxu"));
                modelsManager.AddField("Frontend", "", new DateTime(2017, 1, 1), new DateTime(2017, 5, 1), 1);
            }
            catch (Exception ex)
            {
                if (ex is ClientException)
                {
                    Assert.IsTrue(true);
                }
                else
                {
                    Assert.Fail();
                }
            }
        }

        [TestMethod()]
        public void AddFieldTest1()
        {
            try
            {
                var modelsManager = new ModelsManager(new DomainName("CORP\\wuxu"));
                modelsManager.AddField("Web Gantt Chart component", "investigate the APIs in Yefim's Web Gantt Chart component", new DateTime(2017, 1, 1), new DateTime(2017, 5, 1), 1, 1);
            }
            catch (Exception ex)
            {
                if (ex is ClientException)
                {
                    Assert.IsTrue(true);
                }
                else
                {
                    Assert.Fail();
                }
            }
        }

        [TestMethod()]
        public void AddRecordTest()
        {
            try
            {
                var modelsManager = new ModelsManager(new DomainName("CORP\\wuxu"));
                modelsManager.AddRecord(2, "destination strings", false, "detail string");
            }
            catch (Exception ex)
            {
                if (ex is ClientException)
                {
                    Assert.IsTrue(true);
                }
                else
                {
                    Assert.Fail();
                }
            }
        }

        [TestMethod()]
        public void UpdateRecordTest()
        {
            try
            {
                var modelsManager = new ModelsManager(new DomainName("CORP\\wuxu"));
                modelsManager.UpdateRecord(1, 2, "destination strings modified", false, "detail string 12313141515156");
            }
            catch (Exception ex)
            {
                if (ex is ClientException)
                {
                    Assert.IsTrue(true);
                }
                else
                {
                    Assert.Fail();
                }
            }
        }
    }
}