var $q = document.querySelector.bind(document);
var $qa = document.querySelectorAll.bind(document);
var lastKnownScrollPosition = 0;
var ticking = false;

// Update navbar
function updateNavbar(scrollPosition) {
  var bottomOfPage = document.body.offsetHeight - window.innerHeight;

  // Loop through each .navbar li a linking to anchor
  $qa('.navbar li a[href^="#"]').forEach(navLink => {
    var href = navLink.getAttribute('href');
    var anchor = $q(href);
    // If scroll position is >= to this anchor position then add .active to li
    if (scrollPosition >= anchor.offsetTop) {
      $q('.active').classList.remove('active');
      navLink.parentNode.classList.add('active');
    }
  });

  // If scroll position is at the bottom then add .active to the second to last li
  if (scrollPosition >= bottomOfPage) {
    $q('.active').classList.remove('active');
    $q('.navbar li:nth-last-child(2)').classList.add('active');
  }
}

// Detect the user's scroll
window.addEventListener('scroll', function() {
  lastKnownScrollPosition = Math.ceil(window.scrollY);

  if (!ticking) {
    window.requestAnimationFrame(function() {
      updateNavbar(lastKnownScrollPosition);
      ticking = false;
    });

    ticking = true;
  }
});

// Document ready
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling when clicking an anchor link
  $qa('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      $q(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});