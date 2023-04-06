import axios from 'axios';

interface ImportMeta {
  readonly VITE_BACKEND_API_BASE_URL: string;
}

const baseURL = process.env.VITE_BACKEND_API_BASE_URL;

console.log('baseURL', baseURL);

export const UploadAssetRequest = async (asset: any) => {
  const response = await axios({
    method: 'POST',
    baseURL: `${baseURL}v1/assets`,
    data: asset.data,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (data) => {
      const total: number = data?.total || 0;
      asset.setAssetUploadPercent(Math.round((100 * data?.loaded) / total));
    },
  });

  return response.data?.asset;
};

export const UploadAssetRequestDelete = async (assetName: any) => {
  const response = await axios({
    method: 'DELETE',
    baseURL: `${baseURL}v1/assets/delete/${assetName}`,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data?.asset;
};
