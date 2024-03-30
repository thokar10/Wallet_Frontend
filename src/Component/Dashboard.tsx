import {
  Button,
  Drawer,
  Dropdown,
  Form,
  Input,
  Modal,
  Popover,
  message,
} from "antd";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { BsBank2 } from "react-icons/bs";
import { ImFolderDownload, ImFolderUpload } from "react-icons/im";
import { MdOutlineMenu } from "react-icons/md";

import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [form] = Form.useForm();
  const amountRef = useRef(null);
  const emailRef = useRef(null);
  const bankRef = useRef(null);
  const bankAccountNoRef = useRef(null);
  const [AmountBankName, SetAmountBankName] = useState();

  const [AmountPop, setAmountPop] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bankName, setBankName] = useState([]);
  const [userTransactionDetails, SetUserTransactionDetails] = useState([]);
  const [openLoadMoneyDrawer, setOpenLoadMoneyDrawer] = useState(false);
  const [openSendMoneyDrawer, setOpenSendMoneyDrawer] = useState(false);
  const [openWalletToBankDrawer, setOpenWalletToBankDrawer] = useState(false);
  const [userData, setUserData]: any = useState({});
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const navigate = useNavigate();

  //transaction type pop up

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div
          onClick={() => {
            showTransactionLoad();
          }}
        >
          load
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          onClick={() => {
            showTransactionSend();
          }}
        >
          send
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div
          onClick={() => {
            showTransactionReceive();
          }}
        >
          receive
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <div
          onClick={() => {
            showTransactionWithdraw();
          }}
        >
          withdraw
        </div>
      ),
    },
  ];

  // transaction details modal
  const showModal1 = () => {
    setIsModalOpen1(true);
  };

  const handleOk1 = () => {
    setIsModalOpen1(false);
  };

  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };

  //modal form on finish
  const onFinish = async (values: object) => {
    console.log("Success:", values);
    const usernamePattern = /^[a-zA-Z]+$/; // Regular expression pattern for alphabetic characters only

    if (!usernamePattern.test(values.bank_name && values.account_name)) {
      // If the username does not match the pattern, display an error message
      message.error(
        "bankname and account name can only contain alphabetic characters"
      );
      return; // Exit the function to prevent form submission
    }
    const getAccess_token = localStorage.getItem("access_token");

    try {
      await axios.post("http://localhost:8000/banks/linkBank", values, {
        headers: {
          Authorization: `Bearer ${getAccess_token}`,
        },
      });
      message.success("Bank linked successfully");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (e: any) {
      const errorMessage = e.response.data.message;
      if (!errorMessage) {
        message.error(e);
      } else {
        message.error(errorMessage);
      }
    }
  };

  //transaction history all
  const showTransactionDetails = async () => {
    const access_token = await localStorage.getItem("access_token");

    try {
      const response = await axios.post(
        "http://localhost:8000/banks/transactionHistory",
        {
          // Request body data here if needed
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      console.log(response.data.transactionHistory);
      SetUserTransactionDetails(response.data.transactionHistory);
    } catch (e: any) {
      const errorMessage = e.response.data.message;
      if (!errorMessage) {
        message.error(e);
      } else {
        message.error(errorMessage);
      }
    }
  };

  //transaction history load
  const showTransactionLoad = async () => {
    const access_token = await localStorage.getItem("access_token");

    try {
      const response = await axios.post(
        "http://localhost:8000/banks/transactionHistory",
        {
          type: "load",
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log(response.data.transactionHistory);
      SetUserTransactionDetails(response.data.transactionHistory);
    } catch (e: any) {
      const errorMessage = e.response.data.message;
      if (!errorMessage) {
        message.error(e);
      } else {
        message.error(errorMessage);
      }
    }
  };

  //transaction history Send
  const showTransactionSend = async () => {
    const access_token = await localStorage.getItem("access_token");

    try {
      const response = await axios.post(
        "http://localhost:8000/banks/transactionHistory",
        {
          type: "send",
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log(response.data.transactionHistory);
      SetUserTransactionDetails(response.data.transactionHistory);
    } catch (e: any) {
      const errorMessage = e.response.data.message;
      if (!errorMessage) {
        message.error(e);
      } else {
        message.error(errorMessage);
      }
    }
  };
  //transaction history receive
  const showTransactionReceive = async () => {
    const access_token = await localStorage.getItem("access_token");

    try {
      const response = await axios.post(
        "http://localhost:8000/banks/transactionHistory",
        {
          type: "receive",
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log(response.data.transactionHistory);
      SetUserTransactionDetails(response.data.transactionHistory);
    } catch (e: any) {
      const errorMessage = e.response.data.message;
      if (!errorMessage) {
        message.error(e);
      } else {
        message.error(errorMessage);
      }
    }
  };
  //transaction history withdraw
  const showTransactionWithdraw = async () => {
    const access_token = await localStorage.getItem("access_token");

    try {
      const response = await axios.post(
        "http://localhost:8000/banks/transactionHistory",
        {
          type: "withdraw",
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log(response.data.transactionHistory);
      SetUserTransactionDetails(response.data.transactionHistory);
    } catch (e: any) {
      const errorMessage = e.response.data.message;
      if (!errorMessage) {
        message.error(e);
      } else {
        message.error(errorMessage);
      }
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const loadMoneyDrawer = () => {
    setOpenLoadMoneyDrawer(true);
  };
  const sendMoneyDrawer = () => {
    setOpenSendMoneyDrawer(true);
  };
  const walletToBankDrawer = () => {
    setOpenWalletToBankDrawer(true);
  };
  const loadMoneyDrawerClose = () => {
    setOpenLoadMoneyDrawer(false);
  };
  const sendMoneyDrawerClose = () => {
    setOpenSendMoneyDrawer(false);
  };
  const walletToBankDrawerClose = () => {
    setOpenWalletToBankDrawer(false);
  };

  //form submit of Load
  const handleSubmitOfLoad = async (e: any) => {
    e.preventDefault();
    const getAccess_token = localStorage.getItem("access_token");

    const bankAmount = Number(amountRef.current?.value);
    console.log(bankAmount);
    const mergedData = {
      user_input_balance: bankAmount,
      bank_name: AmountBankName,
    };

    try {
      await axios.post("http://localhost:8000/banks/bankToWallet", mergedData, {
        headers: {
          Authorization: `Bearer ${getAccess_token}`,
        },
      });

      message.success("Transferred successfully");
      getUserData(getAccess_token);

      setTimeout(() => {
        setAmountPop(false);
        setOpenLoadMoneyDrawer(false);
      }, 2000);
    } catch (e: any) {
      const errorMessage = e.response.data.message;
      if (!errorMessage) {
        message.error(e);
      } else {
        message.error(errorMessage);
      }
    }
  };

  //form submit of send
  const handleSubmitOfWallletToBank = async (e: any) => {
    e.preventDefault();
    const getAccess_token = localStorage.getItem("access_token");

    console.log();
    console.log();
    const Amount = Number(amountRef.current?.value);
    const userEmail = emailRef.current?.value;

    const mergedData = {
      user_input_balance: Amount,
      email: userEmail,
    };

    console.log(mergedData);

    try {
      await axios.post("http://localhost:8000/banks/userToUser", mergedData, {
        headers: {
          Authorization: `Bearer ${getAccess_token}`,
        },
      });

      message.success("Transferred successfully");
      getUserData(getAccess_token);
      amountRef.current.value = " ";
      emailRef.current.value = " ";
      setTimeout(() => {
        setOpenSendMoneyDrawer(false);
      }, 2000);
    } catch (e: any) {
      const errorMessage = e.response.data.message;
      if (!errorMessage) {
        message.error(e);
      } else {
        message.error(errorMessage);
      }
    }
  };

  //form submit of bank
  const handleSubmitOfBank = async (e: any) => {
    e.preventDefault();
    const getAccess_token = localStorage.getItem("access_token");

    const Amount = Number(amountRef.current.value);
    const bankAccountNumber = Number(bankAccountNoRef.current.value);
    const bankNameToTransfer = bankRef.current.value;

    const mergedData = {
      user_input_balance: Amount,
      bank_name: bankNameToTransfer,
      account_no: bankAccountNumber,
    };

    console.log(mergedData);

    try {
      await axios.post("http://localhost:8000/banks/walletToBank", mergedData, {
        headers: {
          Authorization: `Bearer ${getAccess_token}`,
        },
      });

      message.success("Transferred successfully");
      getUserData(getAccess_token);

      amountRef.current.value = " ";
      bankAccountNoRef.current.value = " ";
      bankRef.current.value = " ";
      setTimeout(() => {
        setOpenWalletToBankDrawer(false);
      }, 2000);
    } catch (e: any) {
      const errorMessage = e.response.data.message;
      if (!errorMessage) {
        message.error(e);
      } else {
        message.error(errorMessage);
      }
    }
  };

  const onClose2 = () => {
    setAmountPop(false);
  };
  useEffect(() => {
    const getAccess_token = localStorage.getItem("access_token");
    console.log(getAccess_token);

    if (!getAccess_token) {
      navigate("/loginRegister");
    }

    getUserData(getAccess_token);
    getUserBankLinkedNames(getAccess_token);
  }, []);

  //get bank names
  const getUserBankLinkedNames = async (getAccess_token: any) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/banks/bankDetails",
        {
          headers: {
            Authorization: `bearer ${getAccess_token}`,
          },
        }
      );

      console.log(response.data);
      console.log(response.data.details);
      setBankName(response.data.details);
    } catch (e) {
      alert(e);
    }
  };
  //get user data
  const getUserData = async (getAccess_token: any) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/users/my-profile",
        {
          headers: {
            Authorization: `bearer ${getAccess_token}`,
          },
        }
      );

      console.log(response.data.userInfo);
      setUserData(response.data.userInfo);
    } catch (e) {
      message.error("Failed to get  your data");
    }
  };

  return (
    <>
      <div className="bg-[darkcyan] text-white p-4 flex  items-center justify-between ">
        <p className="text-[20px] ">Welcome {userData.name}</p>
        <div className="flex gap-4">
          <div>
            <Button
              type="default"
              className="bg-white"
              onClick={() => {
                showTransactionDetails();
                showModal1();
              }}
            >
              Transaction History
            </Button>
            <Modal
              title={
                <div
                  style={{
                    backgroundColor: "black",
                    color: "#fff",
                    textAlign: "center",
                    padding: "20px",
                  }}
                  className="flex  flex-col gap-1 p-4"
                >
                  <p>All your statements</p>
                  <div>
                    {" "}
                    <Dropdown menu={{ items }} placement="top">
                      <Button className="bg-white">Transaction Type</Button>
                    </Dropdown>
                  </div>
                </div>
              }
              open={isModalOpen1}
              onOk={handleOk1}
              onCancel={handleCancel1}
              cancelButtonProps={{
                style: {
                  backgroundColor: "red",
                  borderColor: "red",
                  color: "white",
                },
              }}
              okButtonProps={{
                style: { backgroundColor: "blue", borderColor: "blue" },
              }}
              width={800}
            >
              <div className="flex flex-col flex-grow-1 p-4 gap-2 ">
                {userTransactionDetails.map((transaction) => {
                  return (
                    <>
                      <div className="border-2 border-black p-5">
                        {transaction.info}
                      </div>
                    </>
                  );
                })}
              </div>
            </Modal>
          </div>
          {/* pop up of menu */}

          <div className="hover:cursor-pointer">
            <Popover
              placement="bottom"
              content={
                <>
                  <div className="w-[12rem] flex gap-3 flex-col  text-black  items-center p-2">
                    <div className=" ">
                      {" "}
                      <div
                        className="hover:text-red-600 hover:cursor-pointer "
                        onClick={() => {
                          navigate("/editProfile");
                        }}
                      >
                        <p>Edit Profile</p>
                      </div>
                    </div>
                    <div
                      className="hover:text-red-600 hover:cursor-pointer"
                      onClick={() => {
                        navigate("/viewProfile");
                      }}
                    >
                      <p>view your Profile</p>
                    </div>
                    <div>
                      <button
                        className="dashboard p-1 border-red-500 rounded-md hover:text-red-500 hover:border-red-300 "
                        onClick={() => {
                          localStorage.removeItem("access_token");
                          navigate("/loginRegister");
                        }}
                      >
                        <p className="text-sm text-white p-1"> log Out</p>
                      </button>
                    </div>
                  </div>
                </>
              }
            >
              <div className="border-2 border-white bg-white rounded-[50%] p-2">
                <MdOutlineMenu className="text-black hover:cursor-pointer" />
              </div>
            </Popover>
          </div>
        </div>
      </div>
      {/* Balance div */}
      <div className="flex justify-center flex-grow-1 bg-[darkcyan] p-7 ">
        <div className="balance  bg-[white] border-2 border-[rgb(0 0 0 / 35%)] rounded-lg flex items-center p-5 flex-grow-1">
          <p className="text-[60px] text-black">Balance :&nbsp; &nbsp;</p>
          <p className="text-[60px] text-black p-1"> Rs {userData.balance} </p>
        </div>
      </div>

      {/* loadMoney Drawer */}
      <div>
        <div className="relative">
          <Drawer
            title={
              <div
                style={{
                  backgroundColor: "black",
                  color: "#fff",
                  textAlign: "center",
                  padding: "8px",
                }}
              >
                All Linked Banks
              </div>
            }
            onClose={loadMoneyDrawerClose}
            open={openLoadMoneyDrawer}
            width={300}
            placement="left"
            style={{ background: "cadetblue" }}
          >
            <div className="flex flex-col gap-5">
              {bankName.map((data: any) => {
                return (
                  <>
                    <div
                      className="flex justify-center border-2 border-white text-white p-2 hover:cursor-pointer hover:border-black"
                      onClick={() => {
                        // navigate(`/BankToWallet/${data.bank_name}`);
                        setAmountPop(true);
                        SetAmountBankName(data.bank_name);
                      }}
                    >
                      <div>{data.bank_name}</div>
                    </div>
                  </>
                );
              })}
              <div className="flex justify-center">
                <Button
                  type="default"
                  className="bg-black text-white"
                  onClick={showModal}
                >
                  Add Bank
                </Button>
              </div>
            </div>
            <Modal
              title="Fill up all the  details "
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              cancelButtonProps={{
                style: {
                  backgroundColor: "red",
                  borderColor: "red",
                  color: "white",
                },
              }}
              okButtonProps={{
                style: { backgroundColor: "blue", borderColor: "blue" },
              }}
            >
              <div>
                {" "}
                <div>
                  <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                  >
                    <Form.Item
                      label="Bank Name"
                      name="bank_name"
                      rules={[
                        { required: true, message: "Please input Bank name!" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Account Name"
                      name="account_name"
                      rules={[
                        {
                          required: true,
                          message: "Please input account  name!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Account Number"
                      name="account_no"
                      rules={[
                        {
                          required: true,
                          message: "Please input account  number!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                      <Button type="default" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </Modal>

            <div className="AmountEnteredBox ">
              {AmountPop === true && (
                <>
                  <Drawer
                    title={
                      <div
                        style={{
                          backgroundColor: "black",
                          color: "#fff",
                          textAlign: "center",
                          padding: "8px",
                        }}
                      >
                        Enter Amount
                      </div>
                    }
                    onClose={onClose2}
                    open={openLoadMoneyDrawer}
                    width={300}
                    height={20}
                    placement={"left"}
                    style={{ background: "cadetblue" }}
                  >
                    <form onSubmit={handleSubmitOfLoad}>
                      <label className="text-white text-lg">
                        Amount: &nbsp;
                      </label>
                      <input
                        type="number"
                        className="border-2 border-[skyblue] rounded-md px-2 w-[9rem] "
                        ref={amountRef}
                        required
                      />
                    </form>
                  </Drawer>
                </>
              )}
            </div>
          </Drawer>
        </div>
      </div>

      {/* sendMoney Drawer */}
      <div>
        <Drawer
          title={
            <div
              style={{
                backgroundColor: "black",
                color: "#fff",
                textAlign: "center",
                padding: "8px",
              }}
            >
              Sender Details
            </div>
          }
          onClose={sendMoneyDrawerClose}
          open={openSendMoneyDrawer}
          width={400}
          placement="left"
          style={{ background: "cadetblue" }}
        >
          <form onSubmit={handleSubmitOfWallletToBank}>
            <div className="flex flex-col gap-2">
              <div className="flex justify-evenly gap-4">
                <label className="text-white text-lg">Email : &nbsp;</label>
                <input
                  className="border-2 border-[skyblue] rounded-md px-2 w-[9rem]"
                  type="email"
                  ref={emailRef}
                  required
                />
              </div>
              <div className="flex justify-evenly">
                <label className="text-white text-lg">Amount: &nbsp;</label>
                <input
                  type="number"
                  className="border-2 border-[skyblue] rounded-md px-2 w-[9rem]"
                  ref={amountRef}
                  required
                />
              </div>
              <div className="flex justify-center p-2">
                <button
                  className="dashboard border-2 border-white text-white p-2 hover:cursor-pointer "
                  onClick={handleSubmitOfWallletToBank}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </Drawer>
      </div>
      {/* BankToBank Drawer */}
      <div>
        <Drawer
          title={
            <div
              style={{
                backgroundColor: "black",
                color: "#fff",
                textAlign: "center",
                padding: "8px",
              }}
            >
              Bank Details
            </div>
          }
          onClose={walletToBankDrawerClose}
          open={openWalletToBankDrawer}
          width={400}
          placement="left"
          style={{ background: "cadetblue" }}
        >
          <form onSubmit={handleSubmitOfBank}>
            <div className="flex flex-col gap-4 p-5 ">
              <div className="flex items-center justify-between ">
                <label className="text-white text-lg p-1">Bank Name : </label>
                <input
                  className="border-2 border-[skyblue] rounded-md px-2 w-[9rem]"
                  type="text"
                  ref={bankRef}
                />
              </div>
              <div className="flex  justify-between ">
                <label className="text-white text-lg">Amount: &nbsp;</label>
                <input
                  type="number"
                  className="border-2 border-[skyblue] rounded-md px-2 w-[9rem]"
                  ref={amountRef}
                />
              </div>
              <div className="flex   justify-between  ">
                <label className="text-white text-lg">
                  Bank Account No: &nbsp;
                </label>
                <input
                  type="number"
                  className="border-2 border-[skyblue] rounded-md px-2 w-[9rem]"
                  ref={bankAccountNoRef}
                />
              </div>
              <div className="flex justify-center p-2">
                <button
                  className="dashboard border-2 border-white text-white p-2 hover:cursor-pointer "
                  onClick={handleSubmitOfBank}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </Drawer>
      </div>

      {/* This is area below balance */}

      <div className="p-5 flex justify-center flex-grow-1 ">
        <div className="bg-[darkcyan] w-[80%] h-[10rem] flex p-4 gap-[20rem] justify-center">
          <div className=" text-white flex-grow-1 flex-col flex items-center justify-center hover:cursor-pointer gap-2 ">
            <span className="ALL text-[4rem] ">
              <ImFolderDownload onClick={loadMoneyDrawer} />
            </span>
            <p className="text-white ">Load Money</p>
          </div>
          <div className=" text-white flex-grow-1 flex-col flex items-center  justify-center hover:cursor-pointer gap-2  ">
            <span className=" ALL text-[4rem] ">
              <ImFolderUpload onClick={sendMoneyDrawer} />
            </span>
            <p className="text-white ">send Money</p>
          </div>
          <div className=" text-white flex-grow-1 flex-col flex items-center  justify-center hover:cursor-pointer gap-2  ">
            <span className="ALL text-[4rem] ">
              <BsBank2 onClick={walletToBankDrawer} />
            </span>
            <p className="text-white">Bank Transfer</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
