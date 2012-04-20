// based on https://gist.github.com/1992651
plugin.onMessageInsertion = function (event) {

  return Talker.getLastInsertion().replace(/:\S+:/g, function (emoji) {
    var filename = (emoji == ':+1:' ? ':plus1:' : emoji).replace(/:/g, '');

    return "<img class=\"emoji\" title=\"" + emoji + "\" alt=\"" + emoji + "\" height=\"20\" width=\"20\" align=\"absmiddle\" src=\"https://beta.teambox.com/assets/emojis/" + filename + ".png\">"
  });

};
