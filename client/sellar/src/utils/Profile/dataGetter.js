import axios from "axios";
import Cookies from "js-cookie";

export async function getProfile() {
  try {
    const token = Cookies.get("sellerToken");
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/seller/profile`,
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
