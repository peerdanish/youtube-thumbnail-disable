// Run the script when the page loads to apply the correct CSS based on stored state
chrome.storage.local.get("thumbnailsEnabled", ({ thumbnailsEnabled }) => {
  // If thumbnailsEnabled is not set, default to true
  const enableThumbnails = thumbnailsEnabled !== undefined ? thumbnailsEnabled : true;
  toggleThumbnails(enableThumbnails);
});

// Function to toggle the thumbnails visibility
function toggleThumbnails(enable) {
  const cssCode = `
    img.yt-core-image {
      filter: ${enable ? "none" : "blur(50px)"} !important;
      transition: filter 0.3s ease;
    }
  `;
  
  // Check if the style element already exists to avoid multiple injections
  let styleElement = document.getElementById('thumbnail-toggle-style');
  
  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = 'thumbnail-toggle-style';
    document.head.appendChild(styleElement);
  }
  
  styleElement.innerHTML = cssCode;
}
