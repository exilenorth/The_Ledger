module.exports = function(eleventyConfig) {
  // This command tells Eleventy to copy your assets folder to the output
  eleventyConfig.addPassthroughCopy("assets");

  // NEW CODE STARTS HERE
  eleventyConfig.addCollection("allArticles", function(collectionApi) {
    // Get all articles from our two data files
    const ledgerEntries = require('./assets/data/ledger.json');
    const commentaryEntries = require('./assets/data/commentary.json');

    // Add a 'type' to each so we can style them differently
    const typedLedgerEntries = ledgerEntries.map(entry => ({ ...entry, type: 'ledger' }));
    const typedCommentaryEntries = commentaryEntries.map(entry => ({ ...entry, type: 'commentary' }));

    // Combine them into one big array
    const all = [...typedLedgerEntries, ...typedCommentaryEntries];

    // Sort by date, newest first
    return all.sort((a, b) => new Date(b.date) - new Date(a.date));
  });
  // NEW CODE ENDS HERE

  // NEW CODE STARTS HERE
eleventyConfig.addFilter("formatDate", (dateObj) => {
    const d = new Date(dateObj);
    // Use the same formatting options as your original JS
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return d.toLocaleDateString('en-GB', options).toUpperCase();
});
// NEW CODE ENDS HERE

  // This is the main configuration object
  return {
    // Tell Eleventy to process html, md (markdown), and njk (nunjucks) files
    templateFormats: ["html", "md", "njk"],

    // Set the engine to use for HTML and Markdown files
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",

    // Define the input and output directories
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    }
  };
};