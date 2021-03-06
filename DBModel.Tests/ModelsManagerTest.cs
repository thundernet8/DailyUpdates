// <copyright file="ModelsManagerTest.cs">Copyright ©  2017</copyright>
using System;
using DBModel.Models;
using DBModel.Services;
using Microsoft.Pex.Framework;
using Microsoft.Pex.Framework.Validation;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace DBModel.Services.Tests
{
    /// <summary>This class contains parameterized unit tests for ModelsManager</summary>
    [PexClass(typeof(ModelsManager))]
    [PexAllowedExceptionFromTypeUnderTest(typeof(InvalidOperationException))]
    [PexAllowedExceptionFromTypeUnderTest(typeof(ArgumentException), AcceptExceptionSubtypes = true)]
    [TestClass]
    public partial class ModelsManagerTest
    {
        /// <summary>Test stub for AddOwner(String, String)</summary>
        [PexMethod]
        public User AddOwnerTest(
            [PexAssumeUnderTest]ModelsManager target,
            string name,
            string domainName
        )
        {
            User result = target.AddOwner(name, domainName);
            return result;
            // TODO: add assertions to method ModelsManagerTest.AddOwnerTest(ModelsManager, String, String)
        }
    }
}
