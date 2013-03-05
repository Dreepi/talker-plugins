function retinafy(event){
  $('img[src*=/avatar/][src*=?s=18]').each(function(i, element){
    var $this = $(element),
        src = $this.attr('src');

    $this.attr('src', src.replace(/\?s=18$/, '?s=36'));
  });
}

plugin.onLoaded = retinafy;
plugin.onUsers = retinafy;
plugin.onJoin = retinafy;
plugin.onMessageInsertion = retinafy;
