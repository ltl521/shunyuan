/**
 * Created by 22682 on 2017/9/13.
 */
var url=location.href;
var type=url.slice(url.indexOf("=")+1,url.length);
 if(type=="riqi"){
    $("#time-type-sel").val("riqi");
     $("#gztime").hide();
     $("#riqi").show();
 }else{
    $("#time-type-sel").val("gztime");
     $("#gztime").show();
     $("#riqi").hide();
 }
//时间类型切换
function Cmd(obj){
    $(obj).parent().parent().siblings("ul").each(function(){
        $(this).hide();
    });
    $("#"+obj.value).show();
}
//分页
function pick(){
    var num=$('.device-box .area-num');
    for(var i=0;i<num.length;i++){
        $(num[i]).html(i+1)
    }
    if($('#page .current').html()==1){
        $('.device-box tbody tr').css('display','table-row');
        $('.device-box tbody tr:gt(6)').each(
            function () {
                $(this).css('display','none')
            }
        );
        if($('.device-box tbody tr')[14]){
            $("#page").paging({
                pageNo:1,
                totalPage: 3
            });
        }else  if($('.device-box tbody tr')[7]){
            $("#page").paging({
                pageNo:1,
                totalPage: 2
            });
        }else if($('.device-box tbody tr')[0]){
            $("#page").paging({
                pageNo:1,
                totalPage: 1
            });
        }else{
            $("#page").empty()
        }
    }else if($('#page .current').html()==2) {
        if($('.device-box tbody tr')[7]){
            $('.device-box tbody tr').css('display','table-row');
            $('.device-box tbody tr:gt(13)').each(
                function () {
                    $(this).css('display','none')
                }
            );
            $('.device-box tbody tr:lt(7)').each(
                function () {
                    $(this).css('display','none')
                }
            );
            if($('.device-box tbody tr')[14]){
                $("#page").paging({
                    pageNo:2,
                    totalPage: 3
                });
            }else{
                $("#page").paging({
                    pageNo:2,
                    totalPage: 2
                });
            }
        }else{
            $("#page").paging({
                pageNo:1,
                totalPage: 1
            });
        }
    }else{
        if($('.device-box tbody tr')[14]){
            $('.device-box tbody tr').css('display','table-row');
            $('.device-box tbody tr:lt(14)').each(
                function () {
                    $(this).css('display','none')
                }
            );
            $("#page").paging({
                pageNo:3,
                totalPage:3
            });
        }else{
            $("#page").paging({
                pageNo:2,
                totalPage:2
            });
        }

    }
}
$('#page').on('click',pick);


//手风琴树形菜单
var dmFloor;
var dmDirection;
$(document).ready(function() {
    $(".sanji a").click(function(){
        dmDirection=$(this).html();
        dmFloor=$(this).parent().parent().siblings("a").html();
        //console.log(dmDirection);
        //console.log(dmFloor);
        $(this).toggleClass('list-active').parent().parent().parent().siblings().find('.sanji a').removeClass('list-active');
        $(this).parent().siblings().each(function () {
            $(this).find('a').removeClass('list-active')
        })
    });
    $('.inactive').click(function(){
        dmFloor=$(this).html();
        /*如果不是展开状态*/
        if($(this).siblings('ul').css('display')=='none'){
            /*让其他的-变+*/
            $(this).parent('li').siblings('li').removeClass('inactives');
            /*这个变+*/
            $(this).addClass('inactives');
            /*让这个ul展示*/
            $(this).siblings('ul').slideDown(100);
            var t = $(this);
            $(this).parents().siblings("li").children('ul').each(function(){
                if($(this).css('display')=='block'){
                    t.parents('li').siblings('li').children('ul').parent('li').children('a').removeClass('inactives');
                    t.parents('li').siblings('li').children('ul').slideUp(100);
                    /*  $(this).parents('li').siblings('li').children('ul').css('display','none')*/
                }
            });
        }else{
            //控制自身变成+号
            $(this).removeClass('inactives');
            //控制自身菜单下子菜单隐藏
            $(this).siblings('ul').slideUp(100);
            //控制自身子菜单变成+号
            $(this).siblings('ul').children('li').children('ul').parent('li').children('a').addClass('inactives');
            //控制自身菜单下子菜单隐藏
            $(this).siblings('ul').children('li').children('ul').slideUp(100);
            //控制同级菜单只保持一个是展开的（-号显示）
            $(this).siblings('ul').children('li').children('a').removeClass('inactives');
        }
    })
});

