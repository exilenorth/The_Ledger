document.addEventListener('DOMContentLoaded', () => {
    const articlesContainer = document.getElementById('articles-container');

    const loadEntries = async () => {
        if (!articlesContainer) return;

        try {
            // Fetch both data sources
            const [ledgerResponse, commentaryResponse] = await Promise.all([
                fetch('/assets/data/ledger.json'),
                fetch('/assets/data/commentary.json')
            ]);

            const ledgerEntries = await ledgerResponse.json();
            const commentaryEntries = await commentaryResponse.json();

            // Add a 'type' property to each article
            const typedLedgerEntries = ledgerEntries.map(entry => ({ ...entry, type: 'ledger' }));
            const typedCommentaryEntries = commentaryEntries.map(entry => ({ ...entry, type: 'commentary' }));

            // Merge and sort all articles by date
            const allArticles = [...typedLedgerEntries, ...typedCommentaryEntries];
            allArticles.sort((a, b) => new Date(b.date) - new Date(a.date));

            // Clear existing static content
            articlesContainer.innerHTML = '';

            // Display all articles
            allArticles.forEach(entry => {
                const card = createCard(entry);
                articlesContainer.innerHTML += card;
            });

        } catch (error) {
            console.error('Error loading articles:', error);
            articlesContainer.innerHTML = '<p class="text-red-500">Failed to load articles.</p>';
        }
    };

    const createCard = (entry) => {
        const date = new Date(entry.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
        const cardClass = `card card-${entry.type}`;
        
        if (entry.type === 'ledger') {
            return `
                <div class="${cardClass} bg-gray-800 rounded-lg overflow-hidden flex flex-col">
                    <div class="p-6 flex-grow flex flex-col">
                        <p class="text-sm text-gray-400 mb-2 font-semibold tracking-wider">LEDGER // ${date}</p>
                        <h3 class="text-xl font-bold mb-3 flex-grow">${entry.title}</h3>
                        <p class="text-gray-300 mb-4">${entry.summary}</p>
                        <a href="${entry.link}" class="cta-button mt-auto inline-block font-bold py-2 px-4 rounded text-center transition-colors duration-300">
                            View Entry
                        </a>
                    </div>
                </div>`;
        } else { // commentary
            return `
                <div class="${cardClass} bg-gray-800 rounded-lg overflow-hidden flex flex-col">
                     <div class="p-6 flex-grow flex flex-col">
                        <p class="text-sm text-gray-400 mb-2 font-semibold tracking-wider">COMMENTARY // ${date}</p>
                        <h3 class="text-xl font-bold mb-3 flex-grow">${entry.title}</h3>
                        <p class="text-gray-300 mb-4">${entry.summary}</p>
                        <a href="${entry.link}" class="text-sky-400 hover:text-sky-300 font-semibold transition-colors duration-300 mt-auto">
                            Read More &rarr;
                        </a>
                    </div>
                </div>`;
        }
    };

    loadEntries();
});