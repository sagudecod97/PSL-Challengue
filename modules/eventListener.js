window.addEventListener("load", ()=>{
    var stateToll = {
        stateName: "",
        numVictims: ""
    };

    let stateClick = document.getElementById("state")
    stateClick.addEventListener("click", (select) => {
        stateToll.stateName = select.target.value
    })
    
    let numSick = document.getElementById("num_sick")
    numSick.addEventListener("input", (input)=>{
        stateToll.numVictims = input.target.value
    })

    let saveClick = document.getElementById("save")
    saveClick.addEventListener("click", ()=>{
        let isNumOk = checkNumber(stateToll.numVictims)
        if (isNumOk == 1){
            // Made the post
            document.getElementById("num_sick").value = ""
            console.log(stateToll)
        } else if(!isNaN(isNumOk)){
            document.getElementById("num_sick").value = ""
            stateToll.numVictims = checkNumber(stateToll.numVictims)
            console.log(stateToll)
        } else {
            alert("Not a number, please fix the input.")
        }
    })
})