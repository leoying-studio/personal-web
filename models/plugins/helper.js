import { connections } from "mongoose";

export default class Helper {

  static install(schema, options) {
    // register pagingQuery method
    schema.statics.$pagingQuery = async function (
      pageNo = 0,
      pageSize = 9,
      condition = {}
    ) {
      const or = Object.entries(condition).map(([key, value]) => {
        const reg = new RegExp(value, 'i')
        return {
           [key]: {
             $regex: reg
           }
        }
      })
      const docs = await this.aggregate([
        {
          $match: {
            $or: or
          },
        },
        {
          
          $facet: {
            count: [
              {
                $count: "total",
              },
            ],
            data: [
              { $skip: Number(pageNo) * Number(pageSize) },
              { $limit: Number(pageSize) },
              {
                $sort: {
                  _id: -1,
                },
              },
            ],
          },
        },
      ]);
      const { count, data = [] } = docs[0] || {};
      return {
        data,
        count: count?.[0]?.total || 0,
      };
    };
  }
}
