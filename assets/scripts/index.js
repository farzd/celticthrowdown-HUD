function addClass(el, className) {
    if (el.classList) { el.classList.add(className); }
    else { el.className += ' ' + className; }
}

var panelL = document.querySelectorAll('.panelL')[0];
var panelR = document.querySelectorAll('.panelR')[0];
var panelT = document.querySelectorAll('.panelT')[0];
var logo = document.querySelectorAll('.logo')[0];
var triangle = document.querySelectorAll('.triangle')[0];



document.getElementsByTagName('body')[0].addEventListener('click' , function () {
    addClass(panelL, 'animate_pan')
    addClass(panelR, 'animate_pan')
    addClass(logo, 'animate_logo')
    if(panelT) addClass(panelT, 'animate_panT')
    if(triangle) addClass(triangle, 'animate_triangle')
});