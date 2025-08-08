document.addEventListener("DOMContentLoaded", function() {
    const headerPlaceholder = document.getElementById("header-placeholder");
    if (headerPlaceholder) {
        fetch("/_includes/header.html")
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.outerHTML = data;
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