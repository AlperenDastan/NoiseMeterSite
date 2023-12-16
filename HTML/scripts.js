// Mock data functions
function getTodaysSoundDataForBarChart() {
    // Preview of what the sound level could look like throughout a day 
    return [
        40, 75, 80, 85, 90, 95, 100, 95, 90,  // (08:00 to 16:00)
    ];
}

function getBarColors(noiseLevels) {
    return noiseLevels.map(level => {
        if (level <= 50) return 'rgba(54, 162, 235, 0.9)'; // Cooler color for low noise
        if (level <= 70) return 'rgba(255, 206, 86, 0.9)'; // Yellow for moderate noise
        if (level <= 85) return 'rgba(255, 159, 64, 0.9)'; // Orange for higher noise
        return 'rgba(255, 99, 132, 0.9)'; // Red for very high noise
    });
}

function getBorderColors(noiseLevels) {
    return noiseLevels.map(level => {
        if (level <= 50) return 'rgba(54, 162, 235, 1)'; // Cooler color for low noise
        if (level <= 70) return 'rgba(255, 206, 86, 1)'; // Yellow for moderate noise
        if (level <= 85) return 'rgba(255, 159, 64, 1)'; // Orange for higher noise
        return 'rgba(255, 99, 132, 1)'; // Red for very high noise
    });
}

const todaysBarData = getTodaysSoundDataForBarChart();

// Ensure 'timeLabels' is defined
const timeLabels = [
    '08:00', '09:00', 
    '10:00', '11:00', '12:00', '13:00', '14:00', 
    '15:00', '16:00',
];

// Initialize Bar Chart
const todaysSoundData = getTodaysSoundDataForBarChart();

const barChart = new Chart(document.getElementById('barChart'), {
    type: 'bar',
    data: {
        labels: timeLabels,
        datasets: [{
            label: 'Today\'s Sound Levels (dB)',
            data: todaysSoundData,
            backgroundColor: getBarColors(todaysSoundData),
            borderColor: getBorderColors(todaysSoundData),
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#fff'
                }
            },
            x: {
                ticks: {
                    color: '#fff'
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: '#fff'
                }
            }
        }
    }
});




// Initialize Line Chart
const lineChart = new Chart(document.getElementById('lineChart'), {
    type: 'line',
    data: {
        labels: timeLabels,
        datasets: [{
            label: 'Today\'s Sound Levels (dB)',
            data: todaysSoundData,
            borderColor: 'rgba(75, 192, 192, 1)', // Line color
            borderWidth: 2,
            fill: false // Don't fill the area under the line
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#fff'
                }
            },
            x: {
                ticks: {
                    color: '#fff'
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: '#fff'
                }
            }
        }
    }
});



// Function to create a Line Chart with random data
function createLineChart() {
    const ctx = document.getElementById('lineChart').getContext('2d');
    const data = {
        labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
        datasets: [{
            label: 'Line Chart',
            data: [Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false
        }]
    };
    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };
    new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });
}

// Function to create a Pie Chart with random data
function createPieChart() {
    const ctx = document.getElementById('pieChart').getContext('2d');
    const data = {
        labels: ['Label 1', 'Label 2', 'Label 3'],
        datasets: [{
            data: [Math.random() * 100, Math.random() * 100, Math.random() * 100],
            backgroundColor: ['rgba(255, 99, 132, 0.9)', 'rgba(54, 162, 235, 0.9)', 'rgba(255, 206, 86, 0.9)'],
        }]
    };
    new Chart(ctx, {
        type: 'pie',
        data: data
    });
}

// Function to create a Polar Area Chart with random data
function createPolarAreaChart() {
    const ctx = document.getElementById('polarAreaChart').getContext('2d');
    const data = {
        labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
        datasets: [{
            data: [Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100],
            backgroundColor: ['rgba(255, 99, 132, 0.9)', 'rgba(54, 162, 235, 0.9)', 'rgba(255, 206, 86, 0.9)', 'rgba(75, 192, 192, 0.9)', 'rgba(153, 102, 255, 0.9)'],
        }]
    };
    new Chart(ctx, {
        type: 'polarArea',
        data: data
    });
}

// Function to create a Radar Chart with random data
function createRadarChart() {
    const ctx = document.getElementById('radarChart').getContext('2d');
    const data = {
        labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
        datasets: [{
            label: 'Radar Chart',
            data: [Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: true
        }]
    };
    const options = {
        scales: {
            r: {
                beginAtZero: true
            }
        }
    };
    new Chart(ctx, {
        type: 'radar',
        data: data,
        options: options
    });
}



// Function to display the selected chart
function displayChart(chartType) {
    // Hide all charts
    const charts = ['barChart', 'lineChart', 'pieChart', 'polarAreaChart', 'radarChart', 'scatterChart'];
    charts.forEach(chart => {
        const chartCanvas = document.getElementById(chart);
        if (chartCanvas) {
            chartCanvas.style.display = 'none';
        }
    });

    // Show the selected chart
    const selectedChart = document.getElementById(chartType);
    if (selectedChart) {
        selectedChart.style.display = 'block';
    }

    // Call the corresponding function to create the chart
    switch (chartType) {
        case 'barChart':
            createBarChart();
            break;
        case 'lineChart':
            createLineChart();
            break;
        case 'pieChart':
            createPieChart();
            break;
        case 'polarAreaChart':
            createPolarAreaChart();
            break;
        case 'radarChart':
            createRadarChart();
            break;
        default:
            break;
    }
}




