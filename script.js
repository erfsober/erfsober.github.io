const year = document.querySelector("#year");
year.textContent = new Date().getFullYear();

const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxClose = document.querySelector("#lightboxClose");
const lightboxPrev = document.querySelector("#lightboxPrev");
const lightboxNext = document.querySelector("#lightboxNext");
const lightboxCount = document.querySelector("#lightboxCount");

let currentImages = [];
let currentIndex = 0;

function renderLightbox() {
  const image = currentImages[currentIndex];
  if (!image) return;

  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  lightboxCount.textContent = `${currentIndex + 1} / ${currentImages.length}`;
}

function openGallery(gallery, startIndex) {
  currentImages = [...gallery.querySelectorAll("img")].map((img) => ({
    src: img.src,
    alt: img.alt
  }));

  currentIndex = startIndex;
  renderLightbox();

  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  document.body.style.overflow = "";
}

function nextImage() {
  currentIndex = (currentIndex + 1) % currentImages.length;
  renderLightbox();
}

function previousImage() {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  renderLightbox();
}

document.querySelectorAll(".tile-shots").forEach((gallery) => {
  gallery.querySelectorAll(".tile-shot").forEach((button, index) => {
    button.addEventListener("click", () => openGallery(gallery, index));
  });
});

lightboxClose.addEventListener("click", closeLightbox);
lightboxNext.addEventListener("click", nextImage);
lightboxPrev.addEventListener("click", previousImage);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("is-open")) return;

  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowRight") nextImage();
  if (event.key === "ArrowLeft") previousImage();
});
