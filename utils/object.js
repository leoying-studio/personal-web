export default class ObjectUtils {

    static filter(elems, filterKeys = []) {
        const newElems = {}
        for (let i in elems) {
            const some = filterKeys.some(item => item === i)
            if (!some) {
                newElems[i] = elems[i]
            }
        }
        return newElems
    }
    
}