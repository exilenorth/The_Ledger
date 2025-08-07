document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('archive-container');
    if (!container) return;

    let allArticles = [];

    async function fetchAndProcessArticles() {
        try {
            const [ledgerResponse, commentaryResponse] = await Promise.all([
                fetch('/assets/data/ledger.json'),
                fetch('/assets/data/commentary.json')
            ]);

            const ledgerEntries = await ledgerResponse.json();
            const commentaryEntries = await commentaryResponse.json();

            const typedLedgerEntries = ledgerEntries.map(entry => ({ ...entry, type: 'ledger', url: entry.link }));
            const typedCommentaryEntries = commentaryEntries.map(entry => ({ ...entry, type: 'commentary', url: entry.link }));

            allArticles = [...typedLedgerEntries, ...typedCommentaryEntries];
            allArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
            
            renderArticles();
        } catch (error) {
            console.error('Error loading articles:', error);
            container.innerHTML = '<p>Failed to load articles.</p>';
        }
    }

    function renderArticles(filter = 'all') {
        container.innerHTML = '';
        const filteredArticles = allArticles.filter(article => filter === 'all' || article.type === filter);
        
        filteredArticles.forEach(article => {
            const card = document.createElement('div');
            const date = new Date(article.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
            card.className = `card card-${article.type} bg-gray-800 rounded-lg overflow-hidden flex flex-col mb-4`;
            card.innerHTML = `
                <div class="p-6 flex-grow flex flex-col">
                    <p class="text-sm text-gray-400 mb-2 font-semibold tracking-wider">${article.type.toUpperCase()} // ${date}</p>
                    <h3 class="text-xl font-bold mb-3 flex-grow"><a href="${article.url}" class="hover:text-sky-400 transition-colors duration-300">${article.title}</a></h3>
                    <p class="text-gray-300">${article.summary}</p>
                </div>
            `;
            container.appendChild(card);
        });
    }

    fetchAndProcessArticles();

    const filterButtons = document.querySelectorAll('.filter-buttons button');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderArticles(button.dataset.filter);
        });
    });
});