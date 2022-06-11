import React, {useMemo} from "react";
import classes from "classnames";

import styles from './index.module.scss';

import Card from "./Card";

import Tooltip from "../../../components/Tooltip";
import Info from "../../../components/Info";
import Button from "../../../components/Button";
import useRedeemOnMasonry from "../../../hooks/useRedeemOnMasonry";
import useTombStats from "../../../hooks/useTombStats";
import useHarvestFromMasonry from "../../../hooks/useHarvestFromMasonry";
import useEarningsOnMasonry from "../../../hooks/useEarningsOnMasonry";
import useClaimRewardCheck from "../../../hooks/masonry/useClaimRewardCheck";
import useStakedBalanceOnMasonry from "../../../hooks/useStakedBalanceOnMasonry";
import useWithdrawCheck from "../../../hooks/masonry/useWithdrawCheck";
import useClaimRewardTimerMasonry from "../../../hooks/masonry/useClaimRewardTimerMasonry";
import {getDisplayBalance} from "../../../utils/formatBalance";
import useCashPriceInEstimatedTWAP from "../../../hooks/useCashPriceInEstimatedTWAP";
import useApprove, {ApprovalState} from "../../../hooks/useApprove";
import useTombFinance from "../../../hooks/useTombFinance";

const Tokens = () => {

    const {onRedeem} = useRedeemOnMasonry();
    const tombStats = useTombStats();
    const {onReward} = useHarvestFromMasonry();
    const earnings = useEarningsOnMasonry();
    const canClaimReward = useClaimRewardCheck();
    const stakedBalance = useStakedBalanceOnMasonry();
    const canWithdraw = useWithdrawCheck();
    const cashStat = useCashPriceInEstimatedTWAP();
    const tombFinance = useTombFinance();
    const [approveStatus, approve] = useApprove(tombFinance.TSHARE, tombFinance.contracts.Masonry.address);
    const tokenPriceInDollars = useMemo(
        () => (tombStats ? Number(tombStats.priceInDollars).toFixed(2) : null),
        [tombStats],
    );

    const earnedInDollars = (Number(tokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);

    const {from, to} = useClaimRewardTimerMasonry();


    return (
        <section className={classes("section", styles.section)}>
            <div className={classes("container-fluid", styles.fluid)}>
                <div className={classes("container", styles.container)}>
                    <div className={classes("row", styles.row)}>
                        <div className={classes("col", "col-12", "col-padding-vertical", styles.col)}>
                            <div className={styles.info}>
                                <Info text={'Stacked STRAWs can only be withdrawn after 6 epochs since deposit.'}/>
                            </div>
                        </div>
                        <div className={classes("col", "col-12", "col-md-6", "col-padding-vertical", styles.col)}>
                            <div className={styles.tooltip}>
                                <Tooltip
                                    text={'Provided liquidity in the Farms is contributed to the general economy of the protocol. The farms will emit rewards in the form of the share-token. The share token has a limited supply and yielding utility in the boardroom, which makes it very valuable.'}/>
                            </div>
                            <Card
                                url={'/img/icon/home_cream.png'}
                                price_top={getDisplayBalance(earnings)}
                                price_bottom={`≈ $${earnedInDollars}`}
                                title={'CREAM Earned'}
                                buttonPlaceholder={'Claim Reward'}
                                btnDisabled={stakedBalance.eq(0) || (!canWithdraw && !canClaimReward)}
                                btnOnClick={onReward}
                            />
                        </div>
                        <div className={classes("col", "col-12", "col-md-6", "col-padding-vertical", styles.col)}>
                            <div className={styles.tooltip}>
                                <Tooltip
                                    text={'Provided liquidity in the Farms is contributed to the general economy of the protocol. The farms will emit rewards in the form of the share-token. The share token has a limited supply and yielding utility in the boardroom, which makes it very valuable.'}/>
                            </div>
                            <Card
                                url={'/img/icon/home_cshare.png'}
                                price_top={getDisplayBalance(stakedBalance)}
                                price_bottom={`≈ $${tokenPriceInDollars}`}
                                title={'CSHARE Staked'}
                                buttonPlaceholder={'Approve CSHARE'}
                                disabled={approveStatus !== ApprovalState.NOT_APPROVED}
                                btnOnClick={approve}
                            />
                        </div>
                        <div className={classes("col", "col-12", "col-padding-vertical", styles.col)}>
                            <div className={styles.button}>
                                <Button
                                    disabled={stakedBalance.eq(0) || (!canWithdraw && !canClaimReward)}
                                    type={'link'}
                                    placeholder={'Claim & Withdraw'}
                                    classname={'alt'}
                                    action={onRedeem}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Tokens;
