$(function() {
  // 1.1获取裁剪区域的 DOM 元素
  var $image = $("#image");

  var options = {
    // 纵横比 16 /9 , 1是正方形
    aspectRatio: 16 / 9,
    // 指定预览区域
    preview: ".img-preview"
  };

  // 1.3 创建裁剪区域
  $image.cropper(options);

  // 上传按钮
  $("#btn-upload").click(function() {
    $("#file").click();
  });

  $("#file").on("change", function(e) {
    var file = e.target.files[0];
    var newImgURL = URL.createObjectURL(file);

    $image
      .cropper("destory")
      .attr("src", newImgURL)
      .cropper(options);
  });
});
