import React, { useState } from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from '../lib/theme';
import type { AppProps } from 'next/app';
import { ValidatorClientContext } from "../contexts/ValidatorClient";

// TODO: should it perhaps be pulled from some config or also user provided?
export const BONDING_CONTRACT_ADDRESS: string = "hal10pyejy66429refv3g35g2t7am0was7yam2dd72";
export const VALIDATOR_URL: string = "https://testnet-finney-validator.nymtech.net";
export const UDENOM: string = "uhal";


export default function Application(props: AppProps) {
    const { Component, pageProps } = props;

    const [client, setClient] = useState(null)

    React.useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <React.Fragment>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                <title>Nym</title>
            </Head>
            <ValidatorClientContext.Provider value={{ client, setClient }}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Component {...pageProps} />
                </ThemeProvider>
            </ValidatorClientContext.Provider>
        </React.Fragment>
    );
}
