const system = {
    timeStamp: 0,
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
                let pName1 = getValueFromTag(xmlDoc, 'cName1');
                let pName2 = getValueFromTag(xmlDoc, 'cName2');
                let pTwitter1 = getValueFromTag(xmlDoc, 'cTwitter1');
                let pTwitter2 = getValueFromTag(xmlDoc, 'cTwitter2');
                let timestamp = getValueFromTag(xmlDoc, 'timestamp');

                resolve({ pName1, pName2, pTwitter1, pTwitter2, timestamp })
            }
            xhr.onerror = function () {
                reject(xhr.response);
            };
        })
    },
    update: function() {
        system.connect().then((result)=> {
            const { pName1, pName2, pTwitter1, pTwitter2, timestamp } = result;

            if (timestamp !== system.timeStamp) {
                system.timeStamp = timestamp;
                _.removeClass(_.$('.panelL'), 'animate_pan');
                _.removeClass(_.$('.panelR'), 'animate_pan');
                _.removeClass(_.$('.triangle'), 'animate_triangle');
                _.removeClass(_.$('.logo'), 'animate_logo');

                _.$('.panelL .name').innerHTML = pName1;
                _.$('.panelR .name').innerHTML = pName2;
        
                _.$('.panelL .twitter').innerHTML = pTwitter1;
                _.$('.panelR .twitter').innerHTML = pTwitter2;
    
        
                setTimeout(function () {
                    _.addClass(_.$('.panelL'), 'animate_pan');
                    _.addClass(_.$('.panelR'), 'animate_pan');
                    _.addClass(_.$('.triangle'), 'animate_triangle');
                    _.addClass(_.$('.logo'), 'animate_logo');
                }, 500)
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
    }
}


window.setInterval(function() {
    system.update();
}, 500);