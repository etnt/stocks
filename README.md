# Stocks
> Things related to stocks

## Google Sheet, AppScript and AppSheet

### Create a balanced stock portfolio using Google Sheet and AppScript

Have a look at this [video](https://youtu.be/DV2nnXCDXNk?si=8qfXGwztY7jiBaQz)

The AppScript used can be found [here](AppScript/balanced_portfolio.gs)

### Record a portfolio value once a day

Here we will record a portfolio value by appendng the value to a table,
located in another Sheet, once a day, together with the date.

We setup a trigger to run the AppScript once a day.

This will make it possible to produce nice graphs/diagrams of the portfolio progress.

Have a look at this [video](https://youtu.be/lW_x_L9ncuI?si=vB41r96hh3aVIKw0)

The AppScript used can be found [here](AppScript/record_portfolio_value.gs)

## TradingView

[TradingView](https://www.tradingview.com/about/) is a nice charting platform
for stocks etc, where it is possible to write your own chart indicators in
a programming language called `PineScript`.

I've written and published a number of [PineScripts](https://www.tradingview.com/u/kruskakli/#published-scripts)
and here I'll go through my own personal favorites.

Let's start by having a look at my typical setup, and then explain the various indicators I'm using:

<img src="images/tradingview_setup.png" width=800/>

