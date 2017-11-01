if(location.href.indexOf("login.html") < 0 ){
    $.ajax({
        type:"get",
        url:"/employee/checkRootLogin",
        success:function (data) {
            if(data.error === 400){
                //说明用户没有登录，跳转到登录页面
                location.href = "login.html";
            }
        }
    });
}
//点击分类管理，显示或者隐藏二级分类
$(".child").prev().on("click", function (){
    $(this).next().slideToggle();
});
//点击icon_menu,隐藏或者显示侧边栏
$(".icon_menu").on("click", function(){
    $(".lt_aside").toggleClass("now");
    $(".lt_content").toggleClass("now");
});
//退出功能
$(".icon_logout").on("click",function(){
    $("#logoutModal").modal("show");
    $(".btn_logout").on("click",function(){
        //发送一个ajax请求，告诉服务器我要退出了，服务器会清空你的session
        $.ajax({
            type:"get",
            url:"/employee/employeeLogout",
            success:function(data){
                console.log(data);
                if(data.success){
                    window.location.href="login.html"
                }
            }
        })
    })
})