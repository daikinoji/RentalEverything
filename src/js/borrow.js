const id = location.hash.substring(1) - 0;
window.onload = function(){

  contract.getItemById(id, (err, data)=>{
    document.getElementById("name-content").textContent = data[2];
    let depositEth = data[5]/(10**18);
    let rentalFeeEth = data[6]/(10**18);
    document.getElementById("deposit-content").textContent = depositEth +" ETH";
    document.getElementById("fee-content").textContent = rentalFeeEth + " ETH";
    document.getElementById("lender-content").textContent = data[0];
    document.getElementById("lenderAddress-content").textContent = data[4];
    var sum = depositEth + rentalFeeEth;
    document.getElementById("sum-content").textContent = sum + " ETH";
  });
}

function borrowRequest(){
  let borrowerAddress = document.getElementById("borrowerAddress").value;
  let sum = document.getElementById("sum-content").textContent.slice(0,-4) -0;
  console.log(borrowerAddress);
  return contract.borrowRequest(id, borrowerAddress, {value:web3.toWei(sum, "ether")}, (err,result)=>{
    console.log(result);
  });
}
