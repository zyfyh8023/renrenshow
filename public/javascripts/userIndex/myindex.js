$(document).ready(function() {

	var $input = $('#doc-qr-text', "#zy-myindex"),
		$qr = $('#doc-qrcode', "#zy-myindex");
	function makeCode(text) {
		$qr.empty().qrcode(text);
	}
	$input.val(location.href);
	makeCode(location.href);
	$('#zy-myindex').delegate('#doc-gen-qr', 'click', function(){
		makeCode($input.val());
	});
	$input.on('focusout', function() {
		makeCode($input.val());
	});
	
})