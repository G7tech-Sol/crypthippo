import { getSession, signOut } from "next-auth/react";
import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/common-evm-utils';
import { useState } from 'react';
import styles from '@/styles/Home.module.css'

function User({ user,message,nftList }) {
  const [connected, setConnected] = useState(false);

  const handleSignOut = async () => {
    await signOut({ redirect: "/" });
  };

  return (
    <div className={styles.login_page}>
      <div className={`${styles.login_content} order-lg-1 order-2`}>
        <div className={`container h-100 d-lg-flex align-items-center`}>
          <div className={`text-center ${styles.wc_content}`}>
            <h2 className={styles.title}>Oops!! You don't have our NFT </h2>
            <p> You can buy our nfts from Open Sea Today</p>
            <button onClick={handleSignOut} className={`${styles.btn_connect} btn`}>
              <span>Sign Out</span>
            </button>
          </div>

          <div className={`${styles.social_icons} text-lg-start`}>
            <a href="#" className={`${styles.title} d-none d-lg-block`}>CryptoHippos.com</a>
            <ul className={`${styles.icon_list} d-inline-flex align-items-center`}>
              <li>
                <a href="#" className="">
                  <img src="../images/social-1.png" alt="" className={styles.icon}/>
                </a>
              </li>
              <li>
                <a href="#" className="">
                  <img src="../images/twiter.png" alt="" className={`${styles.icon}`}/>
                </a>
              </li>
              <li>
                <a href="#" className="">
                  <img src="../images/discord.png" alt="" className={`${styles.icon}`}/>
                </a>
              </li>
            </ul>
          </div>
          <p className={styles.copyright}>CryptoHippos@2022 Copyrighted</p>
        </div>
      </div>
      <div className={`${styles.login_banner} order-lg-2 order-1`}>
        <div className={`${styles.hippo_img}container text-center`}>
          <h1 className={styles.logo_title}>CryptoHippos</h1>
          <p className={styles.logo_details}>Buy a CryptoHippo now to exert your influence on community funds and operations</p>
          <img src="../images/hippo.png" alt="" className={styles.hippo_img}/>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  if(!Moralis.Core.isStarted){
    await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
  }

  const nftList = await Moralis.EvmApi.nft.getWalletNFTs({
    chain: EvmChain.ETHEREUM,
    address: session.user.address,
    tokenAddresses: ["0x8A1658607793276301A2769Bf49B16D98Ac16fd8", ],
  });
  if (nftList.raw.result.length > 0) {
    console.log('NFT list length is greater than 0, redirecting to /about');
    return {
      redirect: {
        destination: "/about",
        permanent: false,        
      },
    };
  }
  return {
    props: { 
      user: session.user,
      message: "Sorry, you don't have our NFT",
      nftList: nftList.raw.result, 
    },
  };
}

export default User;