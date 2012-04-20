// based on https://github.com/osclass/talkerapp-plugins/blob/master/meme-icons.js
// use ;meme; so it doesn't mess with :emoji:

plugin.Meme = function(matcher, path, meaning){
  this.matcher = matcher;

  this.replacementString = [
 ' <img src="', path,
 '" class="memes" style="position:relative; top:2px" alt="', meaning,
 '" title="', meaning, '" /> '
  ].join('');
}

var domain = "https://github.com/Dreepi/talker-plugins/raw/master/memes/";

var memes = ["angry",
"asiantroll",
"awwyeah",
"axe",
"ayfkm",
"baww",
"biggrin",
"cerealguy",
"cerealspitting",
"challenge",
"closeenough",
"concentrated2",
"concentrated",
"conflictingemotions",
"derrrp",
"determined",
"dudecomeon",
"ewbte2",
"ewbte",
"excitedtroll",
"fapfap",
"femalefapfap",
"femalefuckyea",
"femalehappy",
"femalemilk",
"femalerage2",
"femalerage",
"femaleretarded",
"foreveraloneexcited",
"foreveralone",
"free",
"fuckyea",
"gtfo",
"happyface",
"happy",
"heckno",
"hehehe",
"horror",
"iamdisappointed",
"infinitodesprecio",
"itssomething",
"laughing",
"likeasir",
"lol",
"maximumtrolling",
"megusta",
"melvin",
"mentira",
"milk",
"motherofgod",
"mouthopen",
"newspaperguy",
"newspaperguytear",
"ninja",
"no",
"okay",
"originalrage",
"originaltroll",
"pffftcchchchhfffttt",
"pokerface",
"prrrr",
"pukerainbows",
"rageguy",
"redeyes",
"sadtroll",
"shocked",
"sidemouth",
"smile2",
"smile",
"somuchwin",
"straightface",
"surprised",
"suspicious2",
"suspicious",
"sweaty",
"thoughtful",
"trolldad",
"trolldadjump",
"trollface",
"waitaminute",
"whynot",
"whywithhands",
"yuno" ]


plugin.memes = []

for(var i = 0; i < memes.length; i++){
  var meme = memes[i];
  plugin.memes.push( new plugin.Meme(new RegExp("(^|\s);" + meme + ";($|\s)"), domain + meme + ".png", meme) )
}

plugin.onMessageInsertion = function(event) {
  var element = Talker.getLastInsertion();

  _.each(plugin.memes, function(meme) {
 element.replace(meme.matcher, meme.replacementString);
  });
}

plugin.onCommand = function (event) {
    if (event.command == "memelist") {
        Talker.getMessageBox().val('');
        Talker.sendMessage(";" + memes.join("; ;") + ";");
        return false;
    }
};
