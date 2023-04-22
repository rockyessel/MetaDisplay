import React from 'react';
import { AiFillInstagram } from 'react-icons/ai';
import { BsShareFill, BsTwitter } from 'react-icons/bs';
import { CgTally } from 'react-icons/cg';
import { MdMarkChatUnread, MdOutlineVerified } from 'react-icons/md';
import { SiWebmoney } from 'react-icons/si';
import { Card, Layout, ReusableTooltip } from '../components';

interface Props {}

const collection = () => {
  return (
    <Layout
      description={''}
      title={''}
      image={''}
      alt={''}
      keywords={''}
      type={''}
      publishedAt={''}
      updatedAt={''}
      author_name={''}
      MIME={''}
      slug={''}
    >
      <section className='w-full'>
        <div
          className='w-full hero h-[50vh]'
          style={{
            backgroundImage: `url("https://i.seadn.io/s/primary-drops/0xfce315e0d90e1ca0343634765ceab56d6ede4e75/24829029:hero:desktop_hero_media:92a143f9-f37f-479d-b6fc-3c197f887127.png?auto=format&w=1920")`,
          }}
        >
          <div className='hero-overlay bg-opacity-60'></div>
          <div className='w-full px-10'>
            <div className='w-full flex flex-col gap-4'>
              <div className='flex flex-col gap-4'>
                <img
                  className='w-28 h-28 rounded-lg border-4 border-gray-100/60'
                  src='https://i.seadn.io/s/primary-drops/0xfce315e0d90e1ca0343634765ceab56d6ede4e75/24829029:hero:partner_logo_url:106779b8-c06e-4a9b-87f8-9e963e94f2a3.png?auto=format&w=1920'
                  alt=''
                />
                <p className='font-extrabold text-5xl'>
                  Spring and Autumn by KrisK
                </p>
                <p className='text-3xl inline-flex items-center gap-1'>
                  By <span className='font-bold'>AudioGalleries</span>{' '}
                  <MdOutlineVerified />
                </p>
              </div>
              <div className='w-full flex justify-between'>
                <div className='backdrop-blur-lg w-fit rounded-lg'>
                  <p className='px-4 font-bold py-2 text-xl text-white inline-flex items-center gap-1'>
                    <span className='relative flex h-3 w-3'>
                      <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
                      <span className='relative inline-flex rounded-full h-3 w-3 bg-green-500'></span>
                    </span>
                    Chat with me
                  </p>
                </div>

                <div className='backdrop-blur-lg text-2xl px-4 py-2 rounded-lg divide-x-2 divide-gray-50 flex items-center gap-2'>
                  <div className='flex items-center gap-5 px-2'>
                    <ReusableTooltip
                      icon={
                        <BsTwitter className='hover:text-violet-400 cursor-pointer' />
                      }
                      title='username'
                      description='follow user here'
                    />
                    <ReusableTooltip
                      icon={
                        <AiFillInstagram className='hover:text-violet-400 cursor-pointer' />
                      }
                      title='username'
                      description='follow user here'
                    />
                    <ReusableTooltip
                      icon={
                        <SiWebmoney className='hover:text-violet-400 cursor-pointer' />
                      }
                      title='username'
                      description='follow user here'
                    />
                    <ReusableTooltip
                      icon={
                        <CgTally className='hover:text-violet-400 cursor-pointer' />
                      }
                      title='username'
                      description='follow user here'
                    />
                  </div>
                  <div className='px-4'>
                    <BsShareFill />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='px-10 py-5 flex flex-col gap-4'>
          <div className='flex items-center gap-1'>
            <p>
              Assets <span className='bold'>2,323</span>
            </p>
            ・{' '}
            <p>
              Created <span className='bold'>Apr 2023</span>
            </p>
            ・{' '}
            <p>
              Category <span className='bold'>Art</span>
            </p>
          </div>

          <div className='max-w-4xl'>
            Shadow Wolves is a collection created by Cool Cats, compiled of up
            to 11,575 NFTs which offer mid-tier "Super Cool" membership into the
            Cool Cats ecosystem and access to the World of Cooltopia.Shadow
            Wolves are druidic Viking-like creatures that have inhabited the
            Wandering Territory for thousands of years and are known for being
            aggressive, uncivilized adversaries, yet an integral part of the
            Cooltopian economy.
          </div>

          <div>{/* <Card asset={} /> */}</div>
        </div>
      </section>
    </Layout>
  );
};

export default collection;
