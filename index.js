import { readFileSync } from "fs";

// Enter how many files you intend to read
function readFiles() {
        const configFile = readFileSync("config.json" , "utf8")
        const filesNamesObj = JSON.parse(configFile).files;
        filesNamesObj.forEach((e)=>{
            try {
            let textContent = readFileSync(e, {encoding:"utf-8"});
            let wordsCounter = 0;

            textContent.split(" ").forEach((e)=>{
                wordsCounter++;
            })

            console.log(`${e} : ${wordsCounter} words`);

            } catch (error) {
                try {
                    errorCounter(error);
                } catch (error) {
                    console.log(`
                    ##############################################################################################################################################################
                    Error has occured during attempt to read files childs of files folder : ${error}
                    ##############################################################################################################################################################`
                    )
                }
                
            }
        })

}

// When there is an error occured this function will try to solve the error by attempting to read the file caused error by using "utf-16le" unicode
function errorCounter(error) {
    let uniCodeFileText = readFileSync(`./files/${error.path}`,"utf-16le");

    let uniCodeWordsCounter = 0;
    uniCodeFileText.split(" ").forEach((e)=>{
        uniCodeWordsCounter++;
    })

    console.log(`${getFolderName("config.json",0)}/${error.path} : ${uniCodeWordsCounter} words`);
}

// Give it a config.json/any Json file and the index of the file name inside it and or Object name and will return it!
let getFolderName = (JSONOfTheFolder , fileNumber)=>{
    const configFile = readFileSync(`${JSONOfTheFolder}` , "utf8")
    const folderName = Object.keys(JSON.parse(configFile))[fileNumber];

    return folderName;
}

readFiles();
