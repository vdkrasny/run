import $ from 'jquery';
import 'jquery-validation';

const form = $('form.wizard');
const elements = form.find('.js-validate');
const validator = form.validate({
	rules: {
		username: {
			required: true,
			normalizer(value) {
				return $.trim(value);
			}
		},
		gender: {
			required: true
		},
		phone: {
			required: true,
			digits: true
		},
		email: {
			required: true,
			email: true
		}
	},
	messages: {
		phone: {
			required: 'Поле является обязательным.',
			digits: 'Телефон должен содержать только цифры.'
		},
		email: {
			required: 'Поле является обязательным.',
			email: 'Не корректный адрес.'
		},
		username: {
			required: 'Поле является обязательным.'
		}
	}
});

elements.blur(function () {
	validator.element(`form.wizard [name=${this.name}]`);
});

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
});
