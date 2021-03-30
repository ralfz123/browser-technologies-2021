let file = document.querySelector('input[type=file]');
// If file is available, create img element
if (file) {
  const preview = document.createElement('img');
  preview.setAttribute('alt', 'Image preview');
  insertAfter(file, preview);
}
file.onchange = function () {
  previewFile();
};

function previewFile() {
  const preview = document.querySelector('img');
  file = document.querySelector('input[type=file]').files[0];
  const reader = new FileReader();

  reader.addEventListener(
    'load',
    function () {
      // convert image file to base64 string
      preview.src = reader.result;
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
    preview.classList = 'uploaded';

    // removes class because it's uploaded and must be ready for next upload
    setTimeout(function () {
      preview.classList.remove('uploaded');
    }, 3000);
  }
}

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

export { previewFile };
