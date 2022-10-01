let ValueInChar = "";
let dictionary = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','!','@','#','$','%','&','*','(',')','_','+','-','=','{','}','[',']','|',';',':','<','>','?','/','.',' ',','];
let finded = false;
let workers = [];

const createHash = () => {
    count=0;
    const text = document.getElementById('inputText').value;
    const workersQuantity = document.getElementById('inputNWorkers').value;

    startBruteForce(text, workersQuantity);
}

const startBruteForce = (hash, workersQuantity) => {
    document.getElementById("btn").hidden = true;
    for(let i = 0; i < workersQuantity; i++) {
        // Create a new worker
        const worker = new Worker('encrypter.js');
        //WorkerPostMessage
        if(!finded) {
            worker.postMessage(getValue());
        }
        //WorkerOnMessage
        worker.onmessage = (e) => {

            document.getElementById('labelCurrentValue').innerHTML = e.data.text;
            if(hash == e.data.hash) {
                finded = true;
                console.clear();
                console.log('Hash found: ' + e.data.text);
                document.getElementById('labelCurrentValue').hidden = true;
                document.getElementById('resultInput').innerHTML = "The word is: " + e.data.text;
                document.getElementById('btn').hidden = false;
            }
            else{
                if(!finded) {
                    worker.postMessage(getValue());
                }
            }
        }
        // Add the worker to the array
        workers.push(worker);
    }
}

const dec2bin = (dec) => {
    return (dec >>> 0).toString(2);
}

const binaryAgent= (str)=>  {

    var newBin = str.split(" ");
    var binCode = [];
    
    for (i = 0; i < newBin.length; i++) {
        binCode.push(String.fromCharCode(parseInt(newBin[i], 2)));
    }
    return binCode.join("");
}

const getValue = () => {    
    
    //if is the first time
    if(ValueInChar == "") {
        ValueInChar = dictionary[0];
        return ValueInChar;
    }

    ValueInChar = incrementCharValue(ValueInChar);
    
    return ValueInChar;
}

incrementCharValue = (text) => {
    if(text[text.length-1] == dictionary[dictionary.length-1]) {
        if(!text[text.length-2]){
            text = addNewFirstElement(text);
        }
        else{
            text = incrementCharValue(text.slice(0,-1)) + dictionary[0];
        }
        return text;
    }
    text = text.slice(0,-1) + dictionary[dictionary.indexOf(text[text.length-1]) + 1];
    return text;
}

const addNewFirstElement = (text) => {
    for(let i=0;i<text.length;i++){
        text[i] = dictionary[0];
    }
    let res = dictionary[0] + text;
    return res;
}