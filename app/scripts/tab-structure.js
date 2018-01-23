import $ from 'jquery';

const element = $('#tab-structure');
const pageNameInput = element.find('#page-name');
const newPageEntry = element.find('.wizard-structure__item.wizard-structure__new-name');
const addPageButton = element.find('#add-page');
const newPagesWrap = element.find('.scroll-space__wrap');
const skipButton = element.find('.js-wizard-skip');

const addPage = e => {
	const newItem = newPageEntry.clone();
	const name = pageNameInput.val();

	newItem
		.find('input[type="hidden"]')
		.val(name)
		.attr('name', 'newPages[]');

	newItem.find('.capt-shadow').text(name);
	newItem.find('.wizard-structure__new-name-btn').click(() => newItem.remove());
	pageNameInput.val('');
	pageNameInput.trigger('input');
	newPagesWrap.append(newItem);
	newItem.show();
	e.preventDefault();
};

const handleInput = e => {
	if (e.target.value !== '') {
		addPageButton.show();
	}
	else {
		addPageButton.hide();
	}
};

function init(wizard) {
	skipButton.click(() => {
		this.checked = true;
		wizard.next();
	});
	addPageButton.hide();
	newPageEntry.hide();
	element.find('#add-page').click(addPage);
	pageNameInput.on('input', handleInput);
}

export default {
	addPage,
	element,
	init,
	pageNameInput
};
