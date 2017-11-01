/**
 * Created by Admin on 2017/10/29.
 */
    $(function(){
        var currentPage=1;
        var pageSize=8;
       function  render(){
           $.ajax({
               type:"get",
               url:"/user/queryUser",
               data:{
                   page:currentPage,
                   pageSize:pageSize
               },
               success:function(data){
                   console.log(data);
                   $("tbody").html(template("tpl",data));
                   //分页功能
                   $("#paginator").bootstrapPaginator({
                       bootstrapMajorVersion: 3,
                       currentPage:currentPage,
                       size: "small",
                       totalPages: Math.ceil(data.total / pageSize),
                       onPageClicked: function (event, originalEvent, type, page) {
                           currentPage = page;
                           render();

                       }

                   });
               }
           });

       }
        render();
        $("tbody").on("click", ".btn", function () {
            $("#userModal").modal("show");
             id = $(this).parent().data("id");
            var isDelete = $(this).parent().data("isDelete");
            isDelete = isDelete === 1 ? 0 : 1;
            //点击确定按钮，需要禁用或者启用这个用户
            $(".btn_confirm").on("click", function () {

                //发送ajax请求
                $.ajax({
                    type: "post",
                    url: "/user/updateUser",
                    data: {
                        id: id,
                        isDelete: isDelete
                    },
                    success: function (data) {
                        if(data.success){
                            //关闭模态框
                            $("#userModal").modal("hide");
                            render();
                        }
                    }
                });

            });
        });


    });