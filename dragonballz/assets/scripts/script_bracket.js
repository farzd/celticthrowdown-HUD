const system = {
    timeStamp: 0,
    init: function() {

        setTimeout(()=> {
            _.addClass(_.$('.wa'), 'fade');
        }, 100)

        setTimeout(()=> {
            _.addClass(_.$('.wb'), 'fade');
        }, 300)

        setTimeout(()=> {
            _.addClass(_.$('.wc'), 'fade');
        }, 750)

        setTimeout(()=> {
            _.addClass(_.$('.wfinals'), 'fade');
        }, 1200)

        setTimeout(()=> {
            _.addClass(_.$('.grandfinals'), 'fade');
        }, 1500)

        setTimeout(()=> {
            _.addClass(_.$('.la'), 'fade');
        }, 100)

        setTimeout(()=> {
            _.addClass(_.$('.lb'), 'fade');
        }, 300)

        setTimeout(()=> {
            _.addClass(_.$('.lc'), 'fade');
        }, 750)

        setTimeout(()=> {
            _.addClass(_.$('.ld'), 'fade');
        }, 750)

        setTimeout(()=> {
            _.addClass(_.$('.lfinals'), 'fade');
        }, 1200)
     
        var video = _.$('#bracketsVid')
        video.play()

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
                let timestamp = getValueFromTag(xmlDoc, 'timestamp');
                
                let wa1 = getValueFromTag(xmlDoc, 'wa1');
                let wa2 = getValueFromTag(xmlDoc, 'wa2');
                
                let wb1 = getValueFromTag(xmlDoc, 'wb1');
                let wb2 = getValueFromTag(xmlDoc, 'wb2');
                
                let wc1 = getValueFromTag(xmlDoc, 'wc1');
                let wc2 = getValueFromTag(xmlDoc, 'wc2');
                
                let wfinals1 = getValueFromTag(xmlDoc, 'wfinals1');
                let wfinals2 = getValueFromTag(xmlDoc, 'wfinals2');
                
                let la1 = getValueFromTag(xmlDoc, 'la1');
                let la2 = getValueFromTag(xmlDoc, 'la2');
                
                let lb1 = getValueFromTag(xmlDoc, 'lb1');
                let lb2 = getValueFromTag(xmlDoc, 'lb2');
                
                let lc1 = getValueFromTag(xmlDoc, 'lc1');
                let lc2 = getValueFromTag(xmlDoc, 'lc2');
                
                let ld1 = getValueFromTag(xmlDoc, 'ld1');
                let ld2 = getValueFromTag(xmlDoc, 'ld2');

                let lfinals1 = getValueFromTag(xmlDoc, 'lfinals1');
                let lfinals2 = getValueFromTag(xmlDoc, 'lfinals2');
                
                let grandfinals1 = getValueFromTag(xmlDoc, 'grandfinals1');
                let grandfinals2 = getValueFromTag(xmlDoc, 'grandfinals2');                  


                resolve({ timestamp, wa1, wa2, wb1, wb2, wc1, wc2, wfinals1, wfinals2, la1, la2, lb1, lb2, lc1, lc2, ld1, ld2, lfinals1, lfinals2, grandfinals1, grandfinals2  })
            }
            xhr.onerror = function () {
                reject(xhr.response);
            };
        })
    },
    update: function(init) {
        system.connect().then((result)=> {
            const {  timestamp, wa1, wa2, wb1, wb2, wc1, wc2, wfinals1, wfinals2, la1, la2, lb1, lb2, lc1, lc2, ld1, ld2, lfinals1, lfinals2, grandfinals1, grandfinals2 } = result;

            if (timestamp !== system.timeStamp) {
                system.timeStamp = timestamp;
  

                setTimeout(()=> {
                    const wa1split = wa1.split('=');
                    _.$('.wa .one .name').innerHTML = wa1split[0];
                    _.$('.wa .one .score').innerHTML = wa1split[1];

                    const wa2split = wa2.split('=');
                    _.$('.wa .two .name').innerHTML = wa2split[0];
                    _.$('.wa .two .score').innerHTML = wa2split[1]; 
 
                    const wb1split = wb1.split('=');
                    _.$('.wb .one .name').innerHTML = wb1split[0];
                    _.$('.wb .one .score').innerHTML = wb1split[1];

                    const wb2split = wb2.split('=');
                    _.$('.wb .two .name').innerHTML = wb2split[0];
                    _.$('.wb .two .score').innerHTML = wb2split[1]; 
                    
                    const wc1split = wc1.split('=');
                    _.$('.wc .one .name').innerHTML = wc1split[0];
                    _.$('.wc .one .score').innerHTML = wc1split[1];

                    const wc2split = wc2.split('=');
                    _.$('.wc .two .name').innerHTML = wc2split[0];
                    _.$('.wc .two .score').innerHTML = wc2split[1]; 
                    
                    const wfinals1split = wfinals1.split('=');
                    _.$('.wfinals .one .name').innerHTML = wfinals1split[0];
                    _.$('.wfinals .one .score').innerHTML = wfinals1split[1];

                    const wfinals2split = wfinals2.split('=');
                    _.$('.wfinals .two .name').innerHTML = wfinals2split[0];
                    _.$('.wfinals .two .score').innerHTML = wfinals2split[1]; 


                    const la1split = la1.split('=');
                    _.$('.la .one .name').innerHTML = la1split[0];
                    _.$('.la .one .score').innerHTML = la1split[1];

                    const la2split = la2.split('=');
                    _.$('.la .two .name').innerHTML = la2split[0];
                    _.$('.la .two .score').innerHTML = la2split[1]; 
 
                    const lb1split = lb1.split('=');
                    _.$('.lb .one .name').innerHTML = lb1split[0];
                    _.$('.lb .one .score').innerHTML = lb1split[1];

                    const lb2split = lb2.split('=');
                    _.$('.lb .two .name').innerHTML = lb2split[0];
                    _.$('.lb .two .score').innerHTML = lb2split[1]; 
                    
                    const lc1split = lc1.split('=');
                    _.$('.lc .one .name').innerHTML = lc1split[0];
                    _.$('.lc .one .score').innerHTML = lc1split[1];

                    const lc2split = lc2.split('=');
                    _.$('.lc .two .name').innerHTML = lc2split[0];
                    _.$('.lc .two .score').innerHTML = lc2split[1];        
                    
                    const ld1split = ld1.split('=');
                    _.$('.ld .one .name').innerHTML = ld1split[0];
                    _.$('.ld .one .score').innerHTML = ld1split[1];

                    const ld2split = ld2.split('=');
                    _.$('.ld .two .name').innerHTML = ld2split[0];
                    _.$('.ld .two .score').innerHTML = ld2split[1];  
                    
                    const lfinals1split = lfinals1.split('=');
                    _.$('.lfinals .one .name').innerHTML = lfinals1split[0];
                    _.$('.lfinals .one .score').innerHTML = lfinals1split[1];

                    const lfinals2split = lfinals2.split('=');
                    _.$('.lfinals .two .name').innerHTML = lfinals2split[0];
                    _.$('.lfinals .two .score').innerHTML = lfinals2split[1];         
                    
                    const grandfinals1split = grandfinals1.split('=');
                    _.$('.grandfinals .one .name').innerHTML = grandfinals1split[0];
                    _.$('.grandfinals .one .score').innerHTML = grandfinals1split[1];

                    const grandfinals2split = grandfinals2.split('=');
                    _.$('.grandfinals .two .name').innerHTML = grandfinals2split[0];
                    _.$('.grandfinals .two .score').innerHTML = grandfinals2split[1];                      
                }, 100)


        
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
        console.log(el);
        console.log(className);
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

system.init();