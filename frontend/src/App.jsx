import { FaTrash, FaEdit, FaWindowClose } from "react-icons/fa";
import { useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";

function App() {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleAddExpense = () => {
    setShowAddExpense(!showAddExpense);
  };

  const handleShowReport = () => {
    setShowReport(!showReport);
  };

  const handleShowEdit = () => {
    setShowEdit(!showEdit);
  };

  return (
    <>
      <div>
        <div className="flex flex-col justify-center items-center mt-[3%] w-[80%] mr-[5%] ml-[5%]">
          <h1 className="text-2xl font-medium text-[#555]">FinTrack</h1>

          <div className="relative flex items-center justify-between mt-5 w-[100%]">
            <div className="relative flex justify-between w-[300px]">
              <button
                className="bg-[#af8978] p-[10px] border-none outline-none cursor-pointer text-[#fff] text-medium"
                onClick={handleAddExpense}
              >
                Add Expense
              </button>
              <button
                className="bg-blue-300 p-[10px] border-none outline-none cursor-pointer text-[#fff] text-medium"
                onClick={handleShowReport}
              >
                Expense Report
              </button>
            </div>

            {showAddExpense && (
              <div className="absolute z-[999] flex flex-col p-[10px] top-[20px] left-0 h-[500px] w-[500px] bg-white shadow-xl">
                <FaWindowClose
                  className="flex justify-end items-end text-2xl text-red-500 cursor-pointer"
                  onClick={handleAddExpense}
                />
                <label
                  htmlFor=""
                  className="mt-[10px] font-semibold text-[18px]"
                >
                  Expense Name
                </label>
                <input
                  type="text"
                  placeholder="Snacks"
                  className="outline-none border-2 border-[#555] border-solid p-[10px]"
                />
                <label
                  htmlFor=""
                  className="mt-[10px] font-semibold text-[18px]"
                >
                  Expense Date
                </label>
                <input
                  type="date"
                  placeholder="30/07/25"
                  className="outline-none border-2 border-[#555] border-solid p-[10px]"
                />
                <label
                  htmlFor=""
                  className="mt-[10px] font-semibold text-[18px]"
                >
                  Expense Amount
                </label>
                <input
                  type="number"
                  placeholder="100000"
                  className="outline-none border-2 border-[#555] border-solid p-[10px]"
                />

                <button className="bg-[#af8978] text-white p-[10px] border-none cursor-pointer my-[10px]">
                  Add Expense
                </button>
              </div>
            )}

            {showReport && (
              <div className="absolute z-[999] flex flex-col p-[10px] top-[20px] left-[100px] h-[500px] w-[500px] bg-white shadow-xl">
                <FaWindowClose
                  className="flex justify-end items-end text-2xl text-red-500 cursor-pointer"
                  onClick={handleShowReport}
                />
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: 10, label: "series A" },
                        { id: 1, value: 15, label: "series B" },
                        { id: 2, value: 20, label: "series C" },
                      ],
                    },
                  ]}
                  width={400}
                  height={200}
                />
              </div>
            )}

            <div>
              <input
                type="text"
                placeholder="Search..."
                className="p-[10px] w-[150px] border-2 border-solid border-[#444]"
              />
            </div>
          </div>

          <div className="flex flex-col ">
            <div className="relative flex justify-between items-center w-[80vw] h-[100px] bg-[#f3edeb] my-[20px] py-[10px]">
              <h2 className="m-[20px] text-[#555] text-[18px] font-medium">
                Snacks
              </h2>
              <span className="m-[20px] text-[18px]">25/03/2025</span>
              <span className="m-[20px] text-[18px] font-medium">
                Rp 10,000
              </span>
              <div className="m-[20px]">
                <FaTrash className="text-red-500 mb-[5px] cursor-pointer" />
                <FaEdit
                  className="text-[#555] mb-[5px] cursor-pointer"
                  onClick={handleShowEdit}
                />
              </div>
            </div>
            <div className="relative flex justify-between items-center w-[80vw] h-[100px] bg-[#f3edeb] my-[20px] py-[10px]">
              <h2 className="m-[20px] text-[#555] text-[18px] font-medium">
                Electricity Bills
              </h2>
              <span className="m-[20px] text-[18px]">01/04/2025</span>
              <span className="m-[20px] text-[18px] font-medium">
                Rp 100,000
              </span>
              <div className="m-[20px]">
                <FaTrash className="text-red-500 mb-[5px] cursor-pointer" />
                <FaEdit className="text-[#555] mb-[5px] cursor-pointer" />
              </div>
            </div>
            <div className="relative flex justify-between items-center w-[80vw] h-[100px] bg-[#f3edeb] my-[20px] py-[10px]">
              <h2 className="m-[20px] text-[#555] text-[18px] font-medium">
                Internet Bill
              </h2>
              <span className="m-[20px] text-[18px]">01/04/2025</span>
              <span className="m-[20px] text-[18px] font-medium">
                Rp 150,000
              </span>
              <div className="m-[20px]">
                <FaTrash className="text-red-500 mb-[5px] cursor-pointer" />
                <FaEdit className="text-[#555] mb-[5px] cursor-pointer" />
              </div>
            </div>
            <div className="relative flex justify-between items-center w-[80vw] h-[100px] bg-[#f3edeb] my-[20px] py-[10px]">
              <h2 className="m-[20px] text-[#555] text-[18px] font-medium">
                Fuel
              </h2>
              <span className="m-[20px] text-[18px]">2/04/2025</span>
              <span className="m-[20px] text-[18px] font-medium">
                Rp 14,000
              </span>
              <div className="m-[20px]">
                <FaTrash className="text-red-500 mb-[5px] cursor-pointer" />
                <FaEdit className="text-[#555] mb-[5px] cursor-pointer" />
              </div>
            </div>
          </div>

          {showEdit && (
            <div className="absolute z-[999] flex flex-col p-[10px] top-[25%] right-0 h-[500px] w-[500px] bg-white shadow-xl">
              <FaWindowClose
                className="flex justify-end items-end text-2xl text-red-500 cursor-pointer"
                onClick={handleShowEdit}
              />
              <label htmlFor="" className="mt-[10px] font-semibold text-[18px]">
                Expense Name
              </label>
              <input
                type="text"
                placeholder="Snacks"
                className="outline-none border-2 border-[#555] border-solid p-[10px]"
              />
              <label htmlFor="" className="mt-[10px] font-semibold text-[18px]">
                Expense Date
              </label>
              <input
                type="date"
                placeholder="30/07/25"
                className="outline-none border-2 border-[#555] border-solid p-[10px]"
              />
              <label htmlFor="" className="mt-[10px] font-semibold text-[18px]">
                Expense Amount
              </label>
              <input
                type="number"
                placeholder="100000"
                className="outline-none border-2 border-[#555] border-solid p-[10px]"
              />

              <button className="bg-[#af8978] text-white p-[10px] border-none cursor-pointer my-[10px]">
                Update Expense
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
