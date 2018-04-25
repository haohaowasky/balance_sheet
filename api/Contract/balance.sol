pragma solidity ^0.4.21;

contract balance{

    mapping(address => spending[]) public book;

    struct spending{
        uint spending;
        uint time;
        bytes32 memo;
    }

    function addEvent(bytes32 _memo, uint _spending) public returns(bool){

        spending memory txevent;

        txevent.spending = _spending;
        txevent.time = now;
        txevent.memo = _memo;

        book[msg.sender].push(txevent);

        return true;
    }

    function getEvent(address _address) public view returns(uint[], uint[], bytes32[]){
        uint length = book[_address].length;

        bytes32[] memory _memo = new bytes32[](length);
        uint[] memory _time = new uint[](length);
        uint[] memory _spend = new uint[](length);

        for (uint i=0; i < length; i++) {
            _memo[i] = book[_address][i].memo;
            _time[i] = book[_address][i].time;
            _spend[i] = book[_address][i].spending;
        }

        return (_spend, _time, _memo);

    }


    function updateEvent(uint index, bytes32 _memo, uint _spending) public returns(bool){

        book[msg.sender][index].spending = _spending;
        book[msg.sender][index].memo = _memo;
        book[msg.sender][index].time = now;

        return true;
    }


    function deleteEvent(uint index) public returns(bool){


      if (index >= book[msg.sender].length) return;

      for (uint i = index; i < book[msg.sender].length - 1; i++){
          book[msg.sender][i] = book[msg.sender][i+1];
      }

      delete book[msg.sender][book[msg.sender].length - 1];

      book[msg.sender].length--;

      return true;
    }

}
