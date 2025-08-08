module.exports = function(eleventyConfig) {
  // This command tells Eleventy to copy your assets folder to the output
  eleventyConfig.addPassthroughCopy("assets");

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