$(document).ready(function() {
  $('.theme-button').click(function() {
    $("body").toggleClass(['bg-light', 'bg-secondary']);
    $("body").toggleClass(['text-dark', 'text-light']);
    $("h3 a").toggleClass(['text-primary', 'text-light']);
    $("p").toggleClass(['text-dark', 'text-light']);
    $("h5").toggleClass(['text-secondary', 'text-light']);
    $(".navbar").toggleClass(['bg-light', 'bg-secondary']);
    $(".nav-item a i").toggleClass(['text-dark', 'text-light']);
    $(".navbar .container-fluid .navbar-brand").toggleClass(['text-dark', 'text-light']);
  });
});
