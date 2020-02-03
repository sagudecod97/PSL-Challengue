/**
 * sumArr - Takes an array and add its elements
 * @arrCheck: Array to sum
 * Return: The sum of its elements
 */

const sumArr = (arrCheck) => {
    var arr = arrCheck
    var arr_sum = 0

    for (var i = 0; i < arr.length; i++){
    
        if (arr[i + 1] == 1000 && arr[i].toString().length < 2){
            var holder = arr[i]
            arr[i + 1] = holder * 1000
            arr[i] = 0
        } else if (arr[i].toString().length >= 4){
            continue
        } else if ((arr[i] < arr[i + 1])){
            var holder = arr[i]
            arr[i] = 0
            arr[i + 1] = holder * arr[i + 1]
        } else if ((arr[i] > arr[i + 1])){
            arr[i + 1] = arr[i + 1] + arr[i]
            arr[i] = 0
        }
    }
    for (var j = 0; j < arr.length; j++){
        arr_sum += arr[j]
    }
    return arr_sum;
};

/**
 * checkNumber - checks if the string pass is an integer or a valid word number
 * @str: String to test
 * Return: 1 if it already a int as string, the number represented by the string or "Wrong input" on failure
 */
 
const checkNumber = (str) => {
    // If the string is parsed as an int and the function isNaN returns false it means that the string
    // already represent an integer
    if (!isNaN(parseInt(str))){
        return 1
    }
    units_dict = {
        "twenty": 20, "thirty": 30, "fourty": 40, "fifty": 50, "sixty": 60, "seventy": 70, "eighty": 80, 
        "ninety": 90, "hundred": 100, "zero": 0, "one": 1, "two": 2, "three": 3, "four": 4, "five": 5, 
        "six": 6, "seven": 7, "eight": 8, "nine": 9, "ten": 10,  "eleven": 11, "twelve": 12, "thirteen": 13, 
        "fourteen": 14, "fifteen": 15, "sixteen": 16, "seventeen": 17, "eighteen": 18, "nineteen": 19, 
        "thousand": 1000, "million": 1000000
      }
    
    let len_str = str.length
    let length_iteration = 0
    let arr_number = []
    
    for (let i = 0; ; i++){
        if (len_str === length_iteration){
            // If the length of the string is equal as the length of the length iteration variable
            // means that the word as string has been converted to an array of its numbers
            break;
        } else if (i == 1 && length_iteration == 0){
            // If before the first iteration length_iteration is equal to zero it means that the input is invalid
            // because there wasn't any match with unit_dict keys
            return ("Wrong Input")
        }
        for (var key in units_dict){
            // if the slice of the string passed is equal to the key there's a match
            if (str.slice(0, key.length) == key){
                // The value of the is gonna be passed to the array
                arr_number.push(units_dict[key])
                //The string is going to be reduce in its length until the first letter of the next word
                str = str.slice(key.length, str.length)
                // The key length is going to be added
                length_iteration += key.length
                break
            }
        };
    };
    // SumArr it's going to return the number represented by the string as integer
    let returnNumber = sumArr(arr_number);
    return (returnNumber)
};


/* Functions to handle the promises */

async function getHandler(){
    try {
        // Make the request to the Firebase API
        const response = await fetch("https://psltusavirus.firebaseio.com/states.json")
        // .json() is method available in the response, and store the data returned
        const responseData = await response.json()
        const states = []

        for (const key in responseData){
            states.push({"stateName": responseData[key].state, "numVictims": responseData[key].numVictims})
        };
    
        return states;
    }
    catch(err) {
        console.log("There's been an Error 'GET'", err);
    }
}

async function postHandler(request){
    try {
        fetch("https://psltusavirus.firebaseio.com/states.json", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                // Serialize a javasctipt object into a string
                body: JSON.stringify({
                    state: request.stateName,
                    numVictims: request.numVictims
                })
            })
    }
    catch(err){
        console.log("There's been an Error", err);
    }
}

/*  Register the events of the DOM  */

window.addEventListener("load", ()=>{
    var stateToll = {
        stateName: "",
        numVictims: ""
    };

    // Click event for the State (Select field)
    let stateClick = document.getElementById("state")
    stateClick.addEventListener("click", (select) => {
        // Going to add the value of any of the fields of select
        stateToll.stateName = select.target.value
    })
    
    // Input event for the Sick people input
    let numSick = document.getElementById("num_sick")
    numSick.addEventListener("input", (input)=>{
        // Going to add the value of the input, the verification of a correct input
        // it's going to be made into the save event
        stateToll.numVictims = input.target.value
    })

    // Click event for the Save button
    let saveClick = document.getElementById("save")
    saveClick.addEventListener("click", async ()=>{
        let isNumOk = checkNumber(stateToll.numVictims)
        var states = await getHandler()
        let checkStateIn = states.find((state) => state.stateName == stateToll.stateName)

        // Checks if the any state has been selected
        if (stateToll.stateName == "empty"){
            alert("The state name is empty, please select a State");    
            return;
        }

        // Checks if the number of victims is empty
        if (stateToll.numVictims.length == 0){
            alert("Please, fill the sick people input");
            return;
        }

        // Checks if the state info has been already uploaded
        if (checkStateIn != undefined){
            alert("State info has been already uploaded");
            document.getElementById("num_sick").value = "";
            return;
        }

        // Checks if the input of victims was pass as an integer
        if (isNumOk == 1){
            // Function that handlest the POST request
            stateToll.numVictims = parseInt(stateToll.numVictims)
            postHandler(stateToll)
            document.getElementById("num_sick").value = ""
            stateToll.numVictims = ""
        } else if(!isNaN(isNumOk)){
            // Checks if the value returned by checkNumber is an int
            stateToll.numVictims = isNumOk
            postHandler(stateToll)
            document.getElementById("num_sick").value = ""
            stateToll.numVictims = checkNumber(stateToll.numVictims)
        } else {
            alert("Not a number, please fix the input.")
        }
    })

    //Click event for the Calculate button
    let calculateClick = document.getElementById("calculate")
    calculateClick.addEventListener("click", async ()=>{
        let states = await getHandler();
        let totalCountry = 0

        states.forEach((state) => totalCountry += state.numVictims)

        // Sets the display property to 'block'
        document.getElementById("output-calculate").style.display = "block"
        // Set the innerHTML to the total victims of the country
        document.getElementById("total-country").innerHTML = totalCountry 
    })

    //Click envent for state victims (select state)
    let stateVictimsClick = document.getElementById("state-victims")
    stateVictimsClick.addEventListener("click",  async (select) => {
        state = select.target.value
        
        if (state != "empty"){
            let states = await getHandler();
            // Finds the element that matches the value of the state selected
            let numVictimsState = states.find((elem) => elem.stateName == state)

            // Set the innetHTML as the number of victims of the state
            document.getElementById("total-state").innerHTML = numVictimsState.numVictims
        }
    })
})