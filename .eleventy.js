module.exports = function(eleventyConfig) {
  // This command tells Eleventy to copy your assets folder to the output
  eleventyConfig.addPassthroughCopy("assets");

  
eleventyConfig.addFilter("formatDate", (dateString) => {
  if (!dateString) {
    return "NO DATE";
  }
  // The 'T00:00:00Z' part tells the parser to treat it as a UTC date,
  // avoiding timezone issues that can sometimes cause errors.
  const d = new Date(dateString + 'T00:00:00Z');

  // Check if the date is valid after parsing
  if (isNaN(d.getTime())) {
    return "INVALID DATE";
  }

  const options = { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' };
  return d.toLocaleDateString('en-GB', options).toUpperCase();
});

  // This is the main configuration object
  return {
    templateFormats: ["html", "md", "njk"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    }
  };
};