import svg4everybody from 'svg4everybody';
import $ from 'jquery';
import wizard from './wizard';

$(() => {
	svg4everybody();
});

$(document).ready(wizard.init);
