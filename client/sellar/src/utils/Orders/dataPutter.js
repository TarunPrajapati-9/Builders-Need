import axios from "axios";
import Cookies from "js-cookie";

export async function updateOrderStatus(orderId, status) {
  try {
    const token = Cookies.get("sellerToken");
    const { data } = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/seller/my-orders/${orderId}`,
      {
        status,
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
