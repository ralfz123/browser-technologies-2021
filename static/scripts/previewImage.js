const preview = document.querySelector('img');
let file = document.querySelector('input[type=file]');

file.onchange = function () {
  previewFile();
};

function previewFile() {
  const preview = document.querySelector('img');
  const file = document.querySelector('input[type=file]').files[0];
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

export { previewFile };
