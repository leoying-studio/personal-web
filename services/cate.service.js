import CateModel from '../models/cate.model'

export default class CateService {

    static save(data, id) {
        if (id) {
            return CateModel.update(id, data)
        } 
        const cate = new CateModel(data)
        return cate.save()
    }

     static async tree () {
        const result = await CateModel.all();
        const data = result.map(item => item.toJSON())
        const treeData = [];
        const findParent = (list, parentId) => {
            for (let item of list) {
                if (item._id.equals(parentId)) {
                    return item
                } else if (item.children?.length) {
                   return findParent(item.children, parentId)
                }
            }
            return null
        }
        data.forEach(element => {
            const node = {
                ...element,
                children: []
            }
            if (!element.parentId) {
                treeData.push(node)
            } else {
                const parent = findParent(treeData, element.parentId)
                if (parent) {
                    parent.children.push(node)
                } 
            }
        });
        return treeData;
    }
    
}