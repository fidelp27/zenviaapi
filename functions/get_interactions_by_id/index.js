

const api_key = "YOUR_API_KEY";


const fs = require('fs');

const saveDataJson = (data, number)=>{
    // Save data in json format
    fs.writeFile(`API_Zenvia/getProspectsInteractionsByID/interactions${number}.json`, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Error to save file:', err);
        } else {
            console.log(`Data saved in interactions${number}.json`);
        }
    });
}
const getData = async (prospectID) => {
    const uri = `https://api.getsirena.com/v1/prospect/${prospectID}/interactions?api-key=${api_key}&format=json`
    try{
        const response = await fetch(uri);
        if(!response.ok){
            throw new Error('Error to get the API data');
        }
        const data = await response.json()
        // Process data to get output field as an object
        const processedData = {};
        data.length > 0 && data.forEach(item => {
            const { id, ...rest } = item;
            processedData[id] = {
                ...rest,
                output: JSON.parse(JSON.stringify(item.output))  
            };
        });

        // Create an object with the prospectID as key and the processed data as value
        const finalData = {
            [prospectID]: processedData
        };
        return finalData;
    }catch(error){
        console.log(error);
        return null;
    }
}

const processProspects = async () => {
    // Adjust the path to your file
    const prospectsList = require('YOUR FILE PATH');  
    let allData = {};
    let count = 1;
    let cicle = 1;
    for (const prospectGroup of prospectsList) {
        for (const prospect of prospectGroup) {
            const prospectId = prospect.id;
            console.log(`Fetching data for prospectId: ${prospectId}`);
            const data = await getData(prospectId);
            if (data) {
                allData = { ...allData, ...data };
                count++;
                // Every 1000 prospects, save the data in a new file
                if(count % 1000 === 0){
                    saveDataJson(allData, cicle);
                    allData = {};
                    cicle++;
                }
            }
        }
    }
}
processProspects();