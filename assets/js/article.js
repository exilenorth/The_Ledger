document.addEventListener("DOMContentLoaded", function() {
    const tagsContainer = document.getElementById("tags-container");
    const relatedArticlesContainer = document.getElementById("related-articles-container");
    if (!tagsContainer) return;

    const currentPath = window.location.pathname;

    Promise.all([
        fetch('/assets/data/ledger.json').then(response => response.json()),
        fetch('/assets/data/commentary.json').then(response => response.json())
    ])
    .then(([ledgerData, commentaryData]) => {
        const allArticles = [...ledgerData, ...commentaryData];
        const article = allArticles.find(item => item.link === currentPath);

        if (article && article.tags && article.tags.length > 0) {
            // Populate tags
            const tagsHeader = document.createElement("h3");
            tagsHeader.textContent = "Tags";
            tagsContainer.appendChild(tagsHeader);

            const tagsList = document.createElement("ul");
            tagsList.className = "tags-list";
            article.tags.forEach(tag => {
                const tagItem = document.createElement("li");
                tagItem.textContent = tag;
                tagsList.appendChild(tagItem);
            });
            tagsContainer.appendChild(tagsList);

            // Find and display related articles
            if (relatedArticlesContainer) {
                const relatedArticles = findRelatedArticles(article, allArticles);
                if (relatedArticles.length > 0) {
                    const relatedHeader = document.createElement("h2");
                    relatedHeader.textContent = "Related Articles";
                    relatedArticlesContainer.appendChild(relatedHeader);
                    
                    const articlesGrid = document.createElement("div");
                    articlesGrid.className = "articles-grid";

                    relatedArticles.slice(0, 3).forEach(relatedArticle => {
                        const card = document.createElement("div");
                        card.className = "card";
                        
                        const title = document.createElement("h3");
                        const link = document.createElement("a");
                        link.href = relatedArticle.link;
                        link.textContent = relatedArticle.title;
                        title.appendChild(link);
                        
                        const date = document.createElement("p");
                        date.className = "date";
                        date.textContent = new Date(relatedArticle.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
                        
                        const summary = document.createElement("p");
                        summary.textContent = relatedArticle.summary;
                        
                        card.appendChild(title);
                        card.appendChild(date);
                        card.appendChild(summary);
                        articlesGrid.appendChild(card);
                    });
                    relatedArticlesContainer.appendChild(articlesGrid);
                }
            }
        }
    })
    .catch(error => console.error("Error loading article data:", error));
});

function findRelatedArticles(currentArticle, allArticles) {
    const currentTags = currentArticle.tags;
    if (!currentTags || currentTags.length === 0) {
        return [];
    }

    const related = allArticles.map(article => {
        if (article.link === currentArticle.link) {
            return null;
        }

        const sharedTags = article.tags ? article.tags.filter(tag => currentTags.includes(tag)) : [];
        if (sharedTags.length > 0) {
            return { ...article, sharedTagsCount: sharedTags.length };
        }
        return null;
    }).filter(Boolean);

    related.sort((a, b) => b.sharedTagsCount - a.sharedTagsCount);

    return related;
}