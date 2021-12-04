
// Copyright 2019-2022 GPLv3, Slideshow Crypto Ticker by Mike Kilday: http://DragonFrugal.com



/////////////////////////////////////////////////////////////////////////////////////////////////////


function uc_first(input) { 
return input[0].toUpperCase() + input.slice(1); 
}


/////////////////////////////////////////////////////////////////////////////////////////////////////


function is_json(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


/////////////////////////////////////////////////////////////////////////////////////////////////////


function load_js(file) {

script= document.createElement('script');
script.src= file;

head = document.getElementsByTagName('head')[0];
head.appendChild(script);

	script.onload = function(){
   console.log('Loaded JS file: ' + file);
   };

}


/////////////////////////////////////////////////////////////////////////////////////////////////////


function js_safe_key(key, exchange) {

key = key.replace("/", "-"); // So we only have to regex a hyphen
key = key.replace(/-/g, "") + '_key_' + exchange;
key = key.toLowerCase();

	// To assure appropriate ticker updated
	if ( key ) {
	return key;
	}
	else {
	return false;
	}

}


/////////////////////////////////////////////////////////////////////////////////////////////////////


function pair_volume(volume_type, trade_value, volume) {
	
	if ( typeof volume == 'string' ) {
	volume = parseFloat(volume);
	}

	if ( volume_type == 'asset' ) {
	base_volume = trade_value * volume; // Roughly emulate pairing volume for UX
	}
	else if ( volume_type == 'pairing' ) {
	base_volume = volume;
	}
	
return base_volume;

}


/////////////////////////////////////////////////////////////////////////////////////////////////////


function console_alert() {
    
    if  ( window.api_alert == 1 ) {
    return;
    }
    else {
	window.api_alert = 1; 
    }

console.log(' ');
console.log('IMPROPER APP INSTALLATION DETECTED!');
console.log(' ');
console.log('To have access to ALL the features in this app, please make sure you have done ALL of the following...');
console.log(' ');
console.log('1) Open the "Terminal" app in your operating system interface menu, or login via remote terminal, AS THE USER YOU WANT RUNNING THE APP (user must have sudo privileges).');
console.log(' ');
console.log('2) In the terminal, copy / paste / run this command, THEN REBOOT when finished installing the app:');
console.log('wget --no-cache -O TICKER-INSTALL.bash https://git.io/Jqzjk;chmod +x TICKER-INSTALL.bash;sudo ./TICKER-INSTALL.bash');
console.log(' ');
console.log('3) ON REBOOT / TICKER STARTUP, you are logged-in to the GRAPHICAL DESKTOP INTERFACE, #AND# are running the app as the SAME USER YOU INSTALLED AS.');
console.log(' ');

}


/////////////////////////////////////////////////////////////////////////////////////////////////////


function trade_type(price_raw, market_id) {
	
	if ( !trade_side_price[market_id] ) {
	trade_side_arrow[market_id] = 'buy'; // If just initiated, with no change yet
	}
	else if ( price_raw < trade_side_price[market_id] ) {
	trade_side_arrow[market_id] = 'sell';
	}
	else if ( price_raw > trade_side_price[market_id] ) {
	trade_side_arrow[market_id] = 'buy';
	}
		
trade_side_price[market_id] = price_raw;

return trade_side_arrow[market_id];

}


/////////////////////////////////////////////////////////////////////////////////////////////////////


function arrow_html() {

arrow_height = Math.round(ticker_size * arrow_size);
arrow_width = Math.round(arrow_height * 0.84);
arrow_border_width = Math.round(arrow_width / 2);
	
// Arrow height
$("div.arrow_wrapper").css({ "height": arrow_height + "px" });
$("span.buy").css({ "border-bottom": arrow_height + "px solid rgb(105, 199, 115)" });
$("span.sell").css({ "border-top": arrow_height + "px solid rgb(355, 100, 49)" });

// Arrow width
$("div.arrow_wrapper").css({ "width": arrow_width + "px" });
$("span.arrow").css({ "border-left": arrow_border_width + "px solid transparent" });
$("span.arrow").css({ "border-right": arrow_border_width + "px solid transparent" });

}
	
	
/////////////////////////////////////////////////////////////////////////////////////////////////////


function render_names(name) {
	
render = name.charAt(0).toUpperCase() + name.slice(1);

render = render.replace(/btc/gi, "BTC");
render = render.replace(/coin/gi, "Coin");
render = render.replace(/bitcoin/gi, "Bitcoin");
render = render.replace(/exchange/gi, "Exchange");
render = render.replace(/market/gi, "Market");
render = render.replace(/forex/gi, "Forex");
render = render.replace(/finex/gi, "Finex");
render = render.replace(/stamp/gi, "Stamp");
render = render.replace(/flyer/gi, "Flyer");
render = render.replace(/panda/gi, "Panda");
render = render.replace(/pay/gi, "Pay");
render = render.replace(/swap/gi, "Swap");
render = render.replace(/iearn/gi, "iEarn");
render = render.replace(/pulse/gi, "Pulse");
render = render.replace(/defi/gi, "DeFi");
render = render.replace(/ring/gi, "Ring");
render = render.replace(/amm/gi, "AMM");
render = render.replace(/ico/gi, "ICO");
render = render.replace(/erc20/gi, "ERC-20");
render = render.replace(/okex/gi, "OKex");
render = render.replace(/mart/gi, "Mart");
render = render.replace(/ftx/gi, "FTX");
render = render.replace(/gateio/gi, "Gate.io");

return render;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////


function asset_symbols(asset_abrv) {

results = new Array();

			// Unicode asset symbols
			if ( typeof fiat_pairings[asset_abrv] !== 'undefined' ) {
			results['asset_symbol'] = fiat_pairings[asset_abrv];
			results['asset_type'] = 'fiat';
			}
			else if ( typeof crypto_pairings[asset_abrv] !== 'undefined' ) {
			results['asset_symbol'] = crypto_pairings[asset_abrv];
			results['asset_type'] = 'crypto';
			}
			else {
			results['asset_symbol'] = null;
			results['asset_type'] = null;
			}


return results;

}


/////////////////////////////////////////////////////////////


function kucoin_config() {
    
    if  ( window.kucoin_alert == 1 ) {
    return;
    }
    else {
	window.kucoin_alert = 1; 
    }
	
	// If kucoin auth data is cached, allow kucoin configs
	if ( typeof kucoin_endpoint !== 'undefined' && typeof kucoin_token !== 'undefined' ) {
	api['kucoin'] = kucoin_endpoint + '?token=' + kucoin_token;
	console.log('Kucoin support enabled (VALID installation detected).');
	return true;
	}
	// Remove kucoin market configs if no cache data is present, to avoid script errors,
	// and alert (to console ONLY) that app was improperly installed
	else {
	delete exchange_markets['kucoin'];
	console_alert(); 
	console.log('Kucoin support disabled (INVALID installation detected).');
	return false;
	}

}


/////////////////////////////////////////////////////////////


function loopring_config() {
    
    if  ( window.loopring_alert == 1 ) {
    return;
    }
    else {
	window.loopring_alert = 1; 
    }
    
    if ( typeof api['loopring'] == 'undefined' ) {
        
    api['loopring'] = 'wait';
        
    	$.getJSON("https://api3.loopring.io/v3/ws/key", function(data) {
    	})
    	
          .done(function(data) {
              
            var loopring_token = data.key;
        	
            	// If loopring auth data is cached, allow loopring configs
            	if ( typeof loopring_token !== 'undefined' ) {
            	api['loopring'] = 'wss://ws.api3.loopring.io/v3/ws' + '?wsApiKey=' + loopring_token;
            	console.log('Loopring support enabled (VALID installation detected).');
            	return true;
            	}
            	// Remove loopring market configs if no cache data is present, to avoid script errors,
            	// and alert (to console ONLY) that app was improperly installed
            	else {
            	// Whitespace will be detected as an invalid config, since we don't want the
            	// endpoint 'undefined' becuase that's how we trigger a check / recheck 
            	api['loopring'] = ' '; 
            	delete exchange_markets['loopring']; 
            	console_alert(); 
            	console.log('Loopring support disabled (INVALID installation detected).');
            	return false;
            	}
        	
          });
    	
    }

}


/////////////////////////////////////////////////////////////


function init_interface() {

console.log('init_interface'); // DEBUGGING

// Load cache.js dynamically, avoiding loading from the browser cache (lol, cachefest), via a timestamp url param
script= document.createElement('script');
script.src= 'cache/cache.js?cachebuster='+ new Date().getTime();

head = document.getElementsByTagName('head')[0];
head.appendChild(script);
	
	
	// If script loads OK
	script.onload = function(){
	console.log('JS cache file loaded successfully (valid installation detected).');
	render_interface();
   };

	
	// If script loading FAILS
	script.onerror = function(){
	console.log('JS cache file not found (invalid installation detected).');
	render_interface();
   };

}


/////////////////////////////////////////////////////////////////////////////////////////////////////


function number_commas(num, decimals) {
	
//console.log(typeof num);
	
	if ( num >= 1 ) {
		
		if ( typeof num == 'string' ) {
		
			num = parseFloat(num).toLocaleString(undefined, {
   		    minimumFractionDigits: decimals,
   		    maximumFractionDigits: decimals
			});
		
		}
		else {
		
			num = num.toLocaleString(undefined, {
   		    minimumFractionDigits: decimals,
   		    maximumFractionDigits: decimals
			});
		
		}
	
	}


return num;
   
}


/////////////////////////////////////////////////////////////////////////////////////////////////////


function market_id_parser(market_id, exchange) {
	
market_id = market_id.toUpperCase(); // Uppercase

// So we only have to search for a hyphen, #CONVERT ALL API MARKET PAIRING DELIMITERS TO HYPHENS HERE#
market_id = market_id.replace("/", "-"); 
market_id = market_id.replace("_", "-"); 


	// NON-delimited market IDs
	if ( market_id.indexOf("-") == -1 ) {
	pairing = regex_pairing_detection(market_id);
	asset = market_id.replace(pairing, "");
	}
	// HYPHEN-delimited market IDs 
	// (ALL DELIMITERS ARE CONVERTED TO HYPHENS [IN THIS FUNCTION ONLY]...SEE market_id AT FUNCTION TOP)
	else {
	pairing = market_id.replace(/\b([A-Za-z]*)-/g, "");
	asset = market_id.replace(/-[A-Za-z0-9]*/g, "");
	}


parsed_markets[market_id] = { "pairing" : pairing, "asset" : asset };

return parsed_markets[market_id];

}


/////////////////////////////////////////////////////////////////////////////////////////////////////


function valid_config(exchange, mode) {

// Allows alphanumeric and symbols: / - _ |
alph_symb_regex = /^[a-z0-9\/\-_|]+$/i;

	// Skip, if no endpoint or markets are set for this exchange
	if ( 
	api[exchange] == '' 
	|| typeof api[exchange] == 'undefined'
	) {
	console.log(exchange + ' endpoint not defined, skipping ' + mode);
	return false;
	}
	else if ( typeof exchange_markets[exchange] == 'undefined' ) {
	console.log(exchange + ' markets not defined, skipping ' + mode);
	return false;
	}
	else if ( !exchange_markets[exchange].match(alph_symb_regex) ) {
	console.log(exchange + ' markets not properly setup (CHECK FOR BAD FORMATTING), skipping ' + mode);
	return false;
	}
	else {
	return true;
	}

}


/////////////////////////////////////////////////////////////////////////////////////////////////////


function regex_pairing_detection(market_id) {

results = new Array();

// Merge fiat / crypto arrays TO NEW ARRAY (WITHOUT ALTERING EITHER ORIGINAL ARRAYS)
scan_pairings = $.extend({}, fiat_pairings, crypto_pairings);

// last 4 / last 3 characters of the market id
last_4 = market_id.substr(market_id.length - 4);
last_3 = market_id.substr(market_id.length - 3);


	// Check for 4 character pairing configs existing FIRST
	if ( typeof scan_pairings[last_4.toUpperCase()] !== 'undefined' ) {
	return last_4.toUpperCase();
	}
	else if ( typeof scan_pairings[last_3.toUpperCase()] !== 'undefined' ) {
	return last_3.toUpperCase();
	}
	else {
	return false;
	}
	

}


/////////////////////////////////////////////////////////////////////////////////////////////////////


function monospace_check() {
	
check = monospace_width;


  // Not a number check
  if ( isNaN(check) ) {
  return false;
  }


// Second number check, with check for decimals with value of 1.00 or less
var result = (check - Math.floor(check)) !== 0; 
   
   
  if (result) { // Is a decimal number
  
  	if ( monospace_width > 1 ) { // Is greater than 1.00
  	return false;
  	}
  	else { // Is NOT greater than 1.00
  	return true;
  	}
  	
  }
  else { // Is not a decimal number
  return false;
  }
     
     
 }


/////////////////////////////////////////////////////////////////////////////////////////////////////


function ticker_html(market_id, exchange) {

    // Skip invalid exchange setups
    if ( valid_config(exchange, 'ticker_html') == false ) {
    return;
    }
	
parsed_market_id = market_id_parser(market_id, exchange);
				 
asset = parsed_market_id.asset;
		
pairing = parsed_market_id.pairing;
  
market_key = js_safe_key(market_id, exchange);

	
	// To assure appropriate ticker updated
	if ( typeof market_key !== 'undefined' ) {

	html = '<div id="wrapper_' + market_key + '" class="asset_tickers">'+
    
	'<div class="title" style="font-size: '+title_size+'px; color: #f3aa0c; font-weight: '+font_weight+';"><span id="asset_' + market_key + '">' + asset + '</span> (<span class="status_'+exchange+'">Connecting...</span>)</div>'+
	
	'<div class="ticker" style="font-size: '+ticker_size+'px; color: #09c; font-weight: '+font_weight+';" id="ticker_' + market_key + '">Loading...</div>'+
////////////////////////////////////////////
	'<div class="high" style="font-size: '+volume_size+'px; color: #16f30c; font-weight: '+font_weight+';"><span id="high_' + market_key + '"></span>'+
	'<span class="low" style="font-size: '+volume_size+'px; color: #f3160c; font-weight: '+font_weight+';" id="low_' + market_key + '"</span></div>'+
//////////////////////////////////////////
        '<div class="PCP" style="font-size: '+volume_size+'px; color: #0cefc3; font-weight: '+font_weight+';"><span id="PCP_' + market_key + '"></span>'+
	'<span class="pricechange" style="font-size: '+volume_size+'px; color: #6133FF; font-weight: '+font_weight+';" id="pricechange_' + market_key + '"</span></div>'+
//	'<div class="volume" style="font-size: '+volume_size+'px; font-weight: '+font_weight+';" id="volume_' + market_key + '"></div>'+
	
	'</div>';
	
	$(html).appendTo( "#ticker_window" );
	
	}
	else {
	return false;
	}


}


/////////////////////////////////////////////////////////////////////////////////////////////////////


function load_google_font() {
	
config_font = google_font;

	// Skip custom font rendering if no config value
	if ( config_font == null ) {
	return false;
	}

formatted_link = config_font.split(' ').join('+');


// Get HTML head element 
head = document.getElementsByTagName('HEAD')[0];  
  
// Create new link Element 
link = document.createElement('link'); 
  
// set the attributes for link element  
link.rel = 'stylesheet';  
      
link.type = 'text/css'; 
      
link.href = 'https://fonts.googleapis.com/css?family=' + formatted_link + '&display=swap';  

// Append link element to HTML head 
head.appendChild(link); 

// DEBUGGING
//console.log("google_font = " + config_font);
//console.log("Formatted for CSS link: " + formatted_link);
console.log("Google font CSS href link set as: " + link.href);

return "'" + config_font + "', serif, monospace";

}


/////////////////////////////////////////////////////////////////////////////////////////////////////


function ticker_init() {

	
ticker_divs = $('#ticker_window div.asset_tickers');


	// Slideshow init
	if ( typeof window.slideshow_init == 'undefined' ) {
	this_ticker = ticker_divs.first();
	window.slideshow_init = 1;
	}
	// Slideshow continue
	else {
	this_ticker = window.ticker_next;
	window.slideshow_init = 0;
	}

t_speed = Math.round(window.transition_speed * 1000);

   // If more than one market, run slideshow
	if ( markets_length > 1 ) {

	window.ticker_next = this_ticker.next().length ? this_ticker.next() : ticker_divs.first();

		// Slideshow init
		if ( window.slideshow_init == 1 ) {
		this_ticker.fadeIn(t_speed);
		}
		// Slideshow continue
		else {
			
		ticker_prev = this_ticker.prev().length ? this_ticker.prev() : ticker_divs.last();
			
   		ticker_prev.fadeOut(t_speed, function() {
   		this_ticker.fadeIn(t_speed);
			});
		
		}
	
   }
   // If just one market, leave showing
   else if ( markets_length == 1 ) {
   this_ticker.fadeIn(t_speed);
   }
	
   
}

/////////////////////////////////////////////////////////////////////////////////////////////////////


function render_interface() {

console.log('render_interface'); // DEBUGGING

kucoin_config(); // Check / load kucoin data BEFORE MARKET CONFIG

loopring_config(); // Check / load loopring data BEFORE MARKET CONFIG


    // Wait for loopring to get a temp API key
    if ( api['loopring'] == 'wait' ) {
    setTimeout(render_interface, 1000); // Wait 1000 millisecnds then recheck
    return;
    }
    else {
	
    market_config();
    

		// Connect to exchange APIs for market data
		// Render the HTML containers for each ticker
		Object.keys(markets).forEach(function(exchange) {
			
		api_connect(exchange);
		
			if ( markets[exchange] != '' ) {
			
  				markets[exchange].forEach(element => {
  				ticker_html(element, exchange);
				});
			
			}
		
		});

		
		// Start ticker
		// More than one asset, so run in slideshow mode (with delay of slideshow_speed seconds)
		if ( markets_length > 1 ) {
			
			// If auto mode for slideshow_speed (minimum of 5 seconds allowed)
			if ( slideshow_speed == 0 ) {
			slideshow_speed = Math.round(60 / window.markets_length);
			slideshow_speed = slideshow_speed < 5 ? 5 : slideshow_speed;
			}
			
		setInterval(ticker_init, slideshow_speed * 1000);
		
		}
		// If only one market
		else if ( markets_length == 1 ) {
		ticker_init();
		}


    }


}


/////////////////////////////////////////////////////////////////////////////////////////////////////


function monospace_rendering($element) {
	
	if (  typeof $element !== 'undefined' ) {
	
    for (var i = 0; i < $element.childNodes.length; i++) {
    
    var $child = $element.childNodes[i];

        if ($child.nodeType === Node.TEXT_NODE) {
        	
        var $wrapper = document.createDocumentFragment();

            for (var i = 0; i < $child.nodeValue.length; i++) {
            	
            	if ( isNaN($child.nodeValue.charAt(i)) || $child.nodeValue.charAt(i) == ' ' ) { // Space not detected well here, lol...so we work-around
                var $char = document.createElement('span');
                $char.textContent = $child.nodeValue.charAt(i);
                }
                else {
                var $char = document.createElement('span');
                $char.className = 'monospace';
                $char.textContent = $child.nodeValue.charAt(i);
                }

            $wrapper.appendChild($char);
                
            }

        $element.replaceChild($wrapper, $child);
        
        } 
        else if ($child.nodeType === Node.ELEMENT_NODE) {
        monospace_rendering($child);
        }
        
    }
    
   }
    
}


/////////////////////////////////////////////////////////////////////////////////////////////////////


function market_config() {

console.log('market_config'); // DEBUGGING


// Exchange API endpoints

// WE DYNAMICALLY ADD THE KUCOIN / LOOPRING ENDPOINTS within render_interface()

api['binance'] = 'wss://stream.binance.com:9443/ws';

api['coinbase'] = 'wss://ws-feed.pro.coinbase.com';

api['kraken'] = 'wss://ws.kraken.com';

api['hitbtc'] = 'wss://api.hitbtc.com/api/2/ws';

api['bitstamp'] = 'wss://ws.bitstamp.net/';

api['bitfinex'] = 'wss://api.bitfinex.com/ws/1';

api['okex'] = 'wss://ws.okex.com:8443/ws/v5/public';

api['bitmart'] = 'wss://ws-manager-compress.bitmart.com?protocol=1.1';

api['gateio'] = 'wss://ws.gate.io/v3/';



	// Put configged markets into a multi-dimensional array, calculate number of markets total
	Object.keys(exchange_markets).forEach(function(exchange) {
		
		// If markets exist for this exchange in config.js, and haven't been added yet to the 'markets' (ALL exchange markets) array yet
		if ( exchange_markets[exchange] != '' && typeof markets[exchange] == 'undefined' ) {
		markets[exchange] = exchange_markets[exchange].split("|");
		markets_length = markets_length + markets[exchange].length;
		}
			
	});


//console.log(markets); // DEBUGGING


	// Websocket subscribe arrays
	Object.keys(markets).forEach(function(exchange) {
	
		// Coinbase
		if ( exchange == 'coinbase' ) {
			
		    // API call config
		    subscribe_msg[exchange] = {
					
				"type": "subscribe",
				"product_ids": [
				],
				"channels": [
						{
								"name": "ticker",
								"product_ids": [
								]
						}
				]
		    };
		 
		 
			// Add markets to API call
			var loop = 0;
			markets[exchange].forEach(element => {
			subscribe_msg[exchange].product_ids[loop] = element;
			loop = loop + 1;
			});
		
		}
		// Binance
		else if ( exchange == 'binance' ) {
			
    		// API call config
    		subscribe_msg[exchange] = {
    			"method": "SUBSCRIBE",
    			"params": [
    			],
    			"id": 1
    		};
		 
		 
			// Add markets to API call
			var loop = 0;
			markets[exchange].forEach(element => {
			subscribe_msg[exchange].params[loop] = element + '@ticker'; 
			loop = loop + 1;
			});
		
		}
		// Kraken
		else if ( exchange == 'kraken' ) {
			
    		// API call config
    		subscribe_msg[exchange] = {
    			"event": "subscribe",
    			"pair": [],
    			 "subscription": {
    				"name": "ticker"
    			 }
    		};
		 
		 
			// Add markets to API call
			var loop = 0;
			markets[exchange].forEach(element => {
			subscribe_msg[exchange].pair[loop] = element; 
			loop = loop + 1;
			});
		
		}
		// HitBTC
		else if ( exchange == 'hitbtc' ) {
			
    		// API call config
    		subscribe_msg[exchange] = {
    			"method": "subscribeTicker",
    			"params": {
    			},
    			"id": 1
    		};
		 
		 
			// Add markets to API call
			var loop = 0;
			markets[exchange].forEach(element => {
			subscribe_msg[exchange].params['symbol'] = element; 
			loop = loop + 1;
			});
		
		}
		// Kucoin
		// https://docs.kucoin.com/#symbol-ticker
		else if ( exchange == 'kucoin' ) {
			
    		// API call config
    		subscribe_msg[exchange] = {        
    			"id": 1,
    			"type": "subscribe",
    			"topic": "/market/snapshot:",
    			"privateChannel": false,
    			"response": true       
    		}
		 
		 
			// Add markets to API call
			var loop = 0;
			markets[exchange].forEach(element => {
			subscribe_msg[exchange]['topic'] = subscribe_msg[exchange]['topic'] + element + ','; 
			loop = loop + 1;
			});
			
		subscribe_msg[exchange]['topic'] = subscribe_msg[exchange]['topic'].slice(0, -1) // remove last character
		
		}
		// Bitstamp
		// https://www.bitstamp.net/websocket/v2/
		else if ( exchange == 'bitstamp' ) {
			
    		// API call config
    		subscribe_msg[exchange] = { 
    			"event": "bts:subscribe",
    			"data": {
    					"channel": "live_trades_"
    			}  
    		}
		 
		 
			// Add markets to API call
			var loop = 0;
			markets[exchange].forEach(element => {
			subscribe_msg[exchange]['data']['channel'] = subscribe_msg[exchange]['data']['channel'] + element; 
			loop = loop + 1;
			});
		
		}
		// Bitfinex
		else if ( exchange == 'bitfinex' ) {
			
    		// API call config
    		subscribe_msg[exchange] = {
    			"event": "subscribe",
    			"channel": "ticker",
    			"pair": ""
    		};
		 
		 
			// Add markets to API call
			var loop = 0;
			markets[exchange].forEach(element => {
			subscribe_msg[exchange]['pair'] = element; 
			loop = loop + 1;
			});
		
		}
		// OKex
		else if ( exchange == 'okex' ) {
			
    		// API call config
    		subscribe_msg[exchange] = {
              "op": "subscribe",
              "args": []
    		};
		 
		 
			// Add markets to API call
			var loop = 0;
			markets[exchange].forEach(element => {
			     subscribe_msg[exchange].args[loop] =     {
                  "channel": "index-tickers",
                  "instId": element
                 };
			loop = loop + 1;
			});
		 
		 
		
		}
		// Loopring
		else if ( exchange == 'loopring' ) {
			
    		// API call config 
    		// ('unsubscribeAll' cancels any previous subscriptions)
    		subscribe_msg[exchange] = {
            "op": "sub",
            "unsubscribeAll": true,
            "topics": []
            };
		 
		 
			// Add markets to API call
			var loop = 0;
			markets[exchange].forEach(element => {
			     subscribe_msg[exchange].topics[loop] =     {
                  "topic": "ticker",
                  "market": element
                 };
			loop = loop + 1;
			});
		
		}
		// Gate.io
		else if ( exchange == 'gateio' ) {
			
    		// API call config
    		subscribe_msg[exchange] = {
    		"id": 12312,
    		"method": "ticker.subscribe",
    		"params": []
    		};
		 
		 
			// Add markets to API call
			var loop = 0;
			markets[exchange].forEach(element => {
			subscribe_msg[exchange].params[loop] = element; 
			loop = loop + 1;
			});
		
		}
		// Bitmart
		else if ( exchange == 'bitmart' ) {
			
    		// API call config
    		subscribe_msg[exchange] = {
    			"op": "subscribe",
    			"args": [
    			]
    		};
		 
		 
			// Add markets to API call
			var loop = 0;
			markets[exchange].forEach(element => {
			subscribe_msg[exchange].args[loop] = "spot/ticker:" + element; 
			loop = loop + 1;
			});
		
		}
		
	//console.log(subscribe_msg[exchange]);
	
	});



}


/////////////////////////////////////////////////////////////////////////////////////////////////////


function api_connect(exchange) {

console.log('api_connect'); // DEBUGGING


    // Skip invalid exchange setups
    if ( valid_config(exchange, 'api_connect') == false ) {
    return;
    }
	
	
	// Create new socket
	sockets[exchange] = new WebSocket(api[exchange]);
    
    
        if ( exchange == 'bitmart' ) {
        // Change binary type from "blob" to "arraybuffer"
        sockets[exchange].binaryType = "arraybuffer";
        }
   
   
	// Open socket ///////////////////////////////////////////////////
	sockets[exchange].onopen = function() {
   
	sockets[exchange].send(JSON.stringify(subscribe_msg[exchange]));
	   
	   markets[exchange].forEach(element => {
	   $(".status_" + exchange).text( render_names(exchange) ).css("color", "#2bbf7b");
	   });
	   
	};
   
   
	// Socket response ///////////////////////////////////////////////////
	sockets[exchange].onmessage = function(e) {
	   
	   
	   // Check if response is JSON format or bitmart's compressed websocket data, otherwise presume just a regular string
	   if ( is_json(e.data) == true ) {
	   msg = JSON.parse(e.data);
	   }
	   else if ( exchange == 'bitmart' ) {
       
       // NOTES ON DECOMPRESSING (ALSO NEEDED sockets[exchange].binaryType = "arraybuffer"; before opening websocket)
       
       // https://developer-pro.bitmart.com/en/ws/spot_ws/compress.html
	   // https://nodeca.github.io/pako/
	   // https://stackoverflow.com/questions/4507316/zlib-decompression-client-side
	   // https://stackoverflow.com/questions/57264517/pako-js-error-invalid-stored-block-lengths-when-trying-to-inflate-websocket-m
       
          try {
              
              // Decompress the data, convert to string
              msg = JSON.parse(pako.inflateRaw(e.data, {
              to: 'string'
              }));
              
          }
          catch (err) {
          console.log(err);
          }
  
	   }
	   else {
	   msg = e.data;
	   }
		
		
	
	//console.log(typeof msg); // DEBUGGING
	
	//console.log(msg); // DEBUGGING
	
	//console.log(e.data); // DEBUGGING
	   
	   
	   // Loopring requires a response of 'pong', when message is 'ping'
	   if ( exchange == 'loopring' && msg == 'ping' ) {
	   sockets[exchange].send('pong');
	   //console.log('pong'); // DEBUGGING
	   }
	   
	   
		// Parse exchange data
		
		// Coinbase
		if ( exchange == 'coinbase' && msg["type"] == 'ticker' ) {
				 
		market_id = msg["product_id"];
				 
		price_raw = msg["price"];
				 
		volume_raw = msg["volume_24h"];
		   
		base_volume = pair_volume('asset', price_raw, volume_raw);
				 
		}
		// Binance
		else if ( exchange == 'binance' && !msg["id"] && msg["e"] == '24hrTicker' ) {
				 
		market_id = msg["s"];
				 
		price_raw = msg["c"];
				 
		volume_raw = msg["q"];
		   
		base_volume = pair_volume('pairing', price_raw, volume_raw);
//////////////////////////////////////////////////////
		high_raw = msg["h"];
		low_raw = msg["l"];
		pricechange_raw = msg["p"];
		PCP_raw = msg["P"];
///////////////////////////////////////////////////////				 
		}
		// Kraken
		else if ( exchange == 'kraken' && !msg["event"] && msg[2] == 'ticker' ) {
				 
		market_id = msg[3];
				 
		price_raw = msg[1]["c"][0];
				 
		volume_raw = msg[1]["v"][1];
		   
		base_volume = pair_volume('asset', price_raw, volume_raw);
				 
		}
		// HitBTC
		else if ( exchange == 'hitbtc' && !msg["result"] && msg["method"] == 'ticker' ) {
				 
		market_id = msg["params"]["symbol"];
				 
		price_raw = msg["params"]["last"];
				 
		volume_raw = msg["params"]["volumeQuote"];
		   
		base_volume = pair_volume('pairing', price_raw, volume_raw);
				 
		}
		// Kucoin
		else if ( exchange == 'kucoin' ) {
				 
			// If we have trade data available
			if ( msg["subject"] == 'trade.snapshot' ) {
					 
			market_id = msg["data"]["data"]["symbol"];
					 
			price_raw = msg["data"]["data"]["close"];
					 
			volume_raw = msg["data"]["data"]["volValue"];
			   
			base_volume = pair_volume('pairing', price_raw, volume_raw);
					 
			}
			// If we recieve an error reqponse
			else if ( msg["type"] == 'error' ) {
				
			console.log('Kucoin API Error: ' + msg["data"]);
			
				// Force refresh the webpage from server (NOT cache), 
				// if it's been at least 'min_error_refresh_time' since 'runtime_start'
				error_detected_timestamp = Number( new Date().getTime() ); 
				
				refresh_threshold = Number(runtime_start + min_error_refresh_time);
				
				console.log(' ');
				console.log('Refresh Alert: This app will attempt to fix the detected issue with an');
				console.log('app restart (no more than every ' + (min_error_refresh_time / 60000) + ' minutes, until the error clears up).');
				console.log(' ');
				
				// Reload, if we are within the minimum reload time window
				if ( error_detected_timestamp >= refresh_threshold ) {
				location.reload(true);
				}
			
			}
				 
		}
		// Bitstamp
		else if ( exchange == 'bitstamp' && msg["event"] == 'trade' ) {
				 
		market_id = msg["channel"].replace("live_trades_", "");
				 
		price_raw = msg["data"]["price"];
		
		// RE-SET volume_raw / base_volume AS UNDEFINED, as bitstamp provides no 24hr volume data
		
		var volume_raw;
		
		var base_volume;
				 
		}
		// Bitfinex
		else if ( exchange == 'bitfinex' && msg.length == 11 ) {
				 
		market_id = subscribe_msg[exchange]['pair'];
				 
		price_raw = msg[7];
				 
		volume_raw = msg[8];
		   
		base_volume = pair_volume('asset', price_raw, volume_raw);
				 
		}
		// OKex
		else if ( exchange == 'okex' && msg['data'] ) {
				 
		market_id = msg['data'][0]['instId'];
				 
		price_raw = msg['data'][0]['idxPx'];
		
		// RE-SET volume_raw / base_volume AS UNDEFINED, as okex provides no 24hr volume data
		
		var volume_raw;
		
		var base_volume;
				 
		}
		// Loopring
		else if ( exchange == 'loopring' && msg['data'] ) {
				 
		market_id = msg['data'][0];
				 
		price_raw = msg['data'][7];
		
		// RE-SET volume_raw / base_volume AS UNDEFINED, as loopring provides no 24hr volume data
		
		var volume_raw;
		
		var base_volume;
				 
		}
		// Gateio
		else if ( exchange == 'gateio' && msg['method'] == 'ticker.update' ) {
				 
		market_id = msg['params'][0];
				 
		price_raw = msg['params'][1]['last'];
		
		volume_raw = msg['params'][1]['baseVolume'];
		
		base_volume = pair_volume('pairing', price_raw, volume_raw);
				 
		}
		// Bitmart
		else if ( exchange == 'bitmart' && msg['table'] == 'spot/ticker' ) {
				 
		market_id = msg["data"][0]["symbol"];
				 
		price_raw = msg["data"][0]["last_price"];
				 
		volume_raw = msg["data"][0]["base_volume_24h"];
		   
		base_volume = pair_volume('pairing', price_raw, volume_raw);
				 
		}
	  
	    
	    // Nullify rendering under these circumstances (msg is not our data set)
	    if ( 
	    exchange == 'bitfinex' && msg[1] == 'hb' // Bitfinex
	    ) {
	    var market_id; // Set as UNDEFINED
	    }
	    
  
	   // Render (IF market_id is defined)
		if ( typeof market_id !== 'undefined' ) {
			 
		//console.log('asset = ' + asset);
		//console.log('pairing = ' + pairing);
		
		update_key = js_safe_key(market_id, exchange);
		
			// To assure appropriate ticker updated
			if ( typeof update_key !== 'undefined' ) {
			
			parsed_market_id = market_id_parser(market_id, exchange);
					 
			asset = parsed_market_id.asset;
			
			pairing = parsed_market_id.pairing;
			
			trade_side = trade_type(price_raw, market_id);
		 
			market_info = asset_symbols(pairing);
		 
			market_symbol = market_info['asset_symbol'];
			
			// Price decimals (none if >= 100, 2 if >= 1, 'max_ticker_decimals' if < 1 )
			price_decimals = ( price_raw >= 1 ? 0 : max_ticker_decimals );
			price_decimals = ( price_raw >= 100 ? 0 : price_decimals );
			
			price_max_dec = parseFloat(price_raw).toFixed(price_decimals); // Set max decimals
			price = parseFloat(price_max_dec); // Remove any trailing zeros in decimals
///////////////////////////////////////////////////////////////////////////
			// High decimals
			high_decimals = ( high_raw >= 1 ? 0 : max_ticker_decimals ); 
//			high_decimals = ( high_raw >= 100 ? 0 : high_decimals );
			high_max_dec = parseFloat(high_raw).toFixed(high_decimals); // Set max decimals
			high = parseFloat(high_max_dec); // Remove any trailing zeros in decimals 
			// Low decimals
			low_decimals = ( low_raw >= 1 ? 0 : max_ticker_decimals );
//			low_decimals = ( low_raw >= 100 ? 0 : low_decimals );
			low_max_dec = parseFloat(low_raw).toFixed(low_decimals); // Set max decimals
			low = parseFloat(low_max_dec); // Remove any trailing zeros in decimals
//			// Price Change Percent  decimals
			PCP_decimals = ( PCP_raw >= -50 ? 1 : max_ticker_decimals ); 
			PCP_decimals = ( PCP_raw >= 10 ? 0 : PCP_decimals );
			PCP_max_dec = parseFloat(PCP_raw).toFixed(PCP_decimals); // Set max decimals
			PCP = parseFloat(PCP_max_dec); // Remove any trailing zeros in decimals 
			// Price Change  decimals
			pricechange_decimals = ( pricechange_raw >= -10000 ? 0 : max_ticker_decimals );
			pricechange_decimals = ( pricechange_raw >= 100 ? 0 : pricechange_decimals );
			pricechange_max_dec = parseFloat(pricechange_raw).toFixed(pricechange_decimals); // Set max decimals
			pricechange = parseFloat(pricechange_max_dec); // Remove any trailing zeros in decimals
////////////////////////////////////////////////////				
			// HTML for rendering
			ticker_item =
				 "<div class='spacing'><div class='arrow_wrapper' style=''><span class='arrow " +
				 trade_side +
				 "'></span></div><span class='tick_text'>" + market_symbol +
				 number_commas(price, price_decimals) +
				 "</span></div>";
////////////////////////////////////////////////////////////////////////// 
			high_item = 
			 "<span class='spacing'>High: " + market_symbol +
			 number_commas(high, high_decimals) +
			 "</span>"; 

			low_item = 
			 "<span class='spacing'>&nbsp &nbsp &nbsp Low: " + market_symbol +
			 number_commas(low, low_decimals) +
			 "</span></div>"; 
//////////////////////////////////////////////////////////////////////////////////
                        PCP_item =
                         "<span class='spacing'>Change: " +
                        number_commas(PCP, PCP_decimals) + "%" +
                         "</span>";
			pricechange_item = 
			 "<span class='spacing'> &nbsp &nbsp &nbsp " + market_symbol +
			 number_commas(pricechange, pricechange_decimals) +
			 "</span></div>"; 

 
//////////////////////////////////////////////////////////////////////////////////				 
			
				// Volume logic
				if ( typeof base_volume !== 'undefined' ) {
					
				volume_decimals = ( market_info['asset_type'] == 'crypto' ? 4 : 0 );
				
				base_volume = Number(base_volume).toFixed(volume_decimals);
				
				volume_item = 
				 "<div class='spacing'>Vol: " + market_symbol +
				 number_commas(base_volume, volume_decimals) +
				 "</div>";
				
				}
				else {
					
					if ( hide_empty_volume == 'yes' ) {
					$("#volume_" + update_key).css({ "display": "none" });
					volume_item = "<div class='spacing'></div>";
					}
					else {
					volume_item = "<div class='spacing'>Vol: (not provided)</div>";
					}
					
				}
				 
				 
			// Render data to appropriate ticker
			
			$("#ticker_" + update_key).html(ticker_item);
			
			arrow_html(); // #MUST BE# AFTER TICKER RENDERING ABOVE
			$("#high_" + update_key).html(high_item);  //////////////////////////////////////
			$("#low_" + update_key).html(low_item); 
                        $("#PCP_" + update_key).html(PCP_item);
 			$("#pricechange_" + update_key).html(pricechange_item);  //////////////////////////////////////				
			$("#volume_" + update_key).html(volume_item);
				
				
				// If monospace emulation is properly enabled, run it
				if ( monospace_check() == true ) {
					
				monospace_rendering(document.querySelectorAll('#ticker_' + update_key)[0]);
/////////////////////////////////////////////////////////////
				monospace_rendering(document.querySelectorAll('#high_' + update_key)[0]);
				monospace_rendering(document.querySelectorAll('#low_' + update_key)[0]);
				monospace_rendering(document.querySelectorAll('#PCP_' + update_key)[0]);
				monospace_rendering(document.querySelectorAll('#pricechange_' + update_key)[0]);				
					if ( typeof base_volume !== 'undefined' ) {
					monospace_rendering(document.querySelectorAll('#volume_' + update_key)[0]);
					}
					 
				}
				
				
			}
			
		
		}
	   
	   
	};
   
   
	
	// When socket closes, reconnect ///////////////////////////////////////////////////
	sockets[exchange].onclose = function(e) {
		
	//console.log('Connecting', e.reason);
	   
		setTimeout(function() {
	   $(".status_" + exchange).text("Connecting").css("color", "red");
	   
	       if ( exchange == 'loopring' ) {
	           
	       api[exchange] = void 0; // RE-SET API PARAMS AS UNDEFINED
	       
	       loopring_config(); // GET A NEW TEMP KEY FROM LOOPRING'S REST API
	       
	           setTimeout(function() {
	           api_connect(exchange);
	           }, 10000); // WAIT 10 SECONDS FOR GETTING A NEW TEMP KEY
	       
	       }
	       else {
	       api_connect(exchange);
	       }
	       
		
	   }, 60000); // Reconnect after no data received for 1 minute
	   
	};
   
   
   
	// Socket error ///////////////////////////////////////////////////
	sockets[exchange].onerror = function(err) {
	$(".status_" + exchange).text("Error").css("color", "red");
	console.log('Socket encountered error: ', err.message, 'Closing socket');
	sockets[exchange].close();
	};
	
  
}


/////////////////////////////////////////////////////////////////////////////////////////////////////

