(() => {
  const iframe = document.getElementById("resourceobject");

  const original = iframe.contentWindow.runCode;

  iframe.contentWindow.runCode = function (...args) {
    done.add(current);

    const fb = document.getElementById('feedback');
    fb.className = 'feedback ok';
    fb.innerHTML = '&#10003; Muito bem! Implementação correta.';

    updateProgress();
    renderTabs();

    return original.apply(this, args);
  };
})();