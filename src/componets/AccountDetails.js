import React, { useEffect, useState } from "react";
import { Card, Input, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import matic from "../matic.png";
import ABI from "../abi.json";
import { Web3 } from 'web3';

function AccountDetails({ address, name, balance }) {
  const [web3, setWeb3] = useState(null)
  const contractAddr = "0x2bD6c5E444A78e141540bC68Ed2E92d7e8EE86f8"
  const [visible, setVisible] = useState(false);
  const [userName, setUserName] = useState("");

  const showModal = () => {
    setVisible(true);
  };


  const handleCancel = () => {
    console.log("Modal canceled");
    setVisible(false);
  };

  const handleChange = (e) => {
    setUserName(e.target.value);
  };
  
  useEffect(() => {
    if(window && window.ethereum){
      setWeb3(new Web3(window.ethereum))
    }
  },[])

  const setName = async () => {
    const contract = new web3.eth.Contract(
      ABI,
      contractAddr
    );
    await contract.methods.addName(userName).send({
      from: address
    })
    setVisible(false);
  }

  return (
    <Card title="Account Details" style={{ width: "100%" }}>
      <div className="accountDetailRow">
        <UserOutlined style={{ color: "#767676", fontSize: "25px" }} />
        <div>
          <div className="accountDetailHead"> {name} </div>
          <div className="accountDetailBody">
            Address: {address?.slice(0, 4)}...{address?.slice(38)}
          </div>
        </div>
      </div>
      <div className="accountDetailRow">
        <img src={matic} alt="maticLogo" width={25} />
        <div>
          <div className="accountDetailHead"> BNB Balance</div>
          <div className="accountDetailBody">{balance} BNB</div>
        </div>
      </div>
      <Modal
        title="Enter Name"
        visible={visible}
        onOk={setName}
        onCancel={handleCancel}
      >
        <Input placeholder="Enter your name" value={userName} onChange={handleChange} />
      </Modal>
      <div className="balanceOptions">
        <div className="extraOption" onClick={showModal}>Set Username</div>
      </div>
    </Card>
  );
}

export default AccountDetails;
