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
            console.log("saving settings:" + cookieText );
            document.cookie = cookieText
            
        }("asw", JSON.stringify(settings))
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
            "asw-filter" == btnClass && settings.states.contrast == o.key && (selected = !0), _html += `\n                <button class="asw-btn ${btnClass||""} ${selected?"asw-selected":""}" role="button" aria-pressed="false" data-key="${o.key}" arai-label="${o.label}" title="${o.label}" >\n                    <span class="material-icons">${o.icon}</span>\n                    ${o.label}\n                </button>\n            \n            `, icons.push(o.icon)
        }
        return _html
    };

    document.currentScript = document.currentScript || (function() {
        var scripts = document.getElementsByTagName('script');
        return scripts[scripts.length - 1];
    })();

    let contentPresets = createButtons([{
            label: "Readable Font",
            key: "readable-font",
            icon: "local_parking"
        }, {
            label: "Highlight Links",
            key: "highlight-links",
            icon: "link"
        }, {
            label: "Highlight Title",
            key: "highlight-title",
            icon: "title"
        }])

    let filterPresets = createButtons([{
            label: "Monochrome",
            key: "monochrome",
            icon: "filter_b_and_w"
        }, {
            label: "Low Saturation",
            key: "low-saturation",
            icon: "gradient"
        }, {
            label: "High Saturation",
            key: "high-saturation",
            icon: "filter_vintage"
        }, {
            label: "High Contrast",
            key: "high-contrast",
            icon: "tonality"
        }, {
            label: "Light Contrast",
            key: "light-contrast",
            icon: "brightness_5"
        }, {
            label: "Dark Contrast",
            key: "dark-contrast",
            icon: "nightlight"
        }], "asw-filter")

    let tools = createButtons([ {
            label: "Stop Animations",
            key: "stop-animations",
            icon: "motion_photos_off"
        }, {
            label: "Reading Guide",
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
    var buttonColor =  hslToHex((8 +  hue - hueOffset) % 360, 77, 69); //was original: '#0648ff' font button color
    var boxShadow1 =  hslToHex((157 +  hue - hueOffset) % 360, 45, 26); // original '#252c61', rgb(37 44 97 / 15%)
    var boxShadow2 =  hslToHex((157 +  hue - hueOffset) % 360, 23, 47); // originsl: '#5d6494', rgb(93 100 148 /20%)
   
    accessibilityEl.innerHTML = `\n        

<link href="https://fonts.googleapis.com/icon?family=Material+Icons&text=${icons.toString()}" rel="stylesheet">        

<style>
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

    .asw-menu-btn {
        border:3px solid white;
        position: fixed;
        z-index: 500000;
        left: 20px;
        bottom: 20px;
        background: ${iconColor};
        box-shadow: 0 5px 15px 0 ${hex2rgb(boxShadow1, 15)}, 0 2px 4px 0 ${hex2rgb(boxShadow2, 20)};
        transition: .3s;
        border-radius: 50%;
        align-items: center;
        justify-content: center;
        transform: translateY(0);
        width: 64px;
        height: 64px;
        max-width: 5vw;
        max-height: 5vw;
        min-width: 9px;
        min-height: 9px;
        display: flex;
        fill: white;
        cursor: pointer;
    }

    .asw-menu-btn !important { 
        background: transparent !important;
    }

    .asw-menu-btn:hover {
        transform: scale(1.05);
    }

    .asw-menu {
        display: none;
        position: fixed;
        left: 20px;
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
        height: calc(100% - 40px - 75px);
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
    
    .asw-menu-header button[role="button"] {
        padding: 12px;
    }

    .asw-menu-header button[role="button"]:hover {
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

    .asw-adjust-font button[role="button"] {
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

    @media only screen and (max-width: 550px) {
        .asw-menu {
            width: calc(100vw - 20px);
            left: 10px;
        }

        .asw-btn {
            width: calc(25% + 12px);
            margin: 4px;
        }
    }
    @media only screen and (max-width: 1000px) {

        @media (min-width: 451px) {
            .asw-menu-btn {
                border:2px solid white;
                left: 7px;
                bottom: 7px;
                padding: 1px 3px;
            }
    
            .asw-menu {
                height: calc(100% - 35px - 4vw);
                left: 15px;
                top: 12px;
            }
        }

        .asw-menu-btn {
            box-shadow: 0 2px 5px 0 ${hex2rgb(boxShadow1, 15)}, 0 1px 2px 0 ${hex2rgb(boxShadow2, 20)};
        }
        .asw-menu-content {
            overflow: scroll;
            max-height: 100%;
        }

        .asw-footer {
            padding:0px;
            display:none; !important;
        }

        .asw-menu-header button[role="button"] {
            padding: 8px;
        }
    }

    @media only screen and (max-width: 450px) and  (min-width: 301px)  {
        .asw-menu-btn {
            border:1px solid white;
            left: 5px;
            bottom: 5px;
            padding: 1px 3px;
        }

        .asw-menu {
            height: calc(100% - 22px - 4vw);
            top: 5px;
            left: 10px;
        }

        .asw-menu-header button[role="button"] {
            padding: 4px;
        }
    }

    @media  (max-width: 300px){
        .asw-menu-btn {
            border:1px solid white;
            left: 4px;
            bottom: 4px;
            padding: 1px 1px;
        }

        .asw-menu {
            height: calc(100% - 16px - 4vw );
            top: 5px;
            left: 8px;
        }

        .asw-menu-header button[role="button"] {
            padding: 4px;
        }
    }

</style>
        
        <div class="asw-widget">            
            <button class="asw-menu-btn" title="Open Accessibility Menu" role="button" aria-expanded="false">                
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="34px" height="34px">
                    <path d="M0 0h24v24H0V0z" fill="none"/><path d="M20.5 6c-2.61.7-5.67 1-8.5 1s-5.89-.3-8.5-1L3 8c1.86.5 4 .83 6 1v13h2v-6h2v6h2V9c2-.17 4.14-.5 6-1l-.5-2zM12 6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
                </svg>
            </button>    
            <div class="asw-menu">                
                <div class="asw-menu-header">
                    Accessibility Menu
                    <div>
                        <button role="button" class="asw-menu-reset"  title="Reset Settings">
                            <span class="material-icons">
                                restart_alt
                            </span>
                        </button>
                        <button role="button" class="asw-menu-close" title="Close Accessibility Menu">
                            <span class="material-icons">
                                close
                            </span>
                        </button>
                    </div>
                </div>
                <div class="asw-menu-content">
                    <div class="asw-card" style="margin-top: 15px;">
                        <div class="asw-card-title">
                            Content Adjustments
                        </div>
                        <div class="asw-adjust-font">
                            <label>
                                <span class="material-icons" style="margin-right:8px;">
                                    format_size
                                </span>
                                Adjust Font Size
                            </label>
                            <div>
                                <button class="asw-minus" data-key="font-size" role="button" aria-pressed="false">
                                    <span class="material-icons">
                                        remove
                                    </span>
                                </button>
                                <div class="asw-amount">
                                    ${settings.states.fontSize&&1!=settings.states.fontSize?`${parseInt(100*settings.states.fontSize)}%`:"Default"}
                                </div>
                                <button class="asw-plus" data-key="font-size" role="button" aria-pressed="false">
                                    <span class="material-icons">
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
                        <div class="asw-card-title">
                            Color Adjustments
                        </div>
                        <div class="asw-items">
                            ${filterPresets}
                        </div>
                    </div>
                    <div class="asw-card" style="margin-top: 15px;">
                        <div class="asw-card-title">
                            Tools
                        </div>
                        <div class="asw-items">
                            ${tools}
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
            if (!textItem.classList.contains("material-icons")) {
                let orgFontSize = textItem.getAttribute("data-asw-orgFontSize");
                if(!orgFontSize) {
                    orgFontSize = parseInt(window.getComputedStyle(textItem, null).getPropertyValue("font-size"))
                    textItem.setAttribute("data-asw-orgFontSize", orgFontSize)
                }
        
                let newFontSize = orgFontSize * newValue;
                textItem.style["font-size"] = newFontSize + "px"
            }
        });

        let label = "Default";

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
            item.innerHTML = "Default";
        });

        saveSettings();
    };

    let menu = accessibilityEl.querySelector(".asw-menu");
    let overlay = accessibilityEl.querySelector(".asw-overlay");

    accessibilityEl.querySelector(".asw-menu-btn").addEventListener("click", function() {
        menu.style.display = "block" == menu.style.display ? "none" : "block";
        overlay.style.display = menu.style.display;
    }, false);
    
    menu.querySelector(".asw-menu-close").addEventListener("click", function() {
        menu.style.display = "none";
         overlay.style.display = menu.style.display;
    }, false);
    
    overlay.addEventListener("click", function() {
        menu.style.display = "none";
        overlay.style.display = menu.style.display;
    }, false);
    
    menu.querySelector(".asw-menu-reset").addEventListener("click", resetSettings, false);
    
    menu.querySelectorAll(".asw-btn").forEach(function(n) {
        n.addEventListener("click", clickItem, false)
    });
    
    menu.querySelectorAll(".asw-adjust-font button[role='button']").forEach(function(n) {
        n.addEventListener("click", changeFont, false)
    });
    
    menu.querySelectorAll(".asw-adjust-font div[role='button']").forEach(function(n) {
        n.addEventListener("click", changeFont, false)
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            menu.style.display = "none", overlay.style.display = menu.style.display
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