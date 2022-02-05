
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
key = key.replace(":", "-"); // So we only have to regex a hyphen
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


function arrow_html() {

arrow_height = Math.round(ticker_size * arrow_size);
arrow_width = Math.round(arrow_height * 0.84);
arrow_border_width = Math.round(arrow_width / 2);
	
// Arrow height
$("div.arrow_wrapper").css({ "height": arrow_height + "px" });
$("span.buy").css({ "border-bottom": arrow_height + "px solid rgb(105, 199, 115)" });
$("span.sell").css({ "border-top": arrow_height + "px solid rgb(199, 105, 105)" });

// Arrow width
$("div.arrow_wrapper").css({ "width": arrow_width + "px" });
$("span.arrow").css({ "border-left": arrow_border_width + "px solid transparent" });
$("span.arrow").css({ "border-right": arrow_border_width + "px solid transparent" });

}


/////////////////////////////////////////////////////////////////////////////////////////////////////


function valid_endpoint(exchange) {

	// Skip, if no endpoint or markets are set for this exchange
	if ( typeof api[exchange] == 'undefined' || api[exchange].trim() == '' ) {
	console.log(exchange + ' endpoint not defined, removing it\'s market config...');
	markets[exchange] = '';
	return false;
	}
	else {
	return true;
	}

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


function render_names(name) {
	
render = name.charAt(0).toUpperCase() + name.slice(1);

render = render.replace(/usd/gi, "USD");
render = render.replace(/eur/gi, "EUR");
render = render.replace(/gbp/gi, "GBP");
render = render.replace(/btc/gi, "BTC");
render = render.replace(/eth/gi, "ETH");
render = render.replace(/sol/gi, "SOL");
render = render.replace(/nft/gi, "NFT");
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
render = render.replace(/loopring/gi, "LRing");
render = render.replace(/amm/gi, "AMM");
render = render.replace(/ico/gi, "ICO");
render = render.replace(/erc20/gi, "ERC-20");
render = render.replace(/okex/gi, "OKex");
render = render.replace(/mart/gi, "Mart");
render = render.replace(/ftx/gi, "FTX");
render = render.replace(/gateio/gi, "Gate.io");
render = render.replace(/coingecko/gi, "CGecko");

return render;

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


function ticker_html(market_id, exchange) {
	
parsed_market_id = market_id_parser(market_id, exchange);
				 
asset = parsed_market_id.asset;
////////////////////////////////////////////////////////////////////////////
assetname = asset;

if ( assetname == "ETH" ) {
assetname = "Ethereum ETH";
}

if ( assetname == "BTC" ) {
assetname = "Bitcoin BTC";
}
//////////////////////////////////////////////////////////////////////		
pairing = parsed_market_id.pairing;
  
market_key = js_safe_key(market_id, exchange);

	
	// To assure appropriate ticker updated
	if ( typeof market_key !== 'undefined' ) {

	html = '<div id="wrapper_' + market_key + '" class="asset_tickers">'+
    
	'<div class="title" style="font-size: '+title_size+'px; font-weight: '+font_weight+';"><span id="asset_' + market_key + '">' + asset + '</span> <span class="status_wrapper_'+exchange+'"><span class="parenth_'+market_key+'">(<span class="status status_'+exchange+' status_'+market_key+'">Loading</span>)</span></span></div>'+
	
	'<div class="ticker" style="font-size: '+ticker_size+'px; font-weight: '+font_weight+';" id="ticker_' + market_key + '"></div>'+
 ////////////////////////////////////////////
	'<div class="high" style="font-size: '+volume_size+'px; color: #16f30c; font-weight: '+font_weight+';"><span id="high_' + market_key + '"></span>'+
	'<span class="low" style="font-size: '+volume_size+'px; color: #f3160c; font-weight: '+font_weight+';" id="low_' + market_key + '"</span></div>'+
  '<div class="PCP" style="font-size: '+volume_size+'px; color: #0cefc3; font-weight: '+font_weight+';"><span id="PCP_' + market_key + '"></span>'+
	'<span class="pricechange" style="font-size: '+volume_size+'px; color: #6133FF; font-weight: '+font_weight+';" id="pricechange_' + market_key + '"</span></div>'+
  '<span class="openprice" style="font-size: '+volume_size+'px; color: #FFB600; font-weight: '+font_weight+';" id="openprice_' + market_key + '"</span></div>'+
//////////////////////////////////////////   
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


// https://gist.github.com/jiggzson/b5f489af9ad931e3d186
var scientificToDecimal = function (num) {
    var nsign = Math.sign(num);
    //remove the sign
    num = Math.abs(num);
    //if the number is in scientific notation remove it
    if (/\d+\.?\d*e[\+\-]*\d+/i.test(num)) {
        var zero = '0',
                parts = String(num).toLowerCase().split('e'), //split into coeff and exponent
                e = parts.pop(), //store the exponential part
                l = Math.abs(e), //get the number of zeros
                sign = e / l,
                coeff_array = parts[0].split('.');
        if (sign === -1) {
            l = l - coeff_array[0].length;
            if (l < 0) {
              num = coeff_array[0].slice(0, l) + '.' + coeff_array[0].slice(l) + (coeff_array.length === 2 ? coeff_array[1] : '');
            } 
            else {
              num = zero + '.' + new Array(l + 1).join(zero) + coeff_array.join('');
            }
        } 
        else {
            var dec = coeff_array[1];
            if (dec)
                l = l - dec.length;
            if (l < 0) {
              num = coeff_array[0] + dec.slice(0, l) + '.' + dec.slice(l);
            } else {
              num = coeff_array.join('') + new Array(l + 1).join(zero);
            }
        }
    }

    return nsign < 0 ? '-'+num : num;
};


/////////////////////////////////////////////////////////////////////////////////////////////////////


function reload_check() {


                // Reload IS queued
                if ( reload_queued == true ) {
                    
                console.log('App reload countdown started...');
                    
                // Set reload_countdown with config.js value 
                // (we don't want to use directly and overwrite user settings during countdown)
    			reload_countdown = app_reload_wait; 
    			
                	window.reload_logic = setInterval(function () {
                	
                	        // Cancel any running reload countdown logic (internet back offline, etc)
                	        if ( is_online == false ) {
		                    clearInterval(window.reload_logic); 
                            reload_countdown = -1; // Reset to default
                            console.log('App reload canceled.');
                	        return;
                	        }
                	        
            				
            				if ( reload_countdown > 0 ) {
                            $("#internet_alert").html("Internet back online, reloading...<br />(in " + reload_countdown + " seconds)").css("color", "#FFFF00");
            				}
            				else if ( reload_countdown === 0 ) {
                            reload_queued = false; // Just for clean / readable code's sake
                 		    location.reload(true); // Full reload (NOT from cache)
            				}
                
                 	reload_countdown-- || clearInterval(reload_countdown);  // Clear if 0 reached
                 
                 	}, 1000);
                   
                }
                // Reload NOT queued
                else {
                    
                    // Cancel any running reload countdown logic (internet back offline, etc)
            		if ( window.reload_logic ) {
            		clearInterval(window.reload_logic); 
            		}

                reload_countdown = -1; // Reset to default
                console.log('App reload canceled.');
                return;
                
                }


}


/////////////////////////////////////////////////////////////////////////////////////////////////////


function render_interface() {

console.log('render_interface'); // DEBUGGING


    // If we already setup the market configs
    if ( Object.keys(markets).length > 0 ) {
    console.log('market_config was already setup, skipping.');
    }
    // If offline
    else if ( is_online == false ) {
    reload_queued = true;
    console.log('No internet connection, interface rendering stopped...');
    $("#internet_alert").css({ "display": "block" });
    $("#internet_alert").text("Internet Offline!").css("color", "#fc4e4e"); 
    return;
    }
    // Wait for market_config()
    else if ( market_config() == 'wait' ) {
    console.log('Waiting for market_config to complete processing...');
    setTimeout(render_interface, 1000); // Wait 1000 millisecnds then recheck
    return;
    }
    
        
	// Connect to exchange APIs for market data
	// Render the HTML containers for each ticker
	Object.keys(markets).forEach(function(exchange) {
                
		
			if ( markets[exchange] != '' ) {
                
    			if ( exchange == 'coingecko' ) {
    		    rest_connect(exchange);
    		    }
    		    else {
    		    websocket_connect(exchange);
    		    }
			
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


/////////////////////////////////////////////////////////////////////////////////////////////////////


function update_ticker(update_key, market_id, asset, pairing, price_raw, base_volume, exchange=false) {
				 
price_raw = scientificToDecimal(price_raw); // Convert scientific format to string (decimal), if needed

   
   // Show or hide exchange / api status
   if ( exchange != false ) {
	
	   // Using ".status_" + update_key INSTEAD, TO SHOW PER-ASSET 
       if ( price_raw == 0 ) {
       $(".parenth_" + update_key).css({ "display": "inline" });
       $(".status_" + update_key).text("Loading").css("color", "#FFFF00");
       return;
       }
       else if ( show_exchange_name == 'off' ) {
       $(".parenth_" + update_key).css({ "display": "none" });
       }
       else if ( price_raw >= 0.00000001 ) {
       $(".parenth_" + update_key).css({ "display": "inline" });
       $(".status_" + update_key).text( render_names(exchange) ).css("color", "#2bbf7b");
       }
       
   
   }
                       
            		
trade_side = trade_type(price_raw, market_id);
        		 
market_info = asset_symbols(pairing);
        		 
market_symbol = market_info['asset_symbol'];
        			
// Price decimals (none if >= 100, 2 if >= 1, 'max_ticker_decimals' if < 1 )
price_decimals = ( price_raw >= 1 ? 0 : max_ticker_decimals );  /////////////////////////////////////////////////////////
price_decimals = ( price_raw >= 100 ? 0 : price_decimals );
        			
// If MINIMUM decimals IS set, and 'price_decimals' is smaller, force decimals to 'min_ticker_decimals'
price_decimals = ( min_ticker_decimals > price_decimals ? min_ticker_decimals : price_decimals );
        			
price_max_dec = parseFloat(price_raw).toFixed(price_decimals); // Set max decimals
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
			PCP_decimals = ( PCP_raw >= -50 ? 0 : max_ticker_decimals );
			PCP_decimals = ( PCP_raw >= -10 ? 1 : PCP_decimals );
			PCP_decimals = ( PCP_raw >= 10 ? 0 : PCP_decimals );
			PCP_max_dec = parseFloat(PCP_raw).toFixed(PCP_decimals); // Set max decimals
			PCP = parseFloat(PCP_max_dec); // Remove any trailing zeros in decimals 
			// Price Change  decimals
			pricechange_decimals = ( pricechange_raw >= -10000 ? 0 : max_ticker_decimals );
			pricechange_decimals = ( pricechange_raw >= 100 ? 0 : pricechange_decimals );
			pricechange_max_dec = parseFloat(pricechange_raw).toFixed(pricechange_decimals); // Set max decimals
			pricechange = parseFloat(pricechange_max_dec); // Remove any trailing zeros in decimals
                        // Openprice decimals
                        openprice_decimals = ( openprice_raw >= 1 ? 0 : max_ticker_decimals );
//                      openprice_decimals = ( openprice_raw >= 100 ? 0 : openprice_decimals );
                        openprice_max_dec = parseFloat(openprice_raw).toFixed(openprice_decimals); // Set max decimals
                        openprice = parseFloat(openprice_max_dec); // Remove any trailing zeros in decimals

				////////////////////////////////////////////////////				        			
        			
     // If MINIMUM decimals NOT set, remove any trailing zeros in decimals
     if ( min_ticker_decimals == 0 ) {
     price = parseFloat(price_max_dec);
     }
     else {
     price = price_max_dec;
     }
        			   
        				
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

      PCP_item =
       "<span class='spacing'>Change: " +
       number_commas(PCP, PCP_decimals) + "%" +
       "</span>";
			
      pricechange_item = 
			 "<span class='spacing'> &nbsp &nbsp &nbsp " + market_symbol +
			 number_commas(pricechange, pricechange_decimals) +
			 "</span></div>"; 
                        openprice_item =
                         "<span class='spacing'>Close: " + market_symbol +
                         number_commas(openprice, openprice_decimals) +
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
        					
        if ( show_empty_volume == 'on' ) {
        volume_item = "<div class='spacing'>Vol: (not provided)</div>";
        }
        else {
        $("#volume_" + update_key).css({ "display": "none" });
        volume_item = "<div class='spacing'></div>";
        }
        					
     }
        				 
        				 
// Render data to appropriate ticker
        			
$("#ticker_" + update_key).html(ticker_item);
        			
arrow_html(); // #MUST BE# AFTER TICKER RENDERING ABOVE
  
 	  //////////////////////////////////////////////////////////////
  $("#high_" + update_key).html(high_item);  
	$("#low_" + update_key).html(low_item); 
  $("#PCP_" + update_key).html(PCP_item);
 	$("#pricechange_" + update_key).html(pricechange_item);  
	$("#openprice_" + update_key).html(openprice_item);  
  //////////////////////////////////////////////////////////////////	  
  
$("#volume_" + update_key).html(volume_item);
        				
        				
     // If monospace emulation is properly enabled, run it
     if ( monospace_check() == true ) {
        					
     monospace_rendering(document.querySelectorAll('#ticker_' + update_key)[0]);
       
 /////////////////////////////////////////////////////////////
				monospace_rendering(document.querySelectorAll('#high_' + update_key)[0]);
				monospace_rendering(document.querySelectorAll('#low_' + update_key)[0]);
				monospace_rendering(document.querySelectorAll('#PCP_' + update_key)[0]);
				monospace_rendering(document.querySelectorAll('#pricechange_' + update_key)[0]);
				monospace_rendering(document.querySelectorAll('#openprice_' + update_key)[0]);
 ////////////////////////////////////////////////////////////////
       
        if ( typeof base_volume !== 'undefined' ) {
        monospace_rendering(document.querySelectorAll('#volume_' + update_key)[0]);
        }
        					 
     }


}


/////////////////////////////////////////////////////////////////////////////////////////////////////

