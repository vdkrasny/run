import $ from 'jquery';
import 'spectrum-colorpicker';

const SP_OPTIONS = {
	showPalette: true,
	preferredFormat: 'hex',
	showInput: true,
	color: 'papayawhip',
	palette: [
		['black', 'white', 'blanchedalmond',
			'rgb(255, 128, 0);', 'hsv 100 70 50'],
		['red', 'yellow', 'green', 'blue', 'violet']
	]
};

const hidden = {
	'pointer-events': 'none',
	'z-index': -100,
	display: 'block',
	height: 0,
	opacity: 0,
	position: 'absolute',
	width: 0
};

const element = $('#tab-look');
const selected = $('#selected-style');
const styleOptions = $('.style-option');
const pickers = element.find('.field-spectrum');
const fields = element.find('.field-file');
const fieldWrap = element.find('.field-file').eq(0).clone();
const grid = element.find('#tab-look-add-field');

let count = fields.length;
const skipButton = element.find('.js-wizard-skip');

const fieldInit = ($field, clickHandler) => {
	const input = $field.find('input[type="file"]');
	const path = $field.find('.field-file__path');

	input.change(function () {
		path.text(this.value);
	});

	input.css(hidden);

	if (clickHandler) {
		$field.find('button').click(clickHandler);
	}
};

const addFileInput = () => {
	const id = `file-${++count}`;
	const field = fieldWrap.clone();
	const label = field.find('label');
	const input = label.find('input');
	const col = $('<div class="col-12 col-lg-6 col_offset-lg-4">');

	input.attr('id', id);
	label.attr('for', id);

	fieldInit(field, addFileInput);

	col.append(field);
	grid.append(col);
};

function init(wizard) {
	skipButton.click(() => {
		this.checked = true;
		wizard.next();
	});
	pickers.spectrum(SP_OPTIONS);
	fields.each((i, e) => {
		fieldInit($(e), addFileInput);
	});

	styleOptions.click(function () {
		const that = $(this);
		const value = that.data('option');

		styleOptions.removeClass('is-checked');
		that.addClass('is-checked');
		selected.val(value);
		console.log(selected.val());
	});
}

export default {
	element,
	init
};
