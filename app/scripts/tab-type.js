import $ from 'jquery';

const element = $('#tab-type');
const cards = element.find('.card');
const siteType = $('#site-type');

function handleClick() {
	const that = $(this);
	const type = that.data('type');

	siteType.val(type);
	cards.removeClass('is-checked');
	that.addClass('is-checked');
	$('[data-parent]').parents('.wizard-structure__item').hide();
	$('[data-parent]:checked').removeAttr('checked');
	$(`[data-parent="${type}"]`).parents('.wizard-structure__item').show();
}

function init(wizard) {
	$('[data-parent]').hide();
	cards.click(function (e) {
		handleClick.call(this, e);
		wizard.next();
	});
}

export default {element, init};
