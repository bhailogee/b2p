/**
 * Created by Wasim on 11/4/2017.
 */

var express = require('express')
var router = express.Router();
const utility = require('./utility');


var lbc = require('./exchange/lbc');
// respond with "hello world" when a GET request is made to the homepage

router.get('/',function(req,res,next){
  res.json({"message" : "Hello World"});
});
/*router.get('/lbc/!*',function(req,res,next){
  next();
});*/

router.get('/lbc/buy/:countryCode/:currency/:paymentMethod',lbcBuy);
router.get('/lbc/buy/:countryCode/:currency', lbcBuy);
router.get('/lbc/sell/:countryCode/:currency/:paymentMethod',lbcSell);
router.get('/lbc/sell/:countryCode/:currency', lbcSell);
router.get('/lbc/rate/:countryCode/:currency/:paymentMethod',lbcRate);
router.get('/lbc/rate/:countryCode/:currency', lbcRate);

function lbcBuy(req, res, next) {
  //{countryCode:'PK', patmentMethod:'national-bank-transfer', currency:'PKR'}

  if(!!!req.params.currency)
  {
    throw "currency code required";
  }
  if (req.params.currency.length !== 3) {
    throw "invalid currency code";
  }
  lbc.buy(req.params).then(function(result){
    res.json(utility.extractLowest(result,req.params.currency));
  });
}

function lbcSell(req, res, next) {
  //{countryCode:'PK', patmentMethod:'national-bank-transfer', currency:'PKR'}
  if(!!!req.params.currency)
  {
    throw "currency code required";
  }
  if (req.params.currency.length !== 3) {
    throw "invalid currency code";
  }

  return lbc.sell(req.params).then(function (result) {
    debugger;

    /*if (!!result && !!result.pagination && !!result.pagination.next && /.json\?page=(\d)/.test(result.pagination.next)) {
      return lbcSell(req,res,next,result.pagination.next);
    }
    else*/
      res.json(utility.extractHighest(result,req.params.currency));
  });
}

function lbcRate(req,res,next) {
  if (!!!req.params.currency) {
    throw "currency code required";
  }
  if (req.params.currency.length !== 3) {
    throw "invalid currency code";
  }

  return lbc.sell(req.params).then(function (resultSell) {
    return lbc.buy(req.params).then(function (resultBuy) {

      var test = Object.assign({},utility.extractHighest(resultSell, req.params.currency),utility.extractLowest(resultBuy, req.params.currency));
      res.json(test);
    });
  });

}

module.exports  = router;