import axios from "axios";
import Cookies from "js-cookie";

export async function getAllProducts() {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/items/get-all-items`
    );
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: err.message || "Something went wrong",
      data: [],
    };
  }
}

export async function getProductById(id) {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/items/get-item/${id}`
    );
    return data;
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: err.message || "Something went wrong",
      data: {},
    };
  }
}

export async function getCartItems() {
  try {
    const token = Cookies.get("userToken");
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/cart`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: err.response?.data?.message || "Something went wrong",
      data: [],
    };
  }
}

export async function getMyOrders() {
  try {
    const token = Cookies.get("userToken");
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/my-orders`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: err.response?.data?.message || "Something went wrong",
      data: [],
    };
  }
}

export async function getOrderById(orderId) {
  try {
    const token = Cookies.get("userToken");
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/seller/my-orders/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: err.response?.data?.message || "Something went wrong",
      data: [],
    };
  }
}

export async function rateProduct(orderId, rating) {
  try {
    const token = Cookies.get("userToken");
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/seller/my-orders/${orderId}`,
      {
        rating: rating,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: err.response?.data?.message || "Something went wrong",
      data: [],
    };
  }
}

export async function getProfile() {
  try {
    const token = Cookies.get("userToken");
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: err.response?.data?.message || "Something went wrong",
      data: [],
    };
  }
}

export async function getWallet() {
  try {
    const token = Cookies.get("userToken");
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/wallet/get-wallet`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: err.response?.data?.message || "Something went wrong",
      data: [],
    };
  }
}

export async function getPaymentApproval() {
  try {
    const token = Cookies.get("adminToken");
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/payments-approval`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: err.response?.data?.message || "Something went wrong",
      data: [],
    };
  }
}
