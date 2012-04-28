// based on https://github.com/cloudhead/talker-plugins/master/talker-markup.js
//
// talker-markup
//
//     `var x = 1;`
//     *bold*
//     _italics_
//
plugin.onMessageReceived = function (event) { 
  var str;
  if (Talker.isPaste(event)) { return true }

  var codeRegex = / `(.*?)` /g
  if (codeRegex.test(event.content) && event.content.indexOf('\n') === -1) {
     str = event.content.replace(codeRegex, function (all, code) {
        return ' <span style="padding: 1px; background-color: #fff; font-family: monaco, monospace">' + code + '</span> ';
     });
  }

  var boldRegex = / \*(.*?)\* /g
  if (boldRegex.test(event.content)) {
     str = (str || event.content).replace(boldRegex, function (all, code) {
        return ' <strong>' + code + '</strong> ';
     });
  }

  var italicsRegex = / \_(.*?)\_ /g
  if (italicsRegex.test(event.content)) {
     str = (str || event.content).replace(italicsRegex, function (all, code) {
        return ' <em>' + code + '</em> ';
     });
  }
  if (str) {
     Talker.insertMessage(event, str);
     return false;
  }
};

