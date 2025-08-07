document.addEventListener('DOMContentLoaded', () => {
    const ledgerContainer = document.getElementById('ledger-entries');
    const commentaryContainer = document.getElementById('commentary-entries');

    const loadEntries = async () => {
        try {
            const ledgerResponse = await fetch('/assets/data/ledger.json');
            const ledgerEntries = await ledgerResponse.json();

            const commentaryResponse = await fetch('/assets/data/commentary.json');
            const commentaryEntries = await commentaryResponse.json();

            // Sort entries by date, newest first
            const sortedLedger = ledgerEntries.sort((a, b) => new Date(b.date) - new Date(a.date));
            const sortedCommentary = commentaryEntries.sort((a, b) => new Date(b.date) - new Date(a.date));

            // Clear existing static content
            ledgerContainer.innerHTML = '';
            commentaryContainer.innerHTML = '';

            // Display latest 3 ledger entries
            sortedLedger.slice(0, 3).forEach(entry => {
                const card = `
                    <div class="report-card bg-gray-800 rounded-lg overflow-hidden">
                        <div class="p-8 flex flex-col h-full">
                            <p class="text-sm text-gray-400 mb-2 font-semibold tracking-wider">ENTRY // ${new Date(entry.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}</p>
                            <h3 class="text-2xl font-bold mb-3">${entry.title}</h3>
                            <p class="text-gray-300 mb-6 flex-grow">${entry.summary}</p>
                            <a href="${entry.link}" class="cta-button mt-auto inline-block font-bold py-2 px-5 rounded text-center transition-colors duration-300">
                                View the Entry
                            </a>
                        </div>
                    </div>`;
                ledgerContainer.innerHTML += card;
            });

            // Display latest 3 commentary entries
            sortedCommentary.slice(0, 3).forEach(entry => {
                const card = `
                    <div class="commentary-card bg-gray-800 rounded-lg p-6 border-l-4 border-sky-400 hover:border-sky-300 transition-colors duration-300">
                        <p class="text-sm text-gray-400 mb-2 font-semibold tracking-wider">COMMENTARY // ${entry.author.toUpperCase()}</p>
                        <h3 class="text-2xl font-bold mb-3 text-gray-50">${entry.title}</h3>
                        <p class="text-gray-300 mb-4">${entry.summary}</p>
                        <a href="${entry.link}" class="text-sky-400 hover:text-sky-300 font-semibold transition-colors duration-300">Read More &rarr;</a>
                    </div>`;
                commentaryContainer.innerHTML += card;
            });

        } catch (error) {
            console.error('Error loading entries:', error);
            ledgerContainer.innerHTML = '<p class="text-red-500">Failed to load Ledger entries.</p>';
            commentaryContainer.innerHTML = '<p class="text-red-500">Failed to load Commentary entries.</p>';
        }
    };

    loadEntries();
});