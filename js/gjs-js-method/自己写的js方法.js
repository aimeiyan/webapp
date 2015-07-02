/**
 * 去掉左右两边入出境定的内容，默认为空格
 */
String.prototype.trim = function()
{
	return this.replace(eval(arguments[0]?  '/(^' + arguments[0] + '*)|(' + arguments[0] + '*$)/g': '/(^\s*)|(\s*$)/g'), "");
}
/**
 * 只能输入数字
 */
jQuery.fn.onlyNum = function(){
	$(this).live('keydown', function(event){
		var key = event.which;
		if(key < 48 || key > 57)
		{
			if((key < 96 || key > 105) && key != 8)
			{
				return false;
			}
		}
	});
};

/**
 * 输入框默认显示内容
 */
jQuery.fn.defCont = function(obj){
	var settings = {
				oldcolor : '',
				newcolor : '',
				title_tag : 'show_default'
			};
	if(obj)
	{
		$.extend(settings,obj);
	}
	$(this).live('focus', function(){
		$(this).attr(settings.title_tag, $(this).val()).val('');
		if(settings.newcolor != '')
		{
			$(this).css({'color':settings.newcolor});
		}
	});
	$(this).live('blur', function(){
		var thisValue = $(this).val();
		if(thisValue.trim() == '')
		{
			$(this).val($(this).attr(settings.title_tag));
			if(settings.oldcolor != '')
			{
				$(this).css({'color':settings.oldcolor});
			}
		}
	});
};

/**
 * 获取指定的参数的值
 */
jQuery.fn.getUrlParam = function(paras)
{
	var url = location.href;
	var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");
	var paraObj = {}
	for (i=0; j=paraString[i]; i++){
		paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length);
	}
	var returnValue = paraObj[paras.toLowerCase()];
	if(typeof(returnValue)=="undefined"){
		return "";
	}else{
		return returnValue;
	}
}
//url = (request('end_time') == '') ? url+'&end_time='+end_time : url.replace("end_time="+request('end_time'), 'end_time='+ end_time);

/**
 * 点击或滑动门
 * obj为要显示的对象
 * event为事件
 * sign为标记
 */
$.fn.bak = function(obj){
	var settings = {
				obj : '',
				event : 'click',
				sign : 't',
			};
	if(obj)
	{
		$.extend(settings,obj);
	}
	var newOjb = $(this);
	newOjb.live(settings.event, function(){
		var thidSign = $(this).attr(settings.sign);
		var thisObj = $(settings.obj + '[' + settings.sign + '=' + thidSign + ']');
		if (typeof(thisObj.html()) != "undefined")
		{
			$(settings.obj).hide();
			$(settings.obj + '[' + settings.sign + '=' + thidSign + ']').show();
		}
	})
};
