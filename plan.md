# Project Refactoring Plan: Asset Organization

This document outlines the plan to refactor the project by separating CSS and JavaScript assets from the HTML files into a structured `assets` directory.

## 1. New Directory Structure

The first step is to create the new directory structure.

```
/
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── charts.js
├── index.html
├── ledger.html
├── commentary.html
└── fiscal-analysis-infographic.html
```

## 2. Asset Extraction

### CSS Extraction

The CSS from all HTML files will be consolidated into a single file: `assets/css/style.css`.

The following CSS rules will be extracted from the `<style>` blocks in `index.html`, `ledger.html`, `commentary.html`, and `fiscal-analysis-infographic.html`:

```css
body {
    font-family: 'Inter', sans-serif;
    background-color: #111827; /* bg-gray-900 */
    color: #d1d5db; /* text-gray-300 */
}
h1, h2, h3 {
    font-family: 'Lora', serif;
    color: #f9fafb; /* text-gray-50 */
}
.report-card {
    border: 1px solid #374151; /* border-gray-700 */
    transition: all 0.2s ease-in-out;
}
.report-card:hover {
    transform: translateY(-4px);
    border-color: #facc15; /* border-amber-400 */
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1);
}
.accent-text {
    color: #facc15; /* amber-400 */
}
.cta-button {
    background-color: #facc15; /* amber-400 */
    color: #111827; /* gray-900 */
}
.cta-button:hover {
    background-color: #f59e0b; /* amber-500 */
}
.commentary-card {
    border-left: 4px solid #38bdf8; /* border-sky-400 */
    transition: all 0.2s ease-in-out;
}
.commentary-card:hover {
    border-color: #7dd3fc; /* border-sky-300 */
    transform: translateY(-4px);
}
.chart-container {
    position: relative;
    width: 100%;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    height: 350px;
    max-height: 400px;
}
@media (max-width: 768px) {
    .chart-container {
        height: 300px;
    }
}
.stat-card h3 {
    color: #facc15; /* amber-400 */
}
.stat-card p.stat {
    color: #f9fafb; /* gray-50 */
}
.flow-arrow {
    font-size: 2rem;
    line-height: 1;
    color: #4b5563; /* gray-600 */
}
```

### JavaScript Extraction

The Chart.js code from `fiscal-analysis-infographic.html` will be moved to `assets/js/charts.js`.

The following JavaScript will be extracted from the `<script>` block:

```javascript
const tooltipTitleCallback = (tooltipItems) => {
    const item = tooltipItems[0];
    let label = item.chart.data.labels[item.dataIndex];
    if (Array.isArray(label)) {
        return label.join(' ');
    }
    return label;
};

const ledgerTheme = {
    primary: '#facc15',   // amber-400
    secondary: '#f59e0b', // amber-500
    light: '#4b5563',     // gray-600
    dark: '#1f2937',      // gray-800
    text: '#d1d5db',      // gray-300
};

const hotelCostCtx = document.getElementById('hotelCostChart').getContext('2d');
new Chart(hotelCostCtx, {
    type: 'doughnut',
    data: {
        labels: ['Hotel Accommodation Costs', 'Other Accommodation Costs', 'Population in Hotels', 'Population in Other Accommodation'],
        datasets: [{
            label: 'Cost Distribution',
            data: [76, 24],
            backgroundColor: [ledgerTheme.primary, ledgerTheme.dark],
            borderColor: '#111827',
            borderWidth: 4,
            circumference: 180,
            rotation: 270,
        }, {
            label: 'Population Distribution',
            data: [35, 65],
            backgroundColor: [ledgerTheme.secondary, ledgerTheme.light],
            borderColor: '#111827',
            borderWidth: 4,
            circumference: 180,
            rotation: 270,
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: ledgerTheme.text
                }
            },
            tooltip: {
                callbacks: {
                    title: tooltipTitleCallback,
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed !== null) {
                            label += context.parsed + '%';
                        }
                        return label;
                    }
                }
            },
        },
        cutout: '50%',
    }
});

const tripleLockCostCtx = document.getElementById('tripleLockCostChart').getContext('2d');
new Chart(tripleLockCostCtx, {
    type: 'bar',
    data: {
        labels: ['Current Additional Cost', 'Projected Additional Cost (2030)'],
        datasets: [{
            label: 'Additional Cost in £ Billions',
            data: [11, 15.5],
            backgroundColor: [ledgerTheme.secondary, ledgerTheme.primary],
            borderColor: [ledgerTheme.secondary, ledgerTheme.primary],
            borderWidth: 2,
            borderRadius: 8,
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        scales: {
            x: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Annual Cost (£ Billions)',
                    color: ledgerTheme.text,
                    font: { size: 14, weight: 'bold' }
                },
                grid: { color: '#374151' },
                ticks: { color: ledgerTheme.text }
            },
            y: {
                 grid: { display: false },
                 ticks: { color: ledgerTheme.text }
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: { callbacks: { title: tooltipTitleCallback } }
        }
    }
});
```

## 3. HTML Update Plan

All HTML files will be updated to remove the inline styles and scripts and link to the new external files.

### For all HTML files (`index.html`, `ledger.html`, `commentary.html`, `fiscal-analysis-infographic.html`):

1.  Remove the entire `<style>...</style>` block from the `<head>`.
2.  Add the following line inside the `<head>`:
    ```html
    <link rel="stylesheet" href="assets/css/style.css">
    ```

### For `fiscal-analysis-infographic.html`:

1.  Remove the entire `<script>...</script>` block from the end of the `<body>`.
2.  Add the following line just before the closing `</body>` tag:
    ```html
    <script src="assets/js/charts.js"></script>
    ```

## 4. Implementation Steps

Here is the step-by-step guide for implementation:

1.  **Create Directories**: Create the `assets/css` and `assets/js` directories.
2.  **Create CSS File**: Create the `assets/css/style.css` file and populate it with the consolidated CSS code.
3.  **Create JS File**: Create the `assets/js/charts.js` file and populate it with the Chart.js code.
4.  **Update `index.html`**:
    *   Remove the `<style>` block.
    *   Add `<link rel="stylesheet" href="assets/css/style.css">`.
5.  **Update `ledger.html`**:
    *   Remove the `<style>` block.
    *   Add `<link rel="stylesheet" href="assets/css/style.css">`.
6.  **Update `commentary.html`**:
    *   Remove the `<style>` block.
    *   Add `<link rel="stylesheet" href="assets/css/style.css">`.
7.  **Update `fiscal-analysis-infographic.html`**:
    *   Remove the `<style>` block.
    *   Add `<link rel="stylesheet" href="assets/css/style.css">`.
    *   Remove the `<script>` block containing the Chart.js code.
    *   Add `<script src="assets/js/charts.js"></script>` before the closing `</body>` tag.

This plan provides a clear path to refactoring the project for better organization and maintainability.