import $ from 'jquery';

const form = $('form.wizard');

form.submit(function (e) {

	e.preventDefault();

	$.ajax({
		type: form.attr('method'),
		url: form.attr('action'),
		data: form.serialize()
		// success: function (data) {
		// },
		// error: function (data) {
		// },
	});
	console.log('23');
});
