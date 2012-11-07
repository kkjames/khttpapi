/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-10-16
 * Time: 上午10:03
 * To change this template use File | Settings | File Templates.
 */
var entityType = require('./entityType')
    , kutil = require('kutil')
    , _DateFormat = "Y/m/d";
module.exports = function extModel(entity) {
    var _this = this;
    //_this.properties = entity.properties;
    _this.destroy = entity.attr.destroy;
    _this.update = entity.attr.update;
    _this.name = entity.name;
    _this.base_url = '/backmanage/entity/member';
    _this.title = entity.title;
    //遍历得到查询条件面板内容
    _this.queryItems = new Array();
    //遍历得到查询条件字段名称
    _this.queryItemNames = new Array();
    //列
    _this.columns = new Array();
    //字段
    _this.fields = new Array();
    //验证器
    _this.validations = new Array();
    //////添加
    _this.addInfoItems = new Array();
    //////修改
    _this.editInfoItems = new Array();
    //////详细
    _this.showInfoItems = new Array();
    //循环的索引
    var index = 0;
    for (var k in entity.properties) {
        var item = entity.properties[k];
        var itemXtype = util.getXType(item.type, item.enum);
        //fields
        var field = {
            name:k,
            type:item.type
        };
        if (item.type === "date") {
            field.dateFormat = _DateFormat;
        }
        _this.fields.push(field);

        //validations
        if (util.isTrue(item.minlen)) {
            var validation = {
                type:'length',
                field:k,
                min:item.minlen
            }
            _this.validations.push(validation);
        }

        if (util.isTrue(item.maxlen)) {
            var validation = {
                type:'length',
                field:k,
                max:item.maxlen
            }
            _this.validations.push(validation);
        }
        //  enum数据源
        var comStore;
        if (item.enum) {
            var data = new Array();
            for (var enumItem in item.enum) {
                var dataItem = {
                    value:enumItem,
                    name:item.enum[enumItem]
                }
                data.push(dataItem);
            }
            comStore = {
                xtype:'store',
                fields:['value', 'name'],
                data:data
            };
        }


        //查询条件
        if (util.isTrue(item.filter)) {
            var id = "qi-" + k;
            var queryItem = {
                id:id,
                name:k,
                fieldLabel:item.title,
                labelWidth:item.title.length * 15,
                xtype:itemXtype
            };
            //如果是combobox构造combobox
            if (itemXtype === "combobox") {
                //枚举状态下的combobox
                if (item.enum) {
                    queryItem.store = comStore;
                    queryItem.editable = false;
                    queryItem.displayField = 'name';
                    queryItem.valueField = 'value';
                }
            }
            _this.queryItems.push(queryItem);

            var queryItemName = {
                key:k,
                id:id
            }
            _this.queryItemNames.push(queryItemName);
        }


        if (util.isTrue(item.list)) {
            //列
            var column = {
                header:item.title,
                dataIndex:k,
                flex:1,
                sortable:util.isTrue(item.sort)
            }
            if (util.isTrue(item.edit)) {
                column.editor = {
                    xtype:itemXtype,
                    allowBlank:!util.isTrue(item.required)
                }
                if (item.type === "date") {
                    column.editor.format = _DateFormat;
                }
                //如果是combobox构造combobox
                if (itemXtype === "combobox") {
                    //枚举状态下的combobox
                    if (item.enum) {
                        column.editor.store = comStore;
                        column.editor.displayField = 'name';
                        column.editor.valueField = 'value';
                        column.editor.editable = false;
                    }
                }
            }
            if (util.isTrue(item.minlen)) {
                column.editor.minLength = item.minlen;
                column.editor.minLengthText = '该字段内容最小长度为{0}';
            }
            if (util.isTrue(item.maxlen)) {
                column.editor.enforceMaxLength = true;
                column.editor.maxLength = item.maxlen;
                column.editor.maxLengthText = '该字段内容最大长度为{0}';
            }
            if (util.isTrue(item.description)) {
                column.tooltip = item.description;
            }
            if (item.type === "date") {
                column.renderer = util.renderDate;
            }
            //如果是combobox构造combobox
            if (itemXtype === "combobox") {
                //枚举状态下的combobox
                if (item.enum) {
                    column.renderer = function (value, p, r) {
                        if (value && value.length > 0) {
                            for (var csdataItem in data) {
                                if (data[csdataItem].value === value) {
                                    return data[csdataItem].name;
                                }
                            }
                        } else {
                            return "";
                        }
                    }
                }
            }
            _this.columns.push(column);
        }

        /////////////添加,修改,信息
        var infoItem = {
            id:"aii-" + k,
            fieldLabel:item.title,
            tabIndex:index,
            xtype:itemXtype
        };
        if (itemXtype === "combobox") {
            infoItem.store = comStore;
            infoItem.displayField = 'name';
            infoItem.valueField = 'value';
            infoItem.editable = false;
        }
        _this.addInfoItems.push(infoItem);
        infoItem.id = "eii-" + k;
        _this.editInfoItems.push(infoItem);
        infoItem.id = "sii-" + k;
        _this.showInfoItems.push(infoItem);
        index++;
    }
}

var util = {
    isTrue:function (val) {
        return val === 1 || val === true;
    },
    getXType:function (typeStr, enumStr) {
        if (enumStr) {
            return "combobox";
        } else {
            var tp = entityType[typeStr];
            if (kutil.isNothing(tp)) {
                throw new Error('entity中的类型未定义' + typeStr);
            } else {
                return tp.xtype;
            }
        }
    },
    renderDate:function (value, p, r) {
        return value ? Ext.Date.dateFormat(value, _DateFormat) : '';
    }
}
