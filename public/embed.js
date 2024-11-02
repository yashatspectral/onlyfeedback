// OnlyFeedback Embed Script
(function() {
  // Create global namespace
  window.OnlyFeedback = {};
  
  // Load required assets
  const loadScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://onlyfeedback.netlify.app/assets/index.js';
      script.type = 'module';
      script.onload = resolve;
      document.head.appendChild(script);
    });
  };

  const loadStyles = () => {
    return new Promise((resolve) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://onlyfeedback.netlify.app/assets/index.css';
      link.onload = resolve;
      document.head.appendChild(link);
    });
  };

  // Initialize when both assets are loaded
  Promise.all([loadScript(), loadStyles()]).then(() => {
    // OnlyFeedback.init will be defined by the loaded script
    const event = new CustomEvent('onlyfeedbackReady');
    window.dispatchEvent(event);
  });
})();