// show thumbnial for image file
function previewImage() {
  if (file.type.startsWith('image/')) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    // this is a async call. SO wait for it to unload then add the image as a background image in css.
    reader.onload = () => {
      thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
    };
  } else {
    thumbnailElement.style.backgroundImage = null; // Maybe place a default image here?
  }
}
export { previewImage };
