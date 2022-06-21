if(typeof window.ethereum =="undefined"){
		console.log("PLease install the metamask");
	}
  var accounts;
	let web3 = new Web3(window.ethereum);
   let contract = new web3.eth.Contract(
   		[
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "participant1",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "participant2",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "participant1_vote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "participant2_vote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "pati1_cnt_VOTE",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "pati2_cnt_VOTE",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "declare_winner",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ],

  "0x2d65BbCbdaDF3d03D1eA5B747aa7FE26E37C4575"
  );
   	async function  account(){
	   	accounts = await web3.eth.requestAccounts();
		  console.log(accounts);
       contract.methods.owner().call().then(function (resp){
        const owner_address = resp;

		$("#btn").click(async function(){
			accounts1 = await web3.eth.requestAccounts();
			contract.methods.participant1_vote().send({from:String(accounts1)},function(err,res){
				if(err){
					console.log("error"+err);
				}
				else{
					console.log("Voted to the participant1 sucessfully");
				}
			});
		});

		$("#btn1").click(async function(){
			accounts2 = await web3.eth.requestAccounts();
			contract.methods.participant2_vote().send({from: String(accounts2)},function(err,res){
				if(err){
					console.log("error"+err);
				}
				else{
					console.log("Voted to the participant2 sucessfully");
				}
			});
		});

	   	$("#res").click(async function() {
	   		contract.methods.declare_winner().call(function(err,res){
  	   			if(err){
  	   				alert("U r not the owner");
  	   			}
  	   			else{
        // calling the return method of the solidity fucntion

              contract.methods.declare_winner().call().then(function (resp){
                alert(resp);
              });
  	   			}
        });
	   	});

      $("#show-vote1").click(async function(){
        // calling the return method of the solidity fucntion

        contract.methods.pati1_cnt_VOTE().call().then(function (resp){
           alert("The vote for the candidate 1 is ->"+resp);
        })
      });
      $("#show-vote2").click(async function(){
        // calling the return method of the solidity fucntion

          contract.methods.pati2_cnt_VOTE().call().then(function (resp){
           alert("The vote for the candidate 2 is ->"+resp);
        });

      });
    });
   }

  account();