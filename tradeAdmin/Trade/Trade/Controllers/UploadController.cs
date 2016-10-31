using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;

namespace Trade.Controllers
{
    public class UploadController : Controller
    {
        // GET: Upload
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Images()
        {
            var file = HttpContext.Request["file"];
            Regex reg = new Regex("data:.*;base64,");
            file = reg.Replace(file,"");
            byte[] arr = Convert.FromBase64String(file);
            MemoryStream ms = new MemoryStream(arr);
            

                var dit = Server.MapPath("");
                if (!Directory.Exists(dit))
                {
                    Directory.CreateDirectory(dit);
                }
                var path = dit + Path.DirectorySeparatorChar + Guid.NewGuid() + ".png";
                FileStream fs = new FileStream(path, FileMode.OpenOrCreate);
                //ms.WriteTo(fs);
                //fs.Close();
                //ms.Close();

                BinaryWriter w = new BinaryWriter(fs);
                w.Write(ms.ToArray());
                fs.Close();
                ms.Close();
            
              
            
            var result = new { result = true, message = "", status = 200 };
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}