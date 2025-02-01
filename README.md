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

### A Mobile App for displaying portfolio progress diagrams

TBD 

## TradingView

[TradingView](https://www.tradingview.com/about/) is a nice charting platform
for stocks etc, where it is possible to write your own chart indicators in
a programming language called `PineScript`.

I've written and published a number of [PineScripts](https://www.tradingview.com/u/kruskakli/#published-scripts)
and here I'll go through my own personal favorites.

Let's start by having a look at my typical setup, and then explain the various indicators I'm using:

<img src="images/tradingview_setup.png" width=800/>

This setup consist of a main area where the actual stock chart is shown and a smaller area at the bottom
that show the traded volume.

The main area is using three "indicators"/PineScripts:

* `KMAs` - A number of plotted _moving averages curves_, the _inside bars_ indicator and more...
* `Position Sizes` - Shows a table of suggested position sizes based on the account size and choosen risk percentage.
* `Quick Stats` - Show some info up in the right corner such as: `Minervini's Trend Template` and the `Average Daily Range in percent`   

The bottom area shows the traded volume, where a number of volume related indicators are baked in.
The indicator is named: `Nice Volume` and contains:

* The colors of the bars have a meaning, e.g when a `Pocket Pivot` has occured.
* The plotted moving average color is changed depending on the trend of the Acc/Dist volume indicator.
* A small table shows more volume related figures.

### KMAs - Key Moving Averages

This is a script that combines many indicators, which each, easily can be turned on/off via the TradingView config menu.

The script can be found (here)[PineScript/kmas.pine].

A number of Moving Averages are displayed (depending on the timeframe used).
The following (default) values are used:

* `Daily` : MA10, EMA21, MA50, MA200
* `Weekly`: MA10, MA40
* `Intraday`: Daily MA5 and EMA65

The MA200 will be presented in white when `On-Balance Volume` is positive, else it is presented in blue.

It is also possible to display a `Bollinger Band` and to display the `close/ema21 ratio in percent`.

### Position Sizes

TBD

### Quick Stats

TBD

### Nice Volume - The bottom (volume) area

TBD
