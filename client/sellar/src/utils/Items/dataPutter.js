import axios from "axios";
import Cookies from "js-cookie";

export async function updateItem(params) {
  try {
    const token = Cookies.get("sellerToken");
    const { data } = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/items/update-item/${params.id}`,
      {
        ...params,
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

export async function deleteItem(id) {
  try {
    const token = Cookies.get("sellerToken");
    const { data } = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/items/delete-item/${id}`,
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
