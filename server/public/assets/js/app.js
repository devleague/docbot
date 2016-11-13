
$('.pin-side-nav').each(function() {
  var $this = $(this);
  var $target = $('#' + $(this).attr('data-target'));
  $this.pushpin({
    top: $target.offset().top,
    bottom: $target.offset().top + $target.outerHeight() - $this.height()
  });
});

$(document).ready(function(){
  $('.pin-side-nav').pushpin({
    top: 100,
    offset: 0
  });

   $('.scrollspy').scrollSpy({ offset: 500 });
});