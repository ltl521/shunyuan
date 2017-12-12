/**
 * Created by 22682 on 2017/9/13.
 */

//网关列表和电机列表的切换
$(".fm-list>li").on("click",function(){
    $(this).children("span").addClass("toggle");
    $(this).siblings().children("span").removeClass("toggle");
    var tab=$(this).attr("title");
    $("#"+tab).show().siblings().hide();
    $("#"+tab).show().siblings().find("tr").removeClass("tr-choosed-avtive")
    $("#"+tab).show().siblings().find(".box-choose").removeClass("box-chooose-active")
});

    //分页
$("#gateway .page").paging({
    pageNo:1,
    totalPage: 10//总页数
});
$("#motor .page").paging({
    pageNo:1,
    totalPage: 5//总页数
});


var pageNum=$(".current"). html();//页码

//高度自适应
var w=window.innerHeight;
var hgt=w-120-45-20;//中间模块高度/*改*/
$(".FM-left").css("height",hgt+"px");
$(".FM-right").css("height",hgt+"px");
$(".FM-table").css("height",hgt+"px");
var maxH=$(".FM-table").height()-283;
var maxTr=parseInt(maxH/40);//最多能显示的表格行数，不包括表头行


    //手风琴树形菜单
var dmFloor;
var dmDirection;
$(document).ready(function() {
    $(".sanji a").click(function(){
        dmDirection=$(this).html();
        dmFloor=$(this).parent().parent().siblings("a").html();
        console.log(dmDirection);
        console.log(dmFloor);
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
    /*DIRECTION_NAME     FLOOR_NUM    FLO_DIR_NAME    GATEWAY_IP GATEWAY_MAC   GATEWAY_NAME   GATEWAY_PORT  OFF_LINE  rusult.data.DIRECTION
    var gxHtml="<tr><td><span class='box-choose'></span></td><td class='sb-name'>"+rusult.data.GATEWAY_NAME+"</td><td class='sb-lx'>"+rusult.data.FLO_DIR_NAME+"</td><td><span class='sb-ip'>"+rusult.data.GATEWAY_IP+"</span><span class='sb-port'>"+" "+rusult.data.GATEWAY_PORT+" "+"</span><span class='sb-mac'>"+rusult.data.GATEWAY_MAC+"</span></td><td>"+rusult.data.OFF_LINE+"</td><td><span class='edit-btn'></span><span class='delete-btn'></span></td></tr>";*/
//$(".device-box>tbody").html(" ").append(gxHtml);
});






//设备表格选择框背景+颜色变化
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
$("th .box-choose").click(function(){
    if(!$(this).hasClass("box-chooose-active")){
        $(this).addClass("box-chooose-active");
        $(this).parent().parent().parent().parent().find('tr').addClass('tr-choosed-avtive').find('td .box-choose').addClass('box-chooose-active');
    }else{
        $(this).removeClass("box-chooose-active");
        $(this).parent().parent().parent().parent().find('tr').removeClass('tr-choosed-avtive').find('td .box-choose').removeClass('box-chooose-active');
    }
});


//表格编辑按钮
$("table").on("click",'.edit-btn',function(){
    $('.edit-motor').show();
    var html=$(this).parent().parent().children('.sb-name').html();//设备名称
    var sbip=$(this).parent().parent().children(".sb-ip").html();//设备IP
    //var sbPort=$(this).parent().parent().children().children('.sb-port').html();//设备端口
    var sbMac=$(this).parent().parent().children('.sb-mac').html();//设备Mac
    var asd=$(this).parent().parent().children('.sb-name')[0];//设备名称元素
    var asdIP=$(this).parent().parent().children(".sb-ip")[0];//设备IP元素
    var asdMAC=$(this).parent().parent().children(".sb-mac")[0];//设备MAC元素
    var sblx=$(this).parent().parent().children('.sb-lx').html();//设备位置
    $('#motor-name input').val(html);
    $('#motor-IP input').val(sbip);
    //$("#motor-port").html(sbPort);
    $("#mac-ip input").val(sbMac);
    $('.sb-sblx').html(sblx);
    $('.edit-ok').on('click',function(e){
        e.preventDefault();
        var val= $('#motor-name input').val();
        asd.innerHTML=val;
        asd='';
        var alterIP=$("#motor-IP input").val();//现在的IP地址
        var alterMAC=$("#mac-ip input").val();//现在的MAC地址
        asdIP.innerHTML=alterIP;
        asdMAC.innerHTML=alterMAC;
        asdIP="";
        asdMAC="";
        $('.edit-motor').hide();
    });
    $('.edit-cal').on('click', function (e) {
        e.preventDefault();
        $('.edit-motor').hide();
        asd='';
        asdIP="";
        asdMAC="";
    })
});




//删除表格行按钮
var delIp;
var _this;
$('table').on('click','.delete-btn',function () {
    _this=this;
    $(".del-promptbox").show();
    $('.del-cal').on('click',function () {
        $(".del-promptbox").hide();
    });

});
$(".del-ok").click(function(){
    $(".del-promptbox").hide();
    $(_this).parent().parent().remove();
    delIp=$(_this).parent().parent().find(".sb-ip").html();
    console.log(delIp)
});

/*批量删除按钮*/
var delIp2;
function deleall() {
    $('th .box-chooose-active').removeClass('box-chooose-active')
    $('td .box-chooose-active').each(function(){
        $(this).parent().parent().remove();
        delIp2=$(this).parent().siblings().children(".sb-ip").text();
        console.log(delIp2)
    })
}
$('.FM-batch-del').on('click',deleall);

// 添加文字按钮
//添加网关弹出框
$(".addWg").click(function(e){
    e.preventDefault()
    e.stopPropagation();
    $(".pop-add-gateway").show();
    $("#gateway-name>input").val("");
    $("#gateway-IP>input").val("");
    $("#gateway-port>input").val("33000");
    $("#gateway-macip>input").val("");
    if( $('a.list-active')[0]){
        var a= $('a.list-active').html();
        var p=$('a.list-active').parent().parent().siblings('a').html();
        $('#gateway-direction option[value='+a+']').attr('selected','true')
        $('#gateway-direction').attr('disabled','true')
        $('#gateway-floor option[value='+p+']').attr('selected','true')
        $('#gateway-floor').attr('disabled','true')
    }
    /*$("#gateway-IP>input").blur(function(){
        var addIp=$(this).val();
        if(addIp=="2"){
            $("#ip-warning").show();
            $(".add-ok").attr("disabled","disabled");
        }
    });
    $("#gateway-port>input").blur(function(){
        var addPort=$(this).val();
        //如果已存在
        $("#port-warning").show();
    });
    $("#gateway-macip>input").blur(function(){
        var addMacip=$(this).val();
        //如果已存在
        $("#macip-warning").show();
    });*/

});
$(".add-cal").on("click",function(){
    $(".pop-add-gateway").hide();
    $("#gateway-name>input").val("");
    $("#gateway-IP>input").val("");
    $("#gateway-port>input").val("33000");
    $("#gateway-macip>input").val("");
});
$(".add-ok").on("click",function(e){
    e.preventDefault();
    var p1=$("#gateway-floor").val();
    var p2=$("#gateway-direction").val();
    var gwName=$("#gateway-name>input").val();//设备名称
    var gwIP=$("#gateway-IP>input").val();//IP地址
    var gwPort=$("#gateway-port>input").val();//端口
    var gwMac=$("#gateway-macip>input").val();//Mac地址
    var gwHtml="<tr><td><span class='box-choose'></span></td><td class='sb-name'>"+gwName+"</td><td class='sb-lx'>"+p1+p2+"</td><td><span class='sb-ip'>"+gwIP+"</span><span class='sb-port'>"+" "+gwPort+" "+"</span><span class='sb-mac'>"+gwMac+"</span></td><td>30%</td><td><span class='edit-btn'></span><span class='delete-btn'></span></td><td class='motor-port'>"+gwPort+"</td></tr>";
    $(".device-box>tbody").append(gwHtml);
    console.log(111);
    $(".pop-add-gateway").hide();
});
$(".subpop-close").click(function(){
    $(this).parent().parent().hide();
});


/*设备列表选中项*/
$(".device-list").on("click",'li',function(){
    $(this).toggleClass('device-list-active').siblings().removeClass('device-list-active');
});

/*选择文件*/
var url2;
var url23;
function  chooseFlie(e){
    e.preventDefault();
    $('#file').click();
    $('#file').on('change',function () {
        var objUrl = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径
        if (objUrl) {
            $("#upload-photo").attr("src", objUrl) ; //将图片路径存入src中，显示出图片
            url2=objUrl;
            console.log(objUrl)
        }
    })
}
$ ('.add-pop .click-upload').on('click',chooseFlie);
$ ('#upload-photo').on('click',chooseFlie);


//建立一個可存取到該file的url
function getObjectURL(file) {
    var url = null ;
    if (window.createObjectURL!=undefined) { // basic
        url = window.createObjectURL(file) ;
    } else if (window.URL!=undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file) ;
    } else if (window.webkitURL!=undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file) ;
    }
    return url ;
}



