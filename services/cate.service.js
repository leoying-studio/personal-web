import CateModel from '../models/cate.model'

export default class CategoriesService {
    static save(data, id) {
        if (id) {
            return CateModel.update(id, data)
        } 
        const cate = new CateModel(data)
        return cate.save()
    }

     static async tree () {
        const result =  CateModel.all();

    }
}