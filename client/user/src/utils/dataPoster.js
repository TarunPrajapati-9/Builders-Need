import axios from "axios";
import Cookies from "js-cookie";

export async function login(params) {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/login`,
      {
        ...params,
      }
    );
    console.log(data);
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

export async function register(params) {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/register`,
      {
        ...params,
        pincode: parseInt(params.pincode),
      }
    );
    console.log(data);
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

export async function forgetPasswordOtp(email) {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/forget-password/send-otp`,
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
      }/api/user/forget-password/update-password`,
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

export async function addItemToCart(params) {
  try {
    const token = Cookies.get("userToken");
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/cart`,
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

export async function placeOrder(params) {
  try {
    const token = Cookies.get("userToken");
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/makeOrder`,
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

export async function createWallet(pin) {
  try {
    const token = Cookies.get("userToken");
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/wallet/create-wallet`,
      {
        pin,
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

export async function addMoneyToWallet(params) {
  try {
    const token = Cookies.get("userToken");
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/wallet/add-money`,
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

export async function debitMoneyFromWallet(params) {
  try {
    const token = Cookies.get("userToken");
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/wallet/debit-money`,
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

export async function adminLogin(params) {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/login`,
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
