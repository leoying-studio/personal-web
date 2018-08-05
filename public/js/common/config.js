define(['jquery'], function ($) {
    var _defaultConfig = {
        toolbar: '#toolbar',
        methods: 'get',
        dataType: 'json',
        pageSize: 10,
        singleSelect: true,
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: false,                    //是否启用排序
        search: true, 
        showRefresh: true,     
        clickToSelect: false,
        align: 'center',  
        pagination: true,
        pageList: [10, 20, 50, 100]		
    }
    

    var theme = function(events, params) {
        var options = {
            url: '/intro/themes/data',
            columns: [
                {
                    field: 'illustrating',
                    title: '主题图',
                    width:　'400px'
                },
                {
                    field: 'headline',
                    title: '主题标题'
                },
                {
                    title: '操作',
                    events: events,
                    formatter: function(e, item, i) {
                        return "<a href='#' class='label label-info' name='edit' >编辑</a>" + 
                        "<a href='#' class='label label-danger' style='margin: 0 5px;' name='destory'>删除</a>"
                }
              }
            ]
        }
        return Object.assign({}, _defaultConfig, options, params || {});
    }

    var themeList = function(events, params, params) {
        var options = {
            url: '/intro/themes/map/data/' + params,
            columns: [
                {
                    field: 'presentation',
                    title: '陈述',
                    width:　'400px'
                },
                {
                    field: 'discriptiveGraph',
                    title: '描述图'
                },
                {
                    title: '操作',
                    events: events,
                    formatter: function(e, item, i) {
                        return "<a href='#' class='label label-info' name='edit' >编辑</a>" + 
                        "<a href='#' class='label label-danger' style='margin: 0 5px;' name='destory'>删除</a>"
                }
              }
            ]
        }
        return Object.assign({}, _defaultConfig, options, params || {});
    }


    var categories = function(events, params) {
        var options = {
            url: '/categories/data',
            columns: [
                {
                    field: 'name',
                    title: '名称',
                    width:　'400px'
                },
                {
                    field: 'time',
                    title: '创建时间'
                },
                {
                    title: '操作',
                    events: events,
                    formatter: function(e, item, i) {
                        return "<a href='#' class='label label-info' name='edit' >编辑</a>" + 
                        "<a href='#' class='label label-danger' style='margin: 0 5px;' name='destory'>删除</a>"
                }
              }
            ]
        }
        return Object.assign({}, _defaultConfig, options, params || {});
    }


    var subcategories = function(events, params, data) {
        var options = {
            data: data,
            columns: [
                {
                    field: 'name',
                    title: '名称',
                    width:　'400px'
                },
                {
                    title: '操作',
                    events: events,
                    formatter: function(e, item, i) {
                        return "<a href='#' class='label label-info' name='edit' >编辑</a>" + 
                        "<a href='#' class='label label-danger' style='margin: 0 5px;' name='destory'>删除</a>"
                }
              }
            ]
        }
        return Object.assign({}, _defaultConfig, options, params || {});
    }

    var articles = function(events, options, params) {
        var options = {
            url: '/articles/data/' + params,
            columns: [
                {
                    field: 'title',
                    title: '文章标题',
                },
                {
                    field: 'description',
                    title: '文章说明',
                },
                {
                    field: 'illustration',
                    title: '文章配图',
                },
                {
                    field: 'recommend',
                    title: '是否推荐'
                },
                {
                    field: 'recommendFigure',
                    title: '推荐图'
                },
                {
                    field: 'content',
                    title: '文章内容'
                },
                {
                    title: '操作',
                    events: events,
                    formatter: function(e, item, i) {
                        return "<a href='#' class='label label-info' name='edit' >编辑</a>" + 
                        "<a href='#' class='label label-danger' style='margin: 0 5px;' name='destory'>删除</a>"
                }
              }
            ]
        }
        return Object.assign({}, _defaultConfig, options, params || {});
    }


    return {
        table: {
            categories: categories,
            theme: theme,
            themeList: themeList,
            subcategories: subcategories,
            articles: articles
        } 
    }
});