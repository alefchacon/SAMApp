import { api } from "../../../lib/apiClient"
import { LOGIN_URL } from "./authUrls"

const logIn = async (username = "", password = "") => {
  const body = {
    username: username,
    password: password,
  }
  const response = await api.post(LOGIN_URL, body);
  console.log(response)
}

export default logIn