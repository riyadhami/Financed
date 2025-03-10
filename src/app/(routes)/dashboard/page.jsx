"use client";
import React, { useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import CardInfo from "./_components/CardInfo";
import { db } from "../../../utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses, Incomes } from "../../../utils/schema";
import BarChartDashboard from "./_components/BarChartDashboard";
import BudgetItem from "./budgets/_components/BudgetItem";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";

function Dashboard() {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);
  const [incomeList, setIncomeList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getBudgetList();
    }
  }, [user]);

  const getBudgetList = async () => {
    try {
      setIsLoading(true);
      const result = await db
        .select({
          ...getTableColumns(Budgets),
          totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
          totalItem: sql`count(${Expenses.id})`.mapWith(Number),
        })
        .from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .groupBy(Budgets.id)
        .orderBy(desc(Budgets.id));

      setBudgetList(result);
      await Promise.all([getAllExpenses(), getIncomeList()]);
    } catch (error) {
      console.error("Error fetching budget list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getIncomeList = async () => {
    try {
      const result = await db
        .select({
          ...getTableColumns(Incomes),
          totalAmount: sql`SUM(CAST(${Incomes.amount} AS NUMERIC))`.mapWith(Number),
        })
        .from(Incomes)
        .groupBy(Incomes.id);

      setIncomeList(result);
    } catch (error) {
      console.error("Error fetching income list:", error);
    }
  };

  const getAllExpenses = async () => {
    try {
      const result = await db
        .select({
          id: Expenses.id,
          name: Expenses.name,
          amount: Expenses.amount,
          createdAt: Expenses.createdAt,
        })
        .from(Budgets)
        .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(Expenses.id));

      setExpensesList(result);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  return (
    <div className="p-8">
      <h2 className="font-bold text-4xl">Hi, {user?.fullName} 👋</h2>
      <p className="text-gray-500">
        Here's what's happening with your money. Let's manage your expenses!
      </p>

      <CardInfo budgetList={budgetList} incomeList={incomeList} />

      <div className="grid grid-cols-1 lg:grid-cols-3 mt-6 gap-5">
        <div className="lg:col-span-2">
          {budgetList.length > 0 ? (
            <BarChartDashboard budgetList={budgetList} />
          ) : (
            <div className="border rounded-2xl p-5 h-[400px] flex items-center justify-center">
              <p className="text-gray-500">Add some budgets to see your activity chart</p>
            </div>
          )}

          <ExpenseListTable
            expensesList={expensesList}
            refreshData={() => getBudgetList()}
            budgetId={budgetList.length > 0 ? budgetList[0].id : null}
          />
        </div>
        <div className="space-y-5">
          <h2 className="font-bold text-lg">Latest Budgets</h2>
          {isLoading ? (
            // Loading state
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-[180px] w-full bg-slate-200 rounded-lg animate-pulse"
                />
              ))}
            </div>
          ) : budgetList.length > 0 ? (
            // Budgets list
            <div className="space-y-4">
              {budgetList.slice(0, 4).map((budget, index) => (
                <BudgetItem budget={budget} key={budget.id || index} />
              ))}
            </div>
          ) : (
            // Empty state
            <div className="border rounded-lg p-4 text-center text-gray-500">
              No budgets created yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;