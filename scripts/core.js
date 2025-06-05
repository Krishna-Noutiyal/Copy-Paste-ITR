console.log('Copy-Paste ITR content script called');

function enableCopyPaste() {

    const eventList = [
        'copy', 'cut', 'paste', 'contextmenu', 'mousedown', 'mouseup',
        'selectstart', 'select', 'keydown', 'keyup', 'drag', 'dragstart'
    ];

    eventList.forEach(event => {
        document.addEventListener(event, e => {
            e.stopPropagation();
        }, true);
    });

    // Remove user-select:none from all elements
    document.querySelectorAll('*').forEach(el => {
        if (el.style.userSelect === 'none') {
            el.style.userSelect = 'auto';
        }
    });

    // Remove event handlers that block copy/paste/select
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.textContent = `
        document.oncontextmenu = null;
        document.body.onpaste = null;
        document.body.onselectstart = null;
        document.onselectstart = null;
        document.ondragstart = null;
        document.body.oncut = null;
        document.onmousedown = null;
        document.body.oncontextmenu = null;
        document.body.oncopy = null;
        document.body.ondragstart = null;
        document.body.onmousedown = null;
    `;
    document.body.appendChild(script);

    // Also clear handlers in content script context
    document.body.oncontextmenu = null;
    document.body.onmousedown = null;
    document.body.oncut = null;
    document.body.oncopy = null;
    document.body.onselectstart = null;
    document.body.ondragstart = null;
    document.body.onpaste = null;

    document.oncontextmenu = null;
    document.onmousedown = null;
    document.ondragstart = null;
    document.onselectstart = null;

    setTimeout(() => {
        document.oncontextmenu = null;
    }, 2000);

    // Extra: stop propagation for select/copy/paste/cut
    ['select', 'selectstart', 'copy', 'paste', 'cut'].forEach(event => {
        document.addEventListener(event, e => {
            e.stopPropagation();
        }, true);
    });

    console.log('enableCopyPaste executed');
}

// Always enable copy-paste on *.incometax.gov.in
enableCopyPaste();

console.log('Copy-Paste ITR Script Execution Successfully Complete.');
