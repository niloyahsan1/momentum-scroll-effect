const container = document.getElementById("scroll-container");
const thumb = document.getElementById("thumb");

let currentScroll = 0;
let targetScroll = 0;
const ease = 0.08;

let isDragging = false;
let startY = 0;
let startScroll = 0;

function update() {
	const contentHeight = container.scrollHeight;
	const viewportHeight = window.innerHeight;
	const maxScroll = contentHeight - viewportHeight;

	targetScroll = Math.max(0, Math.min(maxScroll, targetScroll));
	currentScroll += (targetScroll - currentScroll) * ease;

	container.style.transform = `translateY(${-currentScroll}px)`;

	// Scrollbar thumb size
	const thumbHeight = (viewportHeight / contentHeight) * viewportHeight;
	thumb.style.height = `${thumbHeight}px`;

	// Thumb position
	const thumbY = (currentScroll / maxScroll) * (viewportHeight - thumbHeight);

	thumb.style.transform = `translateY(${thumbY}px)`;

	requestAnimationFrame(update);
}

update();

/* Wheel scrolling */
window.addEventListener("wheel", (e) => {
	targetScroll += e.deltaY;
});

/* Thumb drag */
thumb.addEventListener("mousedown", (e) => {
	isDragging = true;
	startY = e.clientY;
	startScroll = targetScroll;
	document.body.style.userSelect = "none";
});

window.addEventListener("mousemove", (e) => {
	if (!isDragging) return;

	const contentHeight = container.scrollHeight;
	const viewportHeight = window.innerHeight;
	const maxScroll = contentHeight - viewportHeight;

	const thumbHeight = (viewportHeight / contentHeight) * viewportHeight;
	const maxThumbMove = viewportHeight - thumbHeight;

	const deltaY = e.clientY - startY;
	const scrollDelta = (deltaY / maxThumbMove) * maxScroll;

	targetScroll = startScroll + scrollDelta;
});

window.addEventListener("mouseup", () => {
	isDragging = false;
	document.body.style.userSelect = "";
});
