var dataSource =  [
    {
        label: '课程',
        children: [
            {
                label: '外语',
                children: [
                    {
                        label: '英语',
                        children: [
                            {
                                label: '托福',
                            },
                            {
                                label: '雅思',
                            }
                        ]
                    },
                    {
                        label: '日语',
                        children: [
                          
                        ],
                    }
                ],
            },
           {
               label: "语文",
               children: []
           }
        ],
      
    },
    {
        label: '2',
        children: [
            {
                label: '22',
            }
        ]
    }
]

var a = $('#selectorTree').selectorTree(dataSource)