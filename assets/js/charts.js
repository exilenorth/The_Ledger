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