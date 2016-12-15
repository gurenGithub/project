using Senparc.Weixin.MP.Entities;
using Senparc.Weixin.MP.Sample.CommonService.CustomMessageHandler;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmalluiWeixin.Service.Services
{
  public  interface ITextServiceBase
    {


    

         ResponseMessageText Todo(RequestMessageText response, CustomMessageHandler handler);
    }
}
