$(function() {
  var q = {
    pagenum: 1,
    // pagenum  是 int 页码值
    pagesize: 2,
    // pagesize	是	int	每页显示多少条数据
    cate_id: $("[name=cate_id]").val(),
    // cate_id	否	string	文章分类的 Id
    state: $("[name=state]").val()
    // state	否	string	文章的状态，可选值有：已发布、草稿
  };

  template.defaults.imports.formatDate = function(olddate) {
    // console.log(olddate) // 2020-09-13 01:45:39.448
    // 处理逻辑
    // console.log(moment)
    var timenew = moment(olddate).format("MMMM Do YYYY, h:mm:ss a");
    return timenew;
  };

  initList();
  function initList() {
    $.get(`/my/article/list`, q, function(res) {
      if (res.status === 0) {
        console.log(res);
        var strHtml = template("tpl-table", res);
        $("tbody").html(strHtml);
        // 调用渲染分页
        renderPage(res.total);
      }
    });
  }

  // 下拉框
  // html 配置 name 和 value
  // js 获取所有分类
  // 筛选按钮
  initCate();
  function initCate() {
    $.get(`/my/article/cates`, function(res) {
      if (res.status === 0) {
        console.log(res);
        var strHtml = template("tpl-cate", res);
        $("#sct-cate").html(strHtml);
        // 手动让form重新渲染
        layui.form.render();
      }
    });
  }

  //  筛选按钮
  $("#form-search").submit(function(e) {
    e.preventDefault();

    q.cate_id = $("[name=cate_id]").val();
    q.state = $("[name=state]").val();
    initList();
  });

  // 渲染分页
  function renderPage(total) {
    // 分页代码
    layui.use("laypage", function() {
      var laypage = layui.laypage;

      // 执行一个laypage实例
      laypage.render({
        elem: "page", // page 是id
        count: total, //数据总数, 从服务端得到
        curr: q.pagenum, //当前页码
        limit: q.pagesize, //每页条数

        limits: [2, 3, 5, 10], //切换每页条数 pagesize
        layout: ["count", "limit", "prev", "page", "next", "skip"],

        jump: function(obj, first) {
          // 首次不执行
          if (!first) {
            // 按照最新页码获取文章列表数据
            q.pagenum = obj.curr; //2  pagesize=2  => 服务器返回数据库中的第3 条和第4条数据
            q.pagesize = obj.limit;
            // do something
            initList();
          } else {
          }
        }
      });
    });
  }

  // 删除分类
  $("tbody").on("click", "delete", function(e) {
    e.preventDefault();
    // 获取id
    var Id = $(this).attr("data-id");
    var len = $(".delete").length;

    // 确认框
    layer.confirm("Sure?", { icon: 3, title: "删除文章" }, function(index) {
      // ajax
      $.get(`/my/article/delete/${Id}`, function(res) {
        if (res.status === 0) {
          if (len === 1) {
            // 改变页码pagenum
            q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1;
          }
          layer.close(index);
          initList();
        }
      });
    });
  });
});
