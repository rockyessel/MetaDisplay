import axios from 'axios';
import React from 'react';
import { useAddress } from '@thirdweb-dev/react';
import { AssetDetailsDefault, AssetUserFromDBDefault, formDataInitialValue, loginDefaultValue } from '../utils/constant';
import { AssetUserFromDB } from '../interface';
import { AssetDetailsProps } from '../pages/explore-details';


interface UserContextProviderProps {
  RegisterUser: (formData: any) => Promise<void>;
  showRegisterModal: boolean;
  showLoginModal: boolean;
  LoginUserWithAddress: (form: any) => Promise<void>;
  userData: AssetUserFromDB;
  handleRegisterToggle: () => void;
  handleLoginToggle: () => void;
  userLogState: boolean;
  getAllUsers: AssetUserFromDB[];
  FindUserWithAddress: (address: string) => Promise<AssetUserFromDB>;
  AssetViewCounts: (assetId: string) => Promise<void>;
  AssetSave: (assetId: string) => Promise<void>;
  GetAsset: (_id: string) => Promise<AssetDetailsProps>;
  handleReusableModalToggle: (place: string) => void;
  reusableModalState: boolean;
  reusableModalValue: string;
}

type Props = {
  children: React.ReactNode;
};

const UserContext = React.createContext({
  RegisterUser: (formData: any) => Promise.resolve(),
  showRegisterModal: false,
  showLoginModal: false,
  LoginUserWithAddress: (form: any) => Promise.resolve(),
  userData: AssetUserFromDBDefault,
  handleRegisterToggle: () => {},
  handleLoginToggle: () => {},
  userLogState: false,
  getAllUsers: [AssetUserFromDBDefault],
  FindUserWithAddress: (address: string) => Promise.resolve(AssetUserFromDBDefault),
  AssetViewCounts: (assetId: string) => Promise.resolve(),
  AssetSave: (assetId: string) => Promise.resolve(),
  GetAsset: (_id: string) => Promise.resolve(AssetDetailsDefault),
  handleReusableModalToggle: (place: string) => {},
  reusableModalState: false,
  reusableModalValue: '',
});

export const UserContextProvider = (props: Props) => {
  const [showRegisterModal, setShowRegisterModal] = React.useState(false);
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const [userLogState, setUserLogState] = React.useState(false);
  const [hasAllUsersLoaded, setHasAllUsersLoaded] = React.useState(false);
  const [reusableModalState, setReusableModalState] = React.useState(false);
  const [reusableModalValue, setReusableModalValue] = React.useState('');
  const [userData, setUserData] = React.useState<typeof AssetUserFromDBDefault>(AssetUserFromDBDefault);
  const address = useAddress();
  const [getAllUsers, setGetAllUsers] = React.useState<typeof AssetUserFromDBDefault[]>([]);

  const baseURL = process.env.VITE_BACKEND_API_BASE_URL;
  // const baseURL = `http://localhost:4000/`;

  const LoginUserWithAddress = async (form: typeof loginDefaultValue) => {
    const response = await axios({
      method: 'POST',
      baseURL: `${baseURL}v1/users/login`,
      data: form,
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
      setUserLogState(true);
    }
  };

  const handleReusableModalToggle = (place: string) => {
    switch (place) {
      case 'card':
        setReusableModalValue(place);
        setReusableModalState((prev) => !prev);
        break;

      case 'explore-details':
        setReusableModalValue(place);
        setReusableModalState((prev) => !prev);
        break;

      case 'select-collection':
        setReusableModalValue(place);
        setReusableModalState((prev) => !prev);
        break;

      default:
        setReusableModalValue('');
        setReusableModalState(false);
        break;
    }
  };

  const AllUsers = async () => {
    const response = await axios({
      method: 'GET',
      baseURL: `${baseURL}v1/users`,
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.data) {
      setGetAllUsers(response.data);
      setHasAllUsersLoaded(true);
    }
  };

  const RegisterUser = async (formData: any) => {
    const response = await axios({
      method: 'POST',
      baseURL: `${baseURL}v1/users/register`,
      data: formData,
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
      setUserLogState(true);
    }
  };

  const AssetViewCounts = async (_id: string) => {
    try {
      const response = await axios({
        method: 'PUT',
        baseURL: `${baseURL}v1/assets/views/${_id}`,
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRF-TOKEN',
      });

      return response.data
    } catch (error) {
      console.log(error);
    }
  };

  const AssetSave = async (assetId: string) => {
    try {
      const data = localStorage.getItem('user');
      const user = data && JSON.parse(data);
      const token = user?.token;
      await axios({
        method: 'PUT',
        baseURL: `${baseURL}v1/assets/views`,
        data: assetId,
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRF-TOKEN',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const GetAsset = async (_id: string): Promise<AssetDetailsProps> => {
    try {
      const response = await axios({
        method: 'GET',
        baseURL: `${baseURL}v1/assets/${_id}`,
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRF-TOKEN',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      console.log(error);
      return AssetDetailsDefault;
    }
  };

  const FindUserWithAddress = async (address: string): Promise<typeof AssetUserFromDBDefault> => {
    const response = await axios({
      method: 'GET',
      baseURL: `${baseURL}v1/users/find/${address}`,
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  };

  const CheckingUserState = async () => {
    const user = localStorage.getItem('user');
    if (address) {
      const foundUser = await FindUserWithAddress(address);
      if (foundUser !== null) {
        user ? null : setShowLoginModal(true);
        setShowRegisterModal(false);
      } else {
        user ? null : setShowRegisterModal(true);
        setShowLoginModal(false);
      }
    }
  };

  React.useEffect(() => {
    CheckingUserState();
    const user = localStorage.getItem('user');
    user ? setUserData(JSON.parse(user)) : null;
    if (user) setUserLogState(true);
  }, [address, userLogState]);

  React.useEffect(() => {
    AllUsers();
  }, [hasAllUsersLoaded]);

  const handleRegisterToggle = () => {
    setShowRegisterModal((prev) => !prev);
  };

  const handleLoginToggle = () => {
    setShowLoginModal((prev) => !prev);
  };

  const value = {
    RegisterUser,
    showRegisterModal,
    showLoginModal,
    LoginUserWithAddress,
    userData,
    handleRegisterToggle,
    handleLoginToggle,
    userLogState,
    getAllUsers,
    FindUserWithAddress,
    AssetViewCounts,
    AssetSave,
    GetAsset,
    handleReusableModalToggle,
    reusableModalState,
    reusableModalValue,
  };
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

export default UserContextProvider;
export const useUserContext = () => React.useContext(UserContext);
