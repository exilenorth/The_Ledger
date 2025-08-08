# Technical Guide: The Ledger Website

## Overview

This document provides a comprehensive technical guide to "The Ledger" website, a platform designed to present data-driven articles and commentary. It aims to help new developers understand the project's architecture, workflow, and how to contribute new content effectively.

## Tech Stack

The website is built using the following core technologies:

*   **Eleventy (11ty):** A simpler static site generator that transforms various template files into static HTML.
*   **Nunjucks:** A powerful templating engine used by Eleventy for creating reusable HTML components and dynamic content.
*   **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
*   **JavaScript:** Used for interactive elements, data visualization (e.g., charts), and client-side logic.

## Project Structure

The project is organized into several key directories and files:

*   `.eleventy.js`: The main Eleventy configuration file. It defines collections, shortcodes, filters, and other build-time settings.
*   `_data/`: This directory stores global data files (e.g., JSON, JavaScript) that can be accessed across all templates.
    *   `_data/commentary.json`: Contains metadata and content for commentary articles.
    *   `_data/ledger.json`: Contains metadata and content for ledger articles.
*   `_includes/`: This directory holds reusable template partials, layouts, and macros.
    *   `_includes/base-layout.html`: The main Nunjucks layout file that defines the overall page structure, including `<head>`, header, footer, and content area. All content pages typically extend this layout.
    *   `_includes/header.html`: Contains the site's navigation and branding.
    *   `_includes/footer.html`: Contains copyright information and other footer elements.
*   `assets/`: This directory contains static assets like CSS, JavaScript, and images.
    *   `assets/css/style.css`: The main CSS file, often generated or compiled from Tailwind CSS.
    *   `assets/js/`: Contains various JavaScript files for client-side functionality.
    *   `assets/gfx/`: Stores images and graphics used on the site.
*   `commentary/`: Contains individual HTML files for commentary articles and their associated data file.
    *   `commentary/commentary.11tydata.js`: A directory data file that provides common data and permalink logic for all commentary articles within this directory.
*   `ledger/`: Contains individual HTML files for ledger articles and their associated data file.
    *   `ledger/ledger.11tydata.js`: A directory data file that provides common data and permalink logic for all ledger articles within this directory.
*   `subreddits/`: Contains individual HTML files for subreddit pages and their associated data file.
    *   `subreddits/subreddits.11tydata.js`: A directory data file that provides common data and permalink logic for all subreddit pages within this directory.
*   `index.html`: The main homepage of the website.

## Data Management

The site leverages Eleventy's data cascade for managing content and metadata:

*   **Global Data Files (`_data/*.json`):** Files like `_data/ledger.json` and `_data/commentary.json` provide site-wide data. This data is accessible in any template and is typically used for lists of articles, navigation items, or other global configurations.
*   **Directory Data Files (`*.11tydata.js`):** Files such as `ledger/ledger.11tydata.js` and `commentary/commentary.11tydata.js` provide data specific to the content within their respective directories. These files are crucial for:
    *   **Dynamic Permalinks:** Generating clean URLs based on content titles or IDs.
    *   **Common Front Matter:** Applying default front matter values (e.g., layout, tags) to all files in the directory.
    *   **Data Merging:** Merging data from global sources with specific content.

## Templating

The site uses Nunjucks templates, primarily relying on a base layout:

*   **Base Layout (`_includes/base-layout.html`):** This is the foundational template. Content pages extend this layout using `{% extends "base-layout.html" %}`.
*   **Content Blocks:** The `base-layout.html` defines blocks (e.g., `{% block content %}`), which child templates override to inject their unique content.
*   **Front Matter:** Each content HTML file (e.g., `ledger/reform-uk-policy-analysis.html`) uses YAML front matter at the top to define page-specific metadata like `title`, `description`, `date`, and `layout`. This front matter is processed by Eleventy and made available to the template.

Example Front Matter:

```yaml
---
title: "Reform UK Policy Analysis"
description: "An in-depth analysis of Reform UK's key policies."
date: 2024-07-20
layout: "base-layout.html"
---
```

## URL Generation (Permalinks)

Clean and consistent URLs are generated dynamically using the `.11tydata.js` files. For example, in `ledger/ledger.11tydata.js`, a `permalink` function is defined that takes the article's title (from its front matter or data file) and converts it into a URL-friendly slug. This ensures that URLs are human-readable and SEO-friendly.

Example from `ledger.11tydata.js`:

```javascript
module.exports = {
  eleventyComputed: {
    permalink: data => {
      // Logic to generate a slug from data.title or other properties
      // e.g., return `/ledger/${this.slugify(data.title)}/index.html`;
    },
    layout: "base-layout.html",
    tags: "ledger"
  }
};
```

This setup allows developers to define article titles in their HTML files or data, and the system automatically creates the corresponding URL.

## Workflow: Adding a New Article

To add a new "Ledger" or "Commentary" article, follow these steps:

### Step 1: Create the HTML Content File

1.  Navigate to the appropriate content directory:
    *   For a Ledger article: `ledger/`
    *   For a Commentary article: `commentary/`
