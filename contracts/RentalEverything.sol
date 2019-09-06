pragma solidity ^0.5.0;

contract RentalEverything {

    enum StateType {
        Available,
        BorrowRequestPending,
        Shipping,
        SendingBack
    }

    struct Item {
        address lender; //貸主のETHアドレス
        address currentBorrower;//今借りてる人＊＊よく変わる
        string name; //商品名
        string description; //商品説明
        string lenderAddress;//貸主の住所
        uint deposit;
        uint rentalFee;
        uint dealCount;//dealの総数
        StateType state; //状態
        string image; //google drive のファイルID？
    }

    Item[] public Items;
    uint public itemId = 0;

    struct Deal {
        address payable borrower;//借主のETHアドレス
        string borrowerAddress;//借主の住所
        uint trackingNumber1;//貸出時の追跡番号
        uint trackingNumber2;//返却時の追跡番号
        uint deadline1;//貸主の商品発送期限
        uint deadline2;//借主の返送期限
        uint deadline3;//貸主の商品受け取り承認期限
    }

    mapping (uint => Deal) Deals;//numDealsからDealへ
    mapping (uint => uint) dealToItem;//numDealsからitemIdへ

    event ExhibitDone(uint itemId);

    //出品
    function exhibit (string memory _name, string memory _description, string memory _lenderAddress, uint _deposit, uint _rentalFee, string memory imageURL) public returns(uint) {
        Items.push(Item(msg.sender, msg.sender, _name, _description, _lenderAddress, _deposit, _rentalFee, 0, StateType.Available, imageURL));
        itemId += 1;
        emit ExhibitDone(itemId);
    }



    uint numDeals = 0;
    uint validPeriod = 7 days;
    //借りるリクエスト
    function borrowRequest (uint _itemId, string memory _borrowerAddress) public payable returns(uint) {
        require (Items[_itemId].state == StateType.Available && msg.value >= Items[_itemId].deposit + Items[_itemId].rentalFee);
            Items[_itemId].dealCount += 1;
            dealToItem[numDeals] = _itemId;
            Deals[numDeals].borrower = msg.sender;
            Deals[numDeals].borrowerAddress = _borrowerAddress;
            Deals[numDeals].deadline1 = now + validPeriod;
            Items[_itemId].state = StateType.BorrowRequestPending;
            numDeals += 1;
            return numDeals - 1;
    }


    uint rentalPeriod = 14 days;
    //リクエスト受付、商品発送
    function shipping (uint _numDeals, uint _trackingNumber1) public onlyLender(_numDeals) {
        require (Items[dealToItem[_numDeals]].state == StateType.BorrowRequestPending);
            Items[dealToItem[_numDeals]].state = StateType.Shipping;
            Items[dealToItem[_numDeals]].currentBorrower = Deals[_numDeals].borrower;
            Deals[_numDeals].trackingNumber1 = _trackingNumber1;
            Deals[_numDeals].deadline2 = now + rentalPeriod;
    }

    //発送されない、リクエストが承認されなければ全額返金
    function borrowRequestUnapproved (uint _numDeals) public onlyBorrower(_numDeals) {
        require (Items[dealToItem[_numDeals]].state == StateType.BorrowRequestPending && Deals[_numDeals].deadline1 <= now && Deals[_numDeals].trackingNumber1 == 0);//uintのデフォルト値が0？
            msg.sender.transfer(Items[dealToItem[_numDeals]].deposit + Items[dealToItem[_numDeals]].rentalFee);
    }


    //返送
    function sendback (uint _numDeals, uint _trackingNumber2) public onlyBorrower (_numDeals) {
        require (Items[dealToItem[_numDeals]].state == StateType.Shipping);
            Items[dealToItem[_numDeals]].state = StateType.SendingBack;
            Deals[_numDeals].trackingNumber2 = _trackingNumber2;
            Deals[_numDeals].deadline3 = now +validPeriod;
    }

    //期限までに返送されなければデポジット没収
    function sell (uint _numDeals) public onlyLender(_numDeals) {
        require (Items[dealToItem[_numDeals]].state == StateType.Shipping && Deals[_numDeals].deadline2 <= now && Deals[_numDeals].trackingNumber2 ==0);
            msg.sender.transfer(Items[dealToItem[_numDeals]].deposit + Items[dealToItem[_numDeals]].rentalFee);
    }

    //取引の完了
    function completeDeal (uint _numDeals ) public onlyLender (_numDeals) {
        require (Items[dealToItem[_numDeals]].state == StateType.SendingBack);
            Items[dealToItem[_numDeals]].state = StateType.Available;
            Items[dealToItem[_numDeals]].currentBorrower = msg.sender;
            msg.sender.transfer(Items[dealToItem[_numDeals]].rentalFee);
            Deals[_numDeals].borrower.transfer(Items[dealToItem[_numDeals]].deposit);
    }

    //期限過ぎて出品者が受け取り完了しなければ借主が終了させる。貸主は賃料を得られない
    function completeDealByBorrower (uint _numDeals) public onlyBorrower(_numDeals) {
        require (Items[dealToItem[_numDeals]].state == StateType.SendingBack && Deals[_numDeals].deadline3 <= now);
            Items[dealToItem[_numDeals]].state = StateType.Available;
            Items[dealToItem[_numDeals]].currentBorrower = Items[dealToItem[_numDeals]].lender;
            msg.sender.transfer(Items[dealToItem[_numDeals]].rentalFee + Items[dealToItem[_numDeals]].deposit);
    }

    //modifier
    modifier onlyLender (uint _numDeals) {
        require (Items[dealToItem[_numDeals]].lender == msg.sender);
        _;
    }

    modifier onlyBorrower (uint _numDeals) {
        require (Deals[_numDeals].borrower == msg.sender);
        _;
    }



//helper
  function getNumItem() public view returns (uint) {
    return itemId;
  }


  //IdからItemを返す関数
  function getItemById(uint _itemId) public view returns(address, address, string memory, string memory, string memory, uint, uint) {
    return (Items[_itemId].lender, Items[_itemId].currentBorrower, Items[_itemId].name, Items[_itemId].description, Items[_itemId].lenderAddress, Items[_itemId].deposit, Items[_itemId].rentalFee);
  }

  function getItemByIdForMain(uint _itemId) public view returns(string memory, uint, uint, string memory) {
    return (Items[_itemId].name, Items[_itemId].deposit, Items[_itemId].rentalFee, Items[_itemId].image);
  }

  //ItemIdから関連するnumDealsを返す
  function getNumDealsById(uint _itemId) public view returns(uint[] memory) {
    uint[] memory result = new uint[](Items[_itemId].dealCount);
    uint count = 0;
    for(uint i = 0; i < numDeals; i++){
      if(dealToItem[i] == _itemId){
        result[count] = i;
        count++;
      }
    }
    return result;
  }

  function getDealByNumDeals(uint _numDeals) public view returns(address, string memory, uint, uint, uint, uint, uint ){
    return (Deals[_numDeals].borrower,
      Deals[_numDeals].borrowerAddress,
      Deals[_numDeals].trackingNumber1,
      Deals[_numDeals].trackingNumber2,
      Deals[_numDeals].deadline1,
      Deals[_numDeals].deadline2,
      Deals[_numDeals].deadline3);
  }

}
