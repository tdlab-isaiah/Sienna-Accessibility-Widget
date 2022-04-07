var thisScript = document.currentScript || (function() {
    var scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
})(); 
var init = function() {
    let n = {
        states: {}
    };
    const t = function() {
        ! function(n, t, e) {
            const a = new Date;
            a.setTime(a.getTime() + 24 * e * 60 * 60 * 1e3);
            let s = "expires=" + a.toUTCString();
            document.cookie = n + "=" + t + ";" + s + ";path=/"
        }("asw", JSON.stringify(n))
    };
    let e = function(n) {
        let t = n + "=",
            e = decodeURIComponent(document.cookie).split(";");
        for (let n = 0; n < e.length; n++) {
            let a = e[n];
            for (;
                " " == a.charAt(0);) a = a.substring(1);
            if (0 == a.indexOf(t)) return a.substring(t.length, a.length)
        }
        return ""
    }("asw");
    try {
        e = JSON.parse(e)
    } catch (n) {}
    n = {
        states: {},
        ...e
    };
    let a = ["format_size", "add", "remove", "restart_alt", "close"];
    const s = function(t, e) {
        let s = "";
        for (var i = t.length; i--;) {
            let o = t[i],
                l = n.states[o.key];
            "asw-filter" == e && n.states.contrast == o.key && (l = !0), s += `\n                <div class="asw-btn ${e||""} ${l?"asw-selected":""}" role="button" aria-pressed="false" data-key="${o.key}" arai-label="${o.label}" title="${o.label}" >\n                    <span class="material-icons">${o.icon}</span>\n                    ${o.label}\n                </div>\n            \n            `, a.push(o.icon)
        }
        return s
    };
    document.currentScript = document.currentScript || (function() {
        var scripts = document.getElementsByTagName('script');
        return scripts[scripts.length - 1];
    })();
    let i = s([{
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
        }]),
        o = s([{
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
        }], "asw-filter"),
        l = s([{
            label: "Big Cursor",
            key: "big-cursor",
            icon: "mouse"
        }, {
            label: "Stop Animations",
            key: "stop-animations",
            icon: "motion_photos_off"
        }, {
            label: "Reading Guide",
            key: "readable-guide",
            icon: "local_library"
        }], "asw-tools");
    var r = document.createElement("div");
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
   
    r.innerHTML = `\n        <link href="https://fonts.googleapis.com/icon?family=Material+Icons&text=${a.toString()}" rel="stylesheet">\n        <style>\n            .asw-widget {\n                -webkit-user-select: none;\n                -moz-user-select: none;\n                -ms-user-select: none;\n                user-select: none;\n                font-family: Lato,sans-serif;\n                font-weight: 400;\n                -webkit-font-smoothing: antialiased;\n            }\n\n            .asw-widget * {\n                box-sizing: border-box;\n            }\n\n            .asw-menu-btn {\n     border:3px solid white;\n position: fixed;\n                z-index: 500000;\n                left: 20px;\n                bottom: 20px;\n                background: ${iconColor};\n                box-shadow: 0 5px 15px 0 ${hex2rgb(boxShadow1, 15)}, 0 2px 4px 0 ${hex2rgb(boxShadow2, 20)};\n                transition: .3s;\n                border-radius: 50%;\n                align-items: center;\n                justify-content: center;\n                transform: translateY(0);\n                width: 64px;\n                height: 64px;\n                display: flex;\n                fill: white;\n                cursor: pointer;\n            }\n\n            .asw-menu-btn !important { \n                background: transparent !important;\n            }\n\n            .asw-menu-btn:hover {\n                transform: scale(1.05);\n            }\n\n            .asw-menu {\n                display: none;\n                position: fixed;\n                left: 20px;\n                top: 20px;\n                border-radius: 8px;\n                box-shadow: -1px 0 20px -14px #000;\n                opacity: 1;\n                transition: .3s;\n                z-index: 500000;\n                overflow: hidden;\n                background: #fff;\n                width: 500px;\n                line-height: 1;\n                font-size: 14px;\n                height: calc(100% - 40px - 75px);\n                letter-spacing: 0.015em;\n            }\n\n            .asw-menu-header {\n                display: flex;\n                align-items: center;\n                justify-content: space-between;\n                background: ${barColor};\n                color: white;\n                padding-left: 12px;\n                font-weight: 600;\n            }\n\n            .asw-menu-header > div {\n                display: flex;\n            }\n\n            .asw-menu-header div[role="button"] {\n                padding: 12px;\n            }\n\n            .asw-menu-header div[role="button"]:hover {\n                opacity: 0.8;\n            }\n\n            .asw-items {\n                display: flex;\n                margin: -8px;\n                padding: 0;\n                list-style: none;\n                flex-wrap: wrap;\n            }\n\n            .asw-btn {\n                width: 140px;\n                height: 120px;\n                border-radius: 8px;\n                margin: 8px;\n                padding: 15px;\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                flex-direction: column;\n                text-align: center;\n                color: #333;\n                font-size: 14px !important;\n                background: ${tileColor};\n                border: 3px solid ${tileColor};\n                transition: background-color 0.3s ease;\n                line-height:1.3;\n            }\n\n            .asw-btn .material-icons {\n                margin-bottom: 16px;\n            }\n\n            .asw-btn:hover {\n                border-color: ${iconColor};\n            }\n            \n            .asw-btn.asw-selected {\n                background: ${iconColor};\n                color: white;\n                border-color: ${iconColor};\n            }\n\n            .asw-footer {\n                position: absolute;\n                bottom: 0;\n                left: 0;\n                right: 0;\n                background: ${barColor};\n                padding: 16px;\n                text-align: center;\n                color: #FFF;\n            }\n\n            .asw-footer a {\n                font-size: 14px !important;\n                text-decoration: underline;\n                color: #FFF;\n            }\n\n            .asw-plus:hover,\n            .asw-minus:hover {\n                opacity: 0.8;\n            }\n\n            .asw-menu-content {\n                overflow: scroll;\n                max-height: calc(100% - 80px);\n            }\n\n            \n            .asw-card {\n                margin: 0 15px 30px;\n            }\n\n            .asw-card-title {\n                font-size: 18px;\n                padding: 15px 0;\n            }\n\n            .asw-adjust-font {\n                background: ${tileColor};\n                padding: 20px 25px;\n                margin-bottom: 16px;\n            }\n\n            .asw-adjust-font label {\n                display: flex;\n                align-items: center;\n            }\n\n            .asw-adjust-font > div {\n                display: flex;\n                justify-content: space-between;\n                margin-top: 20px;\n                align-items: center;\n                font-size: 16px;\n                font-weight: 700;\n            }\n\n            .asw-adjust-font div[role="button"] {\n                background: ${buttonColor};\n                border-radius: 50%;\n                width: 36px;\n                height: 36px;\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                color: white;\n            }\n\n            .asw-overlay {\n                position: fixed;\n                top: 0;\n                left: 0;\n                width: 100%;\n                height: 100%;\n                z-index: 10000;\n                display: none;\n            }\n\n            @media only screen and (max-width: 550px) {\n                .asw-menu {\n                    width: calc(100vw - 20px);\n                    left: 10px;\n                }\n\n                .asw-btn {\n                    width: calc(25% + 12px);\n                    margin: 4px;\n                }\n              }\n        </style>\n\n        <div class="asw-widget">\n            <div class="asw-menu-btn" title="Open Accessibility Menu" role="button" aria-expanded="false">\n                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="34px" height="34px" ><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20.5 6c-2.61.7-5.67 1-8.5 1s-5.89-.3-8.5-1L3 8c1.86.5 4 .83 6 1v13h2v-6h2v6h2V9c2-.17 4.14-.5 6-1l-.5-2zM12 6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>\n            </div>\n            <div class="asw-menu">\n                <div class="asw-menu-header">\n                    Accessibility Menu\n                    <div>\n                        <div role="button" class="asw-menu-reset"  title="Reset Settings">\n                            <span class="material-icons">\n                                restart_alt\n                            </span>\n                        </div>\n                        <div role="button" class="asw-menu-close" title="Close Accessibility Menu">\n                            <span class="material-icons">\n                                close\n                            </span>\n                        </div>\n                    </div>\n                    \n                </div>\n                <div class="asw-menu-content">\n                    <div class="asw-card" style="margin-top: 15px;">\n                        <div class="asw-card-title">\n                            Content Adjustments\n                        </div>\n\n                        <div class="asw-adjust-font">\n                            <label>\n                                <span class="material-icons" style="margin-right:8px;">\n                                    format_size\n                                </span>\n                                Adjust Font Size\n                            </label>\n                            <div>\n                                <div class="asw-minus" data-key="font-size" role="button" aria-pressed="false">\n                                    <span class="material-icons">\n                                        remove\n                                    </span>\n                                </div>\n                                <div class="asw-amount">\n                                    ${n.states.fontSize&&1!=n.states.fontSize?`${parseInt(100*n.states.fontSize)}%`:"Default"}\n                                </div>\n                                <div class="asw-plus" data-key="font-size" role="button" aria-pressed="false">\n                                    <span class="material-icons">\n                                        add\n                                    </span>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class="asw-items">\n                            ${i}\n                        </div>\n                    </div>\n\n                    <div class="asw-card" style="margin-top: 15px;">\n                        <div class="asw-card-title">\n                            Color Adjustments\n                        </div>\n                        <div class="asw-items">\n                            ${o}\n                        </div>\n                    </div>\n\n                    <div class="asw-card" style="margin-top: 15px;">\n                        <div class="asw-card-title">\n                            Tools\n                        </div>\n                        <div class="asw-items">\n                            ${l}\n                        </div>\n                    </div>\n                </div>\n                \n                <div class="asw-footer">\n                  <!--  Accessibility  Widget by <a href="https://bennyluk.github.io/Sienna-Accessibility-Widget/">Sienna</a>\n  -->              </div>\n            </div>\n\n            <div class="asw-overlay">\n            </div>\n        </div>\n    `;
    const d = function(n, t) {
            let e = document.getElementById(t || "") || document.createElement("style");
            e.innerHTML = n, e.id || (e.id = t, document.head.appendChild(e))
        },
        c = function(n, t) {
            let e = "",
                a = ["-o-", "-ms-", "-moz-", "-webkit", ""];
            for (var s = a.length; s--;) e += a[s] + (t || "filter") + ":" + n + ";";
            return e
        },
        u = function(n) {
            let t = "";
            if (n) {
                let a = "";
                "dark-contrast" == n ? a = "color: #fff !important;fill: #FFF !important;background-color: #000 !important;" : "light-contrast" == n ? a = " color: #000 !important;fill: #000 !important;background-color: #FFF !important;" : "high-contrast" == n ? a += c("contrast(125%)") : "high-saturation" == n ? a += c("saturate(200%)") : "low-saturation" == n ? a += c("saturate(50%)") : "monochrome" == n && (a += c("grayscale(100%)"));
                let s = [""];
                "dark-contrast" != n && "light-contrast" != n || (s = ["h1", "h2", "h3", "h4", "h5", "h6", "img", "p", "i", "svg", "a", "button", "label", "li", "ol"]);
                for (var e = s.length; e--;) t += '[data-asw-filter="' + n + '"] ' + s[e] + "{" + a + "}"
            }
            d(t, "asw-filter-style"), n ? document.documentElement.setAttribute("data-asw-filter", n) : document.documentElement.removeAttribute("data-asw-filter", n)
        },
        p = function() {
            let t = [{
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
                }],
                e = "";
            for (var a = t.length; a--;) {
                let i = t[a];
                if (document.documentElement.classList.toggle(i.id, !!n.states[i.id]), n.states[i.id])
                    for (var s = i.childrenSelector.length; s--;) e += "." + i.id + " " + i.childrenSelector[s] + "{" + i.css + "}"
            }
            var i = document.querySelector(".asw-rg-container");
            if (n.states["readable-guide"]) {
                if (!i) {
                    var o = document.createElement("div");
                    o.setAttribute("class", "asw-rg-container"), o.innerHTML = '\n                    <style>\n                        .asw-rg {\n                            position: fixed;\n                            top: 0;\n                            left: 0;\n                            right: 0;\n                            width: 100%;\n                            height: 0;\n                            pointer-events: none;\n                            background-color: rgba(0,0,0,.5);\n                            z-index: 1000000;\n                        }\n                    </style>\n                    <div class="asw-rg asw-rg-top"></div>\n                    <div class="asw-rg asw-rg-bottom" style="top: auto;bottom: 0;"></div>\n                ';
                    let n = o.querySelector(".asw-rg-top"),
                        t = o.querySelector(".asw-rg-bottom"),
                        e = 20;
                    window.onScrollReadableGuide = function(a) {
                        n.style.height = a.clientY - e + "px", t.style.height = window.innerHeight - a.clientY - e - e + "px"
                    }, document.addEventListener("mousemove", window.onScrollReadableGuide, !1), document.body.appendChild(o)
                }
            } else i && (i.remove(), document.removeEventListener("mousemove", window.onScrollReadableGuide));
            n.states["stop-animations"] && (e += `\n                body * {\n                    ${c("none !important","transition")}\n                    ${c("forwards !important","animation-fill-mode")}\n                    ${c("1 !important"," animation-iteration-count")}\n                    ${c(".01s !important","animation-duration")}\n                }\n            `), n.states["big-cursor"] && (e += "\n                body * {\n                    cursor: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 512 512'%3E%3Cpath  d='M429.742 319.31L82.49 0l-.231 471.744 105.375-100.826 61.89 141.083 96.559-42.358-61.89-141.083 145.549-9.25zM306.563 454.222l-41.62 18.259-67.066-152.879-85.589 81.894.164-333.193 245.264 225.529-118.219 7.512 67.066 152.878z' xmlns='http://www.w3.org/2000/svg'/%3E%3C/svg%3E\") ,default !important;\n                }\n            "), d(e, "asw-content-style")
        };
    var f = function(e) {
        e.preventDefault();
        let a = e.currentTarget,
            s = a.dataset.key;
        a.classList.contains("asw-filter") ? (document.querySelectorAll(".asw-filter").forEach(function(n) {
            n.classList.remove("asw-selected"), n.setAttribute("aria-pressed", "false")
        }), n.states.contrast = n.states.contrast !== s && s, n.states.contrast && (a.classList.add("asw-selected"), a.setAttribute("aria-pressed", "true")), u(n.states.contrast)) : (n.states[s] = !n.states[s], a.classList.toggle("asw-selected", n.states[s]), a.setAttribute("aria-pressed", n.states[s] ? "true" : "false"), p()), t()
    };
    const m = function(t, e) {
        let a = !1;
        !e && t && (a = t.currentTarget, e = parseFloat(n.states.fontSize) || 1, a.classList.contains("asw-minus") ? e -= .1 : e += .1, e = Math.max(e, .1), e = Math.min(e, 2), e = parseFloat(e.toFixed(2))), document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,a,dl,dt,li,ol,th,td,span").forEach(function(n) {
            if (!n.classList.contains("material-icons")) {
                let t = n.getAttribute("data-asw-orgFontSize");
                t || (t = parseInt(window.getComputedStyle(n, null).getPropertyValue("font-size")), n.setAttribute("data-asw-orgFontSize", t));
                let a = t * e;
                n.style["font-size"] = a + "px"
            }
        });
        let s = "Default";
        1 !== e && (e > 1 ? s = "+" : e < 1 && (s = "-"), s += parseInt(100 * e) + "%"), a && (a.parentElement.querySelector(".asw-amount").innerHTML = s), e && (n.states.fontSize = e)
    };
    let h = r.querySelector(".asw-menu"),
        g = r.querySelector(".asw-overlay");
    r.querySelector(".asw-menu-btn").addEventListener("click", function() {
        h.style.display = "block" == h.style.display ? "none" : "block", g.style.display = h.style.display
    }, !1), h.querySelector(".asw-menu-close").addEventListener("click", function() {
        h.style.display = "none", g.style.display = h.style.display
    }, !1), g.addEventListener("click", function() {
        h.style.display = "none", g.style.display = h.style.display
    }, !1), h.querySelector(".asw-menu-reset").addEventListener("click", function() {
        n.states = {}, u(), p(), m(void 0, 1), document.querySelectorAll(".asw-btn").forEach(function(n) {
            n.classList.remove("asw-selected"), n.setAttribute("aria-pressed", "false")
        }), document.querySelectorAll(".asw-amount").forEach(function(n) {
            n.innerHTML = "Default"
        }), t()
    }, !1), h.querySelectorAll(".asw-btn").forEach(function(n) {
        n.addEventListener("click", f, !1)
    }), h.querySelectorAll(".asw-adjust-font div[role='button']").forEach(function(n) {
        n.addEventListener("click", m, !1)
    }), document.body.appendChild(r), m(null, 1), e && (p(), m(null, n.states.fontSize || 1), n.states.contrast && u(n.states.contrast))
};
document.addEventListener("DOMContentLoaded", init);