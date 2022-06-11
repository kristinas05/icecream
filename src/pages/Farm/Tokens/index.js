import React from "react";
import classes from "classnames";

import styles from './index.module.scss';

import Card from "./Card";

import Tooltip from "../../../components/Tooltip";
import Info from "../../../components/Info";
import useBanks from "../../../hooks/useBanks";

const Tokens = () => {
    const [banks] = useBanks();
    const activeBanks = banks.filter((bank) => !bank.finished);


    return (
        <section className={classes("section", styles.section)}>
            <div className={classes("container-fluid", styles.fluid)}>
                <div className={classes("container", styles.container)}>
                    <div className={classes("row", styles.row)}>
                        <div className={classes("col", "col-12", "col-padding-vertical", styles.col)}>
                            <Info
                                text={'CSHARE rewards start Jan 29th 2022 @7:30 PM PST and will conitnue running for 370 days.'}/>
                        </div>
                        {activeBanks
                            .filter((bank) => bank.sectionInUI === 2)
                            .map((bank) => (
                                <div key={bank.name}
                                     className={classes("col", "col-12", "col-md-6", "col-xl-4", "col-padding-vertical", styles.col)}>
                                    <div className={styles.tooltip}>
                                        <Tooltip
                                            text={'Provided liquidity in the Farms is contributed to the general economy of the protocol. The farms will emit rewards in the form of the share-token. The share token has a limited supply and yielding utility in the boardroom, which makes it very valuable.'}
                                        />
                                    </div>
                                    <Card bank={bank} src={'/img/icon/home_cream.png'} title={bank.depositTokenName}/>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Tokens;
