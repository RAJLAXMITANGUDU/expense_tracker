import { useEffect,useState } from "react";
import Card from "../../components/Card/Card";
import styles from "./Home.css";
import TransactionList from "../../components/TransactionList/TransactionList";
import Expense from "../../components/Forms/Expense/Expense";
import Modal from "../../components/Modal/Modal";
import AddBalance from "../../components/Forms/AddBalance/AddBalance";
import PieChart from "../../components/PieChart/PieChart";
import BarChart from "../../components/BarChart/BarChart";

const useLocalStorage=(key,initialValue)=>{
    const [storedValue,setStoredValue]=useState(()=>{
        const item=localStorage.getItem(key);
        return item ? JSON .parse(item) : initialValue;
    });

    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(storedValue));
    },[key,storedValue]);
    return [storedValue,setStoredValue];
};

const calculateCategoryStats = (expenseList) =>{
    return expenseList.reduce(
        (acc,item)=>{
            acc.spends[item.category]=
            (acc.spends[item.category] || 0)+Number(item.price);
            acc.counts[item.category]=(acc.counts[item.category] || 0)+1;
            return acc;
        },{
            spends:{foods:0,entertainment:0,travel:0},
            counts:{foods:0,entertainment:0,travel:0},
        }
    );
};

function Home(){
    const [balance,setBalance]=useLocalStorage("balance",5000);
    const [expenseList,setExpenseList]=useLocalStorage("expense",[]);
    const [isOpenBalance,setIsOpenBalance]=useState(false);
    const [isOpenExpense,setIsOpenExpense]=useState(false);
    const {spends:categorySpends,counts:categoryCounts}=calculateCategoryStats(expenseList);
    const expense =expenseList.reduce(
        (total,item)=>total+Number(item.price),
        0
    );
    const handleAddIncome=()=>{
        setIsOpenBalance(true);
    };
    const handleAddExpense=()=>{
        setIsOpenExpense(true);
    };
    return(
        <div className={styles.container}>
            <h1>Expense Tracker</h1>
            <div className={styles.cardsWrapper}>
                <Card
                  title="Wallet Balance"
                  money={balance}
                  buttonText="+ Add Income"
                  buttonType="success"
                  handleClick={handleAddIncome}
                />
                <Card
                  title="Expenses"
                  money={expense}
                  buttonText="+ Add Expense"
                  buttonType="failure"
                  success={false}
                  handleClick={handleAddExpense}
                />
                <PieChart 
                  data={[
                    {name:"Food",value:categorySpends.food},
                    {name:"Entertainment",value:categorySpends.entertainment},
                    {name:"Travel",value:categorySpends.travel},
                  ].filter((item)=>item.value)}
                />
            </div>
            <div className={styles.transactionsWrapper}>
                <TransactionList
                 transactions={expenseList}
                 editTransactions={setExpenseList}
                 title="Recent Transactions"
                 balance={balance}
                 setBalance={setBalance}
                />
                <BarChart
                  data={[
                    {name:"Food",value:categoryCounts.food},
                    {name:"Entertainment",value:categoryCounts.entertainment},
                    {name:"Travel",value:categoryCounts.travel},
                  ].filter((item)=>item.value)}
                />
            </div>
            <Modal isOpen={isOpenExpense} setIsOpen={setIsOpenExpense}>
                <Expense
                  setIsOpen={setIsOpenExpense}
                  expenseList={expenseList}
                  setExpenseList={setExpenseList}
                  setBalance={setBalance}
                  balance={balance}
                />
            </Modal>
            <Modal isOpen={isOpenBalance} setIsOpen={setIsOpenBalance}>
                <AddBalance setIsOpen={setIsOpenBalance} setBalance={setBalance} />
            </Modal>
        </div>
    );
}

export default Home;