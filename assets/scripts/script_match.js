const system = {
    timeStamp: 0,
    init: function() {
        _.removeClass(_.$('.panelL'), 'animate_pan');
        _.removeClass(_.$('.panelR'), 'animate_pan');
        _.removeClass(_.$('.panelT'), 'animate_panT');
        _.removeClass(_.$('.logo'), 'animate_logo');

        setTimeout(function () {
            _.addClass(_.$('.panelL'), 'animate_pan');
            _.addClass(_.$('.panelR'), 'animate_pan');
            _.addClass(_.$('.panelT'), 'animate_panT');
            _.addClass(_.$('.logo'), 'animate_logo');
        }, 100)

        system.update(true);
        
        window.setInterval(function() {
            system.update();
        }, 500);          
    },
    connect: function () {
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.overrideMimeType('text/xml');
            xhr.open('GET', 'streamcontrol.xml?t=' + Date.now());
            xhr.send();
            xhr.onload = function () {
                xmlDoc = xhr.responseXML;
                let getValueFromTag = _.getValueFromTag;
                let getCountry = _.getCountry;
                let pName1 = getValueFromTag(xmlDoc, 'pName1');
                let pName2 = getValueFromTag(xmlDoc, 'pName2');
                let pScore1 = getValueFromTag(xmlDoc, 'pScore1');
                let pScore2 = getValueFromTag(xmlDoc, 'pScore2');
                let pCountry1 = getCountry(getValueFromTag(xmlDoc, 'pCountry1'));
                let pCountry2 = getCountry(getValueFromTag(xmlDoc, 'pCountry2'));
                let pLabel1 = getValueFromTag(xmlDoc, 'pLabel1');
                let pLabel2 = getValueFromTag(xmlDoc, 'pLabel2');
                let game = getValueFromTag(xmlDoc, 'game');
                let gameStatus = getValueFromTag(xmlDoc, 'gameStatus');
                let timestamp = getValueFromTag(xmlDoc, 'timestamp');

                resolve({ pName1, pName2, pScore1, pScore2, pCountry1, pCountry2, pLabel1, pLabel2, game, gameStatus, timestamp })
            }
            xhr.onerror = function () {
                reject(xhr.response);
            };
        })
    },
    update: function(init) {
        system.connect().then((result)=> {
            const { pName1, pName2, pScore1, pScore2, pCountry1, pCountry2, pLabel1, pLabel2, game, gameStatus, timestamp } = result;

            if (timestamp !== system.timeStamp) {
                system.timeStamp = timestamp;

                if(!init) {
                    _.addClass(_.$('.panelL .name'), 'fade');
                    _.addClass(_.$('.panelL .score'), 'fade');
                    _.addClass(_.$('.panelL .flag'), 'fade');

                    _.addClass(_.$('.panelR .name'), 'fade');
                    _.addClass(_.$('.panelR .score'), 'fade');
                    _.addClass(_.$('.panelR .flag'), 'fade');
                }

                _.$('.panelL .name').innerHTML = pName1;
                _.$('.panelR .name').innerHTML = pName2;
        
                _.$('.panelL .score').innerHTML = pScore1;
                _.$('.panelR .score').innerHTML = pScore2;
        
                _.$('.panelT .title').innerHTML = gameStatus;

                _.$('.panelL .flag img').src = './assets/images/flags/flat/' + pCountry1 + '.png'
                _.$('.panelR .flag img').src = './assets/images/flags/flat/' + pCountry2 + '.png'

                if(!init) {
                    setTimeout(()=> {
                        _.removeClass(_.$('.panelL .name'), 'fade');
                        _.removeClass(_.$('.panelL .score'), 'fade');
                        _.removeClass(_.$('.panelL .flag'), 'fade');

                        _.removeClass(_.$('.panelR .name'), 'fade');
                        _.removeClass(_.$('.panelR .score'), 'fade');
                        _.removeClass(_.$('.panelR .flag'), 'fade');
                    }, 50)
                }


            }
        });
    }
}

const _ = {
    $: function (el) {
        return document.querySelectorAll(el)[0];
    },
    addClass: function (el, className) {
        if (el.classList) {
            el.classList.add(className);
        } else {
            el.className += ' ' + className;
        }
    },
    removeClass: function (el, className) {
        el.classList.remove(className);
    },
    getValueFromTag: function (xmlDoc, tag) {
        if (xmlDoc.getElementsByTagName(tag).length != 0) {
            if (xmlDoc.getElementsByTagName(tag)[0].childNodes.length == 0) {
                return '';
            } else {
                return xmlDoc.getElementsByTagName(tag)[0].childNodes[0].nodeValue;
            }
        } else {
            return '';
        }
    },
    getCountry: function (country) {
        var count = iso.findCountryByName(country);
        if (!count)
            count = iso.findCountryByCode(country);
        if (!count) {
            var count = new Array();
            count['value'] = "unknown";
        }
        return count['value'].toUpperCase();
    }
}

system.init();