function ueadd(token,bucket){
    UE.registerUI('simpleupload', function(editor, uiName) {
        var toolbars = editor.getOpt("toolbars");
        if(toolbars[0].indexOf("imgupload") >= 0){
            return addUI();
        }
        function addUI(){
            var btn = new UE.ui.Button({
                name: uiName,
                title: '上传图片',
                onclick: function() {
                    var flag = $("#addueinput").length;
                    if(!flag){
                        $('body').append('<input type="file" id="addueinput" style="position:absolute; left:-99999px; top:0;" accept="image/jpg,image/png,image/gif,image/jpeg">');
                    }
                    $('#addueinput').click();
                    addImg(editor,editor.uid,token,bucket);
                }
            });
            return btn;
        }
    },10);
}
function addImg(editor,id,token,bucket){
    $('body').off('change','#addueinput');
    $('body').on('change','#addueinput',function(){
        var $this = $(this),
            len = $this.val().length,
            sta = $(this).val().lastIndexOf(".") + 1,
            getname = $(this).val().substr(sta,len);
        if(getname!="jpg" && getname!="png" && getname!="gif" && getname!="JPG"){
            $.alert({"msg":'上传格式文件不正确'});
            return false;
        }
        var Qiniu_UploadUrl = "http://up.qiniu.com";
        var xhr = new XMLHttpRequest();
        xhr.open('POST', Qiniu_UploadUrl, true);
        var formData, startDate;
        var f = $(this).get(0).files[0];
        formData = new FormData();
        formData.append('token', token);
        formData.append('file', f);
        var taking;
        xhr.onreadystatechange = function(response) {
            if (xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != "") {
                var blkRet = JSON.parse(xhr.responseText);
                var imgUrl='http://'+bucket+'.qiniucdn.com/'+blkRet.key;
                editor.execCommand('insertHtml', '<img src="'+imgUrl+'" />');
            }
        };
        startDate = new Date().getTime();
        xhr.send(formData);
        $this.remove();
    });
}