console.log('Copy-Paste ITR content script called');

function addUserSelectCSS() {
    const css = document.createElement("style");
    css.type = 'text/css';
    css.innerText = `* {
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        -ms-user-select: text !important;
        user-select: text !important;
    }`;
    document.head.appendChild(css);
}

function enableCopyPaste() {
    console.log('enableCopyPaste called');
    addUserSelectCSS();

    // Only handle copy, cut, paste, and select events
    const eventList = [
        'copy', 'cut', 'paste', 'select', 'selectstart'
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
        document.oncopy = null;
        document.oncut = null;
        document.onpaste = null;
        document.onselectstart = null;
        document.body.oncopy = null;
        document.body.oncut = null;
        document.body.onpaste = null;
        document.body.onselectstart = null;
    `;
    document.body.appendChild(script);

    // Also clear handlers in content script context
    document.body.oncopy = null;
    document.body.oncut = null;
    document.body.onpaste = null;
    document.body.onselectstart = null;

    document.oncopy = null;
    document.oncut = null;
    document.onpaste = null;
    document.onselectstart = null;

    console.log('enableCopyPaste executed');
}

// Always enable copy-paste on *.incometax.gov.in
enableCopyPaste();

console.log('Copy-Paste ITR Script Execution Successfully Complete.');
