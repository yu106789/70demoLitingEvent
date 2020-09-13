$(function() {
  layui.form.verify({
    nickname: function(value) {
      if (value.length > 6) {
        return "昵称长度必须在1~6个字符之间";
      }
    }
  });

  function initUserInfo() {
    // 获取登录信息
    $.get("/my/userinfo", function(res) {
      console.log(res);
      // 判断
      if (res.status === 0) {
        // 给表单赋值
        layui.form.val("formInfo", res.data);
      } else {
      }
      //
    });
  }

  // 重置按钮
  $("#btn-reset").click(function(e) {
    e.preventDefault();
    initUserInfo();
  });

  // 更新用户信息
  $("#formupdate").submit(function(e) {
    e.preventDefault();
    $.post("/my/userinfo", $(this).serialize(), function(res) {
      if (res.status === 0) {
        window.parent.getUserInfo();
      }
    });
  });
});
