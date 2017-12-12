/**
 * Created by Administrator on 2017/9/3.
 */

/*
//楼层数据
var floorNum=$(".ctr-left-top").find("p").html();
console.log(floorNum)
*/

//初始化滑块高度
/*var a=40;
$(".slide>li:eq(0) .slide-ball")[0].style.bottom=(100-a)*2.1-16+'px';//东
$(".slide>li:eq(1) .slide-ball")[0].style.bottom=(100-a)*2.1-16+'px';//西
$(".slide>li:eq(2) .slide-ball")[0].style.bottom=(100-a)*2.1-16+'px';//南
$(".slide>li:eq(3) .slide-ball")[0].style.bottom=(100-a)*2.1-16+'px';//北*/



/*卷帘滑动控制*/
//计算百分比函数
function GetPercent(num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    if (isNaN(num1) || isNaN(num2)) {
        return "-";
    }
    return num2 <= 0 ? "0%" : ((Math.round(num1 / num2 * 10000) / 100).toFixed(0) + "%");
}
var ball_tall;//滑块中心到顶部的高度
var ball_pst;//滑块中心到顶部的高度所占总高度的百分比
var direction;//方向变量

//鼠标点击，滑块跟随
$('.slide-module').on('click',function (e) {
    var dom2=$(this).find('.slide-ball')[0];
    if(e.target==dom2){
        //console.log(1);
        return;
    }else{
        if(e.offsetY<32){
            dom2.style.bottom='178px';
            ball_tall=0;
        }else if(e.offsetY>178){
            dom2.style.bottom='0px';
            ball_tall=210;
        }else{
            dom2.style.bottom=210-e.offsetY-16+'px';
            ball_tall=e.offsetY;
        }
    }
    direction=$(this).siblings("span").html();
    ball_pst=GetPercent(ball_tall, 210);
    console.log(ball_pst);
    return ball_pst;
});

//鼠标拖动滑块
$('.slide-ball').on('mousedown',function(){
    $(this).addClass('active')
});
document.addEventListener('mouseup',function(){
    var aa=$('.slide-ball.active')[0];
    if(aa){
        console.log(ball_pst);
        console.log(direction);
        console.log(floorNum);
    }
    $('.slide-ball').removeClass('active')
});
$('.slide-module').on('mousemove',function (e) {
    direction=$(this).siblings("span").html();
    var dom2=$(this).find('.slide-ball')[0];
    //console.log($(dom2).hasClass('active'));
    var ptop=parseInt($(this)[0].offsetTop);
  /*由于此处用了border-box：box-sizeing，所以可以直接获得高度即可*/
    var pheight=parseInt($(this).css('height'));
    var cheight=parseInt($(this).find('.slide-ball').css('height'));
    var height1=pheight+ptop-cheight;
    var height2=cheight+ptop;
    var height3=pheight+ptop;
    if($(dom2).hasClass('active')){
        if(e.pageY>height1) {
            dom2.style.bottom='0px';
            ball_tall=210;
        }else if(e.pageY<height2){
            dom2.style.bottom='178px';
            ball_tall=0;
        }else{
            var a=height3-parseInt(e.pageY)-16+'px';
            $(dom2).css('bottom',a);
            ball_tall=210-16-parseFloat(a);
        }
    }
    ball_pst=GetPercent(ball_tall, 210);
    return ball_pst;
});




/*整栋楼控制按钮*/
var h1=0;//全升
var h2=100;//全降

var h3=38;    //1F-2F  4m
var h4=72;    //1F-2F  1.8m
var h5=81;      //1F-2F  1.2m

var h6= 39;     //3F-7F  2.2m
var h7=50;      //3F-7F  1.8m
var h8= 67;     //3F-7F  1.2m

$('.qs').on('click',function () {
    $('.slide-ball').animate({
        bottom:'178px'
    },2000,"linear");
    $(".tz").on("click",function(){
        $(".slide-ball").stop();
    });
});
$('.qj').on('click',function () {
    $('.slide-ball').animate({
        bottom:'0px'
    },2000,"linear");
    $(".tz").on("click",function(){
        $(".slide-ball").stop();
    });
});