/*添加到设备列表按钮   +按钮*/
$(".edit-device-btns>li:first-child").click(function(){
    $('.device-list ul li').removeClass('device-list-active')
    var _this=this;
    $(this).siblings().addClass('disabled')
    $(".add-pop").show();
    $(this).addClass("click-active");
    //取消按钮
    $(".add-pop .popbox-cal").click(function(){
        $(".add-pop").hide();
        $('.edit-device-btns li').removeClass('disabled')
        $(_this).removeClass("click-active");
        $("#edit-device-name").val(" ");
        $("#upload-photo").attr("src","img/upload-photo.png")
    });
});




//+按钮弹出框确定按钮
$('.add-pop .popbox-ok').on('click',function(){
    var url= $("#upload-photo").attr("src");
    $('.edit-device-btns li').removeClass('disabled')
//    console.log(url2+'qweqweqw');
    var name=$('#edit-device-name').val();
    if(!name){
        alert('请输入设备名称');
    }else if(url=='img/upload-photo.png'){
        alert('请上传图片');
    }else{
        $('.device-list>ul').append('<li><span class="device-pic"><img src='+url2+' alt=""></span><p class="device-type">'+name+'</p> <a class="add-to-list addDj" href="#">添加</a></li>');
        $('.add-pop').hide();
        $('#edit-device-name').val(" ");
        $('.add-pop img').attr("src","img/upload-photo.png");
        $(".edit-device-btns>li:first-child").removeClass("click-active");
    }
});
var url23;
function  chooseFlie1(e){
    e.preventDefault();
    $('#file1').click();
    $('#file1').on('change',function () {
        var objUrl = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径
        if (objUrl) {
            $("#upload-photo1").attr("src", objUrl) ; //将图片路径存入src中，显示出图片
            url23=objUrl;
        }
    })
}
$('.alter-pop .click-upload').on('click',chooseFlie1);
$('#upload-photo1').on('click',chooseFlie1);

