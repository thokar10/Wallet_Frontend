import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineMenu } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { Drawer } from "antd";
import { IoIosAddCircle } from "react-icons/io";

const Dashboard = () => {
  const [pop, setPop] = useState(false);
  const [bankName, setBankName] = useState([]);
  const [open, setOpen] = useState(false);
  const [userData, setUserData]: any = useState({});
  const navigate = useNavigate();

  const popUp = () => {
    setPop(!pop);
  };
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
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
      <div className="bg-[brown] text-white p-4 flex  items-center justify-end gap-6">
        <p>Welcome {userData.name}</p>
        <div
          className=" border-white bg-slate-400 border-2 h-[40px] w-[40px] rounded-[50%]  justify-center flex items-center hover:cursor-pointer"
          onClick={popUp}
        >
          <div className="relative">
            {" "}
            <MdOutlineMenu />
            <div className="pop absolute">
              {pop === true && (
                <>
                  <div className="w-[20rem] flex gap-3 flex-col border-2 border-black  text-black  items-center p-2">
                    <div className="flex  justify-center items-center ">
                      {" "}
                      <div>Edit Profile</div>
                      <MdEdit />
                    </div>
                    <div>
                      <p>view your Profile</p>
                    </div>
                    <div>
                      <button
                        className="border-2 p-3 border-black rounded-lg"
                        onClick={() => {
                          localStorage.removeItem("access_token");
                          navigate("/loginRegister");
                        }}
                      >
                        <p className="text-sm"> log Out</p>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center p-1">
        <div className="balance w-[39%] h-[124px] bg-[white] border-2 border-[rgb(0 0 0 / 35%)] rounded-lg flex items-center p-5">
          <p className="text-[60px] text-black">Balance :&nbsp; &nbsp;</p>
          <p className="text-[60px] text-black p-1"> Rs {userData.balance} </p>
          <span className="text-[50px]">
            <IoIosAddCircle
              onClick={showDrawer}
              className="hover:cursor-pointer"
            />
          </span>
        </div>
      </div>

      <div>
        <div>
          <Drawer
            title="List of Banks"
            onClose={onClose}
            open={open}
            width={200}
            placement="left"
          >
            <div className="flex flex-col gap-5">
              {bankName.map((data: any) => {
                return (
                  <>
                    <div className="flex justify-center border-2 border-black p-2 ">
                      <div>{data.bank_name}</div>
                    </div>
                  </>
                );
              })}
            </div>
          </Drawer>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
