$(function(){
  var token = "";
  var bucket = ""
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
      url:"http://up.qiniu.com",
      data:formData,
      contentType:false,
      processData:false,
      success:function(data){
        var key = data.key;
        $this.next().val(key);
        if(callback) window[callback](key);
      }
    })
  });
  $("img").each(function(){
    var $this = $(this),
        key = $this.data("key"),
        view = $this.data("view"),
        data = {
          "key":key,
          "view":view
        }
    $.post("/admin/url",data,function(result){
      var url = result.url;
      $this.attr("src",url);
    })
  });
});