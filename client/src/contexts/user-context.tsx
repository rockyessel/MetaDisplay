import axios from 'axios';
import React from 'react';
import { useAddress } from '@thirdweb-dev/react';

interface Props {}

const UserContext = React.createContext({});

export const UserContextProvider = ({ children }: { children: any }) => {
  const [showRegisterModal, setShowRegisterModal] = React.useState(false);
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const address = useAddress();

    const LoginUserWithAddress = async (form:any) => {}

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
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  };

  const FindUserWithAddress = async (address: string) => {
    const response = await axios({
      method: 'GET',
      baseURL: `${process.env.VITE_BACKEND_API_BASE_URL}v1/users/find/${address}`,
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    //   if (response.data) {
    //     localStorage.setItem('user', JSON.stringify(response.data))
    //   }
    return response.data;
  };
  const CheckingUserState = async () => {
    const user = localStorage.getItem('user');
    if (address) {
      const foundUser = await FindUserWithAddress(address);
      console.log('foundUser', foundUser);
      if (foundUser.address === address) {
        user ? null : setShowLoginModal(true);
        setShowRegisterModal(false);
      } else {
        setShowLoginModal(false);
        setShowRegisterModal(true);
      }
    }
  };

  React.useEffect(() => {
    CheckingUserState();
  }, [address]);

  const value = {
    RegisterUser,
    showRegisterModal,
    showLoginModal,
    address,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
export const useUserContext = () => React.useContext(UserContext);
