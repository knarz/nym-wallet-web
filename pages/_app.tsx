import React, { useState } from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from '../lib/theme';
import type { AppProps } from 'next/app';
import { ValidatorClientContext } from "../contexts/ValidatorClient";

// TODO: should it perhaps be pulled from some config or also user provided?
export const BONDING_CONTRACT_ADDRESS: string = "hal1k0jntykt7e4g3y88ltc60czgjuqdy4c9c6gv94";
export const VALIDATOR_URLS: string[] = [
    "https://testnet-finney-validator.nymtech.net",
    "https://testnet-finney-validator2.nymtech.net",
    "https://mixnet.club",
];
export const UDENOM: string = "uhal"; // required for client and coin construction
export const DENOM: string = "hal"; // used everywhere else
export const ADMIN_ADDRESS: string = "hal1jsy67gee39x0ydl90dvgnq2e2cd6zx4e0xph8m"

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
