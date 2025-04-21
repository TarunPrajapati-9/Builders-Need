import axios from "axios";
import Cookies from "js-cookie";

export async function getSellerOrders() {
  try {
    const token = Cookies.get("sellerToken");
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/seller/my-orders`,
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

export async function getOrderById(orderId) {
  try {
    const token = Cookies.get("sellerToken");
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
