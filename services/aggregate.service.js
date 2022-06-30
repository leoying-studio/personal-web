import ArticlesModal from './../models/articles.model'

export default class {

    static async query() {
       const recommend = await ArticlesModal.$findRecommend()
       const recently = await ArticlesModal.$limit3()
       return {
        recommend: recommend.map((item) => item.toJSON()),
        recently: recently.map((item) => item.toJSON())
       }
    }

}