import { FaTrash, FaEdit, FaWindowClose } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { publicRequest } from "./requestMethod";
import moment from "moment";

function App() {
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("0");
  const [date, setDate] = useState("");
  const [Transactions, setTransactions] = useState([]);
  const [updatedId, setUpdatedId] = useState("");
  const [updatedLabel, setUpdatedLabel] = useState("");
  const [updateAmount, setUpdatedAmount] = useState("");
  const [updatedDate, setUpdatedDate] = useState(
    new Date().toLocaleDateString("id-ID")
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [type, setType] = useState("income");
  const [balance, setBalance] = useState("");

  const labelRef = useRef(null);
  const dateRef = useRef(null);
  const amountRef = useRef(null);
  const updatedLabelRef = useRef(null);
  const updatedDateRef = useRef(null);
  const updatedAmountRef = useRef(null);

  const handleAddTransaction = () => {
    setShowAddTransaction(!showAddTransaction);
  };

  const handleShowReport = () => {
    setShowReport(!showReport);
  };

  const handleShowEdit = (id) => {
    setShowEdit(!showEdit);
    setUpdatedId(id);
    const transaction = Transactions.find((item) => item._id === id);
    if (transaction) {
      setUpdatedId(id);
      setUpdatedLabel(transaction.label);
      setUpdatedAmount(transaction.value.toString());
      setUpdatedDate(
        transaction.dateto.LocaleDateString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      );
      setShowEdit(true);
    }
  };

  const handleUpdateTransaction = async () => {
    if (updatedId) {
      try {
        await publicRequest.put(`/api/transaction/${updatedId}`, {
          label: updatedLabel?.trim()
            ? updatedLabel
            : Transactions.find((t) => t._id === updatedId)?.label,
          value: updateAmount?.trim()
            ? parseFloat(updateAmount.replace(/[^0-9.-]+/g, ""))
            : Transactions.find((t) => t._id === updatedId)?.value,
          date: updatedDate?.trim()
            ? updatedDate
            : Transactions.find(
                (t) => t._id === updatedId
              )?.datetoLocaleDateString("id-ID", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              }),
        });
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleTransaction = async () => {
    try {
      await publicRequest.post("/api/transaction/", {
        label,
        date,
        value: parseFloat(amount.replace(/[^0-9.-]+/g, "")),
        type,
      });
      console.log("handleTransaction");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await publicRequest.delete(`/api/transaction/${id}`);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const res = await publicRequest.get("/api/transaction");
        setTransactions(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    const getBalance = async () => {
      try {
        const res = await publicRequest.get("/api/transaction/balance");
        setBalance(res.data.balance);
      } catch (error) {
        console.error(error);
      }
    };

    getBalance();
    getTransactions();
  }, []);

  const filteredTransactions = Transactions.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => b._id.localeCompare(a._id));

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const handleKeyPress = (e, isUpdate = false) => {
    if (e.key === "Enter") {
      if (isUpdate) {
        if (updatedAmountRef.current === document.activeElement) {
          handleUpdateTransaction();
        } else if (updatedLabelRef.current === document.activeElement) {
          updatedDateRef.current.focus();
        } else if (updatedDateRef.current === document.activeElement) {
          updatedAmountRef.current.focus();
        }
      } else {
        if (amountRef.current === document.activeElement) {
          handleTransaction();
        } else if (labelRef.current === document.activeElement) {
          dateRef.current.focus();
        } else if (dateRef.current === document.activeElement) {
          amountRef.current.focus();
        }
      }
    }
  };

  const incomeTransactions = Transactions.filter(
    (transaction) => transaction.type === "income"
  );
  const expenseTransactions = Transactions.filter(
    (transaction) => transaction.type === "expense"
  );

  const incomePieChartData = incomeTransactions.map((transaction) => ({
    label: transaction.label,
    value: transaction.value,
  }));

  const expensePieChartData = expenseTransactions.map((transaction) => ({
    label: transaction.label,
    value: transaction.value,
  }));

  return (
    <>
      <div className="h-screen w-full flex justify-center bg-[#ffffff]">
        <div className="flex flex-col justify-center items-center mt-[5%] w-[80%] mr-[5%] ml-[5%] ">
          <h1
            className="text-6xl font-bold text-[#555]"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            FinTrack
          </h1>

          <div className="relative flex items-center justify-between mt-5 w-[100%]">
            <div className="relative flex justify-between w-[300px]">
              <button
                className="bg-[#bd7654] p-[10px] border-none outline-none cursor-pointer text-[#fff] text-medium rounded-2xl"
                onClick={handleAddTransaction}
              >
                Add Transaction
              </button>
              <button
                className="bg-blue-500 p-[10px] border-none outline-none cursor-pointer text-[#fff] text-medium rounded-2xl"
                onClick={handleShowReport}
              >
                Transaction Report
              </button>
            </div>

            {showAddTransaction && (
              <div className="absolute z-[999] flex flex-col p-[10px] top-[20px] left-0 h-[500px] w-[500px] bg-white shadow-xl">
                <FaWindowClose
                  className="flex justify-end items-end text-2xl text-red-500 cursor-pointer"
                  onClick={handleAddTransaction}
                />
                <label
                  htmlFor=""
                  className="mt-[10px] font-semibold text-[18px]"
                >
                  Transaction Name
                </label>
                <input
                  type="text"
                  placeholder="Snacks"
                  className="outline-none border-2 border-[#555] border-solid p-[10px]"
                  ref={labelRef}
                  onKeyPress={(e) => handleKeyPress(e)}
                  onChange={(e) => setLabel(e.target.value)}
                />
                <label
                  htmlFor=""
                  className="mt-[10px] font-semibold text-[18px]"
                >
                  Transaction Date
                </label>
                <input
                  type="date"
                  placeholder="30/07/25"
                  className="outline-none border-2 border-[#555] border-solid p-[10px]"
                  ref={dateRef}
                  onKeyPress={(e) => handleKeyPress(e)}
                  onChange={(e) => {
                    // setDate(e.target.value.toLocaleDateString("id-ID"))
                    const selectedDate = new Date(e.target.value);
                    const formattedDate = selectedDate.toLocaleDateString(
                      "id-ID",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }
                    );
                    setDate(formattedDate);
                  }}
                />
                <select value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
                <label
                  htmlFor=""
                  className="mt-[10px] font-semibold text-[18px]"
                >
                  Transaction Amount
                </label>
                <input
                  type="text"
                  placeholder="1.000,00"
                  className="outline-none border-2 border-[#555] border-solid p-[10px]"
                  ref={amountRef}
                  onKeyPress={(e) => handleKeyPress(e)}
                  onChange={(e) => setAmount(e.target.value)}
                />

                <button
                  className="bg-[#af8978] text-white p-[10px] border-none cursor-pointer my-[10px]"
                  onClick={handleTransaction}
                >
                  Add Transaction
                </button>
              </div>
            )}

            {showReport && (
              <div className="absolute z-[999] flex flex-col p-[10px] top-[20px] left-[100px] h-[650px] w-[500px] bg-white shadow-2xl">
                <FaWindowClose
                  className="absolute flex justify-end items-end text-2xl text-red-500 cursor-pointer"
                  onClick={handleShowReport}
                />
                <div className="flex flex-col justify-center items-center mt-5">
                  <span>Income</span>
                  <PieChart
                    colors={[
                      "green",
                      "lawngreen",
                      "lime",
                      "limegreen",
                      "palegreen",
                    ]}
                    series={[
                      {
                        data: incomePieChartData,
                        innerRadius: 30,
                        outerRadius: 100,
                        paddingAngle: 5,
                        cornerRadius: 5,
                        startAngle: -45,
                        endAngle: 225,
                        cx: 150,
                        cy: 150,
                        highlightScope: { fade: "global", highlight: "item" },
                        faded: {
                          innerRadius: 30,
                          additionalRadius: -30,
                          color: "gray",
                        },
                      },
                    ]}
                    width={500}
                    height={300}
                  />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <span>Expense</span>
                  <PieChart
                    colors={["maroon", "red", "crimson", "orangered", "tomato"]}
                    series={[
                      {
                        data: expensePieChartData,
                        innerRadius: 30,
                        outerRadius: 100,
                        paddingAngle: 5,
                        cornerRadius: 5,
                        startAngle: -45,
                        endAngle: 225,
                        cx: 150,
                        cy: 150,
                        highlightScope: { fade: "global", highlight: "item" },
                        faded: {
                          innerRadius: 30,
                          additionalRadius: -30,
                          color: "gray",
                        },
                      },
                    ]}
                    width={450}
                    height={300}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-center items-center flex-col ">
              <h4>Balance</h4>
              <h1 className="text-3xl ">Rp {formatCurrency(balance)}</h1>
            </div>

            <div>
              <input
                type="text"
                placeholder="Search..."
                className="p-[10px] w-[150px] border-2 border-solid border-[#444] outline-none"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col ">
            {filteredTransactions.map((item, index) => (
              <div
                className={`relative flex justify-between items-center w-[80vw] h-[100px] bg-[#f3edeb] my-[10px] py-[10px] capitalize ${
                  item.type === "income"
                    ? "bg-green-500"
                    : "bg-red-500 text-white"
                }`}
                key={index}
              >
                <h2
                  className={`m-[20px] text-[18px] font-medium ${
                    item.type === "income" ? "text-[#555]" : ""
                  }`}
                >
                  {item.label}
                </h2>
                <span className="m-[20px] text-[18px]">{item.date}</span>
                <span className="m-[20px] text-[18px] font-medium">
                  Rp {item.type === "income" ? "+" : "-"}
                  {formatCurrency(item.value)}
                </span>
                <div className="m-[20px]">
                  <FaTrash
                    className={`mb-[5px] cursor-pointer ${
                      item.type === "income" ? "text-red-500" : "text-green-500"
                    }`}
                    onClick={() => handleDelete(item._id)}
                  />
                  <FaEdit
                    className="text-[#555] mb-[5px] cursor-pointer"
                    onClick={() => handleShowEdit(item._id)}
                  />
                </div>
              </div>
            ))}
          </div>

          {showEdit && (
            <div className="absolute z-[999] flex flex-col p-[10px] top-[25%] right-0 h-[500px] w-[500px] bg-white shadow-xl">
              <FaWindowClose
                className="flex justify-end items-end text-2xl text-red-500 cursor-pointer"
                onClick={handleShowEdit}
              />
              <label htmlFor="" className="mt-[10px] font-semibold text-[18px]">
                Transaction Name
              </label>
              <input
                type="text"
                placeholder="Snacks"
                className="outline-none border-2 border-[#555] border-solid p-[10px]"
                ref={updatedLabelRef}
                onKeyPress={(e) => handleKeyPress(e, true)}
                onChange={(e) => setUpdatedLabel(e.target.value)}
              />
              <label htmlFor="" className="mt-[10px] font-semibold text-[18px]">
                Transaction Date
              </label>
              <input
                type="date"
                placeholder="30/07/25"
                className="outline-none border-2 border-[#555] border-solid p-[10px]"
                ref={updatedDateRef}
                onKeyPress={(e) => handleKeyPress(e, true)}
                onChange={(e) => {
                  // setDate(e.target.value.toLocaleDateString("id-ID"))
                  const selectedDate = new Date(e.target.value);
                  const formattedDate = selectedDate.toLocaleDateString(
                    "id-ID",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }
                  );
                  setUpdatedDate(formattedDate);
                }}
              />
              <label htmlFor="" className="mt-[10px] font-semibold text-[18px]">
                Transaction Amount
              </label>
              <input
                type="number"
                placeholder="1.000,00"
                className="outline-none border-2 border-[#555] border-solid p-[10px]"
                ref={updatedAmountRef}
                onKeyPress={(e) => handleKeyPress(e, true)}
                onChange={(e) => setUpdatedAmount(e.target.value)}
              />

              <button
                className="bg-[#af8978] text-white p-[10px] border-none cursor-pointer my-[10px]"
                onClick={handleUpdateTransaction}
              >
                Update Transaction
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