//离地4m或2.2m
$('.ld2-2').on('click',function () {
    $('.ctr-1F-2F .slide-ball').animate({
        bottom:'114px'
    },2000,"linear");
    $('.ctr-3F-7F .slide-ball').animate({
        bottom:'112px'
    },2000,"linear")
});
//离地1.8m
$('.ld1-8').on('click',function () {
    $('.ctr-1F-2F .slide-ball').animate({
        bottom:'43px'
    },2000,"linear");
    $('.ctr-3F-7F .slide-ball').animate({
        bottom:'89px'
    },2000,"linear")
});
//离地1.2m
$('.ld1-2').on('click',function () {
    $('.ctr-1F-2F .slide-ball').animate({
        bottom:'23px'
    },2000,"linear");
    $('.ctr-3F-7F .slide-ball').animate({
        bottom:'54px'
    },2000,"linear")
});



//3F-7F滑块高度控制
$('.ld01-8').on('click',function () {
    $('.slide-ball').animate({
        bottom:'89px'
    },2000,"linear")
});
$('.ld01-2').on('click',function () {
    $('.slide-ball').animate({
        bottom:'54px'
    },2000,"linear")
});





/*左侧楼层选择高度自适应*/
var h=document.documentElement.clientHeight;//可见区域高度
/*改*/
$('.stories').css('height',h-120+'px');





/*楼层选择跳转*/
//楼层数据
var floorNum;
function jumpStories(a){
    var _class=$(a).attr("class");
    var i=_class.slice(_class.indexOf("-")+1,_class.length);/*楼层号*/

    if(i==8){
        $(".ctr-left-top img").attr("src","img/building.png");
        $(".ctr-left-top p").html("整栋");
        floorNum=$(".ctr-left-top").find("p").html();
        $("#floor-pic-btn").hide()
    }else{
        $(".ctr-left-top img").attr("src","img/"+i+"f.png");
        $(".ctr-left-top p").html(i+"F");
        floorNum=$(".ctr-left-top").find("p").html();
        $("#floor-pic-btn").show()
    }
   $("#i"+i).show().siblings(".floorI").hide();
}




/*查看楼层平面图*/
$("#floor-pic-btn").on("click",function(){
    $(".floor-plan-popbox").show();
    var num=$(".ctr-left-top p").html().slice(0,1);
    console.log(num);
    $(".floor-plan-popbox img").attr("src","img/"+num+"-floor.png")
})

$(".floor-plan-popbox-close").click(function(){
    $(".floor-plan-popbox").hide();
});






/*
var a=0;//后台数据
if(a=="0"){
    $(".facet-ITC-form tr:eq(0) .facet-btn-start").addClass('facet-start-active').html("已启动");//东
    $(".facet-ITC-form tr:eq(1) .facet-btn-start").addClass('facet-start-active').html("已启动");//西
    $(".facet-ITC-form tr:eq(2) .facet-btn-start").addClass('facet-start-active').html("已启动");//南
    $(".facet-ITC-form tr:eq(3) .facet-btn-start").addClass('facet-start-active').html("已启动");//北
}if(a=="1"){
    $(".facet-ITC-form tr:eq(0) .facet-btn-start").removeClass('facet-start-active').html("开启");
}
*/

//整栋智能启动按钮
$(".btn-space").on("click",function(){
    $(this).addClass('btn-active').html("已启动");
    $(".facet-ITC-btn").addClass("facet-btn-start");
    $(".facet-btn").addClass("toggle-status-start");
});

//整栋智能关闭按钮
$(".btn-close").on("click",function(){
    $(".btn-space").removeClass('btn-active').html("启动");
    $(".facet-ITC-btn").removeClass("facet-btn-start");
    $(".facet-btn").removeClass("toggle-status-start");
});

//分面智能按钮
$(".facet-btn").on("click",function(){
    if($(this).hasClass("toggle-status-start")){
        $(this).removeClass("toggle-status-start");
        $(this).parent("div").removeClass("facet-btn-start");
    }else{
        $(this).addClass("toggle-status-start");
        $(this).parent("div").addClass("facet-btn-start");
    }
    if($(".toggle-status-start").length==4){
        $(".btn-space").addClass('btn-active').html("已启动");
    }
    if($(".toggle-status-start").length==0){
        $(".btn-space").removeClass('btn-active').html("启动");
    }
    //判断当前状态
    if($(".facet-ITC-btn").hasClass("facet-btn-start")){
        //现在为开启状态
        console.log("开启")
    }else{
        //现在为关闭状态
        console.log("关闭")
    }
});












