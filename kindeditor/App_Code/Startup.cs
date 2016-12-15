using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(kindeditor.Startup))]
namespace kindeditor
{
    public partial class Startup {
        public void Configuration(IAppBuilder app) {
            ConfigureAuth(app);
        }
    }
}
