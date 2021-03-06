(function(e, t) {
    var a = function() {
        var e = {
            value: .05,
            reveal: true,
            revealonclick: false
        };
        var t = arguments[1] || {};
        var a = this,
            n = a.parentNode;
        if (typeof t !== "object") {
            t = {
                value: parseInt(arguments[1])
            }
        }
        t = function() {
            var n = {};
            for (var i in e) {
                if (a.hasAttribute("data-" + i)) {
                    n[i] = a.getAttribute("data-" + i);
                    continue
                }
                if (i in t) {
                    n[i] = t[i];
                    continue
                }
                n[i] = e[i]
            }
            return n
        }();
        var i = a.style.display,
            r = a.width,
            l = a.height,
            o = false;
        var d = document.createElement("canvas");
        d.width = r;
        d.height = l;
        var f = d.getContext("2d");
        f.mozImageSmoothingEnabled = false;
        f.webkitImageSmoothingEnabled = false;
        f.imageSmoothingEnabled = false;
        var u = r * t.value,
            s = l * t.value;
        f.drawImage(a, 0, 0, u, s);
        f.drawImage(d, 0, 0, u, s, 0, 0, d.width, d.height);
        a.style.display = "none";
        n.insertBefore(d, a);
        if (t.revealonclick !== false && t.revealonclick !== "false") {
            d.addEventListener("click", function(e) {
                o = !o;
                if (o) {
                    f.drawImage(a, 0, 0, r, l)
                } else {
                    f.drawImage(a, 0, 0, u, s);
                    f.drawImage(d, 0, 0, u, s, 0, 0, d.width, d.height)
                }
            })
        }
        if (t.reveal !== false && t.reveal !== "false") {
            d.addEventListener("mouseenter", function(e) {
                if (o) return;
                f.drawImage(a, 0, 0, r, l)
            });
            d.addEventListener("mouseleave", function(e) {
                if (o) return;
                f.drawImage(a, 0, 0, u, s);
                f.drawImage(d, 0, 0, u, s, 0, 0, d.width, d.height)
            })
        }
    };
    e.HTMLImageElement.prototype.pixelate = a;
    if (typeof t === "function") {
        t.fn.extend({
            pixelate: function() {
                return this.each(function() {
                    a.apply(this, arguments)
                })
            }
        });
        t(e).on("load", function() {
            t("img[data-pixelate]").pixelate()
        })
    } else {
        document.addEventListener("DOMContentLoaded", function(e) {
            var t = document.querySelectorAll("img[data-pixelate]");
            for (var a = 0; a < t.length; a++) {
                t[a].addEventListener("load", function() {
                    this.pixelate()
                })
            }
        })
    }
})(window, typeof jQuery === "undefined" ? null : jQuery);