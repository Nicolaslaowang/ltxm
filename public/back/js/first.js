/**
 * Created by Admin on 2017/10/31.
 */
$(function () {
    var currentPage = 1;
    var pageSize = 5;

    function render() {
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (data) {
                console.log(data);
                $("tbody").html(template("tpl", data));
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: currentPage,
                    totalPages: Math.ceil(data.total / pageSize),
                    size: "small",
                    onPageClicked(a, b, c, page){
                        currentPage = page;
                        render();
                    }
                })
            }

        })
    }

    render();
    //显示添加模态框
    $(".btn_add").on("click", function () {
        $("#addModal").modal("show");
    });
    //给表单做校验
    var $form = $("#form");
    $form.bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            //name属性
            categoryName: {
                validators: {
                    notEmpty: {
                        message: "一级分类名称不能为空"
                    }
                }
            }

        }

    });
    $form.on("success.form.bv", function (e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/category/addTopCategory",
            data: $form.serialize(),
            success: function (data) {
                if (data.success) {
                    //1.让模态框关闭
                    $("#addModal").modal("hide");
                    //2. 重新渲染第一页
                    currentPage = 1;
                    render();
                    // 3. 重置表单
                    $form.data("bootstrapValidator").resetForm();
                    $form[0].reset();
                }
            }
        })
    })


});