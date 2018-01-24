import $ from 'jquery';

const element = $('#tab-content');
const origin = element.find('.field-file').eq(0).clone();
const target = element.find('.field-file').parents('.grid').eq(0);
const addBtn = element.find('#add-content-field');
const noLogoCheck = element.find('#no-logo-checkbox');
let count = element.find('.field-file').length;

const hidden = {
	'pointer-events': 'none',
	'z-index': -100,
	display: 'block',
	height: 0,
	opacity: 0,
	position: 'absolute',
	width: 0
};

const fdInit = elt => {
	const field = $(elt);
	const input = field.find('input[type="file"]');
	const path = field.find('.field-file__path');

	input.change(function () {
		path.text(this.value);
	});

	input.css(hidden);
};

const addField = () => {
	const id = `content-file-${++count}`;
	const wrap = $('<div class="col-12" />');
	const field = origin.clone();
	const label = field.find('label');
	const input = field.find('input[type="file"]');

	fdInit(field.get(0));

	label.attr('for', id);
	input.attr('id', id);

	wrap.append(field);
	target.append(wrap);
};

const addLogoPrice = () => {
	if (noLogoCheck.prop('checked')) {
		noLogoCheck.siblings('.switcher__wrap').find('span').show();
	}else {
		noLogoCheck.siblings('.switcher__wrap').find('span').hide();
	}
};

function init() {
	element.find('.field-file').each((_, elt) => fdInit(elt));
	addBtn.click(addField);
	noLogoCheck.click(addLogoPrice);
}

export default {
	element,
	init
};