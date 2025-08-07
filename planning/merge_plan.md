# Plan: Merging Report Styles

**Objective:** Update the original report, `ledger/triple-lock-vs-asylum-costs-report.html`, with the improved typography and layout from `ledger/triple-lock-vs-asylum-costs-report_v2.html` while preserving the original's functional header and footer.

---

## 1. Merge Strategy

The core of this task is to transfer the specific CSS classes that provide the enhanced styling from the `v2` file to the original file.

*   **Source of Style:** The classes `prose` and `prose-invert` on the `<article>` tag in `triple-lock-vs-asylum-costs-report_v2.html` are responsible for the improved styling.
*   **Target Element:** The `<article>` tag within `triple-lock-vs-asylum-costs-report.html`.
*   **Preservation:** It is critical to **keep the existing `<head>` section, `<header>`, and `<footer>`** of the original file (`triple-lock-vs-asylum-costs-report.html`) completely intact. This will ensure the main stylesheet, navigation, and footer remain correct and functional.

---

## 2. Implementation Steps

The implementation will be a single, targeted change:

1.  **Open the Target File:** Edit [`ledger/triple-lock-vs-asylum-costs-report.html`](ledger/triple-lock-vs-asylum-costs-report.html).

2.  **Locate the Article Tag:** Find the `<article>` tag on line 38.
    ```html
    <article class="max-w-4xl mx-auto">
    ```

3.  **Add the Classes:** Modify the tag by adding `prose` and `prose-invert` to its class list. The updated tag should look like this:
    ```html
    <article class="prose prose-invert max-w-4xl mx-auto">
    ```

4.  **Save the File:** Save the changes to `ledger/triple-lock-vs-asylum-costs-report.html`.

This single change will apply the desired styling to the report's content without disrupting the page's overall structure, header, or footer.