import $ from 'jquery';
import './form-submit';
import tabType from './tab-type';
import tabStructure from './tab-structure';
import tabLook from './tab-look';
import tabContent from './tab-content';
import 'jquery-wizard';
const form = 'form.wizard';

function wizardTrackPosition() {
	const activeTab = $('.wizard__tab.is-active');
	const top = activeTab.position().top;
	// const marginTop = parseInt(activeTab.css('margin-top'), 10);
	const marginTop = 40;
	const height = activeTab.outerHeight();
	const trackOffset = top + marginTop + height;
	$('.wizard__steps-track-thumb').css({height: `${trackOffset}px`});
}

$(document).on('opening', '.remodal', wizardTrackPosition());

export default {
	init() {
		const wizard = $(form).wizard({
			step: '.wizard__tab',
			classes: {
				pane: {
					active: 'is-active'
				},
				step: {
					active: 'is-active'
				}
			},
			getPane(index) {
				return this.$element.find('.wizard__content').children().eq(index);
			},
			buttonsAppendTo: '.wizard__content',
			templates: {
				buttons() {
					const next = `<a class="btn btn_primary btn_size_sm" href="#${this.id}" data-wizard="back" role="button"><img src="./assets/images/icon_btn_l.png" class="btn__icon"><span class="btn__label">предыдущий шаг</span></a>`;
					const prev = `<a class="btn btn_primary btn_size_sm" href="#${this.id}" data-wizard="next" role="button"><span class="btn__label">Следущий шаг</span><img src="./assets/images/icon_btn_r.png" class="btn__icon"></a>`;
					const finish = `<a class="btn btn_primary btn_size_sm" href="#${this.id}" data-wizard="finish" data-remodal-action="close" role="button"><span class="btn__label">Отправить</span></a>`;
					return `<div class="wizard__controls">${next}${prev}${finish}</div>`;
				}
			},
			onFinish() {
				$(form).submit();
			}
		}).data('wizard');

		const submit = $('[data-wizard="finish"]');
		const next = $('[data-wizard="next"]');
		submit.hide();

		$(document).on('wizard::afterChange', () => {
			wizardTrackPosition();
			if (wizard.lastIndex() === wizard.currentIndex()) {
				submit.show();
				next.hide();
			}
			else {
				if (submit.is(':visible')) {
					submit.hide();
				}
				if (!next.is(':visible')) {
					next.show();
				}
			}
		});

		tabType.init(wizard);
		tabStructure.init(wizard);
		tabLook.init(wizard);
		tabContent.init();
	}
};
