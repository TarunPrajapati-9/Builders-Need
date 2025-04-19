import axios from "axios";
import Cookies from "js-cookie";

export async function getSellerItems() {
  try {
    const token = Cookies.get("sellerToken");
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/items/get-items-by-seller`,
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

export async function getSingleItem(id) {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/items/get-item/${id}`
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
