import React from 'react';

interface Props {}

import { AiOutlineMore } from 'react-icons/ai';
import { AssetsDisplayProps } from '../interface';
import { useThirdWebContext } from '../contexts/thirdweb';
import { Link, useParams, useNavigate } from 'react-router-dom';

interface Props {
  position: string;
  asset?: AssetsDisplayProps;
}

const MoreButton = (props: Props) => {
  const { address } = useThirdWebContext();

  const { assetId } = useParams();
  console.log('location', location);
  const navigate = useNavigate();
  return (
    <div
      className={`dropdown dropdown-hover ${props.position} shadow-md shadow-violet-800 rounded-lg`}
    >
      <label tabIndex={0}>
        <AiOutlineMore className='text-3xl' />
      </label>
      <ul
        tabIndex={0}
        className='dropdown-content  shadow-lg shadow-violet-800 menu p-2 rounded-box w-52 bg-[#141414] divide-y-[1px] divide-gray-50/10'
      >
        <li>
          {assetId ? (
            <span onClick={() => navigate(-1)}>Go back</span>
          ) : (
            <Link to={`/explore/${props?.asset?._id}`}>View asset</Link>
          )}
        </li>
        <li>
          <a target='_blank' href={`${props?.asset?.image}`}>
            View Image
          </a>
        </li>
        {address && address === props?.asset?.owner && (
          <li>
            <a>Add to collection</a>
          </li>
        )}
        <li>
          <a>Share</a>
        </li>
        <li>
          <a>Follow Creator</a>
        </li>
        {address && address === props?.asset?.owner && (
          <li>
            <a>Delete</a>
          </li>
        )}
        <li></li>
      </ul>
    </div>
  );
};

export default MoreButton;
