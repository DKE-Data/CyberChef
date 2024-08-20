/**
 * agrirouter functions.
 *
 * @author oliverrahner [o.rahner@dke-data.com]
 * @copyright DKE-Data GmbH & Co. KG 2023
 * @license Apache-2.0
 */

import OperationError from "../errors/OperationError.mjs";
import forge from "node-forge";

/**
 * Converts a base64 encoded PKCS#12 container to PEM.
 * The private key will be encrypted using the same secret used to protect to origin container.
 * @param certDataB64
 * @param secret
 * @returns {string}
 */
function convertP12toPEM(certDataB64, secret) {
    let p12;
    try {
        const p12Der = forge.util.decode64(certDataB64);
        const p12Asn1 = forge.asn1.fromDer(p12Der);
        p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, secret);
    } catch (e) {
        throw new OperationError("Error while parsing PKCS#12 container: " + e.message);
    }

    let privateKeyPem;
    try {
        const keyData = p12.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag })[forge.pki.oids.pkcs8ShroudedKeyBag]
            .concat(p12.getBags({ bagType: forge.pki.oids.keyBag })[forge.pki.oids.keyBag]);
        privateKeyPem = forge.pki.encryptRsaPrivateKey(keyData[0].key, secret);
    } catch (e) {
        throw new OperationError("Error while parsing private key from PKCS#12 container: " + e.message);
    }

    let certificatePem;
    try {
        const certBags = p12.getBags({ bagType: forge.pki.oids.certBag })[forge.pki.oids.certBag];
        certificatePem = forge.pki.certificateToPem(certBags[0].cert);
    } catch (e) {
        throw new OperationError("Error while parsing certificate from PKCS#12 container: " + e.message);
    }

    return privateKeyPem + "\n" + certificatePem;
}

/**
 * Extract the certificate and/or private key from an agrirouter onboard response.
 * If necessary, a PKCS#12 container will be converted to PEM before.
 * @param data
 * @param extractCertificate
 * @param extractKey
 * @returns {string}
 */
export function onboardResponseToPEM(data, extractCertificate, extractKey) {
    if (!("authentication" in data)) {
        throw new OperationError("ERROR: Missing 'authentication' property in onboard response.");
    }
    if (!("type" in data.authentication)) {
        throw new OperationError("ERROR: Missing 'authentication.type' property in onboard response.");
    }
    if (!("secret" in data.authentication)) {
        throw new OperationError("ERROR: Missing 'authentication.secret' property in onboard response.");
    }
    if (!("certificate" in data.authentication)) {
        throw new OperationError("ERROR: Missing 'authentication.certificate' property in onboard response.");
    }

    if (data.authentication.type === "P12") {
        data.authentication.certificate = convertP12toPEM(data.authentication.certificate, data.authentication.secret);
        data.authentication.type = "PEM";
    }

    const privateKeyRegex = /(-----BEGIN ENCRYPTED PRIVATE KEY-----.*-----END ENCRYPTED PRIVATE KEY-----)/ms;
    let encryptedPrivateKey;
    try {
        encryptedPrivateKey = privateKeyRegex.exec(data.authentication.certificate)[0];
    } catch (e) {
        throw new OperationError("Error while extracting private key from PEM: " + e.message);
    }

    const certificateRegex = /(-----BEGIN CERTIFICATE-----.*-----END CERTIFICATE-----)/ms;
    let certificate;
    try {
        certificate = certificateRegex.exec(data.authentication.certificate)[0];
    } catch (e) {
        throw new OperationError("Error while extracting certificate from PEM: " + e.message);
    }

    let output = "";
    if (extractCertificate) output += certificate;
    if (extractCertificate && extractKey) output += "\n";
    if (extractKey) output += encryptedPrivateKey;

    return output;
}

