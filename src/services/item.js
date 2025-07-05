import api from "./api";
const token = localStorage.getItem("token");

///Item
export const createItem = (payload) => {
  return api.post("/items", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const getItems = (category, storeId) => {
  return api.get("/items", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    params: {
      category: category,
      storeId: storeId,
    },
  });
};

///Price
export const createItemPrice = (payload) => {
  return api.post("/items/prices", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const getItemPrices = () => {
  return api.get("/items/prices", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

//Price Discount
export const createItemPriceDiscount = (payload) => {
  return api.post("/items/prices/discounts", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const getItemPricesDiscount = () => {
  return api.get("/items/prices/discounts", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};
