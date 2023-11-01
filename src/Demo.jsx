import * as React from "react";
import Box from "@mui/material/Box";
import Calc from './Calc'
import Result from "./Result";
import {useEffect} from "react";

export default function BasicSelect() {
    const [res, setRes] = React.useState({});

    return (
        <Box
            sx={{
                minWidth: 120,
                background: "#1D6176",
                height: "98vh",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                gap: "16px",
                paddingX: {xs: "18px", md: "35%"},
                fontFamily: "Iransans",
                fontSize: '18px'
            }}
        >
            {
                Object.keys(res).length === 0 ? (
                    <Calc setRes={setRes}/>
                ) : (
                    <Result res={res}/>
                )
            }
        </Box>
    );
}
