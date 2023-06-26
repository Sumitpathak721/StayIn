import axios from "axios";

export default function Oauth(token) {
  let headers = {
    'Content-Type': 'application/json',
    authorization: JSON.parse(token),
  };

  return axios.get("/userInfo", { headers })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Error fetching user info:', error);
      throw error;
    });
}