//设备选择
$('.device-add' ).on('click',function (e) {
    e.stopPropagation();
    if(!$(this).hasClass("device-add-active")){
        $(this).addClass("device-add-active");
        $(this).parent().parent().find('li').each(
            function () {
                $(this).addClass('choosed-li')
            }
        );
        $(this).parent().parent().addClass('choosed-li');
        //console.log($(this).siblings('ul').find('.device-add'));
        $(this).parent().siblings('ul').find('.device-add').each(function () {
            $(this).addClass('device-add-active')
        })
    }else{
        $(this).removeClass("device-add-active");
        $(this).parents('li').removeClass('choosed-li');
        $(this).parent().parent().find('.choosed-li').each(
            function () {
                $(this).removeClass('choosed-li')
            }
        );
        $(this).parent().parent().parent().siblings('a').find('.device-add').removeClass('device-add-active');
        $('.d-all').removeClass('device-add-active');
        $(this).parent().siblings('ul').find('.device-add').each(function () {
            $(this).removeClass('device-add-active')
        })
    }
    var a=0;
    var arr=$(this).parent().parent().parent().children('li');
    var len=$(this).parent().parent().parent().children('li').length;
    for(var i=0;i<arr.length;i++){
        if($(arr[i]).hasClass('choosed-li')){
            a+=1
        }
    }
    if(a==len){
        $(this).parent().parent().parent().siblings('a').find('.device-add').addClass('device-add-active');
        $(this).parent().parent().parent().parent().addClass('choosed-li')
    }
    if($('.erji').children('li.choosed-li').length==7){
        $('.d-all').addClass('device-add-active');
        $('.yiji>li').addClass('choosed-li')
    }
});
//添加设备
$(".choose-device>button").on("click",function(){
    var result=[];
    var dvChoose=[];
    if($('li.choosed-li')[0]){
        if($(".d-all").hasClass("device-add-active")){
            dvChoose[0]='全部'
        }else{
            $('.erji').children('li.choosed-li').each(
                function () {
                    dvChoose.push($(this).children('a').text())
                }
            );

            $('.erji li').siblings().each(function () {
                if(!$(this).hasClass('choosed-li')){
                    $(this).find('.sanji').children('li li.choosed-li').each(
                        function () {
                            var txt=$(this).parent().siblings('a').text()+$(this).children('a').text()
                            dvChoose.push(txt)
                        }
                    )
                }
            })

        }
    }
  $('.device-box .area-content').each(function () {
      result.push($(this).html())
  });
    var arr=[];
    if(result[0]=='全部'){
        alert('您已经选择全部，请勿重复选择');
        return
    }
    for(var i=0;i<dvChoose.length;i++){

        if(!(result.indexOf(dvChoose[i])==-1)){
            alert('请勿重复选择');
            return
        }
    }
    for(var i=0; i<dvChoose.length; i++){
        if(dvChoose[i].length==4){
            arr.push(dvChoose[i])
        }
    }
    for( var i=0 ; i<arr.length; i++) {
        var a1 = arr[i][0]+arr[i][1];
        if (!(result.indexOf(a1) == -1)) {
            alert(a1 + '整楼已选，' + '请勿重复选择');
            return
        }
    }
    if(dvChoose[0]=='全部'){
        $('.device-box tbody').html('');
        var a='<tr> <td><span class="box-choose"></span></td><td class="area-num">'+1+'</td> <td class="area-type">建筑</td> <td class="area-content">全部</td>  <td> <span class="delete-btn"></span> </td> </tr>';
        $('.device-box tbody').append(a)
    }else{
        for(var i=0; i<dvChoose.length; i++){
            var len=result.length+1;
            if(dvChoose[i].length==4){
                var a='<tr> <td><span class="box-choose"></span></td><td class="area-num">'+len+i+'</td> <td class="area-type">楼层-方向</td> <td class="area-content">'+dvChoose[i]+'</td>  <td> <span class="delete-btn"></span> </td> </tr>';
                $('.device-box tbody').append(a)
            }else{
                $('.device-box tbody tr .area-content').each(function () {
                    if(!($(this).html().indexOf(dvChoose[i])==-1)){
                        $(this).parent().remove();
                    }
                });
                var len= $('.device-box tbody tr .area-content').length+1;
                var a='<tr> <td><span class="box-choose"></span></td><td class="area-num">'+len+i+'</td> <td class="area-type">楼层</td> <td class="area-content">'+dvChoose[i]+'</td>  <td> <span class="delete-btn"></span> </td> </tr>';
                $('.device-box tbody').append(a)

            }

        }
    }
    var a=$('.current').html();
    var len=$('.device-box tbody tr').length;
    $("#page").paging({
        pageNo:a,
        totalPage:Math.ceil(len/7)==0?1:Math.ceil(len/7)
    });
    pick();
    $('.yiji li').each(function () {
        $(this).removeClass('choosed-li')
    });
    $('.yiji .device-add ').each(function () {
        $(this).removeClass('device-add-active')
    })
});


