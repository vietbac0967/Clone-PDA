//Recent product

var cookieList = function(cookieName) {
	//When the cookie is saved the items will be a comma seperated string
	//So we will split the cookie by comma to get the original array
	var cookie = $.cookie(cookieName);
	//Load the items or a new array if null.
	var items = cookie ? cookie.split(/,/) : new Array();
	return {
		"add": function(val) {

			var i;
			var check = false;
			for (i = 0; i< items.length;i++){
				if(val == items[i]){
					check= true;
				}
			}
			if(check == false){
				items.push(val);
			}
			//Save the items to a cookie.
			//EDIT: Modified from linked answer by Nick see
			//      http://stackoverflow.com/questions/3387251/how-to-store-array-in-jquery-cookie
			$.cookie(cookieName, items.join(','));
		},
		"remove": function (index) { 
			//EDIT: Thx to Assef and luke for remove.

			items.splice(index, 1); 
			$.cookie(cookieName, items.join(','));        },
		"clear": function() {
			items = null;
			//clear the cookie.
			$.cookie(cookieName, null);
		},
		"items": function() {
			//Get all the items.
			return items;
		}
	}
}

function getProduct(alias) {
	Bizweb.getProduct(alias,function(product){

		
		if(product.available){
			if (product.price < 1){
				var price = '<span class="special-price"><span class="price product-price">Liên hệ </span></span> <!-- Hết hàng -->';
			}else{
				if (product.compare_at_price_max > product.price_min ){

					var price = '<span class="price"><span class="price product-price">'+  Bizweb.formatMoney(product.price_min, "{{amount_no_decimals_with_comma_separator}}₫" ) +'</span> </span> <!-- Giá Khuyến mại -->'
					+'<span class="old-price"><del class="sale-price" style=" font-size: 13px; ">'+ Bizweb.formatMoney(product.compare_at_price_max, "{{amount_no_decimals_with_comma_separator}}₫" ) +'</del> </span> <!-- Giá gốc -->';
				}else{
					var price = '<div class="special-price"><span class="price product-price">'+  Bizweb.formatMoney(product.price_min, "{{amount_no_decimals_with_comma_separator}}₫" ) +'</span> </div> <!-- Giá -->';
				}
			}
		}
		 else{
			 var price = ' <div class="special-price"><span class="price product-price">Hết hàng </span> </div> <!-- Hết hàng -->';
		 }
		 
		 if(product.images.length == 0){
			 var img = '<img src="//bizweb.dktcdn.net/thumb/medium/assets/themes_support/noimage.gif" alt="'+product.name+'">'
			 }else{
				 var img = '<img src="'+product.featured_image+'" alt="'+product.name+'">'
				 }
		  $(''
			+'<div class="product-mini-item clearfix">'
			+'<div class="product-img relative">'
			+'<a href="'+product.url+'">'
			+ img
			+'</a>'
			+'</div>'
			+'<div class="product-info">'
			+'<h3><a href="'+product.url+'" title="" class="product-name">'+product.name+'</a></h3>'
			+'<div class="price-box">'
			+price+
			+'</div></div></div>').appendTo('#recent-content');
		 })
		}
		var list = new cookieList("MyItems");
		list.add(alias);
		//list.items();
		//list.remove(0);
		var i;
		var limit = list.items().length;
		if(limit > getLimit){
			var fmit = limit - getLimit;
			
			var r;
			for(r = 0;r < fmit; r++ ){

				list.remove(r);
			}
		}
		for(i = limit-1;i >= 0; i-- ){
			
			getProduct(list.items()[i]);
			

		}