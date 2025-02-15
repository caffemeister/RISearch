document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get("imageUrl", (data) => {
    const previewImg = document.getElementById("preview");
    const noImageText = document.getElementById("noImageText");
    const googleBtn = document.getElementById("googleSearch");
    const bingBtn = document.getElementById("bingSearch");

    if (data.imageUrl) {
      previewImg.src = data.imageUrl;
      previewImg.style.display = "block";
      noImageText.style.display = "none";
      
      googleBtn.disabled = false;
      bingBtn.disabled = false;

      googleBtn.addEventListener("click", () => {
        window.open(`https://lens.google.com/uploadbyurl?url=${encodeURIComponent(data.imageUrl)}`, "_blank");
      });

      bingBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(data.imageUrl)
          .then(() => {
            alert("Image URL copied to clipboard! Now paste it into Bing Visual Search.");
            window.open("https://www.bing.com/visualsearch", "_blank");
          })
          .catch(err => {
            console.error("Error copying image URL: ", err);
            alert("Failed to copy the image URL. Please try again.");
          });
      });
    } else {
      previewImg.style.display = "none";
      noImageText.style.display = "block";
      
      googleBtn.disabled = true;
      bingBtn.disabled = true;
    }
  });
});
