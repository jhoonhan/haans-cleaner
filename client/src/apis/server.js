import axios from "axios";

export default axios.create({
  baseURL: "https://haanscleaner-api.herokuapp.com/api/v2",
});
