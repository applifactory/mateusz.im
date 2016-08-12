$(() => {
  let $teaser = $('.teaser'),
      $next = $teaser ? $teaser.find('.next') : null;
  if ( $teaser.length && $next.length ) {
    $next.on('click', () => {
      $('html,body').stop().animate({scrollTop: $teaser.next().offset().top}, 500);
    })
  }
})
