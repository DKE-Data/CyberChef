/**
 * Agrirouter tests.
 *
 * @author Oliver Rahner [o.rahner@dke-data.com]
 *
 * @copyright DKE-Data Copyright 2023
 * @license Apache-2.0
 */
import TestRegister from "../../lib/TestRegister.mjs";

const P12_SOURCE = "{\n" +
    "  \"deviceAlternateId\": \"fecd7325-96a0-427b-8483-0009de237710\",\n" +
    "  \"capabilityAlternateId\": \"3035ec70-dca1-4d71-a000-e79eb5891f81\",\n" +
    "  \"sensorAlternateId\": \"99190fdb-17e8-4983-875b-2199e41b8b8c\",\n" +
    "  \"connectionCriteria\": {\n" +
    "    \"gatewayId\": \"3\",\n" +
    "    \"measures\": \"https://dke-qa.eu10.cp.iot.sap/iot/gateway/rest/measures/fecd7325-96a0-427b-8483-0009de237710\",\n" +
    "    \"commands\": \"https://dke-qa.eu10.cp.iot.sap/iot/gateway/rest/commands/fecd7325-96a0-427b-8483-0009de237710\",\n" +
    "    \"host\": null,\n" +
    "    \"port\": null,\n" +
    "    \"clientId\": null\n" +
    "  },\n" +
    "  \"authentication\": {\n" +
    "    \"type\": \"P12\",\n" +
    "    \"secret\": \"Q?#zQyVR8m6JnXy4uQTwafNIThhixp0VYttY\",\n" +
    "    \"certificate\": \"MIACAQMwgAYJKoZIhvcNAQcBoIAkgASCBAAwgDCABgkqhkiG9w0BBwGggCSABIIEADCCBRowggUWBgsqhkiG9w0BDAoBAqCCBO4wggTqMBwGCiqGSIb3DQEMAQMwDgQI0E/pmuijbm4CAgfQBIIEyGj5o0d8ULF2WQArG6vu2M4fmwt8UVCgQaGci+pxXn1bzxeBqYUKnOVBxsLx3cGz19eUjNzqbmhR1X3ionWjpHMforP04M2BFi+ILX4lvMQaodwhJtPOOwTkBxiFCecXQ+QDCUluPiQZUXmVglTHYVKff6OzZDchfbaxOFtnk/T3NRUX5c8sTdQLcC8zJ5nzuClZXKGP0RfimUCbmL8OfJ3BAl+OcDijCqLH2oveciGzc6sdT84L3w/Usw0LDBk1wg8shyN0IImIue/OH1MgBxx3Lj0QioAjTr2YvXnBzAJ16fwjYUHUfcQEG0qg55QX8NuwE3F3v1ujUiPFD+HduCWdDksYOFCaHIGFSjvKR0qmnEQC+itGRUV6gJrOWFxieRHnNKXLan3jUC6GCkxPALbsmT/L/67JOw5AgF1MYHV/LJRAfqFaNG87rTo9TqbDNSxwzrFSu6MyQY4nvbIRBAmALFwT9/FBuAm86jYHR/Ylyb8I83KXx5mlihydkO6YSA1FXkS4tVQfkYcJKTiSixqlhxP1w9OXVbuY7pZKrQ79av1/WmqR/rLtLulnFC5+mihk2eJSO6MpArXa+IBn2r8CPC72dKbY2I1aoY1Dft/H5UQfJBQXJRTcD+3jmUCtN00zgAGbhQT1jzU8NxG5HUdG/sw68r3i+i30UoC7WwY+14lQ8jMUbYfUsoovcCXyRh8dyBgvvfE/DPF+3t2QzHaTGBlW9I1VWw0qArnUGO7iKcYIghBZqO2OAEhK+SLfSPjlORlCNIB8GJNpmYMjmGdXaeYou/12tiPGoYIu5kw9/msV48H1yOe6eHof4BqMHHQo3NtIb4hWBN3QfE86FEMd0dkFG7EmD11OjXs9TdQy5Jc8PrdSKmbFvO/+IcJnG7sXS109XLExXA6ibG0OvpEVMBPm8hi/2SPHhroiI2+RRsi78lArBFzpTbrNYpYr4fntO14U+LcXijYrW2eSzYEt/eol33R025XgTNqsqqAcO07wAO7ikORPOeKBFy0NAlE8Zs90JgJg9e+nkCXVd0glFJcU+WHz3ZS9D8QQp8+mrqg2zR1TsuS95JJ2sEIRcxCojcO/2QEWKPOs36NUTNYSP23/J31SsdBc7i7l49cEALcwcy/QYInaD08ZScSctm/JoZ3+WicfjCszHOAdPUMdjJVjnY07pxmtUGBX2YiM7sHcEjNHD2VFZtyujommiAc+NpaUvy4+hgH7BfqAJMgVPCgRJHwfiGPtBIIEAKKF0z3ge4Rh3JDyc6yM24edgZQ7fojbBIIBHsXFady7tQRGkbCl6uFQYIeiEspPxm4Vi2TSdlrZ+G/AnkDapEVgImYP91AhU6XBGrPyMzGbSTIguKceaXwLjwX/co3fekah/ryrfp6A8uz2sUlsOEXYjhI2193moxuNA7hnasu7A/N7AND5SZV9j5AyQPzEdE4UZsWkWtEe+6DbDQ8jcNW6lwpc9ggBJ42p6jjH/vM6LQiT40RfRJJ+BTyyH/v4kIrMmHPsHFUDCpanXNfAGJAb6929uN8Lcbu9I7ohjekugHHbr7METH/12lWUEtrJRgn3xokEdJ+htLj2NA5cMO3bhjyqiZAdpjg/xe07lZZ5fp724KLiw1Sio3w5yP6t4A0tMRUwEwYJKoZIhvcNAQkVMQYEBAEAAAAAAAAAAAAwgAYJKoZIhvcNAQcGoIAwgAIBADCABgkqhkiG9w0BBwEwHAYKKoZIhvcNAQwBBjAOBAgGeviTXUkQZAICB9CggASCBLhVIhT1xJXBE9a7vZ7uYtSGtHE/5Icrq+LoRXUzV9zgz82vHbey6NrqlbRKsahaf2xwzsdntszKNIN1ZDhfoj1MUFtgSriTPipYj1CafSeKEcn31ntj4wL+YZWbFsMvtcWvQH3j3paLvcavv5+a4LZAhtd46jbZJEP6e09QAR6R+xD7ppic4L5I8RudRiFOgctjgMm9XbsxFFN6ieiJR1tHyFn8Boqj2ZGUZ/ixgZj78BrRcbw+yc84fdxwy8QUfw9yPIJxfQTPGeeweiHpfMVhzDQQlI7ZD18PR+dnsnBSeOrZKo/fXQeyl8Ye+fPFYhL6gIjaVLySxdxzKXtDnnI32brmX0KVBuVKml9mzbirXuBgBut3XMpFpKJT0xq1CIJU4Os+Vwm1S7dridcIZ+2ivJKz7ylOkMO/wZaa0tzfsvgRconUK4Z9bfz5hgXPWt/f1JDh0CEMvvb8FPd4qens+qduSAa/DTM5h8ss1wJGoXCFlSB5x9K6uO9TYFIQtCX6DVxocsd3zXcmhbCxamgFrMuAmaaQf7QdZ63cLKFT76vNwrKH96KlwRAd8+xaUUFaLvvVPL62K9M2EJq9HpFlQuJcJPwWsg5WZE38pk+GGlIlq6uOIJ/ltwM4TSIXScIcWrV7WR1ZB3OaJwbPvnYi7wwB+uVCQP9mmdpQdGOA90xI7IiAk+HAm1sP8e9/j+14XBVUqvSyLIc7vPl0kx1L6y60UiT0nLVPOWbpQJ7fekxTEpBsO1h09PCoGiPFJ5l7fDwlu8jiiJRUOIWtgAQ1hTFKJq7kawnxYvriQP9bPk1tja7lxGNgvRQNTC45MYh4QrBF1k6PPlPPYCMEggJIiNX8e3H/nJDBVwJuXMkk+FLeM8gvzpsrOu4Lnh0Mhfe1dsfiXg2FAdH/1lVVvtiVe6toRKnUBYwY3BI0rsQEGNru6g7b68TnNKNpfvphnIF/puUFyHJ31nCiKlfL4BO4kD5boHEwp+4+Byo0rw7dNMjscw8TM51gS+epOa+3n0YeGVPE1FZm3KSEgWrsC8Yz8Bj9Zua1uZvz8SIJ4Ja0x3Ok7GYxlPtUxRSqxbYoJo0PP3AEvxXJk5/9ORTEXtSnXw/nYX5VuTKLQU8OTw7g6x2eR9Py1LVDJYZtoGtcKyqfmNhChtWmHXFTtSYRs8w1Yk8uC0QRbdPz0ULJrv7ex18RPQNvGjR/BrN78wTUtIxntYBgUpxdiF0k9DM+cPa41JQSCi1YL68AnvGsyWG5rhdQfp3zTSN4/FG98i0DJt4UxoPIr0WGA6LeNzLdCtlvH6nTxrU/VZMSOfl3exxUljzYIa9gsQN/ULk6Mxi3quv/+JRPfunQ4escyjMdjWoD2R5vxTmDz8GdkafEffOm9FeFhSp6sJTqCG/O2zW8/cbdPgZ/eU3Ts4hSyGpBgJaNH3o1a6EYPFs8jG3K2iFnbMOWInelbbzabs7Z+8Hmm2RTOClaevgrtf1uhPfTeriQLITpqYF/DUt6FkOnJi1pv7cu08TB98EemHihoJKQ4tGOcnkNRHX/tzbdfDyXd0AqF4OW55M38CuoSHzWnDtIKFP8OxyIbxcdi8yUBsNqwwIhwlo/3eDLkuJxk4UAAAAAAAAAAAAAAAAAAAAAAAAwMTAhMAkGBSsOAwIaBQAEFPExoADdh9jWiG1wi1vRKWLvqCOTBAi02kZ3On9oWwICB9AAAA==\"\n" +
    "  }\n" +
    "}\n";

