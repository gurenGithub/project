using Senparc.Weixin.MP.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmalluiWeixin.Service.Services
{
  public  class TextServiceFactory
    {

        public static ITextServiceBase GetInstance(RequestMessageText request)
        {
            ITextServiceBase iservice=GetConfig(request);

            return iservice;

        }

        public static ITextServiceBase GetConfig(RequestMessageText request)
        {
            ITextServiceBase iservice =new  TextCommonService();
            return iservice;


        }
    }
}
