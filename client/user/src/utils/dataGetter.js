import axios from "axios";

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
