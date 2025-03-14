import {
    PiggyBank,
    ReceiptText,
    Wallet,
    Sparkles,
    CircleDollarSign,
    Calculator,
} from "lucide-react";
import React, { useEffect, useState } from "react";

function CardInfo({budgetList, incomeList}) {
    const [totalBudget, setTotalBudget] = useState(0);
    const [totalSpend, setTotalSpend] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [financialAdvice, setFinancialAdvice] = useState("");

    const getFinancialAdvice = (totalBudget, totalIncome, totalSpend) => {
        // Calculate percentages and ratios
        const spendingRatio = totalSpend / totalBudget;
        const savingsRate = (totalIncome - totalSpend) / totalIncome;
        const budgetUtilization = totalSpend / totalBudget;

        // Generate advice based on financial metrics
        if (totalIncome === 0) {
            return "Start by adding your income sources to get personalized financial advice.";
        }

        let advice = [];

        // Spending vs Budget advice
        if (spendingRatio > 0.9) {
            advice.push("You're close to or exceeding your budget limits. Consider reviewing your expenses.");
        } else if (spendingRatio < 0.5) {
            advice.push("You're well within your budget - great job at expense management!");
        }

        // Savings advice
        if (savingsRate < 0.2) {
            advice.push("Try to increase your savings rate to at least 20% of your income.");
        } else if (savingsRate > 0.3) {
            advice.push("Excellent savings rate! Consider investing your surplus.");
        }

        // Budget utilization advice
        if (budgetUtilization > 1) {
            advice.push("Your spending exceeds your budget. Consider adjusting your budget or reducing expenses.");
        }

        // If no specific advice was generated
        if (advice.length === 0) {
            advice.push("Your financial metrics look balanced. Keep maintaining your current habits!");
        }

        return advice[Math.floor(Math.random() * advice.length)];
    };

    useEffect(() => {
        if(budgetList.length > 0 || incomeList.length > 0) {
            CalculateCardInfo()
        }
    }, [budgetList, incomeList]);

    useEffect(() => {
        if (totalBudget > 0 || totalIncome > 0 || totalSpend > 0) {
            const advice = getFinancialAdvice(totalBudget, totalIncome, totalSpend);
            setFinancialAdvice(advice);
        }
    }, [totalBudget, totalIncome, totalSpend]);

    const CalculateCardInfo = () => {
        let totalSpend_ = 0;
        let totalBudget_ = 0;
        let totalIncome_ = 0;

        budgetList.forEach((element) => {
            totalBudget_ = totalBudget_ + Number(element.amount);
            totalSpend_ = totalSpend_ + element.totalSpend;
        });
        incomeList.forEach((element) => {
            totalIncome_ = totalIncome_ + element.totalAmount;
        });

        setTotalIncome(totalIncome_);
        setTotalBudget(totalBudget_);
        setTotalSpend(totalSpend_);
    };

    const formatNumber = (number) => {
        return new Intl.NumberFormat().format(number || 0);
    };

    return (
        <div>
            {budgetList.length > 0 ? (
                <div>
                    <div className="p-7 border mt-4 -mb-1 rounded-2xl flex items-center justify-between">
                        <div className="">
                            <div className="flex mb-2 flex-row space-x-1 items-center">
                                <h2 className="text-md">Financed AI</h2>
                                <Sparkles className="rounded-full text-white w-10 h-10 p-2 bg-gradient-to-r from-pink-500 via-blue-500 to-yellow-500 background-animate" />
                            </div>
                            <h2 className="font-light text-md">{financialAdvice || "Analyzing your financial data..."}</h2>
                        </div>
                    </div>
                    <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        <div className="p-7 border rounded-2xl flex items-center justify-between">
                            <div>
                                <h2 className="text-sm">Total Budget</h2>
                                <h2 className="font-bold text-2xl">${formatNumber(totalBudget)}</h2>
                            </div>
                            <PiggyBank className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
                        </div>
                        <div className="p-7 border rounded-2xl flex items-center justify-between">
                            <div>
                                <h2 className="text-sm">Total Spending</h2>
                                <h2 className="font-bold text-2xl">${formatNumber(totalSpend)}</h2>
                            </div>
                            <ReceiptText className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
                        </div>
                        <div className="p-7 border rounded-2xl flex items-center justify-between">
                            <div>
                                <h2 className="text-sm">Total Income</h2>
                                <h2 className="font-bold text-2xl">${formatNumber(totalIncome)}</h2>
                            </div>
                            <CircleDollarSign className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default CardInfo;