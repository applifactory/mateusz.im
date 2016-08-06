$(function(){
  $('[before-scroll], [after-scroll]').each(function(){
    var $this = $(this),
        beforeOffset = $this.attr('before-offset') || 0,
        afterOffset = $this.attr('after-offset') || 0,
        clientHeight = $this[0].clientHeight,
        offsetTop = $this[0].offsetTop,
        beforeClass = $this.attr('before-scroll'),
        afterClass = $this.attr('after-scroll');
    $(window).scroll(function(){
      var scrollTop = document.body.scrollTop || document.documentElement.scrollTop,
        isBefore = scrollTop + window.innerHeight - ( $this.offset().top + $this[0].clientHeight/2 ) < -beforeOffset,
        isAfter = scrollTop - ( $this.offset().top + $this[0].clientHeight/2 ) > afterOffset;
      if ( beforeClass && beforeClass == afterClass ) {
        if ( isBefore || isAfter ) {
          $this.addClass(beforeClass);
        } else {
          $this.removeClass(beforeClass);
        }
      } else {
        if ( beforeClass ) {
          if ( isBefore ) {
            $this.addClass(beforeClass);
          } else {
            $this.removeClass(beforeClass);
          }
        }
        if ( afterClass ) {
          if ( isAfter ) {
            $this.addClass(afterClass);
          } else {
            $this.removeClass(afterClass);
          }
        }
      }
    });
  });
  $(window).trigger('scroll');
})
