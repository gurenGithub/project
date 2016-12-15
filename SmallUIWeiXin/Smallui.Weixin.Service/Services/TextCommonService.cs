using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Senparc.Weixin.MP.Entities;
using Senparc.Weixin.MP.Helpers;
using Senparc.Weixin.MP.Sample.CommonService.CustomMessageHandler;

namespace SmalluiWeixin.Service.Services
{
    public class TextCommonService : TextServiceBase
    {
        public override ResponseMessageText Todo(RequestMessageText request, CustomMessageHandler handler)
        {

            string keywork = request.Content;
            var response = handler.CreateResponseMessage<ResponseMessageText>();
            if (keywork.Contains("smallui"))
            {
                response.Content= "smallui.com";
            }else if (keywork.Contains("你好"))
            {

                response.Content = "欢迎来到smallui.com";
            }

            return response;
        }
    }
}
