using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace DBModel.Services
{
    public class DomainName
    {
        private string _domainName;
        public DomainName(string domainName = null)
        {
            _domainName = domainName;
        }

        public string GetFullName()
        {
            if (_domainName != null)
            {
                return _domainName;
            }
            return HttpContext.Current.User.Identity.Name;
        }

        public string GetDomain()
        {
            _domainName = _domainName != null ? _domainName : HttpContext.Current.User.Identity.Name;
            var pieces = _domainName.Split('\\');
            if (pieces.Count() > 1)
            {
                return pieces[0];
            }
            return "";
        }

        public string GetName()
        {
            _domainName = _domainName != null ? _domainName : HttpContext.Current.User.Identity.Name;
            var pieces = _domainName.Split('\\');
            if (pieces.Count() > 1)
            {
                return pieces[1];
            }
            return "";
        }
    }
}
