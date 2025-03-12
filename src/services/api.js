import axios from "axios";
import axiosRetry from "axios-retry";
const FAKE_STORE_API = "https://fakestoreapi.com";
const DUMMY_JSON_API = "https://dummyjson.com";
axiosRetry(axios, {
  retries: 5,
  retryDelay: (retryCount) => retryCount * 1000,
  retryCondition: (error) => error.response?.status >= 500,
});
//[Get Product From (FakeStoreAPI)]
export const fetchFakeStoreProducts = async () => {
  try {
    const response = await axios.get(`${FAKE_STORE_API}/products`);
    return response.data.map((product) => ({
      id: product.id,
      title: product.title,
      price: product.price,
      category: product.category,
      image: product.image,
      description: product.description,
      rating: product.rating?.rate || 0,
      reviewsCount: product.rating?.count || 0,
    }));
  } catch {
    return [];
  }
};
//[Get Product From (DummyJSON)]
const fetchDummyJSONProducts = async () => {
  try {
    const response = await axios.get(`${DUMMY_JSON_API}/products?limit=194`);
    return response.data.products.map((product) => ({
      id: product.id + 1000,
      title: product.title || product.name,
      price: product.price || product.cost,
      category:
        product.category === "mobile" ? "smartphones" : product.category,
      image: product.thumbnail,
      description: product.description,
      rating: product.rating || 0,
      reviewsCount: product.reviews?.length || 0,
    }));
  } catch {
    return [];
  }
};
//[Get All Product]
export const fetchProducts = async () => {
  try {
    const [fakeStoreData, dummyJSONData] = await Promise.all([
      fetchFakeStoreProducts(),
      fetchDummyJSONProducts(),
    ]);
    return [...fakeStoreData, ...dummyJSONData];
  } catch {
    return [];
  }
};
//[Get All Categories]
export const fetchCategories = async () => {
  let fakeStoreCategories = [];
  let dummyCategories = [];
  try {
    // const responseFakeStore = await axios.get(
    //   `${FAKE_STORE_API}/products/categories`
    // );
    // fakeStoreCategories = responseFakeStore.data;
    const responseDummyJSON = await axios.get(
      `${DUMMY_JSON_API}/products/categories`
    );
    dummyCategories = responseDummyJSON.data.map((cat) => cat.slug);
  } catch {
    return [];
  }
  const allCategories = [...fakeStoreCategories, ...dummyCategories];
  return allCategories;
};
//[Get Users Data]
export const fetchUserData = async (id = null) => {
  try {
    const endpoint = id ? `users/${id}` : "users";
    const response = await axios.get(`${FAKE_STORE_API}/${endpoint}`);
    return response.data;
  } catch {
    return;
  }
};
//[Put And Update User Data]
export const updateUserData = async (userId, updatedData) => {
  try {
    const response = await axios.put(
      `${FAKE_STORE_API}/users/${userId}`,
      updatedData
    );
    return response.data;
  } catch {
    return;
  }
};
//[Post User Login ]
export const LoginUser = async (username, password) => {
  try {
    const response = await axios.post(`${FAKE_STORE_API}/auth/login`, {
      username,
      password,
    });
    const token = response.data.token;
    if (!token) throw new Error("Login failed: No token received");
    const users = await fetchUserData();
    const user = users.find((u) => u.username === username);
    if (!user) throw new Error("User not found");
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("userId", user.id);
    return { token, id: user.id };
  } catch {
    return;
  }
};
//[Post New User]
export const SignUpUser = async (username, email, password) => {
  try {
    const response = await axios.post(`${FAKE_STORE_API}/users`, {
      username,
      email,
      password,
    });
    sessionStorage.setItem("token", response.data.token);
    sessionStorage.setItem("userId", response.data.id);
    return response.data;
  } catch {
    return;
  }
};
