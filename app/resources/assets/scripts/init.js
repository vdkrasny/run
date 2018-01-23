'use strict';

const BREAKPOINTS = {
	xs: 576,
	sm: 768,
	md: 992,
	lg: 1320,
	xl: 1440
};

const ACTIVE = 'is-active';

const mobileMenu = 'navigation';
const mobileMenuClass = '.' + mobileMenu;
const $mobileMenu = $(mobileMenuClass);

const $mobileMenuWrap = $(mobileMenuClass + '__wrap');

const mobileMenuControl = 'btn-burger';
const mobileMenuControlClass = '.' + mobileMenuControl;
const $mobileMenuControl = $(mobileMenuControlClass);

const mobileMenuIsOpen = mobileMenu + '-is-locked';

const $mobileMenuLink = $(mobileMenuClass + '__link');

function mMenuShow(speed) {
	speed = speed || 200;
	$mobileMenu.fadeIn(speed);
}
function mMenuHide(speed) {
	speed = speed || 200;
	$mobileMenu.fadeOut(speed);
}
function mMenuControlActive() {
	$mobileMenuControl.addClass(ACTIVE);
}
function mMenuControlUnActive() {
	$mobileMenuControl.removeClass(ACTIVE);
}
function mOpen() {
	mMenuShow();
	$('.header').addClass('header_fixed');
	mMenuControlActive();
}
function mClose() {
	mMenuHide();
	$('.header').removeClass('header_fixed');
	mMenuControlUnActive();
}
function smartScrollTo(obj, offset, event) {
	offset = offset || 0;
	const href = $(obj).attr('href');
	const offsetTop = href === '#' ? 0 : $(href).offset().top - offset;
	$('html').stop().animate({
		scrollTop: offsetTop
	}, 700);
	event.preventDefault();
}
function checkWidth() {
	const $header = $('.header');
	let headerWidthRight = $header.css('padding-right');
	let headerHeight = $header.outerHeight();
	let headerHeightCenter = (headerHeight - 45) / 2;
	$mobileMenuControl.css({top: headerHeightCenter, right: headerWidthRight});
	$mobileMenuWrap.css({paddingTop: headerHeight});
}
function tabsInit() {
	function tabs() {
		$('.tabs').each(function () {
			$('.tabs__switcher', this).eq(0).addClass('is-current');
			$('.tabs__content', this).hide();
			$('.tabs__content', this).eq(0).show().addClass(ACTIVE);
		});
	}
	tabs();
	$('.tabs__switcher').click(function () {
		const parent = $(this).parents('.tabs');
		const index = $(this).index();
		$('.tabs__switcher', parent).removeClass('is-current').eq(index).addClass('is-current');
		$('.tabs__content', parent).removeClass(ACTIVE).hide().eq(index).fadeIn().addClass(ACTIVE);
	});
}
$(document).ready(function () {
	checkWidth();
	$(window).resize(checkWidth);
	$mobileMenuControl.on('click', function (event) {
		if ($mobileMenuControl.hasClass(ACTIVE)) {
			mClose();
		}
		else {
			mOpen();
		}
		event.preventDefault();
	});
	$mobileMenuLink.click(function (event) {
		const outerHeightHeader = $('.header').outerHeight();
		mClose();
		smartScrollTo(this, outerHeightHeader, event);
	});
	tabsInit();
	$('.rewiev__slider').slick({
		autoplay: true,
		autoplaySpeed: 7000,
		infinite: true,
		speed: 500,
		fade: true,
		cssEase: 'linear',
		slidesToShow: 1,
		slidesToScroll: 1,
		swipeToSlide: true,
		adaptiveHeight: true,
		responsive: [
			{
				breakpoint: BREAKPOINTS.sm,
				settings: {
					arrows: false,
					dots: true
				}
			}
		]
	});
	$('.sn-clients__slider').slick({
		autoplay: true,
		autoplaySpeed: 7000,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		swipeToSlide: true,
		adaptiveHeight: true,
		responsive: [
			{
				breakpoint: BREAKPOINTS.md,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: BREAKPOINTS.sm,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: BREAKPOINTS.xs,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});
});

let images = document.querySelectorAll('.lazyload');
new LazyLoad(images);