const P12_TARGET_CERTIFICATE = "-----BEGIN CERTIFICATE-----\r\n" +
    "MIIEaTCCA1GgAwIBAgIQAKvzkTmlEPZ1EAEHAMMeNzANBgkqhkiG9w0BAQsFADBW\r\n" +
    "MQswCQYDVQQGEwJERTEjMCEGA1UEChMaU0FQIElvVCBUcnVzdCBDb21tdW5pdHkg\r\n" +
    "SUkxIjAgBgNVBAMTGVNBUCBJbnRlcm5ldCBvZiBUaGluZ3MgQ0EwHhcNMjExMjMw\r\n" +
    "MTA1NzIyWhcNMjIxMjMwMTA1NzIyWjCBtTELMAkGA1UEBhMCREUxHDAaBgNVBAoT\r\n" +
    "E1NBUCBUcnVzdCBDb21tdW5pdHkxFTATBgNVBAsTDElvVCBTZXJ2aWNlczFxMG8G\r\n" +
    "A1UEAxRoZGV2aWNlQWx0ZXJuYXRlSWQ6ZmVjZDczMjUtOTZhMC00MjdiLTg0ODMt\r\n" +
    "MDAwOWRlMjM3NzEwfGdhdGV3YXlJZDozfHRlbmFudElkOjE5MDIwMDE3ODV8aW5z\r\n" +
    "dGFuY2VJZDpka2UtcWEwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCB\r\n" +
    "sQ3plw/yMBPr6gxEDA9HUXt50HBPZp9Cke46tuHIQKRhlOzBdfByCCgVYNs96My1\r\n" +
    "BszMALIaISuB+hQCmrE4F6ebaUQmsN49VdV7QY5UlxfafMy0QZTDkKWM5Oh/rO5K\r\n" +
    "BjOD3AnKhPz2XF83KT7biZpEPKA8agP+aCjbSvZWvC4UwQK49tb70ZNDr+w27hCI\r\n" +
    "1UMGi+Uc9pYI0n7IZJcE7X23JqGZ/typMv7BiehM9GZTxaJD97+fg3Er83/ifwjA\r\n" +
    "QBsAbglUenacNL5g2QrBaxEIpTrjeXggYWBu+cRmkU7bNnf0UJQWc62cDCWcgN2t\r\n" +
    "ORIJzFPF+ypaJYWSX4fvAgMBAAGjgdIwgc8wSAYDVR0fBEEwPzA9oDugOYY3aHR0\r\n" +
    "cHM6Ly90Y3MubXlzYXAuY29tL2NybC9UcnVzdENvbW11bml0eUlJL1NBUElvVENB\r\n" +
    "LmNybDAMBgNVHRMBAf8EAjAAMCUGA1UdEgQeMByGGmh0dHA6Ly9zZXJ2aWNlLnNh\r\n" +
    "cC5jb20vVENTMA4GA1UdDwEB/wQEAwIGwDAdBgNVHQ4EFgQU3iCfa+RFxj/4apmD\r\n" +
    "onbNrVazTKEwHwYDVR0jBBgwFoAUlbez9Vje1bSzWEbg8qbJeE69LXUwDQYJKoZI\r\n" +
    "hvcNAQELBQADggEBAO+ku8pV3icF/Fl6k0qtmvvdBG8FWzooIlKNxrIAo7RJAi0D\r\n" +
    "laZV/5O2sEhlc6DfWT8zWfJOmtIjwhlHA5kaP+CyIFVpcpBQzQWJ06MXK/GqyHuy\r\n" +
    "JXlD6yW3C2Oluv30mDM+c02k/PW7Zk7f/pbENgzGKToJQZv/sBPFufz7ItivMANZ\r\n" +
    "KouRxgY/+H2Mwv3aDfVKJRegB5nllNmrZcz6oXDWveo3RUTDrGzgFKrbMysaI3YU\r\n" +
    "qMdEgabJSdG2ypmauqYygSHHaEalYUM4B/GZnVhy5p9lNAhvr1XOAepx4zLnDUw0\r\n" +
    "RDuC0NlfQRKdalAe8tl9vXxeD6ZtaRnrj0vqqLs=\r\n" +
    "-----END CERTIFICATE-----";

const P12_TARGET_KEY = "-----BEGIN ENCRYPTED PRIVATE KEY-----\n" +
    "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\n" +
    "Av01WRnDljN5qSNRb57iaOdw8Q==\n" +
    "-----END ENCRYPTED PRIVATE KEY-----"

TestRegister.addTests([
    {
        name: "Onboard Response to PEM: P12/Both",
        input: P12_SOURCE,
        expectedOutput: P12_TARGET_CERTIFICATE + "\n" + P12_TARGET_KEY,
        recipeConfig: [
            {
                op: "Onboard Response to PEM",
                args: ["both"],
            },
        ],
    },
    {
        name: "Onboard Response to PEM: P12/Certificate",
        input: P12_SOURCE,
        expectedOutput: P12_TARGET_CERTIFICATE,
        recipeConfig: [
            {
                op: "Onboard Response to PEM",
                args: ["Certificate"],
            },
        ],
    },
    {
        name: "Onboard Response to PEM: P12/Private Key",
        input: P12_SOURCE,
        expectedOutput: P12_TARGET_KEY,
        recipeConfig: [
            {
                op: "Onboard Response to PEM",
                args: ["Private Key"],
            },
        ],
    },

]);
