/**
 * Created by Wasim on 11/4/2017.
 */
var result = {
  trimPagination: function (obj) {
    delete obj.pagination;
    return obj.data;
  },
  extractLowest: function (obj,currency) {

    var result = {};
    if (obj && obj.data && obj.data.ad_list) {
      for (var i = 0; i < obj.data.ad_list.length; i++) {
        if(obj.data.ad_list[i].data.currency.toLowerCase() === currency.toLowerCase()) {
          if (!!!result.buy) {
            result.buy = parseInt(obj.data.ad_list[i].data.temp_price);
          }
          else if (result.buy > parseInt(obj.data.ad_list[i].data.temp_price)) {
            result.buy = parseInt(obj.data.ad_list[i].data.temp_price);
          }
        }
      }
      return result;
    }
    else throw "Invalid object to extract lowest value";
  },
  extractHighest: function (obj,currency) {

    var result = {};
    if (obj && obj.data && obj.data.ad_list) {
      for (var i = 0; i < obj.data.ad_list.length; i++) {
        if(obj.data.ad_list[i].data.currency.toLowerCase() === currency.toLowerCase()) {
          if (!!!result.sell) {
            result.sell = parseInt(obj.data.ad_list[i].data.temp_price);
          }
          else if (result.sell < parseInt(obj.data.ad_list[i].data.temp_price)) {
            result.sell = parseInt(obj.data.ad_list[i].data.temp_price);
          }
        }
      }
      return result;
    }
    else throw "Invalid object to extract lowest value";
  }
}

module.exports = result;