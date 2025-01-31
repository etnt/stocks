/*
 * Calculate the number of stocks to buy for to get a balanced portfolio.
 * 
 * We assume you have a Google Sheet table where each row represent a Company.
 * One column should define the stock price and another column the number of shares.
 * 
 * As input to this function you need to set 4 parameters:
 * 
 *   availableAmountCell  -  the Sheet cell holding the available amount to invest  
 *   numCompanies         -  the number of companies
 *   stockPriceRange      -  the column range holding the stock prices
 *   outputRange          -  the column range to hold the number of shares to buy
 *   
 */
function balancedPortolio() {
  // Get the spreadsheet and sheets.
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var portfolioSheet = ss.getSheetByName("Portfolio");  // change if sheet has another name!

  // INPUT VALUES!
  var availableAmountCell = portfolioSheet.getRange("B14");
  const numCompanies = 10
  const stockPriceRange = "E2:E11";
  const outputRange = "F2:F11";

  var totalInvestment = availableAmountCell.getValue();

  const result = CALCULATE_AND_WRITE_BALANCED_PORTFOLIO(totalInvestment, stockPriceRange, numCompanies, outputRange);

  if (result != '') {
    Logger.log(result); // Log errors
  } else {
    Logger.log("Portfolio calculated and written to sheet.");
  }

}


/**
 * Calculates shares and writes results to a range.
 *
 * @param {number} totalInvestment Total investment.
 * @param {string} stockPriceRange Range of stock prices (e.g., "E2:E11").
 * @param {number} numCompanies Number of companies. Optional.
 * @param {string} outputRange Range to write results (e.g., "F2:F11").
 * @customfunction
 */
function CALCULATE_AND_WRITE_BALANCED_PORTFOLIO(totalInvestment, stockPriceRange, numCompanies, outputRange) {
  const numShares = CALCULATE_BALANCED_PORTFOLIO_FROM_RANGE(totalInvestment, stockPriceRange, numCompanies);

  if (typeof numShares === 'string') { // Check for errors from the price calculation
    return numShares; // Return the error message to the sheet
  }

  if (typeof outputRange !== 'string' || outputRange === "") {
    return "Error: Output range must be a valid cell range (e.g., 'F2:F11').";
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  const outputRangeObj = sheet.getRange(outputRange);

  // Check if the output range is large enough
  if (outputRangeObj.getNumRows() * outputRangeObj.getNumColumns() < numShares.length) {
    return "Error: Output range is not large enough to display all results.";
  }

  const numRows = outputRangeObj.getNumRows();
  const numCols = outputRangeObj.getNumColumns();

  // Write the numShares array to the output range cell by cell
  let shareIndex = 0; // Index for numShares array

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (shareIndex < numShares.length) { // Check if there are more shares to write
        outputRangeObj.getCell(i + 1, j + 1).setValue(numShares[shareIndex]); // Use getCell!
        shareIndex++;
      } else {
        break; // No more shares to write
      }
    }
  }

  return ""; // Return an empty string
}


/**
 * Calculates the number of shares to buy for each stock in a portfolio to achieve a balanced allocation.
 *
 * @param {number} totalInvestment The total amount of dollars to invest.
 * @param {Array<number>} stockPrices An array of current stock prices for each company.
 * @param {number} numCompanies The number of companies to invest in.  Optional, derived from stockPrices.
 * @return {Array<number>} An array of the number of shares to buy for each company, or an error message.
 * @customfunction
 */

/**
 * Calculates shares from a range.
 *
 * @param {number} totalInvestment Total investment.
 * @param {string} stockPriceRange Range of stock prices.
 * @param {number} numCompanies Number of companies. Optional.
 * @return {Array<number>|string} Array of shares or error message.
 */
function CALCULATE_BALANCED_PORTFOLIO_FROM_RANGE(totalInvestment, stockPriceRange, numCompanies) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  const priceRange = sheet.getRange(stockPriceRange);
  let stockPrices = priceRange.getValues().flat().filter(value => typeof value === 'number' && !isNaN(value));

  if (stockPrices.length === 0) {
    return "Error: No valid stock prices found in the specified range."; // More specific error
  }

  numCompanies = numCompanies || stockPrices.length;

    if (stockPrices.length < numCompanies) {
        return "Error: You have more companies than stock prices.";
    }

  if (typeof numCompanies !== 'number' || isNaN(numCompanies) || numCompanies <= 0) {
    return "Error: Number of companies must be a positive number.";
  }

  if (numCompanies > stockPrices.length) {
    return "Error: Number of companies cannot be greater than number of provided stock prices.";
  }
 
  // Calculate the target investment per company
  const investmentPerCompany = totalInvestment / numCompanies;

  // Calculate the number of shares to buy for each company
  const numShares = [];
  for (let i = 0; i < numCompanies; i++) {
    const price = stockPrices[i];
    if (typeof price !== 'number' || isNaN(price) || price <= 0) {
      return `Error: Stock price for company ${i + 1} must be a positive number.`;
    }
    const shares = Math.floor(investmentPerCompany / price); // Use Math.floor to buy whole shares
    numShares.push(shares);
  }
 
  return numShares;
}
