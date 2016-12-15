using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Smallui.WeiXin.Startup))]
namespace Smallui.WeiXin
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
