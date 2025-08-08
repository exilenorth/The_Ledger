document.addEventListener("DOMContentLoaded", function() {
    const headerPlaceholder = document.getElementById("header-placeholder");
    if (headerPlaceholder) {
        fetch("/_includes/header.html")
            .then(response => response.text())
            .then(data => {
                const headerContainer = document.createElement('div');
                headerContainer.innerHTML = data;

                // Check if we are on the homepage
                if (document.body.id === 'home-page') {
                    const logoLink = headerContainer.querySelector('a[href="/"]');
                    if (logoLink) {
                        // Create a new text element
                        const textElement = document.createElement('span');
                        textElement.className = 'text-3xl font-bold text-amber-400'; // Style to match your brand
                        textElement.textContent = 'The Ledger';
                        
                        // Replace the image with the new text element
                        logoLink.innerHTML = ''; // Clear the link content
                        logoLink.appendChild(textElement);
                    }
                }
                
                headerPlaceholder.outerHTML = headerContainer.innerHTML;
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