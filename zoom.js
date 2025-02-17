const zoomableDiv = document.getElementById("canvas-wrapper");
let scale = 1.5;
let translateX = 0,
  translateY = 0;
let startX, startY;
let isPanning = false;

zoomableDiv.addEventListener("wheel", function (event) {
  event.preventDefault();
  let zoomFactor = 0.01;
  scale += event.deltaY * -zoomFactor * 0.1;
  scale = Math.max(1, Math.min(scale, 3));
  updateTransform();
});

zoomableDiv.addEventListener("mousedown", function (event) {
  // Prevent panning if already at the original position
  if (translateX === 0 && translateY === 0) return;

  isPanning = true;
  startX = event.clientX - translateX;
  startY = event.clientY - translateY;
  zoomableDiv.style.cursor = "grabbing";
});

window.addEventListener("mousemove", function (event) {
  if (!isPanning) return;

  const newTranslateX = event.clientX - startX;
  const newTranslateY = event.clientY - startY;

  translateX = newTranslateX;
  translateY = newTranslateY;

  updateTransform();
});

window.addEventListener("mouseup", function () {
  isPanning = false;
  updateTransform(); // Update cursor after releasing
});

function updateTransform() {
  zoomableDiv.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;

  // Update cursor based on current position
  if (translateX === 0 && translateY === 0) {
    zoomableDiv.style.cursor = "default";
  } else {
    zoomableDiv.style.cursor = "grab";
  }
}

updateTransform();
