import { connections } from "mongoose";

export default class Helper {
  
  static install(schema, options) {
  
    schema.statics.$pagingQuery = async function (
      pageNo = 0,
      pageSize = 9,
      condition = {}
    ) {
      const or = Object.entries(condition).map(([key, value]) => {
        const reg = new RegExp(value, "i");
        return {
          [key]: {
            $regex: reg,
          },
        };
      });

      const queryPipe = [
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
        }
      ]

      if (or.length) {
        queryPipe.unshift({
          $match: {
            $or: or,
          }
         })
      }

      const docs = await this.aggregate(queryPipe);
      const { count, data = [] } = docs[0] || {};
      return {
        data,
        count: count?.[0]?.total || 0,
      };
    };
  }
}
