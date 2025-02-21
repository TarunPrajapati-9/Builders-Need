import axios from "axios";

export async function sendOtp(email) {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/seller/send-otp`,
      {
        email,
      }
    );
    console.log("OTP" + data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function verifyOtp(params) {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/seller/verify-otp`,
      {
        ...params,
      }
    );
    console.log("OTP" + data);
    return data;
  } catch (err) {
    console.log(err);
  }
}
