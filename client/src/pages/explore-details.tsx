import React from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { RxExternalLink } from 'react-icons/rx';
import { FaEthereum } from 'react-icons/fa';
import { VscListFlat, VscCopy } from 'react-icons/vsc';
import Instagram from '../assets/instagram.png';
import Twitter from '../assets/twitter.png';
import Facebook from '../assets/facebook.png';
import { ProfileImage } from '../components';

interface Props {}

const ExploreDetails = () => {
  return (
    <section className='w-full flex flex-col gap-10'>
      <div className='w-full flex flex-col lg:flex-row items-center gap-5'>
        <div className='w-full lg:w-[30rem] h-full lg:h-[34.4rem]  overflow-hidden border-[1px] border-gray-50/60 rounded-t-md'>
          <div className='w-full bg-gray-50 text-black rounded-t-md inline-flex items-center justify-between px-3 py-1.5'>
            <span>
              <FaEthereum />
            </span>
            <span className='inline-flex items-center gap-2'>
              <span>
                <RxExternalLink />
              </span>
              <span className='inline-flex items-center gap-1'>
                <AiOutlineHeart /> 54
              </span>
            </span>
          </div>

          <div>
            <img
              src='https://klaudbox.vercel.app/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Ffiles%2Fut3w84xx%2Fproduction%2F0e1b8a553d29ab837a71867b151acd49982bdd08.webp&w=1080&q=75'
              className='w-full lg:w-[30rem] h-full lg:h-[34.4rem] object-cover'
              alt=''
            />
          </div>
        </div>

        <div className='flex-1 h-full flex flex-col gap-3 lg:gap-5'>
          <div className='flex flex-col gap-4'>
            <p className='font-medium text-violet-400 cursor-pointer'>
              Angry WAVs
            </p>

            <p className='font-bold text-xl lg:text-3xl'>
              Michael Circle - Demons.wav
            </p>
            <div className='flex items-center gap-1 h-full'>
              <div className='flex mb-3 -space-x-3'>
                <ProfileImage />
                <ProfileImage />
                <ProfileImage />
              </div>
              <span className='text-sm'>
                5 appreciate to{' '}
                <span className='font-medium text-violet-400 cursor-pointer'>
                  michael-circle
                </span>
              </span>
            </div>
          </div>

          <div className='border-[1px] border-gray-50/60 rounded-t-md divide-y-[1px] divide-gray-50/60 shadow-md'>
            <p className='inline-flex items-center gap-2 px-4 py-2 text-lg'>
              <VscListFlat className='text-3xl' /> Description
            </p>

            <p className='px-4 py-2 bg-[#141414]'>
              WVRPS are the 1st hybrid generative PFP + AI-composed music NFTs
              minted on the Ethereum blockchain. 9,999 unique NFTs based on the
              WarpSound virtual artists Nayomi, Gnar Heart + DJ Dragoon, with
              art by Emmy-winning illustrator Andy Poon
            </p>
          </div>

          <div className='w-full flex flex-col lg:flex-row items-center gap-5'>
            <div className='w-full flex-shrink-0 lg:w-auto border-[1px] border-gray-50/60 rounded-t-md divide-y-[1px] divide-gray-50/60'>
              <p className='inline-flex items-center gap-2 px-4 py-2 text-lg'>
                <VscListFlat className='text-3xl' /> Socials
              </p>
              <div className='flex items-center gap-3 px-4 py-2 bg-[#141414]'>
                <a
                  className='flex flex-col items-center'
                  title='Instagram'
                  rel='noopener'
                  href='#'
                >
                  <img
                    className='w-[3.3rem] h-[3.3rem]'
                    src={Instagram}
                    alt=''
                  />
                  {/* <p className='text-sm'>Instagram</p> */}
                </a>

                <a
                  className='flex flex-col items-center'
                  title='Facebook'
                  rel='noopener'
                  href=''
                >
                  <img
                    className='w-[3.3rem] h-[3.3rem]'
                    src={Facebook}
                    alt=''
                  />
                  {/* <p className='text-sm'>Facebook</p> */}
                </a>

                <a
                  className='flex flex-col items-center'
                  title='Twitter'
                  rel='noopener'
                  href='#'
                >
                  <img className='w-[3.3rem] h-[3.3rem]' src={Twitter} alt='' />
                  {/* <p className='text-sm'>Twitter</p> */}
                </a>
              </div>
            </div>

            <div className='w-full border-[1px] flex-1 border-gray-50/60 rounded-t-md  divide-y-[1px] divide-gray-50/60'>
              <div>
                <p className='inline-flex items-center gap-2 px-4 py-2 text-lg'>
                  <VscListFlat className='text-3xl' /> Public Information
                </p>
              </div>
              <div className='px-4 py-2 bg-[#141414]  flex flex-col gap-1'>
                <span className='inline-flex items-center justify-between gap-16'>
                  <span className='flex-shrink-0'>Website</span>
                  <span className='inline-flex items-center gap-1'>
                    <span className='truncate text-violet-400 font-medium'>
                      https://open...
                    </span>
                    <VscCopy />
                  </span>
                </span>
                <span className='inline-flex items-center justify-between gap-16'>
                  <span className='flex-shrink-0'>Total Uploads</span>
                  <span>89,348</span>
                </span>
              </div>
            </div>
          </div>

          <div className='w-full flex flex-col lg:flex-row items-center gap-2'>
            <div className='w-full border-[1px] border-gray-50/60 rounded-t-md divide-y-[1px] divide-gray-50/60 shadow-md'>
              <p className='inline-flex items-center gap-2 px-4 py-2 text-lg'>
                <VscListFlat className='text-3xl' />
                Collections
              </p>
              <div className='flex items-center gap-3 px-4 py-2 bg-[#141414]'>
                34
              </div>
            </div>
            <div className='w-full border-[1px] border-gray-50/60 rounded-t-md divide-y-[1px] divide-gray-50/60 shadow-md'>
              <p className='inline-flex items-center gap-2 px-4 py-2 text-lg'>
                <VscListFlat className='text-3xl' /> Views
              </p>
              <div className='flex items-center gap-3 px-4 py-2 bg-[#141414]'>
                439
              </div>
            </div>
            <div className='w-full border-[1px] border-gray-50/60 rounded-t-md divide-y-[1px] divide-gray-50/60 shadow-md'>
              <p className='inline-flex items-center gap-2 px-4 py-2 text-lg'>
                <VscListFlat className='text-3xl' /> Saves
              </p>
              <div className='flex items-center gap-3 px-4 py-2 bg-[#141414]'>
                54
              </div>
            </div>
            <div className='w-full border-[1px] border-gray-50/60 rounded-t-md divide-y-[1px] divide-gray-50/60 shadow-md'>
              <p className='inline-flex items-center gap-2 px-4 py-2 text-lg'>
                <VscListFlat className='text-3xl' /> Category
              </p>
              <div className='flex items-center gap-3 px-4 py-2 bg-[#141414]'>
                Art
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className='relative overflow-x-auto shadow-md'>
          <table className='w-full text-sm text-left'>
            <caption className='p-5 text-lg font-semibold text-left border-[1px] rounded-t-md border-gray-50/60 divide-y-[1px] divide-gray-50/60 shadow-md'>
              Appreciate Lists
              <p className='mt-1 text-sm font-normal '>
                Browse a list of Flowbite products designed to help you work and
                play, stay organized, get answers, keep in touch, grow your
                business, and more.
              </p>
            </caption>
            <thead className='uppercase bg-[#141414] text-gray-400 border-[1px] border-gray-50/60 divide-y-[1px] divide-gray-50/60 shadow-md'>
              <tr>
                <th className='px-6 py-3'>Appre</th>
                <th className='px-6 py-3'>Unit Price</th>
                <th className='px-6 py-3'>Category</th>
                <th className='px-6 py-3'>Price</th>
                <th className='px-6 py-3'>Date</th>
              </tr>
            </thead>
            <tbody className='border-[1px] border-gray-50/60 divide-y-[1px] divide-gray-50/60 shadow-md'>
              <tr className='bg-[#141414]'>
                <th
                  scope='row'
                  className='px-6 py-4 font-medium whitespace-nowrap'
                >
                  Apple MacBook Pro 17"
                </th>
                <td className='px-6 py-4'>Silver</td>
                <td className='px-6 py-4'>Laptop</td>
                <td className='px-6 py-4'>$2999</td>
                <td className='px-6 py-4 text-right'>
                  <a
                    href='#'
                    className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                  >
                    Edit
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className='w-full'>
        <p className='font-bold text-4xl text-white'>Collections</p>

        <div className=' flex items-center gap-4 lg:grid grid-cols-3'>
          <div className='h-auto w-[25rem] border-[1px] border-gray-50/60 rounded-t-md divide-y-[1px] divide-gray-50/60 shadow-md'>
            <div className=''>
              <img
                src='https://i.seadn.io/s/primary-drops/0xcd15cabf8f047e226a719826f0a4726e34e69e28/24146804:about:preview_media:d4232f34-be0b-4ed0-87ca-6a6b82601bc9.gif?auto=format&w=1920'
                alt=''
                className='w-full h-full object-cover'
              />
            </div>
            <div className='w-full px-4 py-2 bg-[#141414] inline-flex items-center justify-between'>
              <p>Michael Circle - Demons.wav</p>
              <p className='inline-flex items-center gap-1'>
                <RxExternalLink />

                <span className='inline-flex items-center gap-1'>
                  <AiOutlineHeart /> 54
                </span>
              </p>
            </div>
          </div>

          <div className='h-auto w-[25rem] border-[1px] border-gray-50/60 rounded-t-md divide-y-[1px] divide-gray-50/60 shadow-md'>
            <div className=''>
              <img
                src='https://openseauserdata.com/files/3219422aa7a2d04f2067e46cfb0cd919.svg'
                alt=''
                className='w-full h-full object-cover'
              />
            </div>
            <div className='w-full px-4 py-2 bg-[#141414] inline-flex items-center justify-between'>
              <p>Michael Circle - Demons.wav</p>
              <p className='inline-flex items-center gap-1'>
                <RxExternalLink />

                <span className='inline-flex items-center gap-1'>
                  <AiOutlineHeart /> 54
                </span>
              </p>
            </div>
          </div>

          <div className='h-auto w-[25rem] border-[1px] border-gray-50/60 rounded-t-md divide-y-[1px] divide-gray-50/60 shadow-md'>
            <div className=''>
              <img
                src='https://dl.openseauserdata.com/cache/originImage/files/f6729747348edd42d037bab2f77a81be.jpg'
                alt=''
                className='w-full h-full object-cover'
              />
            </div>
            <div className='w-full px-4 py-2 bg-[#141414] inline-flex items-center justify-between'>
              <p>Michael Circle - Demons.wav</p>
              <p className='inline-flex items-center gap-1'>
                <RxExternalLink />

                <span className='inline-flex items-center gap-1'>
                  <AiOutlineHeart /> 54
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreDetails;
