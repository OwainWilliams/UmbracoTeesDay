

// script.js
document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('image-gallery');
  
    fetch('datesFolder/galleryImages.json')
      .then(response => response.json())
      .then(data => {
        const images = data.images;
        displayImages(images, 'umbracoTeesGallery/30May2024/');
      });
  
    function displayImages(images, folder) {
      images.forEach(image => {
        const col = document.createElement('div');
        col.className = 'col-md-3';
        col.innerHTML = `<div class="card mb-4">
                           <img src="${folder}${image}" class="card-img-top" alt="${image}">
                         </div>`;
        gallery.appendChild(col);
      });
    }
  });
  
  