// This file will contain the primary logic for the currency conversion program.
// To run the program use the `node` command followed by the name of this file.
// ie. `node currency-converter.js`.

// This file has been split up into several sections, each of which focuses on a
// portion of the program. Completing each of these sections in order should result
// in a functional, testable program. However, please free to approach the problem
// differently. There are many paths and approaches that result in a perfectly
// valid finished product.

// --------------------------------------------------
// Step 1: Capture user input
// --------------------------------------------------
// In this step we will capture the command line  information supplied by the user.

// We will store each piece of information in a dedicated variable for later use.



// --------------------------------------------------
// Step 2: Validate user input
// --------------------------------------------------
// Next we will ensure that the user has provided all of the require information.

// If any of the required information is missing, display a meaningful message
// and exit the program.



// --------------------------------------------------
// Step 3: Define currency conversion rates
// --------------------------------------------------
// Here we will define which currency conversions are supported, as well as the
// rates between each currency. We will capture this information as an object
// and store it in dedicated varaible for later use.

// We will use the official currency abbreviation for each currency (eg. USD, CAD, etc.).

// The conversion rates do not have to be accurate, athough this resource contains
// up-to-date rate information: https://www.xe.com/



// --------------------------------------------------
// Step 4: Ensure that a conversion rate exists
// --------------------------------------------------
// Since it is possible for the user to supply invalid or unsupported currencies,
// we must check for the presence of a rate before attempting to convert.

// If the user supplies an invalid initial or target currency, display a meaningful
// warning message and exit the program.



// --------------------------------------------------
// Step 5: Perform conversion
// --------------------------------------------------
// At this point we've confirmed that the user has supplied all of the necessary
// information, and that a rate exists for each of the currencies.

// Now we will compute the rate, apply it to the amount, and capture the result.



// --------------------------------------------------
// Step 6: Display results
// --------------------------------------------------
// Finally we will display the result as part of a meaningful message.

// This message should also include the original amount and currency information
// supplied by the user.






const cheerio = require("cheerio")
const got = require("got")

class CurrencyConverter {
    currencies = {
        
        "CAD": "Canadian Dollar",
        "USD": "United States Dollar",
        
    }
    currencyCode = ["AFN", "ALL", "DZD", "AOA", "ARS", "AMD", "AWG", "AUD", "AZN", "BSD", "BHD", "BBD", "BDT", "BYR", "BZD", "BMD", "BTN", "XBT", "BOB", "BAM", "BWP", "BRL", "BND", "BGN", "BIF", "XPF", "KHR ", "CAD", "CVE", "KYD", "FCFA", "CLP", "CLF", "CNY", "CNY", "COP", "CF", "CDF", "CRC", "HRK", "CUC", "CZK", "DKK", "DJF", "DOP", "XCD", "EGP", "ETB", "FJD", "GMD", "GBP", "GEL", "GHS", "GTQ", " GNF", "GYD", "HTG", "HNL", "HKD", "HUF", "ISK", "INR", "IDR", "IRR", "IQD", "ILS", "JMD", "JPY", "JOD", "KZT", "KES", "KWD", "KGS", "LAK", "LBP", "LSL", "LRD", "LYD", "MOP", "MKD", "MGA" , "MWK", "MYR", "MVR", "MRO", "MUR", "MXN", "MDL", "MAD", "MZN", "MMK", "NAD", "NPR", "ANG", "NZD", "NIO", "NGN", "NOK", "OMR", "PKR", "PAB", "PGK", "PYG ", "PHP", "PLN", "QAR", " RON", "RUB", "RWF", "SVC", "SAR", "RSD", "SCR", "SLL", "SGD", "SBD", "SOS", "ZAR", "KRW", "VES", "LKR", "SDG", "SRD", "SZL", "SEK", "CHF", "TJS", "TZS", "THB", "TOP", "TTD", "TND", "TRY" , "TMT", "UGX", "UAH", "AED", "USD", "UYU", "UZS", "VND", "XOF", "YER", "ZMW", "ETH", "EUR", "LTC", "TWD", "PEN"]

    constructor(params) {
        this.currencyFrom = ""
        this.currencyTo = ""
        this.currencyAmount = 1
        this.convertedValue = 0

        if(params != undefined){
            if(params["from"] !== undefined)
                this.from(params["from"])

            if(params["to"] !== undefined)
                this.to(params["to"])
            
            if(params["amount"] !== undefined)
                this.amount(params["amount"])
        }

    }
    from (currencyFrom) {
        if(typeof currencyFrom !== "string")
            throw new TypeError("currency code should be a string")
            
        if(!this.currencyCode.includes(currencyFrom.toUpperCase()))
            throw new Error(`${currencyFrom} is not a valid currency code`)

        this.currencyFrom = currencyFrom.toUpperCase()
        return this
    }
    to (currencyTo) {
        if(typeof currencyTo !== "string")
            throw new TypeError("currency code should be a string")

        if(!this.currencyCode.includes(currencyTo.toUpperCase()))
            throw new Error(`${currencyTo} is not a valid currency code`)

        this.currencyTo = currencyTo
        return this
    }
    amount (currencyAmount){
        if(typeof currencyAmount !== "number")
            throw new TypeError("amount should be a number")

        if(currencyAmount <= 0)
            throw new Error("amount should be a positive number")
            
        this.currencyAmount = currencyAmount
        return this
    }

    rates(){
        if(this.currencyFrom === this.currencyTo)
            return new Promise((resolve, _) => {resolve(1) })
        else    
            return got(`https://www.google.com/search?q=${this.currencyFrom}+to+${this.currencyTo}`)
                .then((html) => {return cheerio.load(html.body)})
                .then(($) => {return $(".iBp4i").text().split(" ")[0]})
                .then((rates) => {
                    if(rates.includes(","))
                        rates = rates.replace(",", ".")
                    return parseFloat(rates)
            })
    }

    convert(currencyAmount){
        if(currencyAmount !== undefined){
            this.amount(currencyAmount)
        }

        if(this.currencyFrom == "")
            throw new Error("currency code cannot be an empty string")

        if(this.currencyTo == "")
            throw new Error("currency code cannot be an empty string")

        if(this.currencyAmount == 0)
            throw new Error("currency amount should be a positive value")

        return this.rates().then((rates) =>{
            this.convertedValue = rates * this.currencyAmount
            return this.convertedValue
        })
    }

    currencyName(currencyCode_){
        if(typeof currencyCode_ != "string")
            throw new TypeError("currency code should be a string")
        
        if(!this.currencyCode.includes(currencyCode_.toUpperCase()))
            throw new Error(`${currencyCode_} is not a valid currency code`)

        return this.currencies[currencyCode_]
    }
  }

module.exports = CurrencyConverter
