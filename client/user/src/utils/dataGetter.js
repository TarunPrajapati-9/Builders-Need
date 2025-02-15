import axios from "axios";

export async function getProducts() {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URI}/api/items/fetchitems`,
      {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }
    );
    // console.log(data);
    return data;
  } catch (error) {
    const err = error;
    return err.response?.data;
  }
}
