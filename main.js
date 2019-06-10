const title = document.getElementById( 'title' );

title.textContent = 'Updated with JS';

// Check that service workers are registered
if ('serviceWorker' in navigator) {

	// Use the window load event to keep the page load performant
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/service-worker.js');
	});

}
