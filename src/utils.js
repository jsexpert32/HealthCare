import Vue from 'vue'

export function LoadUiListFromDB (_apiUrl, _valueField, _labelField) {
  let _list = []
  let _api = Vue.prototype.$http
  _api.get(_apiUrl)
    .then(function (response) {
      let _dbList = response.data
      for (var i = 0; i < _dbList.length; i++) {
        let _itm = _dbList[i]
        _itm.value = _itm[_valueField]
        _itm.label = _itm[_labelField]
        _list.push(_itm)
      }
    })
  return _list
}

export function CreateIdList (_array, _IdField) {
  let _IDs = []
  for (var i = 0; i < _array.length; i++) {
    _IDs.push(_array[i][_IdField])
  }
  return _IDs
}

export function getExpireYearList() {
  var list = [];
  var year = new Date().getFullYear();
  var expYear = year + 50;
  for(var i=year;i<=expYear;i++) {
    var item = {};
    item.value = i;
    item.label = i.toString();
    list.push(item);
  }
  return list;
}

export function getExpireMonthList() {
  var list = [];  
  var months = ["January","Feburary","March","April", "May", "June","July","August","September","October","November", "December"];
  for(var i=0;i<months.length;i++) {
    var item = {};
    item.label = months[i];
    item.value = i+1;
    list.push(item);
  }
  return list;
}
