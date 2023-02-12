import React, { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

const BudgetContext = React.createContext();

export function useBudgets() {
  return useContext(BudgetContext);
}

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  function getBudgetExpenses(budgetId) {
    return expenses.filter((expense) => expense.budgetId == budgetId);
  }
  function addBudget({ name, max }) {
    setBudgets((prev) => {
      if (prev.find((budget) => budget.name == name)) return prev;
      return [...prev, { id: uuidv4(), name, max }];
    });
  }
  function addExpense({ amount, budgetId, description }) {
    setExpenses((prev) => {
      return [...prev, { id: uuidv4(), amount, budgetId, description }];
    });
  }
  function deleteBudget({ id }) {
    setExpenses((prev) => {
      return prev.map((expense) => {
        if (expense.budgetId !== id) return expense;
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
      });
    });

    setBudgets((prev) => prev.filter((budget) => budget.id !== id));
  }
  function deleteExpense({ id }) {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  }

  return (
    <BudgetContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addBudget,
        addExpense,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
