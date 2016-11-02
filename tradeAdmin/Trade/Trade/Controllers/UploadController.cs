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
        public ActionResult Images(string file,string name)
        {

           
            Regex reg = new Regex("data:.*;base64,");
            file = reg.Replace(file,"");
            byte[] arr = Convert.FromBase64String(file);
            using (MemoryStream ms = new MemoryStream(arr))
            {


                var dit = Server.MapPath("");
                if (!Directory.Exists(dit))
                {
                    Directory.CreateDirectory(dit);
                }
                var path = dit + Path.DirectorySeparatorChar + Guid.NewGuid() +(!string.IsNullOrEmpty(name) ? Path.GetExtension(name) :".png");
                FileStream fs = new FileStream(path, FileMode.OpenOrCreate);
                BinaryWriter w = new BinaryWriter(fs);
                w.Write(ms.ToArray());
                fs.Close();
                ms.Close();
            }
              
            
            var result = new { result = true, message = "", status = 200 };
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}