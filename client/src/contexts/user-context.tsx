import axios from 'axios';
import React from 'react';

interface Props {}

const UserContext = React.createContext({});

const UserContextProvider = ({ children }: { children: any }) => {
  const [isUser, setIsUser] = React.useState(true);
  const [userData, setUserData] = React.useState({})


  const RegisterUser = async (formData: any) => {
  const response = await axios({
    method: 'POST',
    baseURL: `${process.env.VITE_BACKEND_API_BASE_URL}v1/users/register`,
    data: formData,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data;
};

  React.useEffect(() => {
    const user = localStorage.getItem('user')
    if(user !== null) {
      setIsUser(false)
    } if() {}
  },[])


    const value = {
      RegisterUser,
      isUser,
    };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
export const useUserContext = () => React.useContext(UserContext);
