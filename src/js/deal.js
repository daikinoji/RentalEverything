window.onload = function(){
  document.getElementById("deal-search").onclick = ()=>{
    let num = document.getElementById("numDeal").value;
    contract.getDealByNumDeals(num,(err,data)=>{
      console.log(data);
      document.getElementById("borrower").textContent = data[0];
      document.getElementById("borrowerAddress").textContent = data[1];
      document.getElementById("trackingNumber1").textContent = data[2];
      document.getElementById("trackingNumber2").textContent = data[3];
      document.getElementById("deadline1").textContent = timestampToDate(data[4]);
      document.getElementById("deadline2").textContent = timestampToDate(data[5]);
      document.getElementById("deadline3").textContent = timestampToDate(data[6]);
      document.getElementById("deal-state").textContent = calcState(data[0],data[2],data[3],data[5],data[6]);
      $("#actions").append(`<div>
        <h3>取引に関するアクション</h3>
        <h>オーナー用：商品を発送したら．．．</h><br>
        <label for="ship-num">追跡番号</label>
        <input type="text" id="ship-num">
        <p><button class="btn btn-primary" onclick="shipping()">発送した</button></p><br>
      </div>
      <div>
        <h>借りた人：借り終わって返却したら．．．</h><br>
        <label for="sendback-num">追跡番号</label>
        <input type="text" id="sendback-num">
        <p><button class="btn btn-primary" onclick="sendback()">発送した</button></p><br>
      </div>
      <div>
        <h>オーナー用：取引が完了したら．．．</h>
        <p><button class="btn btn-primary" onclick="completeDeal()">取引完了</button></p><br>
      </div>
      <p>==================================================</P>
      <p>**問題がある場合**</p>
      <div>
        <h>借りた人：リクエストしても商品が送られてこない場合</h>
        <p><button class="btn btn-primary" onclick="borrowRequestUnapproved()">返金</button></p><br>
      </div>
      <div>
        <h>オーナー：貸した商品が戻ってこない場合</h>
        <p><button class="btn btn-primary" onclick="sell()">デポジット没収</button></p><br>
      </div>
      <div>
        <h>借りた人：オーナーが受け取り完了しないのでデポジットが戻ってこない</h>
        <p><button class="btn btn-primary" onclick="completeDealByBorrower()">取引完了</button></p><br>
      </div>`);
    });
  }

  document.getElementById("numDeal-search").onclick = ()=>{
    let itemId = document.getElementById("item-id").value;
    contract.getNumDealsById(itemId, (err, data)=>{
      console.log(data);
      document.getElementById("result").textContent = data;
    });
  }

}

function shipping(){
  let num = document.getElementById("numDeal").value;
  let shipNum = document.getElementById("ship-num").value;
  contract.shipping(num, shipNum, (err, txhash)=>{
    console.log(txhash);
  });
}

function sendback(){
  let num = document.getElementById("numDeal").value;
  let sendbackNum = document.getElementById("sendback-num").value;
  contract.sendback(num, sendbackNum, (err, txhash)=>{
    console.log(txhash);
  });
}

function completeDeal(){
  let num = document.getElementById("numDeal").value;
  contract.completeDeal(num, (err, txhash)=>{
    console.log(txhash);
  });
}

function borrowRequestUnapproved(){
  let num = document.getElementById("numDeal").value;
  return contract.borrowRequestUnapproved(num, (err, txhash)=>{
    console.log(txhash);
  });
}

function sell(){
  let num = document.getElementById("numDeal").value;
  return contract.sell(num, (err, txhash)=>{console.log(txhash);});
}

function completeDealByBorrower(){
  let num = document.getElementById("numDeal").value;
  return contract.completeDealByBorrower(num, (err,txhash)=>{console.log(txhash);});
}

function timestampToDate(ts){
  if(ts != 0){
    var d = new Date( ts * 1000 );
    var year  = d.getFullYear();
    var month = d.getMonth() + 1;
    var day  = d.getDate();
    var hour = ( d.getHours()   < 10 ) ? '0' + d.getHours()   : d.getHours();
    var min  = ( d.getMinutes() < 10 ) ? '0' + d.getMinutes() : d.getMinutes();
    var sec   = ( d.getSeconds() < 10 ) ? '0' + d.getSeconds() : d.getSeconds();
    return( year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec );
  }else{
    return 0;
  }
}

function calcState(d0,d3,d4,d6,d7){
  if (d0==0){
    return "この取引はありません";
  }else if(d3==0&&d4==0&&d6==0&&d7==0){
    return "貸出リクエスト、オーナーの発送待ち";
  } else if (d3!=0 && d6!=0 && d4==0&&d7==0) {
    return "オーナー発送済み、貸出中";
  }else {
    return "貸出終了、返送中";
  }
}
