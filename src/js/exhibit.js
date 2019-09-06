window.onload = function (){

  eventContract.ExhibitDone((err, data)=>{
    if(err){
      alert("error");
    }else{
      alert("Exhibit Success!\nitemId =" + data.args.itemId);
    }
  });

  document.getElementById("register").onclick = ()=>{
    var itemName = document.getElementById("itemName").value;
    var description = document.getElementById("description").value;
    var lenderAddress = document.getElementById("lenderAddress").value;
    var deposit = document.getElementById("deposit").value * 10 ** 18;
    var rentalFee = document.getElementById("rentalFee").value * 10 ** 18;
    var imageURL = document.getElementById("imageURL").value;
    contract.exhibit(itemName, description, lenderAddress, deposit, rentalFee, imageURL, (err,result)=>{
      console.log(result);
    });
  };

}
