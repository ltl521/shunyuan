/**
 * Created by 22682 on 2017/9/13.
 */
//高度自适应
var w=window.innerHeight;
var hgt2=w-210;
$(".timetable-box").css("height",hgt2+"px");
var maxHTime=$(".timetable-box").height()-170;
var maxTrTime=parseInt(maxHTime/40);//表格最大显示行数（不包括表头行）


//日期时间表和工作日时间表的切换
$(".timetable-txt>li").on("click",tab)
function tab(){
    $(this).addClass("time-table-crt").siblings().removeClass("time-table-crt");
    var tab=$(this).attr("title");
    $("#"+tab).show().siblings().hide();
}


//分页
$("#riqi .page").paging({
    pageNo:1,
    totalPage: 10,
    callback: function(num) {
        alert(num)
    }
});
$("#gztime .page").paging({
    pageNo:1,
    totalPage:5,
    callback: function(num) {
        alert(num)
    }
});






/*表格单行选择*/
$("table").on("click","td .box-choose",function(){
    if(!$(this).hasClass("box-chooose-active")){
        $(this).addClass("box-chooose-active");
        $(this).parent().parent("tr").addClass("tr-choosed-avtive");
    }else{
        $('th .box-choose').removeClass('box-chooose-active');
        $(this).removeClass("box-chooose-active");
        $(this).parent().parent("tr").removeClass("tr-choosed-avtive");
    }
});


//表格全选
$("table").on("click","th .box-choose",function(){
    if(!$(this).hasClass("box-chooose-active")){
        $(this).addClass("box-chooose-active");
        $(this).parent().parent().parent().parent().find('tr').addClass('tr-choosed-avtive').find('td .box-choose').addClass('box-chooose-active');
    }else{
        $(this).removeClass("box-chooose-active");
        $(this).parent().parent().parent().parent().find('tr').removeClass('tr-choosed-avtive').find('td .box-choose').removeClass('box-chooose-active');
    }
});


//时间参数表格编辑按钮
$("table").on("click",".edit-btn",function(){
    location.href="config-time.html";
});
$(".gzr-table").on("click",".edit-btn",function(){
    location.href="config-time.html";

});

//时间参数表格删除按钮
/*单个删除*/
var timeTN;//时间表名称
function deledan() {
    $(this).parent().parent().remove();
    timeTN=$(this).parent().parent().children(".rq-table-name").text();
}
$("table").on("click",".delete-btn",deledan)

/*批量删除*/
function deleall() {
    $(this).parent().parent().children(".all-timetable-box ").find('th .box-chooose-active').removeClass('box-chooose-active');
    $(this).parent().parent().children(".all-timetable-box ").find("td .box-chooose-active").each(function(){
        $(this).parent().parent().remove()
    })
}
$('.del').on('click',deleall);



//是否启用切换
$("table").on("click",".select-no",function(){
    $(this).toggleClass("select-yes");
});
//批量停止按钮
$('.tz').on('click',function () {
    $(this).parent().parent().children(".all-timetable-box ").find("td .box-chooose-active").each(function(){
        $(this).parent().parent().find(".select-no").removeClass("select-yes");
    })

});
//批量执行按钮
$('.zx').on('click',function () {
    $(this).parent().parent().children(".all-timetable-box ").find("td .box-chooose-active").each(function(){
        $(this).parent().parent().find(".select-no").addClass("select-yes");
    })

});


//日期时间表
//序号：rqNum
//时间表名称：rqName
//开始日期：rqStart
//结束日期：rqEnd
//时间点：rqHour

var rqNum=4;
var rqName=33;
var rqStartDate=3333;
var rqEndDate=456;
var rqHour=10;
var rqHtml='<tr><td><span  class="box-choose"></span></td><td class="rq-table-num">'+rqNum+'</td><td class="rq-table-name">'+rqName+'</td><td class="rq-table-startdate">'+rqStartDate+'</td><td class="rq-table-startdate">'+rqEndDate+'</td><td class="ri-table-hour">'+rqHour+'</td><td><div class="select-no"></div></td><td><span class="edit-btn"></span><span class="delete-btn"></span></td></tr>';
$(".riqi-table>tbody").append(rqHtml);



//工作日时间表
//序号：zgrNum
//时间表名称：zgrName
//日期：zgrDate
//时间点：zgrHour
var zgrNum=4;
var zgrName=33;
var zgrDate=45;
var zgrHour=10;
var zgrHtml='<tr><td><span  class="box-choose"></span></td><td class="rq-table-num">'+zgrNum+'</td><td class="rq-table-name">'+zgrName+'</td><td class="rq-table-startdate">'+zgrDate+'</td><td class="gzr-table-hour">'+zgrHour+'</td><td><div class="select-no"></div></td><td><span class="edit-btn"></span><span class="delete-btn"></span></td></tr>';
$(".gzr-table>tbody").append(zgrHtml);



$(".new-time").on("click",function(){
    var type=$(".time-table-crt").attr("title");
    location.href="config-time.html?type="+type;
})