import axios from 'axios';

interface ImportMeta {
  readonly VITE_BACKEND_API_BASE_URL: string;
}

const baseURL = process.env.VITE_BACKEND_API_BASE_URL;

console.log('baseURL', baseURL);

export const UploadAssetRequest = async (asset: any) => {
  const response = await axios({
    method: 'POST',
    baseURL: `${baseURL}/v1/assets`,
    data: asset,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data?.asset;
};

export const UploadAssetRequestDelete = async (assetName: any) => {
  const response = await axios({
    method: 'DELETE',
    baseURL: `${baseURL}/v1/assets/delete/${assetName}`,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data?.asset;
};
