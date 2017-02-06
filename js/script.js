
function loadData() {

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

    var mapsUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + address + '';
    $body.append('<img class="bgimg" src="' + mapsUrl + '">');
    // YOUR CODE GOES HERE!

    var nytUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityAddress + '&sort=newest';
    nytUrl += '&api-key=b43a2348fd6442d89b9c18805601d94a';

    nytUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=London&sort=newest&api-key=b43a2348fd6442d89b9c18805601d94a';

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
