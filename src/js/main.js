window.onload = function (){
  contract.getNumItem((error,numItem)=>{
    console.log("numItem is " + numItem);
    displayItems(numItem,(err,txhash)=>{
      console.log(txhash);
    });
  });
}

function displayItems(ids){
  $("#contract_result").empty();
  for (let i = 0; i < ids; i++){
    contract.getItemByIdForMain(i,(err,data)=>{
      let depositEth = data[1]/(10**18);
      let rentalFeeEth = data[2]/(10**18);
      let url = "http://drive.google.com/uc?export=view&id=" + data[3];
      $("#contract_result").append(`<div class="item">
              <ul>
                <img src="${url}" width="300" height="200">
                <li>商品名: ${data[0]}</li>
                <li>デポジット: ${depositEth}</li>
                <li>レンタル料: ${rentalFeeEth}</li>
              </ul>
              <a href="##" onclick="openItemDetails(${i})">詳細</a><br></br>
            </div>`);
    });
  }
}

function openItemDetails(id){
  window.location.href = "../html/item.html#"+id;
}
