function loadData() {
    // Get keys
    var googleKey = myKeys.GOOGLE_KEY;
    var nyTimesKey = myKeys.NYTIMES_KEY;

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetAddress = $('#street').val();
    var cityAddress = $('#city').val();
    var address = streetAddress + ',' + cityAddress;

    $greeting.text('So, you want to live at ' + address + '?');

    var mapsUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + address + '&key=' + googleKey;
    $body.append('<img class="bgimg" src="' + mapsUrl + '">');
    // YOUR CODE GOES HERE!

    var nytUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityAddress + '&sort=newest';
    nytUrl += '&api-key=' + nyTimesKey;
    $.getJSON(nytUrl, function(data) {
        $nytHeaderElem.text('New York Times Articles About ' + cityAddress);
            articles = data.response.docs;
            for (var i = 0; i < articles.length; i++) {
                var article = articles[i];
                var listItem = '<li class="article"><a href="' + article.web_url + '">' + article.headline.main + '</a><p>' + article.snippet + '</p></li>'
                $nytElem.append(listItem);
            }
        });

    return false;
};

$('#form-container').submit(loadData);
