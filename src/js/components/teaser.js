$(() => {
  let $teaser = $('.teaser'),
      $next = $teaser ? $teaser.find('.next') : null;
  if ( $teaser.length && $next.length ) {
    $next.on('click', () => {
      $('html,body').stop().animate({scrollTop: $teaser.next().offset().top}, 500);
    })
  }
})

$(() => {
  let $teaser = $('.teaser'),
      assets = ['teaser-bg.jpg', 'teaser-works--small.png'],
      assetsLoaded = 0;
  assets.forEach((src) => {
    let $img = $(`<img src="/img/${src}" display="none"/>`);
    if ( $img[0].naturalHeight ) {
      assetsLoaded++;
    } else {
      $img.on('load', () => {
        assetsLoaded++;
        if ( assetsLoaded == assets.length ) {
          $('.teaser').removeClass('loading');
        }
      });
    }
  })
  if ( assetsLoaded < assets.length ) {
    $teaser.addClass('loading');
  }
})
