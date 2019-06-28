function parseHTML(htmlString) {
    //https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro
    const div = document.createElement('div');
    div.innerHTML = htmlString;
    return div.firstElementChild;
}

function dragTrack(area, callback) {
    var dragging = false;

    function addEvent(target, type, handler) {
        target.addEventListener(type, handler, false);
    }
    function clamp(val, min, max) {
        return Math.max(min, Math.min(val, max));
    }

    function onMove(e, info, starting) {
        if (starting) { dragging = true; }
        if (!dragging) { return; }

        e.preventDefault();

        var bounds = area.getBoundingClientRect(),
            w = bounds.width,
            h = bounds.height,
            x = info.clientX,
            y = info.clientY;

        var relX = clamp(x - bounds.left, 0, w),
            relY = clamp(y - bounds.top, 0, h);

        callback(relX / w, relY / h);
    }

    function onMouse(e, starting) {
        var button = (e.buttons === undefined) ? e.which : e.buttons;
        if (button === 1) {
            onMove(e, e, starting);
        }
        //`mouseup` outside of window:
        else {
            dragging = false;
        }
    }

    function onTouch(e, starting) {
        if (e.touches.length === 1) {
            onMove(e, e.touches[0], starting);
        }
        //Don't interfere with pinch-to-zoom etc:
        else {
            dragging = false;
        }
    }

    //Notice how we must listen on the whole window to really keep track of mouse movements,
    //while touch movements "stick" to the original target from `touchstart` (which works well for our purposes here):
    //
    //  https://stackoverflow.com/a/51750458/1869660
    //  "Mouse moves = *hover* like behavior. Touch moves = *drags* like behavior"
    //
    addEvent(area,   'mousedown',   function(e) { onMouse(e, true); });
    addEvent(area,   'touchstart',  function(e) { onTouch(e, true); });
    addEvent(window, 'mousemove',   onMouse);
    addEvent(area,   'touchmove',   onTouch);
    addEvent(window, 'mouseup',     function(e) { dragging = false; });
    addEvent(area,   'touchend',    function(e) { dragging = false; });
    addEvent(area,   'touchcancel', function(e) { dragging = false; });
}


export { parseHTML, dragTrack };
