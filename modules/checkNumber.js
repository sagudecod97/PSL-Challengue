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
 
const checkNumber = (str) => {
    if (!isNaN(parseInt(str))){
        return 1
    }
    units_dict = {
        "fifty": 50, "sixty": 60, "seventy": 70, "eighty": 80, "ninety": 90, "hundred": 100,
        "zero": 0, "one": 1, "two": 2, "three": 3, "four": 4, 
        "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9, 
        "ten": 10,  "eleven": 11, "twelve": 12, "thirteen": 13, 
        "fourteen": 14, "fifteen": 15, "sixteen": 16, 
        "seventeen": 17, "eighteen": 18, "nineteen": 19, "twenty": 20,
        "thousand": 1000, "million": 1000000
      }
    
    let len_str = str.length
    let length_iteration = 0
    let arr_number = []
    
    for (let i = 0; ; i++){
        if (len_str === length_iteration){
        break;
        } else if (i == 1 && length_iteration == 0){
            return ("Wrong Input")
        }
        for (var key in units_dict){
            if (str.slice(0, key.length) == key){
                arr_number.push(units_dict[key])
                str = str.slice(key.length, str.length)
                length_iteration += key.length
                break
            }
        };
    };
    let returnNumber = sumArr(arr_number);
    return (returnNumber)
};