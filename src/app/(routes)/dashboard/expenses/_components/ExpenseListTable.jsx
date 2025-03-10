import { db } from "../../../../../utils/dbConfig";
import { Expenses } from "../../../../../utils/schema";
import { eq } from "drizzle-orm";
import { Plus, Trash } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../components/ui/dialog";
import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import moment from "moment";

function ExpenseListTable({ expensesList, refreshData, budgetId }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const deleteExpense = async (expense) => {
    const result = await db
      .delete(Expenses)
      .where(eq(Expenses.id, expense.id))
      .returning();

    if (result) {
      toast("Expense Deleted!");
      refreshData();
    }
  };

  const addNewExpense = async () => {
    if (!name || !amount) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const result = await db
        .insert(Expenses)
        .values({
          name: name,
          amount: amount,
          budgetId: budgetId,
          createdAt: moment().format("DD/MM/YYYY"),
        })
        .returning();

      if (result) {
        toast.success("New Expense Added!");
        setName("");
        setAmount("");
        refreshData();
      }
    } catch (error) {
      console.error("Error adding expense:", error);
      toast.error("Failed to add expense");
    }
  };

  return (
    <div className="mt-3">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-bold text-lg">Latest Expenses</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="rounded-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Expense
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Expense</DialogTitle>
            </DialogHeader>
            <div className="mt-5 space-y-4">
              <div>
                <h2 className="text-black font-medium my-1">Expense Name</h2>
                <Input
                  placeholder="e.g. Groceries"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <h2 className="text-black font-medium my-1">Amount</h2>
                <Input
                  type="number"
                  placeholder="e.g. 50"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <DialogClose asChild>
                <Button
                  className="w-full rounded-full"
                  onClick={addNewExpense}
                  disabled={!name || !amount}
                >
                  Add Expense
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-4 rounded-tl-xl rounded-tr-xl bg-slate-200 p-2 mt-3">
        <h2 className="font-bold">Name</h2>
        <h2 className="font-bold">Amount</h2>
        <h2 className="font-bold">Date</h2>
        <h2 className="font-bold">Action</h2>
      </div>
      {expensesList.length > 0 ? (
        expensesList.map((expense, index) => (
          <div key={expense.id || index} className="grid grid-cols-4 bg-slate-50 p-2 border-b">
            <h2>{expense.name}</h2>
            <h2>${new Intl.NumberFormat().format(expense.amount)}</h2>
            <h2>{expense.createdAt}</h2>
            <button
              onClick={() => deleteExpense(expense)}
              className="text-red-500 hover:text-red-700 flex items-center gap-1"
            >
              <Trash className="w-4 h-4" />
              Delete
            </button>
          </div>
        ))
      ) : (
        <div className="text-center py-4 text-gray-500">
          No expenses added yet
        </div>
      )}
    </div>
  );
}

export default ExpenseListTable;