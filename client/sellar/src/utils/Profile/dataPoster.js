import axios from "axios";

export async function sendOtp(email) {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/seller/send-otp`,
      {
        email,
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

export async function verifyOtp(params) {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/seller/verify-otp`,
      {
        ...params,
      }
    );
    // console.log("OTP" + JSON.stringify(data));
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

export async function registerSeller(params) {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/seller/register`,
      {
        ...params,
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

export async function login(params) {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/seller/login`,
      {
        ...params,
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

export async function forgetPasswordOtp(email) {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/seller/forget-password/send-otp`,
      {
        email,
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

export async function updatePassword(params) {
  try {
    const { data } = await axios.post(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/seller/forget-password/update-password`,
      {
        ...params,
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
