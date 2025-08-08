document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const subreddit = urlParams.get('r');

    if (subreddit) {
        document.getElementById('subreddit-title').textContent = `r/${subreddit}`;
        fetchRedditPosts(subreddit);
    }
});

async function fetchRedditPosts(subreddit) {
    try {
        const response = await fetch(`https://www.reddit.com/r/${subreddit}/hot.json?limit=12`);
        const data = await response.json();
        const posts = data.data.children.map(child => child.data);
        displayPosts(posts);
    } catch (error) {
        console.error('Error fetching Reddit posts:', error);
    }
}

function displayPosts(posts) {
    const container = document.getElementById('subreddit-posts');
    container.innerHTML = '';
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'bg-white rounded-lg shadow-md p-6';
        postElement.innerHTML = `
            <h3 class="text-xl font-bold mb-2">${post.title}</h3>
            <p class="text-gray-700 mb-4">${post.selftext.substring(0, 150)}...</p>
            <a href="https://reddit.com${post.permalink}" target="_blank" class="text-amber-500 hover:underline">Read more</a>
        `;
        container.appendChild(postElement);
    });
}