//已选中区域表格数据
var areaType=[];//区域类型数据
$(".area-type").each(function(){
    areaType.push($(this).html())
});
var areaContent=[];//区域内容数据
$(".area-content").each(function(){
    areaContent.push($(this).html())
});

var area=[];
$(".area-type").each(function(){
    var  data={};
    var a=$(this).html();
    data[a]=$(this).siblings('.area-content').html();
    area.push(data)
});







//循环日期选择
$(".cycle-date").on("click",function(e){
    e.stopPropagation();
    $(".drop-workday").toggle();
});
$(document).on("click",function(){
    $(".drop-workday").hide();
});

$('.drop-workday>li').on("click",function(e){
    e.stopPropagation();
    var workday=" ";
    $(this).find("span").toggleClass("workday-active");
    var html=$(this).find("a").html();
    if( $(this).find("span").hasClass('workday-active')){

        $(".cycle-date>p")[0].innerHTML+='<span>'+ html+'</span>'+"  "
    }else{
        var abc=  $(".cycle-date>p span");
        for(var i=0;i< abc.length;i++){
            if(abc[i].innerHTML==html){
                $(abc[i]).remove();
            }
        }
    }
});


//    时间点选择类型
laydate.render({
    elem: '#end-time'
});
laydate.render({
    elem: '#start-time'
});
laydate.render({
    elem: '#time-time',
    type: 'time',
    format: 'HH:mm:ss'
});
laydate.render({
    elem: '#time-time1',
    type: 'time',
    format: 'HH:mm:ss'
});


