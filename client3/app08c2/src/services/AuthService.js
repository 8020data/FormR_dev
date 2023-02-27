import axios from "axios";
import bcrypt from "bcryptjs"

const API_URL =  process.env.REACT_APP_API_URL + "/api/";   // .(01108.02.1 RAM get from .ENV file. Using REACT_APP special prefix)
const aSalt   = '$2a$04$qy3HhHlVJT/wUB364EVjmu'             // .(10416.04.1 RAM Need this for bcrypt.hash to match)
                
class AuthService {

  login(username, password) {
    password =  bcrypt.hashSync( password, aSalt )          // .(10416.04.4 RAM Was , 8) 

    return axios
      .post(API_URL + "auth/login", { username, password }) // .(10228.12.7 RAM Changed signin to login)

      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    password =  bcrypt.hashSync( password, aSalt )          // .(10416.04.5 RAM Was , 8) 

    return axios.post(API_URL + "auth/register", { username, email, password }); // .(10228.12.7 RAM Changed signup to register)
  }
  // bt note - if no password change should we have updateCurrentUserNoPassword() ???
  updateCurrentUser(id, username, email, password) {
    password =  bcrypt.hashSync( password, aSalt )          // .(10416.04.6 RAM Was , 8) 

    var data = {};

    if (username) { data.username = username }
    if (email) { data.email = email }
    if (password) { data.password = password }

    return axios.put(API_URL + `formr/users/${id}` , data );
    }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
