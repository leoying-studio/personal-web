import ArticeModel from '../models/articles.model'

export default class CateService {

    static save(data, id) {
        if (id) {
            return ArticeModel.update(id, data)
        }
       const article =  new ArticeModel(data)
       return article.save()
    }
}