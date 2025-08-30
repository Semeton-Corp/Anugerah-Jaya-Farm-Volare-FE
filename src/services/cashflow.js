import api from "./api";
const token = localStorage.getItem("token");

export const createExpense = (payload) => {
  return api.post(`/cashflows/expenses`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const getExpenseOverview = (category, month, year) => {
  return api.get(`/cashflows/expenses/overview`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    params: {
      category: category,
      month: month,
      year,
    },
  });
};

export const getExpense = (category, id) => {
  return api.get(`/cashflows/expenses/${category}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const getIncomeOverview = (category, month, year) => {
  return api.get(`/cashflows/incomes/overview`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    params: {
      category: category,
      month: month,
      year,
    },
  });
};

export const getIncome = (category, id) => {
  return api.get(`/cashflows/incomes/${category}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};
