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

    const newsFeeds = [
        { name: 'BBC News', url: 'http://feeds.bbci.co.uk/news/politics/rss.xml' },
        { name: 'Reuters', url: 'http://feeds.reuters.com/reuters/UKNews' },
        { name: 'GBNews', url: 'https://www.gbnews.com/feeds/politics.rss' }
    ];

    const proxyUrl = 'https://api.rss2json.com/v1/api.json?rss_url=';

    Promise.all(
        newsFeeds.map(feed => 
            fetch(proxyUrl + encodeURIComponent(feed.url))
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'ok') {
                        return data.items.map(item => ({ ...item, source: feed.name }));
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
            // This is the updated line
            headlinesHtml += `<li><span class="ticker-source source-${item.source.toLowerCase()}">${item.source}:</span><a href="${item.link}" target="_blank">${item.title}</a></li>`;
        });

        headlinesContainer.innerHTML = headlinesHtml;
    })
    .catch(error => {
        console.error('Error fetching multi-source news feed:', error);
        headlinesContainer.innerHTML = '<li>Headlines are currently unavailable.</li>';
    });
}