$(document).ready(function() {
    // Initialize Fancybox
    $('[data-fancybox="gallery"]').fancybox({
      buttons: [
        "zoom",
        "slideShow",
        "fullScreen",
        "thumbs",
        "close"
      ],
      loop: true
    });

    // Enable carousel navigation when clicking on an image
    $('.carousel-inner img').on('click', function() {
      var currentIndex = $(this).closest('.carousel-item').index();
      $('#myCarousel').carousel(currentIndex);
    });
  });


  function resizeCarousel(){
    var viewportWidth = $(window).width();
    var itemsPerSlide = viewportWidth < 770 ? 1 : 3;

    $("#myCarousel .carousel-item").each(function() {
        var $item = $(this);
        var $column = $item.find(".col-md-4");
        
        $column.removeClass("active");

        for(var i=0; i<$column.length; i+=itemsPerSlide){
            $column.slice(i, i+itemsPerSlide).addClass("active");
            console.log("HERE");

        }


    });
  }

//   $(document).ready(function() {
//     resizeCarousel();
//   });

//   $(window).resize(function() {
//     resizeCarousel();
//   });

