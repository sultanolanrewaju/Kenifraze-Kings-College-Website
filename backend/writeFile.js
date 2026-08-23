const fs = require("fs").promises;

async function openFile(){
    try {
        const csvHeaders = "name,quantity,price"
        await fs.writeFile("groceries.csv",csvHeaders)
    } catch (error) {
     console.log("Error writing to file :" + error);
            
    }
}