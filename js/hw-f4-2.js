const slider = document.querySelector(".slider__input");
const image = document.querySelector(".slider__image");

function resizeImage(e) {
  const value = e.target.value;
  image.style.width = value + "px";
}

const debouncedResize = _.debounce(resizeImage, 100);

slider.addEventListener("input", debouncedResize);
const box = document.getElementById("box");

function moveBox(e) {
  box.style.left = e.clientX + "px";
  box.style.top = e.clientY + "px";
}

const debouncedMove = _.debounce(moveBox, 100);

document.addEventListener("mousemove", debouncedMove);
