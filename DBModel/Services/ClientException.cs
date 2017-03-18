using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DBModel.Services
{
    public class ClientException : Exception
    {
        public ClientException(string message)
            : base(message)
        {

        }
    }
}
