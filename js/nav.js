/**
 * Created by 22682 on 2017/11/21.
 */
//导航栏点击
$("#control").on("click",function(){
    location.href="device-control.html";
});
$("#management").on("click",function(){
    location.href="device-management.html";
});
$("#timeParam").on("click",function(){
    location.href="time-parameter.html";
});


//头部退出
$(".exit").on("click",function(){
    location.href="login.html";
});



//自定义楼层滚动位置
var url=location.href;
var hei=url.slice(url.indexOf("=")+1,url.length);
$(".stories ul").scrollTop(hei);
