/*jslint browser: true, devel: true, nomen: true */

(function () {
    'use strict';
    
    var postFrm, el, elIdx, debugMode = false;
    
    function apply(applyBtnEl) {
        try {
            // http://www.w3schools.com/jsref/prop_node_childnodes.asp
            document.getElementsByClassName("optionHolder")[0]
                .childNodes[1]
                .childNodes[0]
                .childNodes[2]
                .childNodes[2]
                .childNodes[0]
                .childNodes[1]
                .click();
            // http://www.w3schools.com/jsref/met_win_settimeout.asp
            window.setTimeout(function () {
                applyBtnEl.click();
            }, 1111);
        } catch (e) {
            console.log(e);
        }
    }
    
    function removeSpecials(str) {
        var lower = str.toLowerCase(), upper = str.toUpperCase(), res = "", i;
        for (i = 0; i < lower.length; i += 1) {
            if (lower[i] !== upper[i] || lower[i] === ' ') {
                res += str[i];
            }
        }
        return res;
    }
    
    function translit(str) {
        var transliterations1 = {}, transliterations2 = {},
            idx,
            key1, key2,
            key1Low, key2Low,
            transliteration = '',
            replaced = false;
        
        if (debugMode) { console.log("🛈 String to translit: " + str); }
        
        // https://ru.wikipedia.org/wiki/Транслит
        
        transliterations1['а'] = 'a';
        transliterations1['б'] = 'b';
        transliterations1['в'] = 'v';
        transliterations1['г'] = 'g';
        transliterations1['д'] = 'd';
        
        transliterations1['е'] = 'e';
        // transliterations1['е'] = 'ie';
    
        transliterations1['ё'] = 'e';
        // transliterations1['ё'] = 'yo';
        // transliterations1['ё'] = 'jo';
                         
        transliterations1['ж'] = 'zh';
        transliterations1['з'] = 'z';
        transliterations1['и'] = 'i';
        
        transliterations1['й'] = 'j';
        transliterations2['ий'] = 'iy';
        // transliterations2['ий'] = 'y';
        transliterations2['ый'] = 'yj';

        transliterations1['к'] = 'k';
        transliterations1['л'] = 'l';
        transliterations1['м'] = 'm';
        transliterations1['н'] = 'n';
        transliterations1['о'] = 'o';
        transliterations1['п'] = 'p';
        transliterations1['р'] = 'r';
        transliterations1['с'] = 's';
        transliterations1['т'] = 't';
        transliterations1['у'] = 'u';
        transliterations1['ф'] = 'f';
        
        transliterations1['х'] = 'h';
        // transliterations1['х'] = 'kh';
                         
        transliterations1['ц'] = 'ts';
        // transliterations1['ц'] = 'c';

        transliterations1['ч'] = 'ch';
        transliterations1['ш'] = 'sh';
        transliterations1['щ'] = 'sch';
        
        // transliterations1['ъ'] = "'";
        transliterations1['ъ'] = '';

        transliterations1['ы'] = 'y';

        // transliterations1['ь'] = "'";
        transliterations1['ь'] = '';

        transliterations1['э'] = 'e';
        // transliterations1['э'] = 'eh';
        
        transliterations1['ю'] = 'ju';
        // transliterations1['ю'] = 'iu';
        
        transliterations1['я'] = 'ja';
        // transliterations1['я'] = 'ia';
        // transliterations1['я'] = 'ya';
        
        for (idx = 0; idx < str.length; idx += 1) {
            replaced = false;
            key1 = str[idx];
            key1Low = key1.toLowerCase();
            
            if (idx < str.length - 1) {
                key2 = key1 + str[idx + 1];
                key2Low = key2.toLowerCase();
                if (transliterations2.hasOwnProperty(key2)) {
                    transliteration += transliterations2[key2];
                    idx += 1;
                    replaced = true;
                } else if (transliterations2.hasOwnProperty(key2Low)) {
                    transliteration += transliterations2[key2Low].toUpperCase();
                    idx += 1;
                    replaced = true;
                }
            }
            
            if (!replaced) {
                if (transliterations1.hasOwnProperty(key1)) {
                    transliteration += transliterations1[key1];
                } else if (transliterations1.hasOwnProperty(key1Low)) {
                    transliteration += transliterations1[key1Low].toUpperCase();
                } else {
                    transliteration += str[idx];
                }
            }
        }
        
        if (debugMode) { console.log("🛈 Transliteration: " + transliteration); }
        
        // http://stackoverflow.com/questions/3794919/replace-all-spaces-in-a-string-with
        return removeSpecials(transliteration).replace(/ /g, '-');
    }
    
    function postTitleChanged(evt) {
        try {
            var newTitle = evt.target.value,
                nextURL = false,
                nextBtn = false;
            if (debugMode) { console.log("🛈 Post title changed: " + newTitle); }
            for (elIdx = 0; elIdx < postFrm.elements.length; elIdx += 1) {
                el = postFrm.elements[elIdx];
                if (el) {
                    // http://stackoverflow.com/questions/11416261/how-can-i-check-if-an-element-is-a-drop-down-list-element-or-a-text-input-elemen
                    if (el.tagName === 'INPUT' && el.type === 'radio' && el.id === 'custom-filename') {
                        // http://stackoverflow.com/questions/21166860/check-a-radio-button-with-javascript
                        el.checked = true;
                        el.click();
                        if (debugMode) { console.log('🛈 Custom URL checked: ' + el.checked); }
                        nextURL = true;
                    }
                    if (nextURL && el.tagName === 'INPUT' && el.type === 'text') {
                        // http://stackoverflow.com/questions/5700471/set-value-of-input-using-javascript-function
                        el.value = translit(newTitle);
                        if (debugMode) { console.log('🛈 New URL taken: ' + el.value); }
                        nextURL = false;
                        nextBtn = true;
                    }
                    if (nextBtn && el.tagName === 'BUTTON') {
                        apply(el);
                        nextBtn = false;
                        break;
                    }
                }
            }
        } catch (e) {
            console.log(e);
        }
    }
    
    // http://stackoverflow.com/questions/5082094/register-domcontentloaded-in-google-chrome
    window.addEventListener("DOMFocusIn", function () {
        try {
            postFrm = document.forms.postingForm;
            if (postFrm) {
                for (elIdx = 0; elIdx < postFrm.elements.length; elIdx += 1) {
                    el = postFrm.elements[elIdx];
                    // http://stackoverflow.com/questions/277544/how-to-set-the-focus-to-the-first-input-element-in-an-html-form-independent-from
                    if (el.type === 'text') {
                        el.addEventListener("change", postTitleChanged);
                        break;
                    }
                }
            } else {
                if (debugMode) { console.log('🛈 Posting form not found!'); }
            }
        } catch (e) {
            console.log(e);
        }
    }, false);

}());
