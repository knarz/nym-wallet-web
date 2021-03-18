import React, {useState} from 'react';
import ValidatorClient from "../../nym/clients/validator";

type ClientContext = {
    client: ValidatorClient,
    setClient: (client: ValidatorClient) => void
}

const defaultValue: ClientContext = {
    client: null,
    setClient: () => {},
}

export const ValidatorClientContext = React.createContext(defaultValue);