/*修改设备*/
$('.edit-device-btns .btn-alter-p').on('click',function(e){
    e.stopPropagation();
    var _this=this;
    if($('.device-list-active')[0]){
        $(this).siblings().addClass('disabled')
        $(_this).addClass("click-active");
        $(".alter-pop").show();
        var url=$('.device-list-active .device-pic img').attr('src');
        var name=$('.device-list-active .device-type').html();
        $('#edit-device-name1').val(name);
        $('#upload-photo1').attr('src',url);

    }else{
        alert('请先选择');
        $('.edit-device-btns li').removeClass('disabled')
    }
});
$(".alter-pop .popbox-ok").on("click",function(e){
    e.stopPropagation();
    $(".alter-pop").hide();
    $('.edit-device-btns li').removeClass('disabled');
    $(".edit-device-btns .btn-alter-p").removeClass("click-active");
    var liCrt=$('.device-list-active');
    console.log(liCrt);
    var name3=$("#edit-device-name1").val();
//                    var url3=$("#upload-photo1").attr("src");
    $(".device-list-active .device-pic>img").attr("src",url23);
    $(".device-list-active .device-type").text(name3);
    /*  /!* liCrt.removeClass("device-list-active")*!/*/
    $(".device-list-active .device-type").attr("title",name3);
    $(".device-list-active").removeClass("device-list-active");
});
$('.alter-pop .popbox-cal').on('click',function () {
    $(".alter-pop").hide();
    $('.edit-device-btns li').removeClass('disabled');
    $(".edit-device-btns .btn-alter-p").removeClass("click-active");
});


/*删除设备*/
$('.edit-device-del').on('click',function () {
    if($('.device-list-active ')[0]){
        $('.device-list-active ').remove();
    }else{
        alert('请先选择')
    }
});



//页码点击
$(".page-list>li>a").on("click",function(e){
    e.preventDefault();
    $(this).addClass("page-current");
    $(this).parent().siblings().find("a").removeClass("page-current");
});


//搜索
$("#search-words").on("keyup",function(){
    var wd=$("#search-words").val();//获取输入框内容
    $(".search-list").show();
    //转后台查询接收数据

    $("body").on("click",function(){
        $(".search-list").hide();
    })
})
$(".search-list ul").on("click","li",function(){
    $("#search-words").val($(this).html());
    $(".search-list").hide();
})























