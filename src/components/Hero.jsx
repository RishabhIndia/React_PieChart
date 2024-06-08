import { CChart } from "@coreui/react-chartjs";
import { useEffect, useState } from "react";

const Hero = () => {
  const [homevalue, sethomevalue] = useState(1000);
  const [downpayment, setdownpayment] = useState(0);
  const [loanamount, setloanamount] = useState(0);
  const [Interestrate, setInterest] = useState(2);
  const [tenure, settenure] = useState(10);

  const [monthlypayment, setmonthlypayment] = useState(0); 

  useEffect(() => {
    const newdownpayment = Math.floor(homevalue * 0.2);
    setdownpayment(newdownpayment);
    setloanamount(homevalue - newdownpayment);
  }, [homevalue]);

  useEffect(() => {
    const interestperMonth = Interestrate / 100 / 12;
    const totalLoanMonths = tenure * 12;
    const EMI =
      (loanamount * interestperMonth * (1 + interestperMonth) ** totalLoanMonths) /
      ((1 + interestperMonth) ** totalLoanMonths - 1);

    setmonthlypayment(EMI); 
  }, [loanamount, Interestrate, tenure]);

  return (
    <div className="flex">
      <div className="left">
        <div>
          <h3>Home value</h3>
          <h2>$ {homevalue}</h2>
          <input
            onChange={(e) => sethomevalue(parseInt(e.currentTarget.value))}
            type="range"
            min="1000"
            max="10000"
            value={homevalue} 
          />
          <div className="min_max-flex">
            <span>$ 1000</span>
            <span>$ 10000</span>
          </div>
        </div>
        <div>
          <h3>Down Payment</h3>
          <h2>$ {homevalue - loanamount}</h2>
          <input
            onChange={(e) => {
              setdownpayment(parseInt(e.currentTarget.value));
              setloanamount(homevalue - parseInt(e.currentTarget.value));
            }}
            type="range"
            min="0"
            max={homevalue}
            value={downpayment} 
          />
          <div className="min_max-flex">
            <span>$ 0</span>
            <span>$ {homevalue}</span>
          </div>
        </div>
        <div>
          <h3>Loan Amount</h3>
          <h2>$ {loanamount}</h2>
          <input
            onChange={(e) => setloanamount(parseInt(e.currentTarget.value))}
            type="range"
            min="0"
            max="10000"
            value={loanamount} 
          />
          <div className="min_max-flex">
            <span>$ 0</span>
            <span>$ 10000</span>
          </div>
        </div>
        <div>
          <h3>Interest Rate</h3>
          <h2>% {Interestrate}</h2> 
          <input
            onChange={(e) => setInterest(parseInt(e.currentTarget.value))}
            type="range"
            min="2"
            max="18"
            value={Interestrate} 
          />
          <div className="min_max-flex">
            <span>% 2</span>
            <span>% 18</span>
          </div>
        </div>
        <div className="dropdown-container">
          <label htmlFor="tenure" className="dropdown-label">
            Select Tenure:
          </label>
          <select
            id="tenure"
            name="tenure"
            className="tenure-dropdown"
            onChange={(e) => settenure(parseInt(e.currentTarget.value))} 
          >
            <option value="5">5 Years</option> 
            <option value="10">10 Years</option> 
            <option value="15">15 Years</option> 
            <option value="20">20 Years</option> 
            <option value="25">25 Years</option> 
          </select>
        </div>
      </div>

      <div className="right">
        <h3>Monthly Payments : ${monthlypayment.toFixed(2)}</h3> 
        <CChart
          type="pie"
          data={{
            labels: ["Principle", "Interest"],
            datasets: [
              {
                backgroundColor: ["#FFD955", "#CD4BF3"],
                data: [loanamount, monthlypayment * tenure * 12 - loanamount], 
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                labels: {
                  color: "green",
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Hero;
