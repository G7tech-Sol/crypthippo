
import { getSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from 'next/link';

function Aboutus({ user }) {
    const [categoriesData, setcategoriesData] = useState([]);
    useEffect(() => {
        async function getCategories() {
            const apiUrlEndpoint = `api/data-lib`;
            const response = await fetch(apiUrlEndpoint);
            const res = await response.json();
            // console.log(res.categories);
            setcategoriesData(res.categories);
        }
        getCategories()
    }, [])

    const [isOpenHeader, setOpenHeader] = useState("open-header")
    const handleSignOut = async () => {
        await signOut({ redirect: "/" });
    };

    function navOpen() {
        setOpenHeader("open_header")
    }
    function navClose() {
        setOpenHeader("close_header")
    }
    return (
        <div>
            <header className={"header d-lg-block " + isOpenHeader} id="header">
                <div className="container">
                    <div className="d-flex flex-column flex-lg-row align-items-center">
                        <a href="#" className="nav_logo">CryptoHippos.com</a>
                        <input type="text" className="border_box" value={user.address} disabled />
                        <button className="btn_signout" onClick={handleSignOut}>
                            <span>Sign Out</span>
                        </button>
                        <button className="btn_close_icon d-lg-none" onClick={() => {navClose();}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className=""
                                viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>
            <div className="mobile_header mobile_header_bg" onClick={navOpen}>
                <button className="btn p-0">
                    <svg width="28" height="21" viewBox="0 0 28 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="28" height="3" rx="1.5" fill="white" />
                        <rect y="9" width="28" height="3" rx="1.5" fill="white" />
                        <rect y="18" width="28" height="3" rx="1.5" fill="white" />
                    </svg>
                </button>
            </div>
            <div className="content_area">
                <div className="container">
                    {categoriesData ?
                        <div className="d-flex flex-column flex-lg-row align-items-center">
                            {categoriesData.length < 6 ? 
                                categoriesData.map((categories) => {
                                    return (
                                        <>
                                            <div className="order-2 order-lg-1">
                                                <div className="row">
                                                    <div className="col-lg-12 col-6" key={categories.id}>
                                                        <Link href={`/details/${categories.id}`} legacyBehavior>
                                                            <a className="d-flex align-items-center sr_items">
                                                                <div className="icon_box"><img src={`../images/${categories.image}`} alt="" className="icon" /></div>
                                                                <span>{categories.name} <span className="text_green">{categories.value_percentage}</span></span>
                                                            </a>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-center flex-shrink-0 order-1 order-lg-2 mb-5 mb-lg-0">
                                                <img src="../images/109445-nft-futuristic-animation.gif" alt="" className="w-100 mx-auto gif-img" />
                                            </div>
                                        </>
                                    );
                                }) 
                                :
                                <>
                                    <div className="order-2 order-lg-1">
                                        <div className="row">
                                            {categoriesData.slice(0, 6).map((categories) => {
                                                return (
                                                    <div className="col-lg-12 col-6" key={categories.id}>
                                                        <Link href={`/details/${categories.id}`} legacyBehavior>
                                                            <a className="d-flex align-items-center sr_items">
                                                                <div className="icon_box"><img src={`../images/${categories.image}`} alt="" className="icon" /></div>
                                                                <span>{categories.name} <span className="text_green">{categories.value_percentage}</span></span>
                                                            </a>
                                                        </Link>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className="text-center flex-shrink-0 order-1 order-lg-2 mb-5 mb-lg-0">
                                        <img src="../images/109445-nft-futuristic-animation.gif" alt="" className="w-100 mx-auto gif-img" />
                                    </div>
                                    <div className="order-3">
                                        <div className="order-2 order-lg-1">
                                            <div className="row">
                                                {categoriesData.slice(6, 12).map((categories) => {
                                                    return (
                                                        <div className="col-lg-12 col-6" key={categories.id}>
                                                            <Link href={`/details/${categories.id}`} legacyBehavior>
                                                                <a className="d-flex align-items-center sr_items">
                                                                    <div className="icon_box"><img src={`../images/${categories.image}`} alt="" className="icon" /></div>
                                                                    <span>{categories.name} <span className="text_green">{categories.value_percentage}</span></span>
                                                                </a>
                                                            </Link>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div> 
                                </>
                            }
                        </div>
                        :
                        <div className="d-flex flex-column flex-lg-row align-items-center">
                            <img src="../images/109445-nft-futuristic-animation.gif" alt="" className="w-50 mx-auto gif-img" />
                        </div>
                    }
                </div>
            </div>
            <div className="text-center ftr">
                <ul className="d-inline-flex d-lg-none align-items-center icon_list">
                    <li>
                        <a href="#" className="">
                            <img src="../images/social-1.png" alt="" className="icon" />
                        </a>
                    </li>
                    <li>
                        <a href="#" className="">
                            <img src="../images/twiter.png" alt="" className="icon" />
                        </a>
                    </li>
                    <li>
                        <a href="#" className="">
                            <img src="../images/discord.png" alt="" className="icon" />
                        </a>
                    </li>
                </ul>
                <p className="copyright_text">CryptoHippos@2022 Copyrighted</p>
            </div>
        </div>
    )
}


export async function getServerSideProps(context) {
    const session = await getSession(context);

    // redirect if not authenticated
    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    return {
        props: {
            user: session.user
        },
    };
}

export default Aboutus;
