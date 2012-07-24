if (!window.webkitNotifications) return;

var getAvatar = function(user){
  return "http://assets0.talkerapp.com/avatar/" + MD5(user.email) + ".jpg?s=48";
};

var currentUserRegexp = new RegExp("\\b"+Talker.currentUser.name+"\\b",'gi');


plugin.onLoaded = function() {

  if (window.webkitNotifications.checkPermission() != 0) { // allowed
    $("#msgbox").keydown(function(){
      window.webkitNotifications.requestPermission();
    });
  }

  plugin.onBlur = function() {
    plugin.onMessageReceived = function(event) {
      if (window.webkitNotifications.checkPermission() == 0) { // allowed
        if (currentUserRegexp.test(event.content)){
          var user = event.user;
          var n = window.webkitNotifications.createNotification(getAvatar(user), user.name || '', event.content || '');
          n.show();
          n.ondisplay = function(){
            setTimeout(function(){n.cancel()}, 5000);
          };
        }
      }
    };
  };

  plugin.onFocus = function(){
    plugin.onMessageReceived = function(){};
  };
};
