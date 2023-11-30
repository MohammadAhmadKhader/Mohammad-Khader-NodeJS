import { readFileSync } from "fs";
import config from "./config.json" assert { type: "json" };

function readFiles() {
    try {
        const data = config.files;
        data.forEach((e)=>{
            // Removing the quotes from text
            let filePath = JSON.stringify(e);
            let newFilePath =  filePath.slice(1,-1);

            let fileText = readFileSync(newFilePath);
            let space = " ";
            let wordsCounter = 0;
            let doesHaveAValidString = false;
            for (let str of fileText) {
                if(str >= 65 && str <= 90 || str >= 97 && str <= 122 ) {
                    doesHaveAValidString = true;
                }
                if(String.fromCharCode(str) === space){
                    wordsCounter++;
                };  
            }
            // This condition made in case there are no sapces and at least one letter was found
            if(doesHaveAValidString && wordsCounter === 0){
                wordsCounter = 1;
            }
            console.log(`${newFilePath} : ${wordsCounter} words`);
        })
    } catch (error) {
        console.log(`
        ###############################################################################
        Error has occured during attempt to read files childs of files folder : ${error}
        ###############################################################################`)
    }
}

readFiles();