# Cloned from https://github.com/newsline/talker-plugins/blob/master/github_links.coffee
# Tries to make links to Github look cooler

window.Newsline ?= {}

githubLink = /https:\/\/github.com\/(\w+)\/([^\/]+)(\/(\S+)?)?/g
commitMessageMatcher = /\[([^\]]+)\] (.*) - (.*) – (.*)/

githubIcon = '<span class="gh-icon"></span>'

generateGithubLink = (url) ->
  base = url.replace(/^\w+:\/\//, '')
  "<a href=\"#{url}\" class=\"gh-link\">#{githubIcon} #{base}</a>"

generateGithubButton = (url, text) ->
  "<a href=\"#{url}\" class=\"gh-button\">#{githubIcon} #{text}</a>"

githubRef = (ref) ->
  "<span class=\"gh-ref\">#{ref}</span>"

formatGenericLinks = (text) ->
  text = text.replace githubLink, (url, user, repo, rest_with_slash, rest) ->
    if typeof rest == "string"
      [action, params...] = rest.split('/')
    else
      [action, params] = [undefined, []]

    if action == undefined or action == ""
      generateGithubButton(url, "#{user}/#{repo}")
    else if action == 'commit'
      shortSha = params[0][0..6]
      generateGithubButton(url, "#{user}/#{repo} #{githubRef(shortSha)}")
    else if action == 'compare'
      [dummy, base, diff, other] = params[0].match(/^([a-z0-9._-]+[a-z0-9^])(\.{2,3})([^?\/]+)/)
      generateGithubButton(url, "#{user}/#{repo} #{githubRef(base)}#{diff}#{githubRef(other)}")
    else if action == 'pull' and params[0]?
      generateGithubButton(url, "#{user}/#{repo} pull ##{params[0]}")
    else
      generateGithubLink url

formatCommitMessage = (text) ->
  [dummy, repo, message, author, url] = text.match(commitMessageMatcher)
  "[#{repo}] <a href=\"#{url}\">#{message}</a> - #{author}"

window.Newsline.GithubLinks =
  isMatching: (text) ->
    text.match(githubLink)

  format: (text) ->
    if text.match(commitMessageMatcher)
      formatCommitMessage(text)
    else
      formatGenericLinks(text)

plugin.onMessageReceived = (event) ->
  return true unless event.type == "message"
  if Newsline.GithubLinks.isMatching(event.content)
    formatted = Newsline.GithubLinks.format(event.content)
    if formatted != event.content
      Talker.insertMessage(event, formatted)
      return false
  true

if jQuery?
  jQuery ($) ->
    if $('head style[data-style-for=github-links]').length == 0
      $('head').append("""
        <style type="text/css">
          .gh-icon {
            background: url("https://github.com/favicon.ico");
            display: inline-block;
            height: 16px;
            vertical-align: middle;
            width: 16px;
          }

          .gh-link {
            word-wrap: break-word;
          }

          .gh-button {
            -moz-border-radius: 3px;
            -webkit-border-radius: 3px;
            border-radius: 3px;
            filter: progid:DXImageTransform.Microsoft.gradient(startColorStr='#f9f9f9', EndColorStr='#e1e1e1');
            /* IE6,IE7 */
            -ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorStr='#f9f9f9', EndColorStr='#e1e1e1')";
            /* IE8 */
            background-image: -moz-linear-gradient(top, #f9f9f9, #e1e1e1);
            /* FF3.6 */
            background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #f9f9f9), color-stop(1, #e1e1e1));
            /* Saf4+, Chrome */
            -moz-box-shadow:  0 0 1px rgba(0, 0, 0, 0.2);
            -webkit-box-shadow:  0 0 1px rgba(0, 0, 0, 0.2);
            box-shadow:  0 0 1px rgba(0, 0, 0, 0.2);
            -khtml-user-select: none;
            -moz-user-select: none;
            -o-user-select: none;
            -webkit-user-select: none;
            user-select: none;
            border: 1px solid #bbb;
            color: #000;
            cursor: pointer;
            display: inline-block;
            text-align: center;
            padding: 1px 5px;
            text-decoration: none !important;
            font-size: 12px;
            }
            .gh-button:hover {
              -moz-box-shadow:  0 0 5px rgba(7, 94, 131, 0.4);
              -webkit-box-shadow:  0 0 5px rgba(7, 94, 131, 0.4);
              box-shadow:  0 0 5px rgba(7, 94, 131, 0.4); }
            .gh-button[disabled] {
              background: #eee;
              border: 1px solid #ccc;
              box-shadow: none !important;
              color: #a6a6a6;
              cursor: default; }
            .gh-button.pressed, .gh-button:active {
              filter: progid:DXImageTransform.Microsoft.gradient(startColorStr='#d4d4d4', EndColorStr='#ececec');
              /* IE6,IE7 */
              -ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorStr='#d4d4d4', EndColorStr='#ececec')";
              /* IE8 */
              background-image: -moz-linear-gradient(top, #d4d4d4, #ececec);
              /* FF3.6 */
              background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #d4d4d4), color-stop(1, #ececec));
              /* Saf4+, Chrome */
              -moz-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);
              -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);
              box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3); }

          .gh-ref {
            background: #777;
            border-radius: 3px;
            color: white;
            font-family: monospace;
            padding: 1px 4px;
            text-decoration: none;
            text-shadow: 1px 1px 0 #000;
          }
        </style>
      """)
