/**
 * @author oliverrahner [o.rahner@dke-data.com]
 * @copyright Crown Copyright 2023
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import {onboardResponseToPEM} from "../lib/Agrirouter.mjs";

/**
 * agrirouter onboard response to PEM certificate operation
 */
class AgrirouterOnboardResponseToPEM extends Operation {

    /**
     * AgrirouterOnboardResponseToPEM constructor
     */
    constructor() {
        super();

        this.name = "Onboard Response to PEM";
        this.module = "Agrirouter";
        this.description = "Reads an agrirouter onboard response and returns the embedded certificate and/or private key, converted to PEM if necessary and decrypted";
        this.infoURL = "";
        this.inputType = "JSON";
        this.outputType = "string";
        this.args = [
            {
                name: "Extract Target",
                type: "option",
                value: [
                    "Certificate",
                    "Private Key",
                    "both"
                ],
                defaultIndex: 0
            }
            /* Example arguments. See the project wiki for full details.
            {
                name: "First arg",
                type: "string",
                value: "Don't Panic"
            },
            {
                name: "Second arg",
                type: "number",
                value: 42
            }
            */
        ];
    }

    /**
     * @param {JSON} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        // const [firstArg, secondArg] = args;
        let extractCertificate;
        let extractKey;
        switch (args[0]) {
            case "Certificate":
                extractCertificate = true;
                extractKey = false;
                break;
            case "Private Key":
                extractCertificate = false;
                extractKey = true;
                break;
            default:
                extractCertificate = true;
                extractKey = true;
        }
        return onboardResponseToPEM(input, extractCertificate, extractKey);
    }

}

export default AgrirouterOnboardResponseToPEM;
