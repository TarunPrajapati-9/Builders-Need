import axios from "axios";
import Cookies from "js-cookie";

export async function updateProductQuantity(params) {
  try {
    const token = Cookies.get("userToken");
    const { data } = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/update-cart-item-quantity`,
      {
        ...params,
      },
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

export async function deleteCartItem(params) {
  try {
    const token = Cookies.get("userToken");

    const { data } = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/delete-cart-item`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: params,
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

export async function clearCart() {
  try {
    const token = Cookies.get("userToken");
    const { data } = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/clear-cart`,
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
