import { useState, useEffect } from "react";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from 'next/router'

function Detail({ user }) {
    const router = useRouter();
    const { id } = router.query;
    const [transactionDetail, setTransactionDetail] = useState([]);
    const [allTransactions, setAllTransactions] = useState([]);
    const [allLinks, setAllLinks] = useState([]);
    useEffect(() => {
        async function getTransactionDetail() {
            const apiUrlEndpoint = `api/transaction`;
            const postData = {
                method: "Post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: id,
                }),
            }
            const response = await fetch(apiUrlEndpoint, postData);
            const res = await response.json();
            setTransactionDetail(res.transactionData);
            setAllTransactions(res.transactionData.transaction);
            setAllLinks(res.transactionData.link);
        }
        getTransactionDetail()
    }, [router.query.id, router.isReady])

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
                        <button className="btn_close_icon d-lg-none" onClick={() => {
                            navClose()
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className=""
                                viewBox="0 0 16 16">
                                <path
                                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
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
            <div className="content_individual">
                <div className="container">
                    
                    <div className="section-1 d-flex justify-content-between">
                        <div className="d-flex flex-column flex-md-row">
                            <div className="icon_box">
                                <img src={`../../images/${transactionDetail.image}`} alt="" className="icon" />
                            </div>
                            <div className="contents">
                                <h2 className="c_title">{transactionDetail.name}</h2>
                                <p className="c_data">{transactionDetail.details}</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="total_p">Total Balance</h3>
                            <p className="price_p">${transactionDetail.total_balance}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8">
                            <table className="table table-1">
                                <thead>
                                    <tr>
                                        <th scope="col" className="rounded_l">Date</th>
                                        <th scope="col">Note</th>
                                        <th scope="col" className="rounded_r">Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allTransactions > 0 ? allTransactions.map((transacions) => {
                                        const dateObj = new Date(transacions.date);
                                        const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                                        return (
                                            <tr>
                                                <td>{formattedDate}</td>
                                                <td>{transacions.note}</td>
                                                <td className="text_green">+${transacions.value}</td>
                                            </tr>
                                        )
                                    }) : <tr>
                                        <td colSpan={3}>
                                        <p className="center">No Transactions Available</p>
                                        </td>
                                    </tr>}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-lg-4">
                            <table className="table table-1">
                                <thead>
                                    <tr>
                                        <th scope="col" className="rounded_l rounded_r">Link & Resources</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allLinks.length > 0 ? allLinks.map((links) => {
                                        return (
                                            <tr>
                                                <td> <a href={links.link} target={"_blank"}>{links.text}</a></td>
                                            </tr>
                                        )
                                    })
                                        :
                                        <tr>
                                            <td colSpan={1}>
                                                <p className="center">No Resources Available</p>
                                            </td>
                                        </tr>
                                    }

                                </tbody>
                            </table>
                        </div>

                    </div>
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

export default Detail;
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