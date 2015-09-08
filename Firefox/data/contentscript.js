//Script to highlight most viewed articles on www.nytimes.com
//Author: Erik Christensen
//Erik.Christensen@gmail.com

//Function that takes an apiUrl with twenty most viewed articles from the NYTimes API, along with a color, and highlights the articles in that color on the home page by using the ID field (for www.nytimes.com)
function mostViewedIds(apiUrl, size, color) {

  var xhr = new XMLHttpRequest();
  xhr.open("GET", apiUrl, true);

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var resp = JSON.parse(xhr.responseText);

      //Array to hold article ids
      var ids = []

      //Iterate through results and add article id to array
      for (i = 0; i < size; i++) {
        ids.push(resp.results[i].id);
      };

      //Check if each article is in top twenty and highlight if found
      $("article").each(function() {
        $this = $(this);
        if ($.inArray($this.data('story-id'), ids) !== -1) {
          $this.find('.story-heading a').css("color", color);
        }
      });
    };
  };
  xhr.send();
}

//Function that takes an apiUrl with twenty most viewed articles from the NYTimes API, along with a color, and highlights the articles in that color on section pages by using the title field (e.g., www.nytimes/com/pages/world/index.html)
function mostViewedTitles(apiUrl, size, color) {

  var xhr = new XMLHttpRequest();
  xhr.open("GET", apiUrl, true);

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var resp = JSON.parse(xhr.responseText);

      //Array to hold article ids
      var titles = []

      //Iterate through results and add article id to array
      for (i = 0; i < size; i++) {
        titles.push(resp.results[i].title);
      };

      //Check if each article is in array and highlight if found
      $("a").each(function() {
        $this = $(this);
        if ($.inArray($this.text().trim(), titles) !== -1) {
          $this.css('color', color);
        }
      });
    };
  };
  xhr.send();
}

//Function to parse asset_ids when passed an api url from NYtimes containing most shared Twitter articles. Use to display on home page (www.nytimes.com)
function twitterIds(apiUrl) {

  var twitter = new XMLHttpRequest();
  twitter.open("GET", apiUrl, true);

  twitter.onreadystatechange = function() {
    if (twitter.readyState == 4) {
      var resp = JSON.parse(twitter.responseText);

      var imgURL = self.options.pngUrl;
      var twitterId = [];

      //Iterate through results and add top 5 asset_ids to twitterId
      for (i = 0; i < 5; i++) {
        twitterId.push(resp.results[i].asset_id);
      };

      //Add hot icon next to articles on Home Page
      $("article").each(function() {
        $this = $(this);
        if ($.inArray($this.data('story-id'), twitterId) !== -1) {
          $this.find('.story-heading a').prepend("<img src=" + imgURL + " />");
        }
      });
    };
  };
  twitter.send();
}

//Function to parse article titles when passed an api url from NYTimes containing most shared Twitter articles. Use on various sections (e.g., www.nytimes/com/pages/world/index.html)
function twitterTitles(apiUrl, size) {

  var twitter = new XMLHttpRequest();
  twitter.open("GET", apiUrl, true);

  twitter.onreadystatechange = function() {
    if (twitter.readyState == 4) {
      var resp = JSON.parse(twitter.responseText);

      var imgURL = self.options.pngUrl;
      var twitterTitle = [];

      //Iterate through results and add top 5 titles to twitterTitle
      for (i = 0; i < size; i++) {
        twitterTitle.push(resp.results[i].title);
      };

      //Add hot icon next to articles on Section Pages
      $("a").each(function() {
        $this = $(this);
        if ($.inArray($this.text(), twitterTitle) !== -1) {
          $this.prepend("<img src=" + imgURL + " />");
        }
      });
    };
  };
  twitter.send();
}

var path = window.location.pathname;
console.log(path);

if (path == "/") {
  console.log("if statement running");
  //Highlight most viewed articles 1-20, 21-40, and 41-60
  mostViewedIds("http://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/1.json?api-key=cd0fad54985368daccdef1d576ce197a%3A3%3A64947774", 20, "#16C5B9");
  mostViewedIds("http://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/1.json?offset=20&api-key=cd0fad54985368daccdef1d576ce197a%3A3%3A64947774", 20, "#00BAAC");
  mostViewedIds("http://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/1.json?offset=40&api-key=cd0fad54985368daccdef1d576ce197a%3A3%3A64947774", 20, "#008177");

  //Run twitter function on home page
  twitterIds("http://api.nytimes.com/svc/mostpopular/v2/mostshared/all-sections/1.json?api-key=cd0fad54985368daccdef1d576ce197a%3A3%3A64947774", 10);
} else {
  console.log("else statement running");

  path = path.split("/");
  var section = path[2];
  console.log(section);

  var url = ("http://api.nytimes.com/svc/mostpopular/v2/mostviewed/" + section + "/1.json?api-key=cd0fad54985368daccdef1d576ce197a%3A3%3A64947774")
  twitterTitles("http://api.nytimes.com/svc/mostpopular/v2/mostshared/all-sections/1.json?api-key=cd0fad54985368daccdef1d576ce197a%3A3%3A64947774", 10);

  mostViewedTitles(url, 10, "#16C5B9");
}
