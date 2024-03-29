import {CateModalAccess} from '../models/cate.model'
import ObjectUtils from './../utils/object'
export default class CateService {

    static save(data, id) {
        if (id) {
            const filterKeys = ["id"];
            if (!data.parentId) {
                filterKeys.push('parentId');
            }
            const dataItem = ObjectUtils.filter(data, filterKeys);
            return CateModalAccess.findByIdAndUpdate(id, dataItem)
        } 
        const cate = new CateModel(data)
        return cate.save()
    }

     static async tree () {
        const result = await CateModalAccess.all();
        const data = result.map(item => item.toJSON())
        const treeData = [];
        const findParent = (list, parentId) => {
            for (let item of list) {
                if (item._id.equals(parentId)) {
                    return item
                } else if (item.children?.length) {
                    const parent = findParent(item.children, parentId)
                    if(parent) {
                       return parent;
                    }
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