console.log("Copy-Paste ITR Running");

// Enables copy-paste functionality on *.incometax.gov.in
(function enableCopyPaste() {
  const events = [
    'copy', 'cut', 'paste',
    'contextmenu', 'keydown', 'keypress', 'keyup'
  ];

  function removeBlockers(element) {
    events.forEach(event => {
      element[`on${event}`] = null;
    });
  }

  function processAll() {
    const elements = document.querySelectorAll('input, textarea, [contenteditable="true"]');
    elements.forEach(removeBlockers);
  }

  // Initial run
  processAll();

  // Also run when new elements are added
  const observer = new MutationObserver(processAll);
  observer.observe(document.body, { childList: true, subtree: true });
})();

document.body.onselectstart = null;
document.onselectstart = null;

document.body.oncopy = null;
document.body.oncut = null;

document.body.onpaste = null;

document.oncontextmenu = null;
document.body.oncontextmenu = null;

console.log("Copy-Paste ITR Script Execution Successfully Complete.");
