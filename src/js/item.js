
window.onload = function() {
  let id = location.hash.substring(1) - 0;
  console.log(id);
  contract.getItemById(id, (err, data)=>{
    document.getElementById("name-content").textContent = data[2];
    let depositEth = data[5]/(10**18);
    let rentalFeeEth = data[6]/(10**18);
    document.getElementById("deposit-content").textContent = depositEth +" ETH";
    document.getElementById("fee-content").textContent = rentalFeeEth + " ETH";
    document.getElementById("lender-content").textContent = data[0];
    document.getElementById("lenderAddress-content").textContent = data[4];
    document.getElementById("description-content").textContent = data[3];
    if(data[0] === data[1]){
      const nextId = location.hash ;
      console.log(nextId)
      console.log(data[1])
      $("#button-borrow").append(`<button onclick="location.href='borrow.html${nextId}'">借りる画面に進む</button>`);
    }else {
      console.log("connot")
      $("#button-borrow").append(`<button>貸出中</button>`);
    }

  });
}
