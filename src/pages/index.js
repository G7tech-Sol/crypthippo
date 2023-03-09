import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import { signIn } from "next-auth/react";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { useRouter } from "next/router";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import { useAuthRequestChallengeEvm } from "@moralisweb3/next";
import { useSession } from "next-auth/react"



export default function Home() {

  const { data: session, status } = useSession()
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { requestChallengeAsync } = useAuthRequestChallengeEvm();
  const { push } = useRouter();




  const handleAuth = async () => {
    if (isConnected) {
      await disconnectAsync();
    }

    const { account, chain } = await connectAsync({
      connector: new MetaMaskConnector(),
    });

    const { message } = await requestChallengeAsync({
      address: account,
      chainId: chain.id,
    });

    const signature = await signMessageAsync({ message });

    const { url } = await signIn("moralis-auth", {
        message,
        signature,
        redirect: false,
        callbackUrl: "/dashboard",
      });
    push(url);
  };

  return (
    <>
            <div className={styles.login_page}>
              <div className={`${styles.login_content} order-lg-1 order-2`}>
                  <div className={`container h-100 d-lg-flex align-items-center`}>
                      <div className={`text-center ${styles.wc_content}`}>
                          <h1 className={styles.title}>Welcome</h1>
                          <button onClick={handleAuth} className={`${styles.btn_connect} btn`}>{status === "authenticated" ? 'Open Dashboard' : 'Authenticate via Metamask'}</button>
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
                      <p className={styles.logo_details}>Buy a CryptoHippo now to exert your influence on community funds and operations
                      </p>

                      <img src="../images/hippo.png" alt="" className={styles.hippo_img}/>
                  </div>
              </div>
          </div>
        
    </>
  )
}
