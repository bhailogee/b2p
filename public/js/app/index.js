/**
 * Created by Wasim on 11/12/2017.
 */



(function(){
  setInterval(function(){
    updateValues();
  },30000);
updateValues();
})();


function updateValues(){
  $.get("/api/lbc/rate/PK/PKR",function(data){
    $("#buyRate").val(data.buy);
    $("#sellRate").val(data.sell);
  });
}