const fr = require('./lang/fr.json');
const en = require('./lang/en.json');

var thisScript = document.currentScript || (function() {
    var scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
})(); 

var init = function() {
    let settings = {
        states: {}
    };
    const saveSettings = function() {
         ! function(cname, cvalue, exdays) {
            
            const a = new Date;
            a.setTime(a.getTime() + 24 * exdays * 60 * 60 * 1e3);
            let expires = "expires=" + a.toUTCString();
            let cookieText = cname + "=" + cvalue + ";" + expires + ";path=/"
            document.cookie = cookieText
            
        }("asw", JSON.stringify(settings),30);
    };

    let getCookie = function(cname) {
        let name = cname + "=",
            decodedCookie = decodeURIComponent(document.cookie).split(";");
        for (let i = 0; i < decodedCookie.length; i++) {
            let a = decodedCookie[i];
            for (;" " == a.charAt(0);) {
                a = a.substring(1);
            }
            if (0 == a.indexOf(name)) {
                return a.substring(name.length, a.length);
            } 
        }
        return "";
    }("asw");

    try {
        getCookie = JSON.parse(getCookie)
    } catch (e) {

    }
    
    settings = {
        states: {},
        ...getCookie
    };
    
    let icons = ["format_size", "add", "remove", "restart_alt", "close"];

    const createButtons = function(filterPresets, btnClass) {
        let _html = "";
        for (var i = filterPresets.length; i--;) {
            let o = filterPresets[i],
                selected = settings.states[o.key];
            "asw-filter" == btnClass && settings.states.contrast == o.key && (selected = !0), _html += `
                <button class="asw-btn ${btnClass||""} ${selected?"asw-selected":""} ${filterPresets.length == 2 ? "asw-btn-large":""}" aria-pressed="false" data-key="${o.key}">
                    <span class="material-icons"  aria-hidden="true">
                        ${o.icon}
                    </span>
                    <div class="asw-text-noresize reset-this" >
                        ${o.label}
                    </div>
                </button>
            `;
            icons.push(o.icon);
        }
        return _html
    };

    document.currentScript = document.currentScript || (function() {
        var scripts = document.getElementsByTagName('script');
        return scripts[scripts.length - 1];
    })();


    let lang = thisScript.getAttribute("lang");
    const localizationText = thisScript.getAttribute("lang") === "fr" ? fr : en;

    let contentPresets = createButtons([{
            label: localizationText.readableFont,
            key: "readable-font",
            icon: "local_parking"
        }, {
            label: localizationText.highlightLinks,
            key: "highlight-links",
            icon: "link"
        }, {
            label: localizationText.highlightTitle,
            key: "highlight-title",
            icon: "title"
        }])

    let filterPresets = createButtons([{
            label: localizationText.monochrome,
            key: "monochrome",
            icon: "filter_b_and_w"
        }, {
            label: localizationText.lowSaturation,
            key: "low-saturation",
            icon: "gradient"
        }, {
            label: localizationText.highSaturation,
            key: "high-saturation",
            icon: "filter_vintage"
        }, {
            label: localizationText.highContrast,
            key: "high-contrast",
            icon: "tonality"
        }, {
            label: localizationText.lightContrast,
            key: "light-contrast",
            icon: "brightness_5"
        }, {
            label:localizationText.darkContrast,
            key: "dark-contrast",
            icon: "nightlight"
        }], "asw-filter")

    let tools = createButtons([ {
            label: localizationText.stopAnimations,
            key: "stop-animations",
            icon: "motion_photos_off"
        }, {
            label: localizationText.readingGuide,
            key: "readable-guide",
            icon: "local_library"
        }], "asw-tools");

    var accessibilityEl = document.createElement("div");

    const hex2rgb = (hex, alpha = 1) => {
        const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
        return `rgb(${r} ${g} ${b} / ${alpha}%)`;
    };

    const hslToHex = (h, s, l) => {
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        const f = n => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
        };
        return `#${f(0)}${f(8)}${f(4)}`;
    };
    
    let hueOffset = 157;
    var hue = parseInt(thisScript.getAttribute('hue')) || hueOffset; // HSL hue value in degrees (0-360) is read from the hue attribute of the script tag. It defaults to 223 (blue) if not parseable.

    // Sea green, #267D5C, HSL: 157, 53, 32
    // Sea Foam Green, #52AA8A, 158°, 35%, 49%
    // Salmon #ED8474, HSL: 8°, 77%, 69%
    // Deep Carrot Orange, #EC6C27, HSL: 21°, 84%, 54%
    // Maximum Yellow Red #ffcb77, HSL: 37°, 100%, 73%
    // Soft Orange #FCE1B1, HSL: 38°, 93%, 84%

    var barColor =    hslToHex((157 +  hue - hueOffset) % 360, 53, 32); //original: '#0334b1', for top bar color
    let iconColor =   hslToHex((157 +  hue - hueOffset) % 360, 53, 32); // was '#0048ff', for main icon, borders and card selected background
    
    var tileColor =   hslToHex((38 +  hue - hueOffset) % 360, 93, 84); // original: '#ecf3ff', for tile background
    var buttonColor =  hslToHex((157 +  hue - hueOffset) % 360, 53, 32); //was original: '#0648ff' font button color
    var boxShadow1 =  hslToHex((157 +  hue - hueOffset) % 360, 45, 26); // original '#252c61', rgb(37 44 97 / 15%)
    var boxShadow2 =  hslToHex((157 +  hue - hueOffset) % 360, 23, 47); // originsl: '#5d6494', rgb(93 100 148 /20%)
   
    accessibilityEl.innerHTML = `\n        

<link href="https://fonts.googleapis.com/icon?family=Material+Icons&text=${icons.toString()}" rel="stylesheet">        

<style>

    .reset-this {
        animation : none;
        animation-delay : 0;
        animation-direction : normal;
        animation-duration : 0;
        animation-fill-mode : none;
        animation-iteration-count : 1;
        animation-name : none;
        animation-play-state : running;
        animation-timing-function : ease;
        backface-visibility : visible;
        background : 0;
        background-attachment : scroll;
        background-clip : border-box;
        background-color : transparent;
        background-image : none;
        background-origin : padding-box;
        background-position : 0 0;
        background-position-x : 0;
        background-position-y : 0;
        background-repeat : repeat;
        background-size : auto auto;
        border : 0;
        border-style : none;
        border-width : medium;
        border-color : inherit;
        border-bottom : 0;
        border-bottom-color : inherit;
        border-bottom-left-radius : 0;
        border-bottom-right-radius : 0;
        border-bottom-style : none;
        border-bottom-width : medium;
        border-collapse : separate;
        border-image : none;
        border-left : 0;
        border-left-color : inherit;
        border-left-style : none;
        border-left-width : medium;
        border-radius : 0;
        border-right : 0;
        border-right-color : inherit;
        border-right-style : none;
        border-right-width : medium;
        border-spacing : 0;
        border-top : 0;
        border-top-color : inherit;
        border-top-left-radius : 0;
        border-top-right-radius : 0;
        border-top-style : none;
        border-top-width : medium;
        bottom : auto;
        box-shadow : none;
        box-sizing : content-box;
        caption-side : top;
        clear : none;
        clip : auto;
        color : inherit;
        columns : auto;
        column-count : auto;
        column-fill : balance;
        column-gap : normal;
        column-rule : medium none currentColor;
        column-rule-color : currentColor;
        column-rule-style : none;
        column-rule-width : none;
        column-span : 1;
        column-width : auto;
        content : normal;
        counter-increment : none;
        counter-reset : none;
        cursor : auto;
        direction : ltr;
        display : inline;
        empty-cells : show;
        float : none;
        font : normal;
        font-family : inherit;
        font-size : medium;
        font-style : normal;
        font-variant : normal;
        font-weight : normal;
        height : auto;
        hyphens : none;
        left : auto;
        letter-spacing : normal;
        line-height : normal;
        list-style : none;
        list-style-image : none;
        list-style-position : outside;
        list-style-type : disc;
        margin : 0;
        margin-bottom : 0;
        margin-left : 0;
        margin-right : 0;
        margin-top : 0;
        max-height : none;
        max-width : none;
        min-height : 0;
        min-width : 0;
        opacity : 1;
        orphans : 0;
        outline : 0;
        outline-color : invert;
        outline-style : none;
        outline-width : medium;
        overflow : visible;
        overflow-x : visible;
        overflow-y : visible;
        padding : 0;
        padding-bottom : 0;
        padding-left : 0;
        padding-right : 0;
        padding-top : 0;
        page-break-after : auto;
        page-break-before : auto;
        page-break-inside : auto;
        perspective : none;
        perspective-origin : 50% 50%;
        position : static;
        right : auto;
        tab-size : 8;
        table-layout : auto;
        text-align : inherit;
        text-align-last : auto;
        text-decoration : none;
        text-decoration-color : inherit;
        text-decoration-line : none;
        text-decoration-style : solid;
        text-indent : 0;
        text-shadow : none;
        text-transform : none;
        top : auto;
        transform : none;
        transform-style : flat;
        transition : none;
        transition-delay : 0s;
        transition-duration : 0s;
        transition-property : none;
        transition-timing-function : ease;
        unicode-bidi : normal;
        vertical-align : baseline;
        visibility : visible;
        white-space : normal;
        widows : 0;
        width : auto;
        word-spacing : normal;
        z-index : auto;
        /* basic modern patch */
        all: initial;
        all: unset;
    }

    .asw-widget {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        font-family: Lato,sans-serif;
        font-weight: 400;
        -webkit-font-smoothing: antialiased;
    }

    .asw-widget * {
        box-sizing: border-box;
    }

    .counterclockwise-text {

        /* Chrome/Safari */
        -webkit-transform: rotate(-90deg);
        -webkit-transform-origin: 50% 50%;
        
        /* Firefox */
        -moz-transform: rotate(-90deg); 
        -moz-transform-origin: 50% 50%;
        
        /* IE9 */
        -ms-transform: rotate(-90deg);
        -ms-transform-origin: 50% 50%;
        
        /* IE10 and other modern browsers that do not need vendor prefixes */
        transform: rotate(-90deg);
        transform-origin: 50% 50%;
        
        /* IE8 */
        filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);
        
        /* IE7 or less */
        *zoom: 1;
        *writing-mode: tb-rl;
        *filter: flipv fliph;
        
        }

    .asw-menu-btn {
        border: 2px solid white;
        border-left:0;
        position: fixed;
        z-index: 500000;
        top: 15vh;
        background: ${iconColor};
        box-shadow: 0 5px 15px 0 ${hex2rgb(boxShadow1, 15)}, 0 2px 4px 0 ${hex2rgb(boxShadow2, 20)};
        transition: .3s;
        color: white;

        font-size: 11px;
        font-weight: bold;

        white-space: nowrap;
        align-items: center;
        justify-content: center;
        transform: translateY(0);
        padding: 4px;
        width: 28px;
        height: 50px;

        display: flex;
        fill: white;
        cursor: pointer;
    }

    .asw-menu-btn !important { 
        background: transparent !important;
    }

    .asw-menu-btn:focus-visible {
        outline-style:none;
        border:none;
        background-image: linear-gradient(to right, white 0% 25%, black 25% 50%, white 50% 75%, black 75% 100%), linear-gradient(to right, white 0% 25%, black 25% 50%, white 50% 75%, black 75% 100%), linear-gradient(to bottom, black 25%, white 25% 50%, black 50% 75%, white 75% 100%),  linear-gradient(to bottom, black 25%, white 25% 50%, black 50% 75%, white 75% 100%);
        color: #fff;
        background-size: 20px 2px, 20px 2px, 2px 20px, 2px 20px;
        background-position: 0 0, 0 100%, 0 0, 100% 0;
        background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
        -webkit-transition: none !important;
        -moz-transition: none !important;
        -o-transition: none !important;
        transition: none !important;
    }

    .asw-menu-btn:hover {
        transform: scale(1.05);
    }

    .asw-menu {
        display: none;
        position: fixed;
        left: 48px;
        top: 20px;
        border-radius: 8px;
        box-shadow: -1px 0 20px -14px #000;
        opacity: 1;
        transition: .3s;
        z-index: 500000;
        overflow: hidden;
        background: #fff;
        width: 500px;
        line-height: 1;
        font-size: 14px;
        height: calc(100% - 40px );
        letter-spacing: 0.015em;
    }

    .asw-menu-reset,
    .asw-menu-close {
        border: none;
        font: inherit;
        color: inherit;
        background: none
    }

    .asw-menu-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: ${barColor};
        color: white;
        padding-left: 12px;
        font-weight: 600;
    }

    .asw-menu-header > div {
        display: flex;
    }
    
    .asw-menu-header button {
        padding: 12px;
    }

    .asw-menu-header button:hover {
        opacity: 0.8;
    }

    .asw-items {
        display: flex;
        margin: -8px;
        padding: 0;
        list-style: none;
        flex-wrap: wrap;
    }

    .asw-btn {
        width: 140px;
        height: 120px;
        border-radius: 8px;
        margin: 8px;
        padding: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        color: #333;
        font-size: 14px !important;
        background: ${tileColor};
        border: 3px solid ${tileColor};
        transition: background-color 0.3s ease;
        line-height:1.3;
    }

    .asw-btn-large {
        width: 218px;
    }
        
    .asw-btn .material-icons {
        margin-bottom: 16px;
    }

    .asw-btn:hover {
        border-color: ${iconColor};
    }

    .asw-btn.asw-selected {
        background: ${iconColor};
        color: white;
        border-color: ${iconColor};
    }

    .asw-footer {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: ${barColor};
        padding: 16px;
        text-align: center;
        color: #FFF;
    }

    .asw-footer a {
        font-size: 14px !important;
        text-decoration: underline;
        color: #FFF;
    }

    .asw-plus:hover,
    .asw-minus:hover {
        opacity: 0.8;
    }

    .asw-menu-content {
        overflow: scroll;
        max-height: calc(100% - 80px);
    }


    .asw-card {
        margin: 0 15px 30px;
    }

    .asw-card-title {
        font-size: 18px;
        padding: 15px 0;
    }

    .asw-adjust-font {
        background: ${tileColor};
        padding: 20px 25px;
        margin-bottom: 16px;
    }

    .asw-adjust-font label {
        display: flex;
        align-items: center;
    }

    .asw-adjust-font > div {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        align-items: center;
        font-size: 16px;
        font-weight: 700;
    }

    .asw-adjust-font button {
        background: ${buttonColor};
        border-radius: 50%;
        border: none;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
    }

    .asw-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: none;
    }

    @media screen only and (max-aspect-ratio: 1) and (min-width:1000px) {
        .asw-menu-btn {
            width: 5vw;
        }   
    }
       


    @media only screen and (max-height: 500px)  {
        .asw-menu-content {
            overflow: scroll;
            max-height: 100%;
        }

        .asw-footer {
            padding:0px;
            display:none; !important;
        }

    }

    @media (max-width: 550px) {
        .asw-menu {
            width: calc(100% -  33px - 15px - 16px);
        }
    }

    @media only screen and (max-height: 900px)  {
        .asw-menu-btn {
            border: 2px solid white;
            border-left:0;

            width: 26px;
        }

        .asw-menu {
            left: 33px;
            top: 5vh;
            width: 485px;
            height: calc(100% - 10%);
            margin-top: 0px;
        }

        @media (max-width: 550px) {
            .asw-menu {
                width: calc(100% -  33px - 17px);
            }
        }
    }

    @media only screen and (max-height: 700px)  {
        .asw-menu-btn {
            padding: 1px 3px;
            border: 2px solid white;
            border-left:0;
            width: 21px;
        }

        .asw-menu {
            left: 33px;
            top: 2.5vh;
            width: 400px;
            height: calc(100% - 5%);
            margin-top: 0px;
        }

        @media (max-width: 500px) {
            .asw-menu {
                width: calc(100% -  33px - 15px);
            }
        }

        .asw-menu-header button {
            padding: 6px;
        }
    }

    @media only screen and (max-height: 450px)  {
        .asw-menu-btn {
            padding: 1px 1px;
            border: 1px solid white;
            border-left:0;

            width: 16px;
        }
        
        .asw-menu {
            left: 20px;
            top: 2.5vh;
            width: calc(80%  - 20px );
            height: calc(100% - 5%);
            margin-top: 0px;
        }

        @media (max-width: 350px) {
            .asw-menu {
                width: calc(100% - 9px - 20px );
            }
        }

        .asw-menu-header button {
            padding: 4px;
        }
    }

    @media only screen and (max-height: 250px)  {
        .asw-menu-btn {
            padding: 0px 0px;
            border: 1px solid white;
            border-left:0;
            top: 2.5px;

            width: 15px;
        }

        .asw-menu {
            left: 20px;
            top: 2.5vh;
            width: calc(100% - 20px );
            height: calc(100% - 5%);
            margin-top: 0px;
        }

        .asw-menu-header button {
            font-size: 8px;
            padding: 2px;
        }
    }

</style>
        
        <div class="asw-widget">            
            <button tabindex="0" class="asw-menu-btn" title="${localizationText.openDisplayPreferences}" aria-expanded="false">                
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="34px" height="34px">
                    <path d="M0 0h24v24H0V0z" fill="none"/><path d="M20.5 6c-2.61.7-5.67 1-8.5 1s-5.89-.3-8.5-1L3 8c1.86.5 4 .83 6 1v13h2v-6h2v6h2V9c2-.17 4.14-.5 6-1l-.5-2zM12 6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
                </svg>
            </button>    
            <div class="asw-menu">                
                <div class="asw-menu-header">
                    ${localizationText.displayPreferences}
                    <div>
                        <button class="asw-menu-reset" aria-label="${localizationText.resetSettings}" title="${localizationText.resetSettings}">
                            <span class="material-icons" aria-hidden="true">
                                restart_alt
                            </span>
                        </button>
                        <button class="asw-menu-close" aria-label="${localizationText.closeDisplayPreferences}" title="${localizationText.closeDisplayPreferences}">
                            <span class="material-icons" aria-hidden="true">
                                close
                            </span>
                        </button>
                    </div>
                </div>
                <div class="asw-menu-content">
                    <div class="asw-card" style="margin-top: 15px;">
                        <h2 class="asw-card-title">
                            ${localizationText.tools}
                        </h2>
                        <div class="asw-items">
                            ${tools}
                        </div>
                    </div>
                    <div class="asw-card" style="margin-top: 15px;">
                        <h2 class="asw-card-title">
                            ${localizationText.contentAdjustments}
                        </h2>
                        <div class="asw-adjust-font">
                            <label>
                                <span class="material-icons" style="margin-right:8px;">
                                    format_size
                                </span>
                                ${localizationText.adjustFontSize}
                            </label>
                            <div>
                                <button class="asw-minus" data-key="font-size" aria-pressed="false" title="${localizationText.decreaseFontSize}">
                                    <span class="material-icons" aria-hidden="true">
                                        remove
                                    </span>
                                </button>
                                <div class="asw-amount">
                                    ${settings.states.fontSize&&1!=settings.states.fontSize ? parseInt(100*settings.states.fontSize) : localizationText.default}
                                </div>
                                <button class="asw-plus" data-key="font-size" aria-pressed="false" title="${localizationText.increaseFontSize}">
                                    <span class="material-icons" aria-hidden="true">
                                        add
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div class="asw-items">
                            ${contentPresets}
                        </div>
                    </div>
                    <div class="asw-card" style="margin-top: 15px;">
                        <h2 class="asw-card-title">
                            ${localizationText.colorAdjustments}
                        </h2>
                        <div class="asw-items">
                            ${filterPresets}
                        </div>
                    </div>
                </div>
                <div class="asw-footer">
                    <!--  Accessibility  Widget by <a href="https://bennyluk.github.io/Sienna-Accessibility-Widget/">Sienna</a>  -->
                </div>
            </div>
            <div class="asw-overlay">
            </div>
        </div>`;


    const addStyleSheet = function(css, id) {
        let style = document.getElementById(id || "") || document.createElement("style");
        style.innerHTML = css, style.id || (style.id = id, document.head.appendChild(style))
    }

    const getFilterCSS = function(filter, cssProp) {
        let e = "",
            a = ["-o-", "-ms-", "-moz-", "-webkit", ""];
        for (var s = a.length; s--;) e += a[s] + (cssProp || "filter") + ":" + filter + ";";
        return e
    }

    const changeFilter = function(key) {
        let t = "";
        if (key) {
            let _css = "";
            "dark-contrast" == key ?
                _css = "color: #fff !important;fill: #FFF !important;background-color: #000 !important;" : 
            "light-contrast" == key ? 
                _css = " color: #000 !important;fill: #000 !important;background-color: #FFF !important;" : 
            "high-contrast" == key ?
                 _css += getFilterCSS("contrast(125%)") : 
            "high-saturation" == key ? 
                _css += getFilterCSS("saturate(200%)") : 
            "low-saturation" == key ?
                _css += getFilterCSS("saturate(50%)") : 
            "monochrome" == key && (_css += getFilterCSS("grayscale(100%)"));

            let childrenSelector = [""];
            "dark-contrast" != key && "light-contrast" != key || (childrenSelector = ["h1", "h2", "h3", "h4", "h5", "h6", "img", "p", "i", "svg", "a", "label", "li", "ol"]);
            
            for (var e = childrenSelector.length; e--;)  {
                t += '[data-asw-filter="' + key + '"] ' + childrenSelector[e] + "{" + _css + "}"
            }
        }
        
        addStyleSheet(t, "asw-filter-style")
        
        key ? document.documentElement.setAttribute("data-asw-filter", key) : document.documentElement.removeAttribute("data-asw-filter", key)
    } 
    const changeControls = function() {
        let styles = [{
                id: "highlight-title",
                childrenSelector: ["h1", "h2", "h3", "h4", "h5", "h6"],
                css: `outline: 2px solid ${iconColor} !important;outline-offset: 2px !important;`
            }, {
                id: "highlight-links",
                childrenSelector: ["a[href]"],
                css: `outline: 2px solid ${iconColor} !important;outline-offset: 2px !important;`
            }, {
                id: "readable-font",
                childrenSelector: ["", "h1", "h2", "h3", "h4", "h5", "h6", "img", "p", "i", "svg", "a", "button", "label", "li", "ol"],
                css: "font-family: Arial,Helvetica,sans-serif !important;"
            }];

        css = "";

        for (var a = styles.length; a--;) {
            let style = styles[a];
            if (document.documentElement.classList.toggle(style.id, !!settings.states[style.id]), settings.states[style.id]) {
                for (var s = style.childrenSelector.length; s--;)  {
                    css += "." + style.id + " " + style.childrenSelector[s] + "{" + style.css + "}"
                }

            }
        }

        var rgs = document.querySelector(".asw-rg-container");
        if (settings.states["readable-guide"]) {
            if (!rgs) {
                var rgEl = document.createElement("div");
                rgEl.setAttribute("class", "asw-rg-container")
                rgEl.innerHTML = `
                    <style>
                        .asw-rg {
                            position: fixed;
                            top: 0;
                            left: 0;
                            right: 0;
                            width: 100%;
                            height: 0;
                            pointer-events: none;
                            background-color: rgba(0,0,0,.5);
                            z-index: 1000000;
                        }
                    </style>
                    <div class="asw-rg asw-rg-top"></div>
                    <div class="asw-rg asw-rg-bottom" style="top: auto;bottom: 0;"></div>
                `;

                let rgTop = rgEl.querySelector(".asw-rg-top")
                let rgBottom = rgEl.querySelector(".asw-rg-bottom")
                let margin = 20;

                window.onScrollReadableGuide = function(event) {
                    rgTop.style.height = event.clientY - margin + "px"
                    rgBottom.style.height = window.innerHeight - event.clientY - margin - margin + "px"
                }
                
                document.addEventListener("mousemove", window.onScrollReadableGuide, false)
                document.body.appendChild(rgEl)
            }

        } else rgs && (rgs.remove(), document.removeEventListener("mousemove", window.onScrollReadableGuide));

        settings.states["stop-animations"] && (css += `\n
                        body * {\n
                            ${getFilterCSS("none !important","transition")}\n
                            ${getFilterCSS("forwards !important","animation-fill-mode")}\n
                            ${getFilterCSS("1 !important"," animation-iteration-count")}\n
                            ${getFilterCSS(".01s !important","animation-duration")}\n
                    }\n
                    `),
        //n.states["big-cursor"] && (e += "\n body * {\n                    cursor: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 512 512'%3E%3Cpath  d='M429.742 319.31L82.49 0l-.231 471.744 105.375-100.826 61.89 141.083 96.559-42.358-61.89-141.083 145.549-9.25zM306.563 454.222l-41.62 18.259-67.066-152.879-85.589 81.894.164-333.193 245.264 225.529-118.219 7.512 67.066 152.878z' xmlns='http://www.w3.org/2000/svg'/%3E%3C/svg%3E\") ,default !important;\n                }\n            "),
        addStyleSheet(css, "asw-content-style")
    };

    var clickItem = function(event) {
        event.preventDefault();
        let target = event.currentTarget,
            key = target.dataset.key;

        if(target.classList.contains("asw-filter")) {
            document.querySelectorAll(".asw-filter").forEach(function(items) {
                items.classList.remove("asw-selected")
                items.setAttribute("aria-pressed", "false")
            });

            settings.states.contrast = settings.states.contrast !== key && key
            
            if(settings.states.contrast) {
                target.classList.add("asw-selected")
                target.setAttribute("aria-pressed", "true");
            }

            changeFilter(settings.states.contrast);

        } else {
            settings.states[key] = !settings.states[key];
            target.classList.toggle("asw-selected", settings.states[key]);
            target.setAttribute("aria-pressed", settings.states[key] ? "true" : "false");

            changeControls();
        }

        saveSettings();
    };

    const changeFont = function(event, newValue) {
        let target = false;

        if(!newValue && event) {
            target = event.currentTarget;
            newValue = parseFloat(settings.states.fontSize) || 1;
            target.classList.contains("asw-minus") ? newValue -= .1 : newValue += .1;
            newValue = Math.max(newValue, .1);
            newValue = Math.min(newValue, 2);
            newValue = parseFloat(newValue.toFixed(2))
        }

        let text = document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,a,dl,dt,li,ol,th,td,span");
        text.forEach(function(textItem) {
            if (!textItem.classList.contains("material-icons") && !textItem.classList.contains("asw-text-noresize") ) {
                let orgFontSize = textItem.getAttribute("data-asw-orgFontSize");
                if(!orgFontSize) {
                    orgFontSize = parseInt(window.getComputedStyle(textItem, null).getPropertyValue("font-size"))
                    textItem.setAttribute("data-asw-orgFontSize", orgFontSize)
                }
        
                let newFontSize = orgFontSize * newValue;
                textItem.style["font-size"] = newFontSize + "px"
            }
        });

        let label = localizationText.default;

        if(newValue !== 1) {
            if(newValue > 1) {
                label = '+';
            } else if(newValue < 1) {
                label = '-';
            }
            label += parseInt(newValue * 100) + '%';
        }

        if(target) {
            target.parentElement.querySelector('.asw-amount').innerHTML = label;
        }

        settings.states['fontSize'] = newValue;
        
        saveSettings();
    };

    const resetSettings = function() {
        settings.states = {};
        changeFilter();
        changeControls();
        changeFont(undefined, 1);

        document.querySelectorAll(".asw-btn").forEach(function(item) {
            item.classList.remove("asw-selected");
            item.setAttribute("aria-pressed", "false");
        })
        
        document.querySelectorAll(".asw-amount").forEach(function(item) {
            item.innerHTML = localizationText.default;
        });

        saveSettings();
    };

    

    let menu = accessibilityEl.querySelector(".asw-menu");
    let menucontent = accessibilityEl.querySelector(".asw-card");
    let overlay = accessibilityEl.querySelector(".asw-overlay");

    const isMenuOpen = () => {
        return !(menu.style.display === "" || menu.style.display === undefined || menu.style.display === "none")
    }

    const closeMenu = () => {
        menu.style.display = "none";
        document.body.style.overflow = "auto"; 
        overlay.style.display = "none";
    }

    const openMenu = () => {
        menu.style.display = "block";
        document.body.style.overflow = "hidden"; 
        overlay.style.display = "block";
    }

    accessibilityEl.querySelector(".asw-menu-btn").addEventListener("click", function() {
        isMenuOpen() ? closeMenu() : openMenu();
    }, false);
    
    menu.querySelector(".asw-menu-close").addEventListener("click", function() {
        closeMenu();
    }, false);
    
    overlay.addEventListener("click", function() {
        closeMenu();
    }, false);
    
    menu.querySelector(".asw-menu-reset").addEventListener("click", resetSettings, false);
    
    menu.querySelectorAll(".asw-btn").forEach(function(n) {
        n.addEventListener("click", clickItem, false)
    });
    
    menu.querySelectorAll(".asw-adjust-font button").forEach(function(n) {
        n.addEventListener("click", changeFont, false)
    });

    const  focusableElements =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';


    const firstFocusableElement = menu.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
    const focusableContent = menu.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get
    const scrollableMenu = menu.querySelector(".asw-menu-content");

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenu();
        }

        if (isMenuOpen()) {
            if (e.key === "ArrowUp" ) { 
                scrollableMenu.scrollBy({top: -60, behavior: 'smooth'}); 
                e.preventDefault();
            } else if (e.key === "ArrowDown") {
                scrollableMenu.scrollBy({top: 60, behavior: 'smooth'}); 
                e.preventDefault();
            }
        }

        let isTabPressed = e.key === 'Tab' || e.keyCode === 9;
        
        if(!isTabPressed) {
            return;
        }

        if (e.shiftKey) { // if shift key pressed for shift + tab combination
            if (document.activeElement === firstFocusableElement) {
              lastFocusableElement.focus(); // add focus for the last focusable element
              e.preventDefault();
            }
          } else { // if tab key is pressed
            if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
              firstFocusableElement.focus(); // add focus for the first focusable element
              e.preventDefault();
            }
          }

        
    });

    // document.body.appendChild(accessibilityEl)
   
    document.body.prepend(accessibilityEl);
   
    // changeFont(null, 1)

    if(getCookie) {
        changeControls();
        changeFont(null, settings.states.fontSize || 1);
        if(settings.states.contrast) {
            changeFilter(settings.states.contrast);
        }

    }
};

document.addEventListener("DOMContentLoaded", init);