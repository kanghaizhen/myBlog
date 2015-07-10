var require = function (type,str){
  var reg = {
    tel: /^1[3,5,7,8]\d{9}$/g,
    email:/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/g,
    require: /\S+/g,
    password:/(?=^.{6,}$)(?=.*\d)(?=.*\W+)(?=.*[A-Z])(?=.*[a-z])(?!.*\n).*$/g
  };
  return reg[type].test(str);
}
$(function(){
  $("[data-require]").on("blur",function(){
    var oThis = $(this),
        dataType = oThis.data("require"),
        sVal = oThis.val();
        bAuthor = require(dataType,sVal);
    if(!bAuthor){
      oThis.addClass("error");
    }else{
      oThis.removeClass("error");
    }
  })
})