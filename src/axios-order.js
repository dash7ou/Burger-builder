import axios from "axios";

const instance = axios.create({
  baseURL: "https://my-burger-react-76a9f.firebaseio.com/"
});

export default instance;
