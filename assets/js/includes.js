document.addEventListener("DOMContentLoaded", function() {
    // This script's only job now is to load the news ticker.
    loadNewsTicker();
    setupMobileMenu();
});

function setupMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const dropdownToggle = mobileMenu.querySelector('.dropdown > a');
    const dropdownContent = mobileMenu.querySelector('.dropdown-content-mobile');

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', (e) => {
            e.preventDefault();
            dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
        });
    }
}

function loadNewsTicker() {
    // ... (all the news ticker code remains the same)
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