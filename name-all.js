plugin.onCommand = function (event) {
  if (event.command == "name-all") {
    Talker.getMessageBox().val('');
    Talker.sendMessage( Talker.getRoomUsernames().join(' ') );
    return false;
  }
};
