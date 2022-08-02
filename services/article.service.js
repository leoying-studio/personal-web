import {ArticlesModal, ArticleModalAccess } from '../models/articles.model'
import ObjectUtils from './../utils/object'

export default class CateService {

    static save(data, id) {
        if (id) {
            const filterKeys = ["id"];
            const dataItem = ObjectUtils.filter(data, filterKeys);
            return ArticleModalAccess.findByIdAndUpdate(id, dataItem)
        }
       const article = new ArticlesModal(data)
       return article.save()
    }
    
}