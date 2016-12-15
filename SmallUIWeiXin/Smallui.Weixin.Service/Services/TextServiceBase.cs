using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Senparc.Weixin.MP.Entities;
using Senparc.Weixin.MP.Sample.CommonService.CustomMessageHandler;

namespace SmalluiWeixin.Service.Services
{
   public abstract class TextServiceBase:ITextServiceBase
    {


        public abstract ResponseMessageText Todo(RequestMessageText response, CustomMessageHandler handler)
        ;
    }
}
