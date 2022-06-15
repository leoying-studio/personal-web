export default class Sort {
    quick = (arr) => {
        if(arr.length<=1){return arr;}
 
        const pivotIndex = Math.floor(arr.length/2);
        const pivot = arr.splice(pivotIndex,1)[0];
    
        const left = [];
        const right = [];
    
        for(const i=0;i<arr.length;i++){
            if(arr[i]<pivot){
                left.push(arr[i]);
            }else{
                right.push(arr[i]);
            }
        }
       return quickSort(left).concat([pivot],quickSort(right));
    }
}