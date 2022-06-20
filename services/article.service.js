import ArticeModel from '../models/articles.model'
import ObjectUtils from './../utils/object'

export default class CateService {

    static save(data, id) {
        if (id) {
            const filterKeys = ["id"];
            const dataItem = ObjectUtils.filter(data, filterKeys);
            return ArticeModel.$findByIdAndUpdate(id, dataItem)
        }
       const article =  new ArticeModel(data)
       return article.save()
    }
    
}