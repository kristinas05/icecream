import React, {useMemo} from "react";
import classes from "classnames";

import styles from './index.module.scss';

import Card from "./Card";
import useTombFinance from "../../../hooks/useTombFinance";
import useBondStats from "../../../hooks/useBondStats";
import useShareStats from "../../../hooks/usetShareStats";
import useTombStats from "../../../hooks/useTombStats";

const buycreamAddress = 'https://traderjoexyz.com/trade?outputCurrency=0xAE21d31a6494829a9E4B2B291F4984AAE8121757#/';
const viewCreamAddress = 'https://dexscreener.com/avalanche/0x00c87ce7188f7652d0c0940274cec5db62f1e825';
const viewCshareAddress = 'https://dexscreener.com/avalanche/0xbd61dfad83fc19960476abca1324ffd798234c66';
const buycshareAddress = 'https://traderjoexyz.com/trade?outputCurrency=0x155f794b56353533E0AfBF76e1B1FC57DFAd5Bd7#/';

const Tokens = () => {
    const tBondStats = useBondStats();
    const tombFinance = useTombFinance();
    const tShareStats = useShareStats();
    const tombStats = useTombStats();
    const tombPriceInDollars = useMemo(
        () => (tombStats ? Number(tombStats.priceInDollars).toFixed(2) : null),
        [tombStats],
    );
    const tombCirculatingSupply = useMemo(() => (tombStats ? String(tombStats.circulatingSupply) : null), [tombStats]);
    const tombTotalSupply = useMemo(() => (tombStats ? String(tombStats.totalSupply) : null), [tombStats]);
    const tSharePriceInDollars = useMemo(
        () => (tShareStats ? Number(tShareStats.priceInDollars).toFixed(2) : null),
        [tShareStats],
    );
    const tShareCirculatingSupply = useMemo(
        () => (tShareStats ? String(tShareStats.circulatingSupply) : null),
        [tShareStats],
    );
    const tShareTotalSupply = useMemo(() => (tShareStats ? String(tShareStats.totalSupply) : null), [tShareStats]);
    const tBondPriceInDollars = useMemo(
        () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
        [tBondStats],
    );
    const tBondCirculatingSupply = useMemo(
        () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
        [tBondStats],
    );
    const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);

    return (
        <section className={classes("section", styles.section)}>
            <div className={classes("container-fluid", styles.fluid)}>
                <div className={classes("container", styles.container)}>
                    <div className={styles.list}>
                        <div className={styles.item}>
                            <Card
                                url={'/img/icon/home_cream.png'}
                                title={'CREAM'}
                                currentPrice={tombPriceInDollars ? tombPriceInDollars : '-.--'}
                                marketCap={(tombCirculatingSupply * tombPriceInDollars).toFixed(2)}
                                circulatingSupply={tombCirculatingSupply}
                                totalSupply={tombTotalSupply}
                                purchaseUrl={buycreamAddress}
                                chartUrl={viewCreamAddress}
                            />
                        </div>
                        <div className={styles.item}>
                            <Card
                                url={'/img/icon/home_cshare.png'}
                                title={'CSHARE'}
                                currentPrice={tSharePriceInDollars ? tSharePriceInDollars : '-.--'}
                                marketCap={(tShareCirculatingSupply * tSharePriceInDollars).toFixed(2)}
                                circulatingSupply={tShareCirculatingSupply}
                                totalSupply={tShareTotalSupply}
                                purchaseUrl={buycshareAddress}
                                chartUrl={viewCshareAddress}
                            />
                        </div>
                        <div className={styles.item}>
                            <Card
                                url={'/img/icon/home_cbond.png'}
                                title={'CBOND'}
                                currentPrice={tBondPriceInDollars ? tBondPriceInDollars : '-.--'}
                                marketCap={(tBondCirculatingSupply * tBondPriceInDollars).toFixed(2)}
                                circulatingSupply={tBondCirculatingSupply}
                                totalSupply={tBondTotalSupply}
                                purchaseUrl={'/cbond'}
                                chartUrl={'/cbond'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Tokens;
