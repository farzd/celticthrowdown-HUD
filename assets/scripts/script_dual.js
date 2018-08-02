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
                let pName1 = getValueFromTag(xmlDoc, 'dDualHeading');
                let pTwitter1 = getValueFromTag(xmlDoc, 'dDualText');
                let timestamp = getValueFromTag(xmlDoc, 'timestamp');

                resolve({ pName1, pTwitter1, timestamp })
            }
            xhr.onerror = function () {
                reject(xhr.response);
            };
        })
    },
    update: function() {
        system.connect().then((result)=> {
            const { pName1, pTwitter1, timestamp } = result;

            if (timestamp !== system.timeStamp) {
                system.timeStamp = timestamp;
                _.removeClass(_.$('.panelL'), 'animate_pan');

                _.$('.panelL .name').innerHTML = pName1;
                _.$('.panelL .twitter').innerHTML = pTwitter1;
        
        
                setTimeout(function () {
                    _.addClass(_.$('.panelL'), 'animate_pan');
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