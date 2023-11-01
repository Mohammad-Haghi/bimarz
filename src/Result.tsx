import React from 'react';
import Box from "@mui/material/Box";
import {Typography, SvgIcon} from "@mui/material";

const Result = ({res}: { res: any }) => {
    const toCurrency = (num: any) => new Intl.NumberFormat("fa-IR", {
        style: "decimal",
        currency: "IRR",
    }).format(num);
    const toFCurrency = (num: any) => new Intl.NumberFormat("ae-AE", {
        style: "currency",
        currency: "AED"
    }).format(num);


    return (
        <Box
            sx={{background: "#f1f2f3", padding: "20px", borderRadius: "8px"}}
        >
            <SvgIcon>
                <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiBox-root css-1om0hkc" focusable="false"
                     aria-hidden="true" viewBox="0 0 24 24" data-testid="ContentCopyIcon">
                    <path
                        d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>
                </svg>
            </SvgIcon>
            <Typography
                variant="body1"
                sx={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    justifyContent: "space-between",
                    lineHeight: '42px',
                    fontWeight: 'bold',
                    borderBottom: '1px solid'
                }}
                noWrap
                fontFamily="Iransans"
            >
                <span>:قیمت کالا به {res.country === 10 ? "لیر" : "درهم"}</span>
                <span>{toFCurrency(res.price)}</span>

            </Typography>
            <Typography
                variant="body1"
                sx={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    justifyContent: "space-between",
                    lineHeight: '42px',
                    fontWeight: 'bold'

                }}
                noWrap
                fontFamily="Iransans"
            >
                <span>:قیمت کالا به تومان</span>
                <span>{toCurrency(res.tomanPrice)}</span>
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    justifyContent: "space-between",
                    lineHeight: '42px',
                    fontWeight: 'bold'

                }}
                noWrap
                fontFamily="Iransans"
            >
                <span>:قیمت حمل به ایران</span>
                <span>{toCurrency(res.shippingToIran)}</span>
            </Typography>
            {
                res.fShip !== 0 ?? <Typography
                    variant="body1"
                    sx={{
                        display: "flex",
                        flexDirection: "row-reverse",
                        justifyContent: "space-between",
                        lineHeight: '42px',
                        fontWeight: 'bold'

                    }}
                    noWrap
                    fontFamily="Iransans"
                >
                    <span>:قیمت حمل به {res.country === 10 ? "ترکیه" : "امارات"}</span>
                    <span>{toCurrency(res.fShip)}</span>
                </Typography>
            }

            <Typography
                variant="body1"
                sx={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    justifyContent: "space-between",
                    lineHeight: '42px',
                    fontWeight: 'bold'
                }}
                fontFamily="Iransans"
            >
                <span>:کارمزد بی مرز</span>
                <span>{toCurrency(res.wage)}</span>
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    justifyContent: "space-between",
                    lineHeight: '42px',
                    fontWeight: 'bold',
                    borderBottom: '1px solid'
                }}
                fontFamily="Iransans"
            >
                <span>:گمرک و مالیات</span>
                <span>{toCurrency(res.tax)}</span>
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    justifyContent: "space-between",
                    lineHeight: '42px',
                    fontWeight: 'bold'
                }}
                fontFamily="Iransans"
            >
                <span>:بدون کارمزد</span>
                <span>{toCurrency(res.tax + res.shippingToIran + res.fShip + res.tomanPrice)}</span>
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    justifyContent: "space-between",
                    lineHeight: '42px',
                    fontWeight: 'bold'
                }}
                fontFamily="Iransans"
            >
                <span>مبلغ قابل پرداخت</span>
                <span>{toCurrency(res.wage + res.tax + res.shippingToIran + res.fShip + res.tomanPrice)}</span>
            </Typography>
        </Box>
    );
};

export default Result;