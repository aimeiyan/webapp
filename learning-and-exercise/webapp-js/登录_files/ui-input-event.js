//清除input内输入内容
$(".ui-input-event").each(function(){
    $(this).keyup(function(){
        var $val=$(this).val();
        if($val!=""){
            $(this).next(".clear-it-val").show();
        }else{
            $(this).next(".clear-it-val").hide();
        } 
    });        
})
//清空input内容
$(".clear-it-val").click(function(){
    $(this).prev("input").val("").focus();
    $(this).hide();
});