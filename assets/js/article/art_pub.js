$(function() {
  var state = "已发布";

  $("#caogao").click(function() {
    state = "草稿";
  });

  // 1. 初始化图片裁剪器
  var $image = $("#image");

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: ".img-preview"
  };

  // 3. 初始化裁剪区域
  $image.cropper(options);

  //  伪造按钮
  $("#chooseImage").click(function() {
    $("#file").click();
  });

  // 监听变化
  $("#file").change(function(e) {
    var fd = e.target.files[0];
    var newImageURL = URL.createObjectURL(fd);
    $image
      .cropper("destory") //销毁旧的裁剪区域
      .attr("src", newImageURL) //重新设置图片路径
      .cropper(options); //重新初始化裁剪区域
  });

  // 表单提交
  $("#formPub").submit(function(e) {
    e.preventDefault();
    // 根据form 数据去实例化FormData 数据
    var fd = new FormData($(this)[0]);

    fd.append("state", state);
    fd.forEach(function(v, k) {
      console.log(v, k);
    });
  });
});
