document.addEventListener("DOMContentLoaded", function() {
    const headerPlaceholder = document.getElementById("header-placeholder");
    if (headerPlaceholder) {
        fetch("/_includes/header.html")
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
                
                loadNewsTicker();

                if (document.body.id === 'home-page') {
                    const logoLink = headerPlaceholder.querySelector('a[href="/"]');
                    if (logoLink) {
                        const textElement = document.createElement('span');
                        textElement.className = 'text-3xl font-bold text-amber-400';
                        textElement.textContent = 'The Ledger';
                        logoLink.innerHTML = '';
                        logoLink.appendChild(textElement);
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching header:', error);
            });
    }

    const footerPlaceholder = document.getElementById("footer-placeholder");
    if (footerPlaceholder) {
        fetch("/_includes/footer.html")
            .then(response => response.text())
            .then(data => {
                footerPlaceholder.outerHTML = data;
            })
            .catch(error => {
                console.error('Error fetching footer:', error);
            });
    }
});

function loadNewsTicker() {
    const headlinesContainer = document.getElementById('ticker-headlines');
    if (!headlinesContainer) return;

    // Array of news sources
    const newsFeeds = [
        { name: 'BBC', url: 'http://feeds.bbci.co.uk/news/politics/rss.xml' },
        { name: 'Reuters', url: 'http://feeds.reuters.com/reuters/UKNews' },
        { name: 'GBNews', url: 'https://www.gbnews.com/feeds/politics.rss' }
    ];

    // Use a proxy to convert RSS (XML) to JSON
    const proxyUrl = 'https://api.rss2json.com/v1/api.json?rss_url=';

    // Fetch all feeds in parallel
    Promise.all(
        newsFeeds.map(feed => 
            fetch(proxyUrl + encodeURIComponent(feed.url))
                .then(response => response.json())
                .then(data => {
                    // Tag each headline with its source name
                    if (data.status === 'ok') {
                        return data.items.map(item => ({ ...item, source: feed.name }));
                    }
                    return []; // Return empty array on failure
                })
        )
    )
    .then(results => {
        // Flatten the array of arrays into a single list of headlines
        let allHeadlines = [].concat(...results);

        // Shuffle the combined headlines for a mixed ticker
        allHeadlines.sort(() => Math.random() - 0.5);

        let headlinesHtml = '';
        allHeadlines.forEach(item => {
            headlinesHtml += `<li><span class="ticker-source">${item.source}:</span><a href="${item.link}" target="_blank">${item.title}</a></li>`;
        });

        headlinesContainer.innerHTML = headlinesHtml;
    })
    .catch(error => {
        console.error('Error fetching multi-source news feed:', error);
        headlinesContainer.innerHTML = '<li>Headlines are currently unavailable.</li>';
    });
}