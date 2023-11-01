import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {TextField, Typography, Button, SvgIcon} from "@mui/material";
import axios from "axios";
import Box from "@mui/material/Box";

const p2e = (s) => s.replace(/[۰-۹]/g, d => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)));
const a2e = (s) => s.replace(/[٠-٩]/g, d => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));

const Calc = ({setRes}) => {
    const [country, setCountry] = React.useState(20);
    const [price, setPrice] = React.useState();
    const [currency, setCurrency] = React.useState({
        aed: '',
        tl: ''
    });
    const [weight, setWeight] = React.useState();
    const [fShip, setFShip] = React.useState('0');


    const priceNum = Number(price);
    const currencyNum = country === 10 ? Number(currency.tl) : Number(currency.aed);
    const weightNum = Number(weight);

    React.useEffect(() => {
        axios.get('http://78.109.201.155:6001/tgju', {headers: {"Access-Control-Allow-Origin": "*"}}).then((response) => {
            const value = response.data.current

            setCurrency({
                aed: Number(value.price_aed.p.replace(',', '')) / 10,
                tl: Number(value.price_try.p.replace(',', '')) / 10 + (Number(value.price_try.p.replace(',', '')) * 18 / 1000)
            })
        });
    }, []);
    const handleChange = (event) => {
        setCountry(event.target.value);
    };

    const Submit = () => {
        if (country === 10) {
            return ({
                country: country,
                price: priceNum,
                tomanpriceNum: priceNum * currencyNum,
                shippingToIran: weightNum * 235,
                fShip: fShip * currencyNum,
                tax: priceNum * currencyNum * 0.06,
                wage: priceNum * currencyNum * 0.06,
            });
        } else if (country === 20) {
            return ({
                country: country,
                price: priceNum,
                tomanPrice: priceNum * currencyNum,
                shippingToIran: (weightNum * 1000) * (90 * currencyNum),
                fShip: fShip * currencyNum,
                tax: priceNum * currencyNum * 0.08,
                wage: (priceNum * currencyNum) * 0.06,
            });
        }
    };

    return (
        <>
            {/*country select*/}
            <Box sx={{display: 'flex', direction: 'rtl', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography textAlign='right' variant='inherit' color='white' fontFamily='Iransans'>
                    کشور
                </Typography>
                <FormControl>
                    <Select
                        sx={{
                            background: '#fff',
                            width: '148px',
                            fontFamily: 'Iransans',
                            direction: 'rtl',
                            textAlign: 'center',
                            gap: '12px',
                            height: '64px',
                            padding: 'none'
                        }}
                        inputProps={{style: {padding: 'none'}}}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        textAlign='center'
                        value={country}
                        onChange={handleChange}
                    >
                        <MenuItem value={10} sx={{fontFamily: 'Iransans', display: "flex", justifyContent: 'center'}}>
                            <SvgIcon sx={{marginX: '4px'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-tr" viewBox="0 0 640 480">
                                    <g fill-rule="evenodd">
                                        <path fill="#e30a17" d="M0 0h640v480H0z"/>
                                        <path fill="#fff"
                                              d="M407 247.5c0 66.2-54.6 119.9-122 119.9s-122-53.7-122-120 54.6-119.8 122-119.8 122 53.7 122 119.9z"/>
                                        <path fill="#e30a17"
                                              d="M413 247.5c0 53-43.6 95.9-97.5 95.9s-97.6-43-97.6-96 43.7-95.8 97.6-95.8 97.6 42.9 97.6 95.9z"/>
                                        <path fill="#fff"
                                              d="m430.7 191.5-1 44.3-41.3 11.2 40.8 14.5-1 40.7 26.5-31.8 40.2 14-23.2-34.1 28.3-33.9-43.5 12-25.8-37z"/>
                                    </g>
                                </svg>
                            </SvgIcon>
                        </MenuItem>
                        <MenuItem value={20} sx={{fontFamily: 'Iransans', direction: 'rtl'}}>
                            <SvgIcon sx={{marginTop: '4px'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-ae" viewBox="0 0 640 480">
                                    <path fill="#00732f" d="M0 0h640v160H0z"/>
                                    <path fill="#fff" d="M0 160h640v160H0z"/>
                                    <path d="M0 320h640v160H0z"/>
                                    <path fill="red" d="M0 0h220v480H0z"/>
                                </svg>
                            </SvgIcon>
                        </MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/*currerncy*/}
            <Box sx={{display: 'flex', direction: 'rtl', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography variant='inherit' color='white' textAlign='right' fontFamily='Iransans'>
                    قیمت ارز روز
                </Typography>
                <FormControl>
                    <TextField id="outlined-basic" variant="outlined"
                               onChange={(e) => {
                                   let value = e.target.value;
                                   value = p2e(value);
                                   value = a2e(value);
                                   value = value.replaceAll(/\D/g, "");
                                   setCurrency(value);
                               }}
                               value={country === 10 ? currency.tl : currency.aed}
                               inputProps={{style: {fontFamily: 'Iransans', inputMode: 'numeric'}}}
                               sx={{
                                   background: '#fff',
                                   borderRadius: '4px',
                                   direction: 'rtl',
                                   fontFamily: 'Iransans',
                                   textAlign: 'center',
                                   width: '148px',
                               }}/>
                </FormControl>
            </Box>

            {/*product price*/}
            <Box sx={{display: 'flex', direction: 'rtl', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography variant='inherit' color='white' textAlign='right' fontFamily='Iransans'>
                    قیمت کالا
                </Typography>
                <FormControl>
                    <TextField id="outlined-basic"
                               type='number'
                               variant="outlined"
                               onChange={(e) => {
                                   let value = e.target.value;
                                   value = p2e(value);
                                   value = a2e(value);
                                   value = value.replaceAll(/\D/g, "");
                                   setPrice(value);
                               }}
                               value={price}
                               inputProps={{style: {fontFamily: 'Iransans'}, inputMode: 'numeric'}}
                               sx={{
                                   background: '#fff',
                                   borderRadius: '4px',
                                   direction: 'rtl',
                                   width: '148px',
                                   fontFamily: 'Iransans',
                                   textAlign: 'center'
                               }}/>
                </FormControl>
            </Box>

            {/*weight*/}
            <Box sx={{display: 'flex', direction: 'rtl', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography variant='inherit' color='white' textAlign='right' fontFamily='Iransans'>
                    وزن کالا (گرم)
                </Typography>
                <FormControl fontFamily="Iransans">
                    <TextField id="outlined-basic" variant="outlined"
                               onChange={(e) => {
                                   let value = e.target.value;
                                   value = p2e(value);
                                   value = a2e(value);
                                   value = value.replaceAll(/\D/g, "");
                                   setWeight(value);
                               }}
                               value={weight}
                               inputProps={{style: {fontFamily: 'Iransans'}, inputMode: 'numeric'}}
                               helperText={weight ? `${weight / 1000} کیلوگرم` : null}
                               FormHelperTextProps={{
                                   style: {display: 'flex',color: '#f88301', fontFamily: 'Iransans', fontSize: '13px', flexWrap: 'nowrap'}
                               }}
                               sx={{
                                   background: '#fff',
                                   borderRadius: '4px',
                                   direction: 'rtl',
                                   width: '148px',
                                   fontFamily: 'Iransans',
                                   textAlign: 'center'
                               }}/>
                </FormControl>
            </Box>

            {/*foreign ship*/}
            <Box sx={{display: 'flex', direction: 'rtl', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography variant='inherit' color='white' textAlign='right' fontFamily='Iransans'>
                    ارسال به {country === 10 ? 'ترکیه (لیر)' : "امارات (درهم)"}
                </Typography>
                <FormControl>
                    <TextField id="outlined-basic" variant="outlined"
                               value={fShip}
                               onChange={(e) => {
                                   let value = e.target.value;
                                   value = p2e(value);
                                   value = a2e(value);
                                   value = value.replaceAll(/\D/g, "");
                                   setFShip(value);
                               }}
                               inputProps={{style: {fontFamily: 'Iransans'}, inputMode: 'numeric'}}
                               sx={{
                                   background: '#fff',
                                   borderRadius: '4px',
                                   direction: 'rtl',
                                   width: '148px',
                                   fontFamily: 'Iransans',
                                   textAlign: 'center',

                               }}/>
                </FormControl>
            </Box>

            <Button onClick={() => setRes(Submit())} variant='outlined'
                    sx={{
                        background: '#FFAE4B',
                        fontSize: '20px',
                        fontFamily: 'Iransans',
                        color: 'white'
                    }}>
                محاسبه قیمت
            </Button></>)
}

export default Calc;
