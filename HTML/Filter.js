function filterByDateTime(selectedDate) {
    const selectedDateTime = new Date(selectedDate);
    const selectedDay = selectedDateTime.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday

    // Filter the dataset based on the selected date and time range
    const filteredData = dataset.filter(entry => {
        const entryDateTime = new Date(`${entry.date}T${entry.time}`);
        const entryDay = entryDateTime.getDay();

        // Check if the day is the same and the time is within the specified range (8 AM to 4 PM)
        return entryDay === selectedDay && entryDateTime.getHours() >= 8 && entryDateTime.getHours() <= 16;
    });

    // Assuming you have a function to display the filtered data, replace it with your actual display function.
    displayFilteredData(filteredData);
}


// Mock data
let dataset = [
    // Day 1
    { date: '2023-12-13', time: '08:00', value: 30 },
    { date: '2023-12-13', time: '09:00', value: 40 },
    { date: '2023-12-13', time: '10:00', value: 50 },
    { date: '2023-12-13', time: '11:00', value: 60 },
    { date: '2023-12-13', time: '12:00', value: 70 },
    { date: '2023-12-13', time: '13:00', value: 80 },
    { date: '2023-12-13', time: '14:00', value: 90 },
    { date: '2023-12-13', time: '15:00', value: 100 },
    { date: '2023-12-13', time: '16:00', value: 95 },

    // Day 2
    { date: '2023-12-14', time: '08:00', value: 35 },
    { date: '2023-12-14', time: '09:00', value: 45 },
    { date: '2023-12-14', time: '10:00', value: 55 },
    { date: '2023-12-14', time: '11:00', value: 65 },
    { date: '2023-12-14', time: '12:00', value: 75 },
    { date: '2023-12-14', time: '13:00', value: 85 },
    { date: '2023-12-14', time: '14:00', value: 95 },
    { date: '2023-12-14', time: '15:00', value: 82 },
    { date: '2023-12-14', time: '16:00', value: 88 },

    // Day 3
    { date: '2023-12-15', time: '08:00', value: 40 },
    { date: '2023-12-15', time: '09:00', value: 50 },
    { date: '2023-12-15', time: '10:00', value: 60 },
    { date: '2023-12-15', time: '11:00', value: 70 },
    { date: '2023-12-15', time: '12:00', value: 80 },
    { date: '2023-12-15', time: '13:00', value: 90 },
    { date: '2023-12-15', time: '14:00', value: 100 },
    { date: '2023-12-15', time: '15:00', value: 72 },
    { date: '2023-12-15', time: '16:00', value: 78 },

    // Day 4
    { date: '2023-12-16', time: '08:00', value: 45 },
    { date: '2023-12-16', time: '09:00', value: 55 },
    { date: '2023-12-16', time: '10:00', value: 65 },
    { date: '2023-12-16', time: '11:00', value: 75 },
    { date: '2023-12-16', time: '12:00', value: 85 },
    { date: '2023-12-16', time: '13:00', value: 95 },
    { date: '2023-12-16', time: '14:00', value: 82 },
    { date: '2023-12-16', time: '15:00', value: 72 },
    { date: '2023-12-16', time: '16:00', value: 68 },

    // Day 5
    { date: '2023-12-17', time: '08:00', value: 50 },
    { date: '2023-12-17', time: '09:00', value: 60 },
    { date: '2023-12-17', time: '10:00', value: 70 },
    { date: '2023-12-17', time: '11:00', value: 80 },
    { date: '2023-12-17', time: '12:00', value: 90 },
    { date: '2023-12-17', time: '13:00', value: 100 },
    { date: '2023-12-17', time: '14:00', value: 82 },
    { date: '2023-12-17', time: '15:00', value: 72 },
    { date: '2023-12-17', time: '16:00', value: 78 },
    // Add more data as needed
];

function displayFilteredData(filteredData) {
    const chartContainer = document.querySelector('.chart-container');
    const barChartCanvas = document.getElementById('barChart');
    const filteredDataDisplay = document.getElementById('filteredDataDisplay');

    // Destroy the existing chart if it exists
    if (barChartCanvas.chart) {
        barChartCanvas.chart.destroy();
    }

    // Hide the bar chart canvas and show the filtered data display div
    barChartCanvas.style.display = 'none';
    filteredDataDisplay.style.display = 'block';

    // Create a new chart for filtered data
    const filteredChartCanvas = document.createElement('canvas');
    filteredChartCanvas.id = 'filteredChart';
    filteredDataDisplay.innerHTML = '';  // Clear previous content
    filteredDataDisplay.appendChild(filteredChartCanvas);

    // Prepare data for the new chart
    const filteredLabels = filteredData.map(entry => entry.time);
    const filteredValues = filteredData.map(entry => entry.value);

    // Create the new chart with the same color scheme as the original chart
    const filteredChart = new Chart(filteredChartCanvas, {
        type: 'bar',
        data: {
            labels: filteredLabels,
            datasets: [{
                label: 'Filtered Sound Levels (dB)',
                data: filteredValues,
                backgroundColor: getBarColors(filteredValues),
                borderColor: getBorderColors(filteredValues),
                borderWidth: 1
            }]
        },
        options: {
            // Your chart options go here.
        }
    });
}

// Your other functions (filterByDateTime, getBarColors, getBorderColors, resetChart, etc.) go here...


function filterByDateTime(selectedDate) {
    const selectedDateTime = new Date(selectedDate);
    const selectedDay = selectedDateTime.getDay();

    const filteredData = dataset.filter(entry => {
        const entryDateTime = new Date(`${entry.date}T${entry.time}`);
        const entryDay = entryDateTime.getDay();

        return entryDay === selectedDay && entryDateTime.getHours() >= 8 && entryDateTime.getHours() <= 16;
    });

    // Call the defined function
    displayFilteredData(filteredData);
}

// Your other functions (displayChart, createChart, etc.) go here...

// Reset function
function resetChart() {
    const barChartCanvas = document.getElementById('barChart');
    const filteredDataDisplay = document.getElementById('filteredDataDisplay');
    const dateFilterInput = document.getElementById('dateFilter');

    // Show the bar chart canvas and hide the filtered data display div
    barChartCanvas.style.display = 'block';
    filteredDataDisplay.style.display = 'none';

    // Reset the date filter input
    dateFilterInput.value = '';

    // Destroy the existing filtered chart if it exists
    if (filteredDataDisplay.chart) {
        filteredDataDisplay.chart.destroy();
    }
}
// Rest of the code remains the same...
