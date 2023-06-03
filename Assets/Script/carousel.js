$(document).ready(function() {
    // Initialize Fancybox
    Fancybox.bind('[data-fancybox="gallery"]',{
    });

    // Enable carousel navigation when clicking on an image
    // $('.carousel-inner img').on('click', function() {
    //   var currentIndex = $(this).closest('.carousel-item').index();
    //   $('#myCarousel').carousel(currentIndex);
    // });

    var items = $('.carousel .carousel-item');
    items.each(function() {
        var minPerSlide = 3;
        var next = $(this).next();
  
        for (var i = 1; i < minPerSlide; i++) {
            if (!next.length) {
                // wrap carousel by using first child
                next = items.first();
            }
  
            var cloneChild = next.clone(true);
            $(this).append(cloneChild.children().eq(0));
            next = next.next();
        }
    });

    let images = [];
    $.each($("#myCarousel .carousel-item.active img"),
    function(indexInArray, valueOfElement) {
        images.push({src:$(this).attr("src")});

    });

    $(".card-img").click(function(e) {
        var index = $(this).attr("index");
        let temp = moveElementToFront(images,index);
        Fancybox.show(temp)
    })

  });

  function moveElementToFront(array,index){
    if(index >= 0 && index<array.length) {
        var newArray = [...array];
        var element = newArray.splice(index,1)[0];
        newArray.unshift(element);
        return newArray
        ;
    }
    return array;
  }


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

