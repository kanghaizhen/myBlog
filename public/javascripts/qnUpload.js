$(function(){
  var token = "";
  var bucket = "";
  var baseUrl = "http://7xk6ll.com1.z0.glb.clouddn.com/";
  var upUrl = "http://up.qiniu.com";
  $.get("/admin/token",function(result){
    token = result.uptoken;
  });
  $(".fileUp").on("change",function(){
    var $this = $(this),
        file = this.files[0],
        formData = new FormData(),
        callback = $this.data("callback");
    formData.append("token",token);
    formData.append("file",file);
    $.ajax({
      type:'POST',
      url:upUrl,
      data:formData,
      contentType:false,
      processData:false,
      success:function(data){
        var key = data.key;
        var url = baseUrl+key
        $this.next().val(url);
        if(callback) window[callback](key);
      }
    })
  });
});