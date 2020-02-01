const sumArr = (arr) => {
    let arr = [ 10, 1000, 3, 100, 4 ]
    var arr_sum = 0

    for (var i = 0; i < arr.length; i++){
        if (arr[i] < arr[i + 1]){
            var holder = arr[i]
            arr[i] = 0
            arr[i + 1] = holder * arr[i + 1]
        }
    }
    for (var j = 0; j < arr.length; j++){
        arr_sum += arr[j]
    }
    return arr_sum;
};
 
export const checkNumber = (str) => {
    if (!isNaN(parseInt(str))){
        return 1
    }
    units_dict = {
        "zero": 0, "one": 1, "two": 2, "three": 3, "four": 4, 
        "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9, 
        "ten": 10,  "eleven": 11, "twelve": 12, "thirteen": 13, 
        "fourteen": 14, "fifteen": 15, "sixteen": 16, 
        "seventeen": 17, "eighteen": 18, "nineteen": 19,
        "twenty": 20, "thirty": 30, "forty": 40, "fifty": 50, 
        "sixty": 60, "seventy": 70, "eighty": 80, 
        "ninety": 90, "hundred": 100, "thousand": 1000,
        "million": 1000000
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
            }
        };
    };

    let returnNumber = sumArr(arr_number);
    return (returnNumber)
};