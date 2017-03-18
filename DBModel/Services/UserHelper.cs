using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DBModel.Models;

namespace DBModel.Services
{
    public static class UserHelper
    {
        public static bool IsOwner (this User user)
        {
            return user.Role == UserRole.Owner;
        }

        public static bool IsAdmin (this User user)
        {
            return user.Role == UserRole.Owner || user.Role == UserRole.Admin;
        }
    }
}
