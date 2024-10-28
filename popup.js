document.addEventListener("DOMContentLoaded", () => {
	const toggleButton = document.getElementById("toggle-button");
  
	// Get the current state from storage
	chrome.storage.local.get("thumbnailsEnabled", ({ thumbnailsEnabled }) => {
	  toggleButton.textContent = thumbnailsEnabled ? "Disable Thumbnails" : "Enable Thumbnails";
	});
  
	// Toggle button click event
	toggleButton.addEventListener("click", () => {
	  chrome.storage.local.get("thumbnailsEnabled", ({ thumbnailsEnabled }) => {
		console.log("thumbnailsEnabled", thumbnailsEnabled);
		const newState = !thumbnailsEnabled;
		chrome.storage.local.set({ thumbnailsEnabled: newState }, () => {
		  toggleButton.textContent = newState ? "Disable Thumbnails" : "Enable Thumbnails";
  
		  // Update the CSS on the current YouTube tab
		  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			const activeTab = tabs[0];
			chrome.scripting.executeScript({
			  target: { tabId: activeTab.id },
			  function: toggleThumbnails,
			  args: [newState]
			});
		  });
		});
	  });
	});
  });
  
  function toggleThumbnails(enable) {
	const cssCode = `
	  img.yt-core-image {
		filter: ${enable ? "none" : "blur(50px)"} !important;
      transition: filter 0.3s ease;
	  }
	`;
	
	const style = document.createElement("style");
	style.innerHTML = cssCode;
	document.head.appendChild(style);
  }
  