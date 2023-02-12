import BudgetCard from "./BudgetCard";
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "../Contexts/BudgetContext";

export default function TotalBudgetCard() {
  const { budgets, expenses } = useBudgets();
  const amount = expenses.reduce((total, expense) => total + expense.amount, 0);
  const max = budgets.reduce((total, budget) => total + budget.max, 0);

  if (max === 0) return null;
  return <BudgetCard name="Total" max={max} amount={amount} gray hideButtons/>;
}
