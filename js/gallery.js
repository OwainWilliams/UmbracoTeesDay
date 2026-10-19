document.addEventListener("DOMContentLoaded", function () {
  const gallery = document.querySelector(".gallery");
  const jump = document.querySelector(".gallery-nav");

  // Image URLs for each #UmbracoTees day, newest first. Add a new folder here when one is added.
  const folderImages = {
      "30 August 2024": [
          "umbracoTeesGallery/30Aug2024/image(1).jpg",
          "umbracoTeesGallery/30Aug2024/image(2).jpg",
          "umbracoTeesGallery/30Aug2024/image(3).jpg",
          "umbracoTeesGallery/30Aug2024/image(4).jpg",
          "umbracoTeesGallery/30Aug2024/image(5).jpg",
          "umbracoTeesGallery/30Aug2024/image(6).jpg",
          "umbracoTeesGallery/30Aug2024/image(7).jpg",
          "umbracoTeesGallery/30Aug2024/image(8).jpg",
          "umbracoTeesGallery/30Aug2024/image(9).jpg",
          "umbracoTeesGallery/30Aug2024/image(10).jpg",
          "umbracoTeesGallery/30Aug2024/image(11).jpg",
          "umbracoTeesGallery/30Aug2024/image(12).jpg",
          "umbracoTeesGallery/30Aug2024/image(13).jpg",
          "umbracoTeesGallery/30Aug2024/image(14).jpg",
          "umbracoTeesGallery/30Aug2024/image(15).jpg",
          "umbracoTeesGallery/30Aug2024/image(16).jpg",
          "umbracoTeesGallery/30Aug2024/image(17).jpg",
          "umbracoTeesGallery/30Aug2024/image(18).jpg",
          "umbracoTeesGallery/30Aug2024/image(19).jpg",
          "umbracoTeesGallery/30Aug2024/image(20).jpg",
          "umbracoTeesGallery/30Aug2024/image(21).jpg",
          "umbracoTeesGallery/30Aug2024/image(22).jpg",
          "umbracoTeesGallery/30Aug2024/image(23).jpg",
          "umbracoTeesGallery/30Aug2024/image(24).jpg",
          "umbracoTeesGallery/30Aug2024/image(25).jpg",
          "umbracoTeesGallery/30Aug2024/image(26).jpg",
          "umbracoTeesGallery/30Aug2024/image(27).jpg",
          "umbracoTeesGallery/30Aug2024/image(28).jpg",
          "umbracoTeesGallery/30Aug2024/image(29).jpg",
          "umbracoTeesGallery/30Aug2024/image(30).jpg",
          "umbracoTeesGallery/30Aug2024/image(31).jpg",
          "umbracoTeesGallery/30Aug2024/image(32).jpg",
          "umbracoTeesGallery/30Aug2024/image(33).jpg",
          "umbracoTeesGallery/30Aug2024/image(34).jpg",
          "umbracoTeesGallery/30Aug2024/image(35).jpg"
          // Add more images as needed
      ],
       "30 May 2024": [
           "umbracoTeesGallery/30May2024/image(1).jpg",
           "umbracoTeesGallery/30May2024/image(1).jpeg",
           "umbracoTeesGallery/30May2024/image(2).jpeg",
           "umbracoTeesGallery/30May2024/image(2).png",
           "umbracoTeesGallery/30May2024/image(3).jpeg",
           "umbracoTeesGallery/30May2024/image(3).jpg",
           "umbracoTeesGallery/30May2024/image(3).png",
           "umbracoTeesGallery/30May2024/image(4).jpg",
           "umbracoTeesGallery/30May2024/image(4).png",
           "umbracoTeesGallery/30May2024/image(5).jpg",
           "umbracoTeesGallery/30May2024/image(6).jpg",
           "umbracoTeesGallery/30May2024/image(7).jpg",
           "umbracoTeesGallery/30May2024/image(8).jpg",
           "umbracoTeesGallery/30May2024/image(9).jpg",
           "umbracoTeesGallery/30May2024/image(10).jpg",
           "umbracoTeesGallery/30May2024/image(11).jpg",
           "umbracoTeesGallery/30May2024/image(12).jpg",
           "umbracoTeesGallery/30May2024/image(13).jpg",
           "umbracoTeesGallery/30May2024/image(14).jpg",
           "umbracoTeesGallery/30May2024/image(15).jpg",
           "umbracoTeesGallery/30May2024/image(16).jpg",
           "umbracoTeesGallery/30May2024/image(17).jpg",
           "umbracoTeesGallery/30May2024/image(18).jpg",
           "umbracoTeesGallery/30May2024/image(19).jpg",
           "umbracoTeesGallery/30May2024/image(20).jpg",
           "umbracoTeesGallery/30May2024/image(21).jpg",
           "umbracoTeesGallery/30May2024/image(22).jpg",
           "umbracoTeesGallery/30May2024/image(23).jpg",
           "umbracoTeesGallery/30May2024/image(24).jpg",
           "umbracoTeesGallery/30May2024/image(25).jpg",
           "umbracoTeesGallery/30May2024/image(26).jpg",
           "umbracoTeesGallery/30May2024/image(27).jpg"
       ],
       "23 February 2024": [
        "umbracoTeesGallery/23Feb2024/image(1).jpeg",
        "umbracoTeesGallery/23Feb2024/image(1).jpg",
        "umbracoTeesGallery/23Feb2024/image(1).png",
        "umbracoTeesGallery/23Feb2024/image(2).jpeg",
        "umbracoTeesGallery/23Feb2024/image(2).jpg",
        "umbracoTeesGallery/23Feb2024/image(3).jpg",
        "umbracoTeesGallery/23Feb2024/image(3).jpeg",
        "umbracoTeesGallery/23Feb2024/image(4).jpg",
        "umbracoTeesGallery/23Feb2024/image(5).jpg",
        "umbracoTeesGallery/23Feb2024/image(6).jpg",
        "umbracoTeesGallery/23Feb2024/image(7).jpg",
        "umbracoTeesGallery/23Feb2024/image(8).jpg",
        "umbracoTeesGallery/23Feb2024/image(9).jpg",
        "umbracoTeesGallery/23Feb2024/image(10).jpg",
        "umbracoTeesGallery/23Feb2024/image(11).jpg",
        "umbracoTeesGallery/23Feb2024/image(12).jpg",
        "umbracoTeesGallery/23Feb2024/image(13).jpg",
        "umbracoTeesGallery/23Feb2024/image(14).jpg",
        "umbracoTeesGallery/23Feb2024/image(15).jpg",
        "umbracoTeesGallery/23Feb2024/image(16).jpg",
        "umbracoTeesGallery/23Feb2024/image(17).jpg",
        "umbracoTeesGallery/23Feb2024/image(18).jpg",
        "umbracoTeesGallery/23Feb2024/image(19).jpg",
        "umbracoTeesGallery/23Feb2024/image(20).jpg",
        "umbracoTeesGallery/23Feb2024/image(21).jpg",
        "umbracoTeesGallery/23Feb2024/image(22).jpg",
        "umbracoTeesGallery/23Feb2024/image(23).jpg",
        "umbracoTeesGallery/23Feb2024/image(24).jpg",
        "umbracoTeesGallery/23Feb2024/image(25).jpg",
        "umbracoTeesGallery/23Feb2024/image(26).jpg",
        "umbracoTeesGallery/23Feb2024/image(27).jpg",
        "umbracoTeesGallery/23Feb2024/image(28).jpg",
        "umbracoTeesGallery/23Feb2024/image(29).jpg",
        "umbracoTeesGallery/23Feb2024/image(30).jpg"
    ]
      // "23Feb2024": [
      //     "umbracoTeesGallery/23Feb2024/image5.jpg",
      //     "umbracoTeesGallery/23Feb2024/image6.jpg",
      //     // Add more images as needed
      // ],
      // Add more folders if necessary
    };

  // ---------- Lightbox ----------
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", "Photo viewer");
  lightbox.innerHTML =
    '<button class="close" aria-label="Close">&times;</button>' +
    '<button class="prev" aria-label="Previous photo">&#8249;</button>' +
    '<img alt="">' +
    '<button class="next" aria-label="Next photo">&#8250;</button>';
  document.body.appendChild(lightbox);
  const lightboxImg = lightbox.querySelector("img");

  let current = [];
  let index = 0;

  function show(i) {
    index = (i + current.length) % current.length;
    lightboxImg.src = current[index].src;
    lightboxImg.alt = current[index].alt;
  }
  function open(images, i) {
    current = images;
    show(i);
    lightbox.classList.add("open");
    lightbox.querySelector(".close").focus();
  }
  function close() { lightbox.classList.remove("open"); lightboxImg.removeAttribute("src"); }

  lightbox.addEventListener("click", (e) => {
    if (e.target.closest(".close") || e.target === lightbox) close();
    else if (e.target.closest(".prev")) show(index - 1);
    else if (e.target.closest(".next")) show(index + 1);
  });
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });

  // ---------- Render each folder ----------
  for (const folder in folderImages) {
    const images = folderImages[folder];
    const id = folder.toLowerCase().replace(/\s+/g, "-");

    const link = document.createElement("a");
    link.href = "#" + id;
    link.textContent = folder;
    jump.appendChild(link);

    const group = document.createElement("section");
    group.className = "gallery-group";
    group.id = id;
    group.innerHTML = `<h2>${folder}<small>${images.length} photos</small></h2>`;

    const grid = document.createElement("div");
    grid.className = "photos";
    group.appendChild(grid);
    gallery.appendChild(group);

    const items = images.map((src, n) => ({ src, alt: `#UmbracoTees day ${folder}, photo ${n + 1}` }));
    items.forEach((item, n) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("aria-label", `View photo ${n + 1} from ${folder}`);
      const img = document.createElement("img");
      img.src = item.src;
      img.alt = item.alt;
      img.loading = "lazy";
      img.decoding = "async";
      btn.appendChild(img);
      btn.addEventListener("click", () => open(items, n));
      grid.appendChild(btn);
    });
  }
});
