import React, {useMemo} from "react";
import classes from "classnames";

import styles from './index.module.scss';

import Card from "./Card";
import Banner from "./Banner";

import Tooltip from "../../../components/Tooltip";
import Info from "../../../components/Info";
import {getDisplayBalance} from "../../../utils/formatBalance";
import useCashPriceInLastTWAP from "../../../hooks/useCashPriceInLastTWAP";
import useBondStats from "../../../hooks/useBondStats";
import useBondsPurchasable from "../../../hooks/useBondsPurchasable";
import useTokenBalance from "../../../hooks/useTokenBalance";
import useTombFinance from "../../../hooks/useTombFinance";

const Tokens = () => {
    // const { path } = useRouteMatch();
    // const { account } = useWallet();
    const tombFinance = useTombFinance();
    const bondStat = useBondStats();
    const cashPrice = useCashPriceInLastTWAP();
    const bondsPurchasable = useBondsPurchasable();
    const bondBalance = useTokenBalance(tombFinance?.TBOND);
    const isBondPurchasable = useMemo(() => Number(bondStat?.tokenInFtm) < 1.01, [bondStat]);

    return (
        <section className={classes("section", styles.section)}>
            <div className={classes("container-fluid", styles.fluid)}>
                <div className={classes("container", styles.container)}>
                    <div className={classes("row", styles.row)}>
                        <div className={classes("col", "col-12", "col-md-6", "col-xl-4", styles.col, styles.lg)}>
                            <div className={styles.tooltip}>
                                <Tooltip
                                    text={'Provided liquidity in the Farms is contributed to the general economy of the protocol. The farms will emit rewards in the form of the share-token. The share token has a limited supply and yielding utility in the boardroom, which makes it very valuable.'}/>
                            </div>
                            <Card
                                url={'/img/icon/home_cshare.png'}
                                urlAlt={'/img/icon/home_cbond.png'}
                                title={'Purchase Bonds'}
                                subtitle1={'CREAM'}
                                subtitle2={'CBOND'}
                                priceDesc={
                                    !isBondPurchasable
                                        ? 'CREAM is over peg'
                                        : getDisplayBalance(bondsPurchasable, 18, 4) + ' Bonds available for purchase'
                                }
                            />
                        </div>
                        <div className={classes("col", "col-12", "col-md-12", "col-xl-4", styles.col, styles.lg)}>
                            <div className={classes("row", styles.row)}>
                                <div
                                    className={classes("col", "col-12", "col-md-6", "col-xl-12", styles.col, styles.sm)}>
                                    <div className={styles.tooltip}>
                                        <Tooltip
                                            text={'Provided liquidity in the Farms is contributed to the general economy of the protocol. The farms will emit rewards in the form of the share-token. The share token has a limited supply and yielding utility in the boardroom, which makes it very valuable.'}/>
                                    </div>
                                    <Banner
                                        text={`CREAM = ${getDisplayBalance(cashPrice, 18, 4)} AVAX`}
                                        value={"Last-Epoch TWAP price"}
                                    />
                                </div>
                                <div
                                    className={classes("col", "col-12", "col-md-6", "col-xl-12", styles.col, styles.sm)}>
                                    <div className={styles.tooltip}>
                                        <Tooltip
                                            text={'Provided liquidity in the Farms is contributed to the general economy of the protocol. The farms will emit rewards in the form of the share-token. The share token has a limited supply and yielding utility in the boardroom, which makes it very valuable.'}/>
                                    </div>
                                    <Banner
                                        text={`CBOND = ${Number(bondStat?.tokenInFtm).toFixed(2) || '-'} AVAX`}
                                        value={"Current Price: (CREAM)^2"}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={classes("col", "col-12", "col-md-6", "col-xl-4", styles.col, styles.lg)}>
                            <div className={styles.tooltip}>
                                <Tooltip
                                    text={'Provided liquidity in the Farms is contributed to the general economy of the protocol. The farms will emit rewards in the form of the share-token. The share token has a limited supply and yielding utility in the boardroom, which makes it very valuable.'}/>
                            </div>
                            <Card
                                urlAlt={'/img/icon/home_cshare.png'}
                                url={'/img/icon/home_cbond.png'}
                                title={'Redeem Bonds'}
                                subtitle1={'CBOND'}
                                subtitle2={'CREAM'}
                                priceDesc={`${getDisplayBalance(bondBalance)} Bonds Available in wallet`}
                            />
                        </div>
                    </div>
                    <div className={classes("row", styles.row)}>
                        <div className={classes("col", "col-12", styles.col)}>
                            <div className={styles.info}>
                                <Info
                                    text={'Claiming below 1.1 peg will not receive a redemption bonus. Claim wisely!'}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Tokens;
