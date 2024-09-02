document.addEventListener("DOMContentLoaded", function () {
  const gallery = document.querySelector(".gallery");
  const folderNameElement = document.querySelector(".folder-name"); // Get the folder name element

  // Define image URLs for each folder (replace with actual image URLs)
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
           "umbracoTeesGallery/30May2024/image(2).jpg",
           "umbracoTeesGallery/30May2024/image(3).jpeg",
           "umbracoTeesGallery/30May2024/image(3).jpg",
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
       ]
      // "30May2024": [
      //     "umbracoTeesGallery/30May2024/image5.jpg",
      //     "umbracoTeesGallery/30May2024/image6.jpg",
      //     // Add more images as needed
      // ],
      // Add more folders if necessary
    };

  // Loop through each folder and its images
  for (const folder in folderImages) {
    const images = folderImages[folder];

    // Display folder name
    folderNameElement.textContent = `Folder: ${folder}`; // Modify this as needed

    images.forEach((image) => {
        const imgElement = document.createElement("img");
        imgElement.src = image;
        gallery.appendChild(imgElement);
    });
}});
