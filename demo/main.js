/*global Picker*/

window.onerror = function (msg, url, line) { alert('Error: ' + msg + '\nURL: ' + url + '\nLine: ' + line); };
window.onload = init;

function init() {
    "use strict";

    function $(selector, context) {
        return (context || document).querySelector(selector);
    }

    $('h1').insertAdjacentElement('beforeend', document.createElement('sub')).textContent = $('script[src]').src.replace(/.*\//, ' ');


    var parentMain = $('#main-color'),
        parentBasic = $('#basic'),
        parentCustom = $('#custom'),
        customPlacement = $('#custom-placement'),
        customToggler = $('#custom-toggler'),
        parentShared = $('#shared'),
        containerShadow = $('#shadow');
    var parentShadow;

    //Shadow DOM:
    //https://github.com/Sphinxxxx/vanilla-picker/issues/15
    if (containerShadow.attachShadow) {
        var shadow = containerShadow.attachShadow({ mode: 'open' });
        if(Picker.StyleElement) {
            shadow.appendChild(Picker.StyleElement.cloneNode(true));
        }
        //For strict CSP settings:
        else {
            //<link rel="stylesheet" href="../dist/vanilla-picker.csp.css">
            const stylesheet = document.createElement('link');
            stylesheet.rel = 'stylesheet';
            stylesheet.href = '../dist/vanilla-picker.csp.css';
            shadow.appendChild(stylesheet);
        }

        parentShadow = document.createElement('button');
        parentShadow.textContent = 'Shadow DOM';
        shadow.appendChild(parentShadow);
    }

    var popupBasic, popupCustom, popupShared, pickerFixed, popupShadow;


    /* Basic example */
    popupBasic = new Picker(parentBasic);
    popupBasic.onDone = function (color) {
        parentBasic.style.background = color.rgbaString;
    };
    //Open the popup manually:
    popupBasic.openHandler();


    /* Custom popup behavior */
    popupCustom = new Picker({
        parent: parentCustom,
        popup: customPlacement.value,
        editor: false,
        cancelButton: true,
        color: '#dbeb',
        onDone: function (color) {
            parentCustom.style.background = color.rgbaString;
        },
    });
    customPlacement.onchange = function (e) {
        popupCustom.setOptions({
            popup: customPlacement.value,
        });
    };
    //Disable the normal open behavior and implement our own:
    const openDefault = popupCustom.openHandler.bind(popupCustom);
    popupCustom.openHandler = function () { };
    customToggler.onclick = function (e) {
        openDefault();
    };


    /* Shared picker */
    popupShared = new Picker({
        editorFormat: 'hsl',
        onChange: function (color) {
            this.settings.parent.style.backgroundColor = color.rgbaString;
        }
    });
    parentShared.addEventListener('click', function (e) {
        if (e.target.nodeName !== 'LI') { return; }
        var parent = e.target;

        popupShared.movePopup({
            parent: parent,
            color: parent.style.backgroundColor || getComputedStyle(parent).backgroundColor,
        }, true);
    });


    /* Non-popup picker */
    pickerFixed = new Picker({
        parent: parentMain,
        popup: false,
        alpha: false,
        //editor: false,
        editorFormat: 'rgb',
        color: '#cef6',
        onChange: function (color) {
            document.body.style.backgroundColor = color.rgbaString;
        },
    });
    pickerFixed.setColor('lime', true);


    /* Shadow DOM */
    if (parentShadow) {
        popupShadow = new Picker({
            parent: parentShadow,
            editor: false,
            cancelButton: true,
            onChange: function (color) {
                parentShadow.style.color = color.rgbaString;
            },
            onDone: function (color) {
                parentShadow.style.backgroundColor = color.rgbaString;
            },
        });
    }


    /*
    [popupBasic, popupCustom, popupShared, pickerFixed].forEach(p => {
        p.onOpen = function (color) { console.log('Opened', this.settings.parent.id, color.hex); };
        p.onClose = function (color) { console.log('Closed', this.settings.parent.id, color.hex); };
    });
    //*/
}