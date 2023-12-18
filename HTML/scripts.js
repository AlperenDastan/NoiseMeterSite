const baseUrl = "https://noisemeterrestapi.azurewebsites.net/api/NoiseMeters/daily"; // Replace with your API URL

// Ensure 'timeLabels' is defined
const timeLabels = [
    '08:00', '09:00',
    '10:00', '11:00', '12:00', '13:00', '14:00',
    '15:00', '16:00',
];

let selectedDate = undefined;
let barChart = undefined;
let lineChart = undefined;

let data = [];
Initialize(selectedDate);
setInterval(() => Initialize(selectedDate), 15000); // every 15 seconds, run it again


/********** INITIALIZE **********/
async function Initialize(queryDate) {
    console.log(document.getElementById('barChart'));
    console.log(document.getElementById('lineChart'));

    selectedDate = queryDate;
    getDailyDataFromApi(queryDate).then((x) => {
        todaysBarData = x;
        todaysSoundData = x;
        data = x;

        console.log("Got data", todaysBarData, todaysSoundData)

        if (barChart) {
            barChart.data.datasets[0].data = x;
            barChart.data.datasets[0].backgroundColor = getBarColors(x);
            barChart.data.datasets[0].borderColor = getBorderColors(x);
            barChart.update();

        }

        if (lineChart) {
            lineChart.data.datasets[0].data = x;
            lineChart.data.datasets[0].backgroundColor = getBarColors(x);
            lineChart.data.datasets[0].borderColor = getBorderColors(x);
            lineChart.update();
        }

        if (!barChart && !lineChart) {
            if (document.getElementById('barChart'))
                InitializeBarChart();

            if (document.getElementById('lineChart'))
                InitializeLineChart();
        }

    });
}


/********** DATA/API **********/
async function getDailyDataFromApi(queryDate) {
    let url = baseUrl; // Base URL of your API endpoint

    // Append the date to the URL if it's provided
    if (queryDate) {
        const queryString = new URLSearchParams({ queryDate }).toString();
        url += `?${queryString}`;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        return []; // Return an empty array in case of an error
    }
}


/********** CHART **********/
function InitializeBarChart() {
    barChart = new Chart(document.getElementById('barChart'), {
        type: 'bar',
        data: {
            labels: timeLabels,
            datasets: [{
                label: 'Today\'s Sound Levels (dB)',
                data: data,
                backgroundColor: getBarColors(data),
                borderColor: getBorderColors(data),
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

function InitializeLineChart() {
    lineChart = new Chart(document.getElementById('lineChart'), {
        type: 'line',
        data: {
            labels: timeLabels,
            datasets: [{
                label: 'Today\'s Sound Levels (dB)',
                data: data,
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
}

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




