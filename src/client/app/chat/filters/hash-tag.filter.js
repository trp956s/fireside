(function() {
  "use strict";

  angular.module('app.chat')

  .filter('hashTagLink', ['$filter', '$sce', hashtagFilter]);

  //Hashtag pattern
  var replacePattern = /(^|\s)#(\w*[a-zA-Z_]+\w*)/gim;

  function hashtagFilter($filter, $sce) {
    return function(text, target) {
      if (!text) return text;

      var replacedText = $filter('linky')(text);

      // replace #hashtags
      replacedText = replacedText.replace(replacePattern, '$1<a href="#/hashtag/$2" >#$2</a>');

      // avoid escaping HTML
      $sce.trustAsHtml(replacedText);

      return replacedText;
    };
  }

}());