//设备列表选择框背景+颜色变化
$(".device-box").on("click","td>.box-choose",function(){
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
$(".device-box").on("click","th>.box-choose",function(){
    if(!$(this).hasClass("box-chooose-active")){
        $(this).addClass("box-chooose-active");
        $(this).parent().parent().parent().parent().find('tr').addClass('tr-choosed-avtive').find('td .box-choose').addClass('box-chooose-active');
    }else{
        $(this).removeClass("box-chooose-active");
        $(this).parent().parent().parent().parent().find('tr').removeClass('tr-choosed-avtive').find('td .box-choose').removeClass('box-chooose-active');
    }
});


/*单个删除*/
function deledan() {
    $(this).parent().parent().remove();
    pick()
    $('#page .current').click()
}
$(".device-box").on("click",".delete-btn",deledan);

/*批量删除*/
function deleall() {
    $('th .box-chooose-active').removeClass('box-chooose-active');
    $('td .box-chooose-active').each(function(){
        $(this).parent().parent().remove()
    })
    pick()
    $('#page .current').click()
}
$('.time-batch-del').on('click',deleall);





/*卷帘滑动控制*/
function GetPercent(num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    if (isNaN(num1) || isNaN(num2)) {
        return "-";
    }
    return num2 <= 0 ? "0" : ((Math.round(num1 / num2 * 10000) / 100).toFixed(0));
}
var ball_tall1;//滑块中心到顶部的高度
var ball_pst1;//滑块中心到顶部的高度所占总高度的百分比
//滑块的滑动
$("#config-height").on('focus',function () {
    $(".alert-info").hide();
});
$("#config-height").on('blur',function () {
    var a1= $("#config-height").val();
    if(isNaN(a1)){
        $(".alert-info").show();
        return
    }else{
        a1=parseFloat(a1);
        if(a1<0||a1>100){
            $(".alert-info").show();
            return
        }else{
            $(".alert-info").hide();
            if(a1<15){
                $(".slide-ball")[0].style.bottom=a1*(15/16)+'px';
            }else if(a1>85){
                $(".slide-ball")[0].style.bottom=178-(100-a1)*(8/9)+'px';
            }else{
                $(".slide-ball")[0].style.bottom=Math.abs(a1*2.1-16)+"px";
            }
        }
    }

});
$("#config-height").on('keydown',function (e) {
    if(e.keyCode==13){
        $("#config-height").blur()
    }
});


//鼠标点击，滑块跟随
$('.slide-module').on('click',function (e) {
    var dom2=$(this).find('.slide-ball')[0];
    if(e.target==dom2){
        return
    }else{
        if(e.offsetY<32){
            dom2.style.bottom='178px';
            ball_tall1=0;
        }else if(e.offsetY>178){
            dom2.style.bottom='0px';
            ball_tall1=210;
        }else{
            dom2.style.bottom=210-e.offsetY-16+'px';
            ball_tall1=e.offsetY;
        }
    }
    ball_pst1=GetPercent(ball_tall1, 210);
    $("#config-height").val(100-ball_pst1);
    //return ball_pst1;
});
//鼠标拖动滑块
$('.slide-ball').on('mousedown',function(){
    $(this).addClass('active')
});
document.addEventListener('mouseup',function(){
    var aa=$('.slide-ball.active')[0];
    if(aa){
        $("#config-height").val(100-ball_pst1);
    }
    $('.slide-ball').removeClass('active')
});
$('.slide-module').on('mousemove',function (e) {
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
            ball_tall1=210;
        }else if(e.pageY<height2){
            dom2.style.bottom='178px';
            ball_tall1=0;
        }else{
            var a=height3-parseInt(e.pageY)-16+'px';
            $(dom2).css('bottom',a);
            ball_tall1=210-16-parseFloat(a);
        }
    }
    ball_pst1=GetPercent(ball_tall1, 210);
    return ball_pst1;
});




// 开启按钮
$(".start-btn").on('click',function(){
    $(this).addClass("start-btn-active");
    $(".slide-ball").animate({
        bottom:'178px'
    },2000,"linear")
});
//    停止按钮
$(".stop-btn").on("click",function(){
    $(this).parent().parent().find(".start-btn").removeClass("start-btn-active");
    $(".slide-ball").stop();
});

//时间点取值
$(".save-btn").on("click",function(){
    /*判断是否为按日期*/
    if($('#time-type-sel option')[0].selected){
        var start=$('#start-time').val();//开始日期
        var end=$('#end-time').val();//结束日期
        var point=$("#time-time").val();//时间点
        console.log(start);
        console.log(end);
        console.log(point)
    }else {//按工作时间
        var p1=$("#time-time1").val();//时间点
        var arr=[];//循环日期
        $('.cycle-date p span').each(function(){
                if(!($(this).html()=='')){
                    arr.push($(this).html())
                }
            }
        );
        console.log(p1);
        console.log(arr)
    }
    //如有需要即清空
    /*$('#start-time').val('');
    $('#end-time').val('');
    $('.cycle-date p').html('');
    $("#time-time").val('');
    $("#time-time1").val('');*/
})


