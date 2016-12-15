function vcombo(opts) {

	this.opts = opts;
	this.parent = null;
	this.child = null;
	this.onOrgSelect = null;
}

vcombo.prototype.reset = function(onfilter) {
	var me=this;
	me.opts.selector.combobox('setValue','');

	if(onfilter){
		var parentValues=onfilter();
         var parentList=parentValues.split(',');
         var data=this.opts.orgdata.filter(function(item){

               return $.inArray(item[me.opts.parentFiled || 'parent'], parentList)>-1;
         });

       me.opts.selector.combobox('loadData',data);
	}
};
vcombo.prototype.getValue = function() {
  
  return this.opts.selector.combobox('getValue');
}
vcombo.prototype.render = function(opts) {

	if (opts) {
		this.opts = opts;
	}

	if (typeof this.opts.selector === 'string') {
		this.opts.selector = $(opts.selector);
	}
	var me = this;
	this.onOrgSelect = this.opts.onSelect;
	this.opts.onChange = function(newValue,oldValue) {
		if (me.onOrgSelect) {
			me.onOrgSelect.apply(this, arguments);
		}
		if(me.child)
		{
			me.child.reset(function(){return me.getValue();});
		}
	}

	this.opts.selector.combobox(this.opts);
}
vcombo.prototype.setValue = function(value) {

}


var combo = (function() {

	var objs = [];
	var index=1;
	var members = {
        combos:objs,
		getParent: function(selector) {
            
            return objs.filter(function(combo){
            	return combo.opts.selector[0]==selector[0];
            })[0];

		},
		render: function() {


			var me = this;
			$('.vcombo').each(function() {
				var $me = $(this);
				var opts = $me.data('options');
				if (!opts) {
					opts = {};
				}
				var defaultOpts = {
					valueField: 'id',
					textField: 'text'
				};
				$.extend(opts, defaultOpts);
				var parentSelector = $me.attr('parent');
				var datasouce = $me.attr('datasource');
				if (!opts.data && datasouce && me.datasouce[datasouce]) {
					opts.data = me.datasouce[datasouce];
				}
				opts.orgdata=opts.data;
				opts.selector = $me;

				var _combo = new vcombo(opts);
				_combo.render();
				$me.attr('combo-index',index++);
				if (parentSelector) {
					_combo.parent = me.getParent($(parentSelector));
					if (_combo.parent) {
						_combo.parent.child = _combo;
					}
				}
				objs.push(_combo);

			});
		}
	};

	return members;

})();


$(function() {

	combo.render();
});