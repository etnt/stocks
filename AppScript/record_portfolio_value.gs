/*
 * Record the portfolio value by appending it to the 'History' sheet table.
 * This will make it possible to produce nice graphs/diagrams over the portfolio progress.
 * 
 * Possibly change the names fo the 'Portfolio' and 'History' sheet to fit and
 * the cell in the 'Portfolio' sheet that holds the current portfolio value.
 * 
 */

function recordPortfolioValue() {
  // Get the spreadsheet and sheets.
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var portfolioSheet = ss.getSheetByName("Portfolio"); // Replace with your <source> sheet name
  var historySheet = ss.getSheetByName("History");   // Replace with your <destination> sheet name

  // Get the total portfolio value from the specific cell.
  var totalValueCell = portfolioSheet.getRange("E12"); // Replace with the cell containing your total value
  var totalValue = totalValueCell.getValue();

  // Get the current date.
  var today = new Date();
  var formattedDate = Utilities.formatDate(today, "GMT", "yyyy-MM-dd"); // Format the date as needed

  // Append the date and total value to the history sheet.
  historySheet.appendRow([formattedDate, totalValue]);
}

