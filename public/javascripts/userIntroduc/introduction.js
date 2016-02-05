var specialICon = UE.getEditor('specialICon'); 

$(document).ready(function() {

	var $specialInstruc=$('#my-specialinstr');
	$specialInstruc.delegate('#inputFile', 'change', function(event) {
		$('.imgtip', $specialInstruc).html($('#inputFile', $specialInstruc).val());
	});
	$specialInstruc.delegate('#upload', 'click', function(event) {
		$('#specialInstruc', $specialInstruc).ajaxForm({
			url: $('#specialInstruc', $specialInstruc).attr('action'),
			type: 'POST',
			data:{
				majorinstr2: specialICon.getContent()
			},
			success: function(res, status, xhr, $form) {
				if (res.retCode != 200) {
					alertOpnFn(res.retDesc);
				} else {
					location.reload();
					$('#specialInstruc', $specialInstruc).clearForm();
				}
			},
			error: function(res, status, e) {
				alertOpnFn('err');
			}
		});
	});


})

