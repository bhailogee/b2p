/**
 * Created by Wasim on 11/4/2017.
 */

const Request = require('request');
const config = require('config');
const url = "https://localbitcoins.com/";
const requestDefaultOptions = {json:true}
const Q = require('Q');


var resolve = function(q,options) {
  options.paymentMethod = options.paymentMethod || "national-bank-transfer";

  switch (q) {
    case "buy":
      return url + "buy-bitcoins-online/" + options.countryCode + "/" + options.paymentMethod + "/.json";
      break;
    case "sell":
      return url + "sell-bitcoins-online/" + options.countryCode + "/" + options.paymentMethod + "/.json";
      break;
    default:
      throw "unable to resolve the path";
      break;
  }
};



module.exports = {
  callAPI: function (options,apiName) {
    //options.countryCode (required)
    //options.paymentMethod (optional)

    var defer = Q.defer();

    if(!!!options)
    {
      throw "Invalid argument";
    }

    if (!!!options.countryCode || options.countryCode.length !== 2) {
      throw "invalid country code";
    }


    var urlObject = {url: resolve(apiName, options)};
    var _options = Object.assign({}, urlObject, requestDefaultOptions);

    Request(_options,function (err,res,body) {
      defer.resolve(body);
    });
    return defer.promise;
  },
  buy:function(options){
    return this.callAPI(options,"buy");
  },
  sell:function(options){
    return this.callAPI(options,"sell");
  }
};