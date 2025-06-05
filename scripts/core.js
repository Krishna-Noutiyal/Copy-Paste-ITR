console.log('Copy-Paste ITR content script called');

function enableCopyPaste() {

    const eventList = [
        'copy', 'cut', 'paste', 'keydown', 'keyup'
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


    // Clears handlers in content script context
    document.body.oncut = null;
    document.body.oncopy = null;
    document.body.onpaste = null;
    document.body.onkeydown = null;
    document.body.onkeyup = null;
    document.oncut = null;
    document.oncopy = null;
    document.onpaste = null;
    document.onkeydown = null;
    document.onkeyup = null;



    console.log('enableCopyPaste executed');
}

// Always enable copy-paste
enableCopyPaste();

console.log('Copy-Paste ITR Script Execution Successfully Complete.');
