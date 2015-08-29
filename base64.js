var webworker = {};
var fileObj = {};
var textFile = null;
$(document).ready(function(){
	$('#ShownInputBox').val('');
	$('#base64PaintArea').text('');
	$('[data-toggle="tooltip"]').tooltip();
});
$(document).click(function(){
	$('#ShownInputBox').tooltip('hide');
});
webworker.selectFile = function(e){
	$('#base64PaintArea').text('');
	$('#downloadbtn').addClass('displaynone');
	$('#progressbar').addClass('displaynone');
	$('#hiddenFileBrowser').click();
	e.stopImmediatePropagation();
};
webworker.fileSelected = function(obj,event){
	if(obj.files[0] != undefined){
	$('#convertbtn').removeClass('blur');
	fileObj = obj.files[0];
	$('#ShownInputBox').val(fileObj.name);
	event.stopPropagation();
	}
};
webworker.convertFile = function(obj,e){
	if(!$(obj).hasClass('blur')){
		$('#base64PaintArea').text('');
	    $('#downloadbtn').addClass('displaynone');
		$('#progressbar').removeClass('displaynone');
		$('.progress-bar').css('width','40%');
		var webworkerReader = new FileReader();
	webworkerReader.onload = function(){
		$('.progress-bar').css('width','680%');
		var base64Str = webworkerReader.result;
		$('.progress-bar').css('width','100%');
		base64Str = btoa(base64Str);
		$('#progressbar').addClass('displaynone');
		$('#base64PaintArea').text(base64Str);
		$('#downloadbtn').removeClass('displaynone');
	};
		try{
			$('.progress-bar').css('width','60%');
			webworkerReader.readAsBinaryString(fileObj);	
		}catch(e){
			console.log(e.msg);
		}
	}else{
		$('#ShownInputBox').tooltip('show');
		e.stopPropagation();
	}
};

webworker.makeTextFile = function (text) {
    var data = new Blob([text], {type: 'text/plain'});
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }
    textFile = window.URL.createObjectURL(data);
    return textFile;
  };
webworker.downloadAsTextFile = function(event){
	   var link = document.getElementById('downloadlink');
     link.href = webworker.makeTextFile($('#base64PaintArea').text());
	   link.download = 'WebWorkerConvertedBase64.txt';
	   link.click();
}