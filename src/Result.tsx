import React from 'react';
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";

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
                    fontWeight: 'bold'
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
                <span>مبلغ قابل پرداخت</span>
                <span>{toCurrency(res.wage + res.tax + res.shippingToIran + res.fShip + res.tomanPrice)}</span>
            </Typography>
        </Box>
    );
};

export default Result;