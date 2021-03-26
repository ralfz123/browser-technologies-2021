function slideshow() {
  const slideShow = document.querySelector('.slideshow');

  if (slideShow && typeof slideShow.scrollIntoView !== 'undefined') {
    const sliderButtons = slideShow.querySelectorAll('button');
    const slides = slideShow.querySelectorAll('img');

    let index = 0;

    sliderButtons.forEach((button) => {
      button.classList.add('js');
      button.addEventListener('click', slideImage);
    });

    function slideImage(e) {
      const targetId = e.target.id;

      if (targetId === 'prev') {
        if (index === 0) {
          index = slides.length - 1;
          slides[index].scrollIntoView();
        } else {
          index--;
          slides[index].scrollIntoView();
        }
      } else {
        if (index === slides.length - 1) {
          index = 0;
          slides[index].scrollIntoView();
        } else {
          index++;
          slides[index].scrollIntoView();
        }
      }
    }
  }
}
export { slideshow };
