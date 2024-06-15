const api_key = "YOUR_API_KEY";
let base_uri = `https://api.getsirena.com/v1/prospects?api-key=${api_key}`
const fs = require('fs');

// format date
const formatDate = (date) => {
    return date.toISOString();
};

// Get monthly dates ranges array
const getMonthlyDatesRanges = (startDate, endDate) => {
    let currentDate = new Date(startDate);
    const dateRanges = []
    while (currentDate <= endDate) {
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        dateRanges.push({ start: startOfMonth, end: endOfMonth });
        currentDate.setMonth(currentDate.getMonth() + 1);
    }
    return dateRanges;
}

// Get data API
const getData = async (start, end) => {
    try{
        const response = await fetch(`${base_uri}&createdAfter=${start}&createdBefore=${end}`);
        console.log('Getting data between: ', start, end);
        console.log('Response state:', response.status);
        if(!response.ok){
            throw new Error('Error to get the API data');
        }
        const data = await response.json()
        return data
    }catch(error){
        console.log(error);
        return null;
    }
}

// Wait half minute 
const waitHalfMinute = () => new Promise(resolve => setTimeout(resolve, 30000));

// Get all data
const fetchAllData = async () => {
    const startDates = new Date('initial_date'); // initial date in format 2022-01-01T01:00:00.000Z
    const endDates = new Date(); // end date in format 2022-01-01T01:00:00.000Z
    const dateRanges = getMonthlyDatesRanges(startDates, endDates);

    let allData = [];
    // Go over all date ranges
    for (const dateRange of dateRanges) {
        const data = await getData(formatDate(dateRange.start), formatDate(dateRange.end));
        if(data){
            allData.push(data);
        }
        // esperar un minuto
        await waitHalfMinute();  
    }

    // save data in JSON file
    fs.writeFile('response.json', JSON.stringify(allData, null, 2), (err) => {
        if (err) {
            console.error('Erros to save the data in JSON file:', err);
        } else {
            console.log('Data saved in response.json');
        }
    });
}

fetchAllData()