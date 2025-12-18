const container = document.getElementById("scroll-container");
const thumb = document.getElementById("thumb");

let currentScroll = 0;
let targetScroll = 0;
const ease = 0.08;

function update() {
	targetScroll = window.scrollY;
	currentScroll += (targetScroll - currentScroll) * ease;

	container.style.transform = `translateY(${-currentScroll}px)`;

	// Update custom scrollbar thumb
	const contentHeight = container.scrollHeight;
	const viewportHeight = window.innerHeight;

	const thumbHeight = (viewportHeight / contentHeight) * viewportHeight;
	thumb.style.height = `${thumbHeight}px`;

	const thumbY =
		(currentScroll / (contentHeight - viewportHeight)) *
		(viewportHeight - thumbHeight);
	thumb.style.transform = `translateY(${thumbY}px)`;

	requestAnimationFrame(update);
}

update();

// scroll page with wheel as usual
window.addEventListener("wheel", (e) => {
	window.scrollBy({ top: e.deltaY, behavior: "auto" });
});
