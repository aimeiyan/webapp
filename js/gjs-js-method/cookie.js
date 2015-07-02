function setCookie(name, value, time)
{
	if(name != '')
	{
		if(!time)
			time = 60*60*24;
		if(time > 0)
		{
			var $date = new Date();
			$date.setTime($date.getTime() + parseInt(time));
			document.cookie = name + '=' + escape(value) + ';expires=' + $date.toGMTString();
		}
	}
}
function getCookie(name)//取cookies函数       
{
 
	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
		if(arr != null) return unescape(arr[2]); return null;
}

function delCookie(name)//删除cookie
{
	var exp = new Date();	 
	exp.setTime(exp.getTime() - 1);	 
	var cval=getCookie(name);	 
	if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}