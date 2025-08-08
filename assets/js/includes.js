document.addEventListener("DOMContentLoaded", function() {
    // The header is now built by Eleventy, so we only need to
    // run the function that loads the news headlines.
    loadNewsTicker();

    // We can also find and clean up the footer placeholder logic here
    // as it's no longer needed.
    const footerPlaceholder = document.getElementById("footer-placeholder");
    if (footerPlaceholder) {
        // Create a new element to avoid breaking the DOM if there are scripts after
        const newFooter = document.createElement('div');
        fetch("/_includes/footer.html")
            .then(response => response.text())
            .then(data => {
                newFooter.innerHTML = data;
                footerPlaceholder.replaceWith(...newFooter.childNodes);
            })
            .catch(error => console.error('Error fetching footer:', error));
    }
});

function loadNewsTicker() {
    const headlinesContainer = document.getElementById('ticker-headlines');
    if (!headlinesContainer) return;

    const newsFeeds = [
        { name: 'BBC', url: 'http://feeds.bbci.co.uk/news/politics/rss.xml', logo: '/assets/gfx/news_logos/bbc_logo.png' },
        { name: 'Reuters', url: 'https://openrss.org/www.reuters.com/world/', logo: '/assets/gfx/news_logos/reuters_logo.png' },
        { name: 'GBNews', url: 'https://www.gbnews.com/feeds/politics.rss', logo: '/assets/gfx/news_logos/gbnews_logo.png' },
    ];

    const proxyUrl = 'https://api.rss2json.com/v1/api.json?rss_url=';

    Promise.all(
        newsFeeds.map(feed =>
            fetch(proxyUrl + encodeURIComponent(feed.url))
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'ok') {
                        return data.items.map(item => ({ ...item, source: feed }));
                    }
                    return [];
                })
        )
    )
    .then(results => {
        let allHeadlines = [].concat(...results);
        allHeadlines.sort(() => Math.random() - 0.5);

        let headlinesHtml = '';
        allHeadlines.forEach(item => {
            headlinesHtml += `<li><img src="${item.source.logo}" alt="${item.source.name} logo" class="ticker-logo"><a href="${item.link}" target="_blank">${item.title}</a></li>`;
        });

        headlinesContainer.innerHTML = headlinesHtml;
    })
    .catch(error => {
        console.error('Error fetching multi-source news feed:', error);
        headlinesContainer.innerHTML = '<li>Headlines are currently unavailable.</li>';
    });
}