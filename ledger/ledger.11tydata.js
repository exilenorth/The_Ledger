module.exports = {
  // This function will run for every file in this folder
  permalink: (data) => `/ledger/${data.page.fileSlug}.html`
};