const handleGalleryTabClick = (e) => {
  if (e.target.classList.contains('tab-btn')) {
    const season = e.target.dataset.season;
    const images = document.querySelectorAll('.portfolio__img');
    images.forEach((image, index) => {
      image.src = `./assets/img/${season}/${index + 1}.jpg`;
    });

    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach((tab) => tab.classList.remove('tab-btn--active'));
    e.target.classList.add('tab-btn--active');
  }
};

export default handleGalleryTabClick;
