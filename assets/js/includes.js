document.addEventListener("DOMContentLoaded", function() {
    const headerPlaceholder = document.getElementById("header-placeholder");
    if (headerPlaceholder) {
        fetch("/_includes/header.html")
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
                
                // Now that the header is loaded, we can run the news ticker logic
                loadNewsTicker();

                // Homepage-specific logic
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

    // This is a publicly available RSS feed for the BBC News UK front page
    const bbcRssUrl = 'http://feeds.bbci.co.uk/news/politics/rss.xml';

    // Because of browser security (CORS), we can't fetch the XML directly.
    // We use a free, public proxy to convert the XML to JSON for us.
    const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(bbcRssUrl)}`;

    fetch(proxyUrl)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'ok') {
                const items = data.items;
                let headlinesHtml = '';
                items.forEach(item => {
                    headlinesHtml += `<li><a href="${item.link}" target="_blank">${item.title}</a></li>`;
                });
                headlinesContainer.innerHTML = headlinesHtml;
            } else {
                throw new Error('Failed to load news feed.');
            }
        })
        .catch(error => {
            console.error('Error fetching news ticker data:', error);
            headlinesContainer.innerHTML = '<li>Headlines are currently unavailable.</li>';
        });
}