2.  Create a new HTML file (e.g., `new-article-title.html`). The filename should be descriptive but does not directly determine the URL (the permalink logic handles that).
3.  Add the necessary Nunjucks front matter to the top of the new HTML file. This is crucial for Eleventy to process the page correctly.

    Example for a Ledger article (`ledger/my-new-ledger-article.html`):

    ```html
    ---
    title: "My New Ledger Article"
    description: "A brief description of my new ledger article."
    date: 2024-08-08
    layout: "base-layout.html"
    ---

    <!-- Your article content goes here -->
    <h1>My New Ledger Article</h1>
    <p>This is the content of my brand new ledger article.</p>
    ```

    Example for a Commentary article (`commentary/my-new-commentary-article.html`):

    ```html
    ---
    title: "My New Commentary Article"
    description: "A brief description of my new commentary article."
    date: 2024-08-08
    layout: "base-layout.html"
    ---

    <!-- Your article content goes here -->
    <h1>My New Commentary Article</h1>
    <p>This is the content of my brand new commentary article.</p>
    ```

### Step 2: Add Entry to the JSON Data File

1.  Open the relevant global data file:
    *   For a Ledger article: `_data/ledger.json`
    *   For a Commentary article: `_data/commentary.json`
2.  Add a new JSON object to the array within the file. This object should contain metadata about your new article. The `url` field should match the permalink generated by the `.11tydata.js` file (which is typically derived from the title).

    Example for `_data/ledger.json`:

    ```json
    [
      {
        "title": "Existing Ledger Article",
        "description": "Description of existing article.",
        "date": "2024-07-01",
        "url": "/ledger/existing-ledger-article/"
      },
      {
        "title": "My New Ledger Article",
        "description": "A brief description of my new ledger article.",
        "date": "2024-08-08",
        "url": "/ledger/my-new-ledger-article/"
      }
    ]
    ```

    Example for `_data/commentary.json`:

    ```json
    [
      {
        "title": "Existing Commentary Article",
        "description": "Description of existing commentary.",
        "date": "2024-06-15",
        "url": "/commentary/existing-commentary-article/"
      },
      {
        "title": "My New Commentary Article",
        "description": "A brief description of my new commentary article.",
        "date": "2024-08-08",
        "url": "/commentary/my-new-commentary-article/"
      }
    ]
    ```

    **Important:** Ensure the `url` in the JSON matches the expected permalink generated by Eleventy. The `date` format should be consistent with existing entries.

### Step 3: Verify and Build

1.  Run the Eleventy build process (e.g., `npx @11ty/eleventy --serve` for local development) to generate the static files.
2.  Navigate to the generated URL in your browser to confirm the article is displayed correctly and integrated into the site's navigation (if applicable).

By following these steps, new content can be seamlessly added to "The Ledger" website.

## In-Depth Feature Explanations

### Header Navigation & News Ticker

The site's header, defined in [`_includes/header.html`](_includes/header.html), provides the main navigation. The dynamic functionality of the header, particularly the news ticker, is managed by the JavaScript in [`assets/js/includes.js`](assets/js/includes.js).

The `loadNewsTicker()` function within [`assets/js/includes.js`](assets/js/includes.js) is responsible for fetching and displaying live headlines. It defines an array of `newsFeeds`, each containing a name, an RSS feed URL, and the path to its corresponding logo. The script uses a proxy service (`https://api.rss2json.com/v1/api.json?rss_url=`) to bypass CORS restrictions and fetch data from the specified RSS feeds (e.g., BBC, Reuters, GBNews).

Upon successful retrieval, the `Promise.all` method ensures all feeds are processed concurrently. The fetched items are then mapped to include their source (name and logo), concatenated into a single array, and randomized to provide a varied display. Finally, the headlines are dynamically rendered into the `ticker-headlines` unordered list within the header, complete with source logos and links to the original articles. This ensures that users receive up-to-date news directly on the site.

### Subreddit Page Logic

The subreddit pages (e.g., [`subreddits/UKPolitics.html`](subreddits/UKPolitics.html)) are designed to dynamically display content from specific Reddit communities. Each subreddit HTML file defines two crucial JavaScript variables: `subreddit` (the name of the subreddit, e.g., 'UKPolitics') and `subredditLogo` (the path to the subreddit's logo).

The core logic for these pages resides in [`assets/js/subreddit.js`](assets/js/subreddit.js). This script executes once the DOM is fully loaded. It first checks if the `subreddit` variable is defined. If so, it dynamically inserts the subreddit's logo (if `subredditLogo` is provided) and generates an explanatory text block, informing the user that the content is a live, unmoderated feed from the specified subreddit.

The script then makes two parallel API requests to Reddit: one to `https://www.reddit.com/r/${subreddit}/about.json` to fetch general subreddit information (like subscriber count and active users), and another to `https://https://www.reddit.com/r/${subreddit}/hot.json?limit=12` to retrieve the 12 hottest posts.

After successfully fetching both sets of data, the script processes them:
*   **Subreddit Statistics:** The `aboutData` is used to display the number of members and online users, formatted for readability.
*   **Post Rendering:** The `postsData` is filtered to exclude stickied posts, and then the `displayPosts()` function is called. This function iterates through each post, constructs an HTML `div` element for it, including the title, a truncated summary (if available), a thumbnail (if an image is present), upvote count, and a direct link to the post on Reddit. These dynamically created post elements are then appended to the `subreddit-posts` container on the page, providing a live feed of discussions.

Error handling is included to inform the user if posts cannot be loaded, for instance, if the subreddit is private, banned, or does not exist.