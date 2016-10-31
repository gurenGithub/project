var imageUpload = (function(argument) {


	var members = {

		addEvent: function(dom, type, fn) {

			if (typeof document.addEventListener != "undefined") {
				dom.addEventListener(type, fn, false);

			} else {
				dom.attachEvent('on' + type, function() {
					fn.call(dom, arguments);

				});
			}
		},

		insertBefore: function(newElement, targetElement) {
			var parent = targetElement.parentNode;
			parent.insertBefore(newElement, targetElement);
		},
		insertAfter: function(newElement, targetElement) {
			var parent = targetElement.parentNode;
			if (parent.lastChild == targetElement) {
				// 如果最后的节点是目标元素，则直接添加。因为默认是最后
				parent.appendChild(newElement);
			} else {
				parent.insertBefore(newElement, targetElement.nextSibling);
				//如果不是，则插入在目标元素的下一个兄弟节点 的前面。也就是目标元素的后面
			}
		},
		upload: function(url, data,li) {
			var fd = new FormData();
			fd.append("file", data);
			var xhr = new XMLHttpRequest();
			var $progress=document.createElement('div');
			$progress.className='img-item-process';
            li.appendChild($progress);
			xhr.upload.addEventListener("progress", function(evt) {

				if (evt.lengthComputable) {
					var percentComplete = Math.round(evt.loaded * 100 / evt.total);
					 $progress.style.height=percentComplete+'%';
					if(percentComplete==100){
						$progress.style.display="none";
					}
				}
			}, false);
			xhr.addEventListener("load", function(evt) {

			}, false);
			xhr.addEventListener("error", function(evt) {}, false);
			xhr.addEventListener("abort", function(evt) {}, false);
			xhr.open("POST", url);
			xhr.send(fd);
		},
		init: function(opts) {

			var selector = opts.selector || '.imgs';
			var auto = true;
			var max = 9;
			var url = null;
			var me = this;
			var dw = opts.width || 150;
			var dh = opts.height || 150;
			var $imgs = document.querySelectorAll(selector);
			for (var i = 0; i < $imgs.length; i++) {

				(function(i) {
					var $imgList = $imgs[i];

					var $imgPlus = document.querySelectorAll('.img-plus', $imgList)[0];
					var $btnUpload = document.querySelectorAll('.img-plus input[type=file]', $imgPlus)[0];
					me.addEvent($btnUpload, 'change', function(ev) {
						var img = new Image();

						var f = ev.target.files[0];
						if (f.type.match('image.*')) {
							var r = new FileReader();
							r.onload = function(e) {
								img.setAttribute('src', e.target.result);
							};
							r.readAsDataURL(f);
						}
						img.onload = function() {
							ih = img.height, iw = img.width;
							if (iw / ih > dw / dh && iw > dw) {
								ih = ih / iw * dw;
								iw = dw;
							} else if (ih > dh) {
								iw = iw / ih * dh;
								ih = dh;
							}
							var cv = document.createElement('div');
							cv.innerHTML = "<canvas></canvas>";
							var rc = cv.children[0];
							var ct = rc.getContext('2d');
							rc.width = iw;
							rc.height = ih;
							ct.drawImage(img, 0, 0, iw, ih);
							var da = rc.toDataURL();
							var $li = document.createElement('li');
							$li.className = 'img-item';
							$li.appendChild(img);
							me.insertBefore($li, $imgPlus);
							if (console && console.log) {
								console.log(da);
							}
							if (document.querySelectorAll('.img-item', $imgList).length > max) {
								$imgPlus.style.display = "none";
							}
							if (opts.url) {
								me.upload(opts.url, da,$li);
							}
						}

						function esc(da) {
							da = da.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;');
							return encodeURIComponent(da);
						}
					});


				})(i)
			}
		}

	};
	return members;
})();