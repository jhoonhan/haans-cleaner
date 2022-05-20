import axios from "axios";

export default axios.create({
  baseURL: "https://haanscleaner-api.herokuapp.com/api/v2",
  // baseURL: "http://localhost:3002/api/v2",
});
