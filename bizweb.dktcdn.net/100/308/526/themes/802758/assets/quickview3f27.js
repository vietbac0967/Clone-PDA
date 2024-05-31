function setButtonNavQuickview() {
	$("#quickview-nav-button a").hide(), $("#quickview-nav-button a").attr("data-index", "");
	var i = $(currentLinkQuickView).closest(".slide").find("a.quick-view");
	if (i.length > 0) {
		for (var e = 0, t = 0; t < i.length; t++) if ($(i[t]).data("handle") == $(currentLinkQuickView).data("handle")) {
			e = t;
			break;
		}
		e < i.length - 1 && ($("#quickview-nav-button .btn-next-product").show(), $("#quickview-nav-button .btn-next-product").attr("data-index", e + 1)), 
			e > 0 && ($("#quickview-nav-button .btn-previous-product").show(), $("#quickview-nav-button .btn-previous-product").attr("data-index", e - 1));
	}
	$("#quickview-nav-button a").click(function() {
		$("#quickview-nav-button a").hide();
		var i = parseInt($(this).data("index"));
		if (!isNaN(i) && i >= 0) {
			var e = $(currentLinkQuickView).closest(".slide").find("a.quick-view");
			e.length > 0 && i < e.length && $(e[i]).trigger("click");
		}
	});
}
function initQuickView() {
	$(document).on("click", "#thumblist_quickview li", function() {
		changeImageQuickView($(this).find("img:first-child"), ".product-featured-image-quickview"), 
			$(this).parent().parent().find("li").removeClass("active"), $(this).addClass("active");
	}), $(document).on("click", ".quick-view", function(i) {
		$('.quantity_wanted_p').show();
		$('#quick-view-product form').show();
		if ($(".tooltip").remove(), $(window).width() > 1025) {
			i.preventDefault();
			var e = $(this).data("handle");
			currentLinkQuickView = $(this), Bizweb.getProduct(e, function(i) {
				var e = $("#quickview-modal").html();
				$(".quick-view-product").html(e);
				var t = $(".quick-view-product");
				if (null != i.summary && "" != i.summary) var a = i.summary; else if (null != i.content) var a = i.content.replace(/(<([^>]+)>)/gi, ""); else var a = "";
				var n = i.featured_image;
				null == n && (n = "http://bizweb.dktcdn.net/thumb/grande/assets/themes_support/noimage.gif"), 
					setButtonNavQuickview(), a = a.split(" ").splice(0, 60).join(" ") + "...", null != n && t.find(".view_full_size img").attr("src", n), 
					i.price < 1 && i.variants.length < 2 ? (t.find(".price").html("Liên hệ"), t.find("del").html(""), 
															t.find("#quick-view-product form").hide(), t.find(".prices").html('<span class="price h2">Liên hệ</span>'), 
															t.find(".add_to_cart_detail span").html("Liên hệ"), t.find("form").addClass("hidden")) : (t.find("#quick-view-product form").show(), 
																																					  t.find(".price").html(Bizweb.formatMoney(i.price, "{{amount_no_decimals_with_comma_separator}}₫"))),
				t.find(".product-item").attr("id", "product-" + i.id), t.find(".qv-link").attr("href", i.url), 
					t.find(".variants").attr("id", "product-actions-" + i.id), t.find(".variants select").attr("id", "product-select-" + i.id),
					
					t.find(".qwp-name").text(i.name), t.find(".qwp-name").attr("href", i.url), t.find(".review .shopify-product-reviews-badge").attr("data-id", i.id), 
					i.vendor ? t.find(".brand").append("<b>Nhãn hiệu: </b>" + i.vendor) : t.find(".brand").append("<b>Nhãn hiệu: </b>Không có"), 
					i.available ? "bizweb" == i.variants[0].inventory_management ? t.find(".inventory_quantity").text("Còn " + i.variants[0].inventory_quantity + " sản phẩm") : t.find(".inventory_quantity").text("Còn hàng") : t.find(".inventory_quantity").text("Hết hàng"), 
					i.variants[0].sku ? t.find(".masp").text(i.variants[0].sku) : t.find(".masp").text("Chưa cập nhật"), 
					t.find(".product-description").html(a), t.find(".product-description").append('<a href="' + i.url + '" class="view-more">Xem chi tiết</a>');

					
					if(i.vendor !="" && i.vendor != null){
						$('#quick-view-product .vendor').text(i.vendor);
					}else{
						$('#quick-view-product .vendor').text("Chưa cập nhật");
					}

i.compare_at_price_max > i.price ? (t.find(".old-price").html(Bizweb.formatMoney(i.compare_at_price_max, "{{amount_no_decimals_with_comma_separator}}₫")).show(), 
									
									t.find(".price").addClass("sale-price")) : (t.find(".old-price").html(""), t.find(".price").removeClass("sale-price")), 
	i.available ? (quickViewVariantsSwatch(i, t), i.variants.length > 1 ? $("#quick-view-product form").show() : i.price < 1 ? $("#quick-view-product form").hide() : $("#quick-view-product form").show()) : (quickViewVariantsSwatch(i, t), 
						t.find(".add_to_cart_detail").text("Liên hệ").addClass("disabled").attr("disabled", "disabled"), 
						i.variants.length > 1 ? t.find("select, .dec, .inc, .variants label").show() : t.find("select, .dec, .inc, .variants label").hide()), 
	t.find(".more_info_block .page-product-heading li:first, .more_info_block .tab-content section:first").addClass("active"), 
	$("#quick-view-product").modal(), $(".view_scroll_spacer").removeClass("hidden"), 
	loadQuickViewSlider(i, t), $(".quick-view").fadeIn(500), $(".quick-view .total-price").length > 0 && $(".quick-view input[name=quantity]").on("change", updatePricingQuickView), 
	updatePricingQuickView(), $(".js-qty__adjust").on("click", function() {
	var i = $(this), e = (i.data("id"), i.siblings(".js-qty__num")), t = parseInt(e.val().replace(/\D/g, "")), t = validateQty(t);
	i.hasClass("js-qty__adjust--plus") ? t += 1 : (t -= 1, 1 >= t && (t = 1)), e.val(t), 
		updatePricingQuickView();
}), $(".js-qty__num").on("change", function() {
	updatePricingQuickView();
});
});
				var t = document.querySelector(".quantity_wanted_p input");
				return t.addEventListener("input", function() {
					var i = this.value.match(/^\d+$/);
					null === i && (this.value = ""), 0 == i && (this.value = 1);
				}, !1), !1;
			}
			})
		}

		function loadQuickViewSlider(e, t) {

			productImage();
			var a = $(".loading-imgquickview"), n = Bizweb.resizeImage(e.featured_image, "grande");

			if(e.images.length == 0){
				$(".more-view-wrapper ul").html("");

			}
			if(e.images.length == 1){

				$(".more-view-wrapper ul").html("");
			}
			if (t.find(".quickview-featured-image").append('<a href="' + e.url + '"><img src="' + n + '" title="' + e.title + '"/><div style="height: 100%; width: 100%; top:0; left:0 z-index: 2000; position: absolute; display: none; background: url(' + window.loading_url + ') 50% 50% no-repeat;"></div></a>'), 
				e.images.length > 1) {

				var r = t.find(".more-view-wrapper ul");
				r.html("");
				for (i in e.images) {
					var o = e.images[i], d = (Bizweb.resizeImage(e.images[i], "compact"), 
											  '<li data-image="' + o + '" data-index="'+i+'"><a href="javascript:void(0)" data-imageid="' + e.id + '"" data-zoom-image="' + o + '" ><img src="' + o + '" alt="Proimage" /></a></li>');
					r.append(d);
				}

				r.owlCarousel({
					nav:false,
					animateOut: 'fadeOut',
					mouseDrag:true,
					dots:false,
					navText: [ "<i class='fa fa-angle-right'></i>", "<i class='fa fa-angle-left'></i>" ],
					items: 4,
					margin: 10,
					itemsDesktop: [ 1199, 4 ],
					itemsDesktopSmall: [ 979, 4 ],
					itemsTablet: [ 768, 1 ],
					itemsTabletSmall: [ 540, 1 ],
					itemsMobile: [ 360, 1 ]
				}).css("visibility", "visible");
				r.on('changed.owl.carousel', function(event) {
					setTimeout(function(e){				
						$('#quick-view-product .swatch .swatch-element.color input').removeAttr('checked');
						var src = $('#thumblist_quickview .owl-item.active li a').attr('data-zoom-image');

						$('#quick-view-product .swatch .swatch-element.color').each(function(e){
							var src_v = $(this).attr('data-image');

							if (src == src_v){

								$(this).find('input').prop("checked", true);

							}
						})
					},300);
				})
			} else t.find(".quickview-more-views").remove(), t.find(".quickview-more-view-wrapper-jcarousel").remove();
		}

		function quickViewVariantsSwatch(t, quickview) {	


			var v = '<input type="hidden" name="id" value="' + t.id + '">';
			quickview.find("form.variants").append(v);
			if (t.variants.length > 1) {	
				
				for (var r = 0; r < t.variants.length; r++) {					
					var i = t.variants[r];
					if(t.variants[r].available && t.variants[r].price != 0){
						var s = '<option selected="selected"  value="' + i.id + '">' + i.title + "</option>";
					}else{
						var s = '<option value="' + i.id + '">' + i.title + "</option>";
					}
					
					quickview.find("form.variants > select").append(s)
				}


				

				var options="";
				for (var i = 0; i < t.options.length; i++) {
					options += '<div class="swatch clearfix" data-option-index="' + i + '">';
					options += '<div class="header">' + t.options[i].name + ': </div>';

					var is_color = false;
					if (/Color|Colour|Màu/i.test(t.options[i].name)) {
						is_color = true;
					}
					var optionValues = new Array();
					for (var j = 0; j < t.variants.length; j++) {
						var variant = t.variants[j];
						var value = variant.options[i];


						var valueHandle = awe_convertVietnamese(value);

						var forText = 'swatch-' + i + '-' + valueHandle;
						if (optionValues.indexOf(value) < 0) {
							//not yet inserted		
							
							if(variant.featured_image != null){
								options += '<div data-image="'+variant.featured_image.src+'" data-value="' + value + '" class="swatch-element ' + (is_color ? "color " : " ") + valueHandle + (variant.available ? ' available ' : ' soldout ') + '">';
							}else{
								options += '<div  data-value="' + value + '" class="swatch-element ' + (is_color ? "color " : " ") + valueHandle + (variant.available ? ' available ' : ' soldout ') + '">';
							}


							if (is_color) {
								options += '<div class="tooltip">' + value + '</div>';
							}
							options += '<input id="' + forText + '" type="radio" name="option-' + i + '" value="' + value + '" ' + (j == 0 ? ' checked ' : '') + (variant.available ? '' : '') + ' />';
							if(variant.featured_image != null){
								if (is_color) {
									options += '<label for="' + forText + '" class="'+valueHandle+'" style="background-color: ' + valueHandle + ';background-image:url('+variant.featured_image.src+');background-size: 50px 50px;"></label>';
								} else {
									options += '<label for="' + forText + '">' + value + '</label>';
								}
							}else{

								if (is_color) {
									options += '<label for="' + forText + '" class="'+valueHandle+'" style="background-color: ' + valueHandle + ';background-size: 50px 50px;"></label>';
								} else {
									options += '<label for="' + forText + '">' + value + '</label>';
								}

							}

							options += '</div>';

							if (variant.available) {
								//$('#quick-view-product .swatch[data-option-index="' + i + '"] .' + valueHandle).removeClass('soldout').addClass('available').find(':radio').removeAttr('disabled');
							}
							optionValues.push(value);
						}
					}
					options += '</div>';
				}

				quickview.find('form.variants > select').after(options);
				var chon = [];
				var qmoney = [];
				var qimage = [];
				var qid = [];
				quickview.find('.swatch :radio').change(function() {
					var optionIndex = $(this).closest('.swatch').attr('data-option-index');
					var optionValue = $(this).val();
					$(this)
						.closest('form')
						.find('.single-option-selector')
						.eq(optionIndex)
						.val(optionValue)
						.trigger('change');

					var variant_id = $('.quickview-product select[name=id]').val();

					var check = false;
					for (var i = 0; i < qid.length; i++){
						if (qid[i] == variant_id){                            
							var quantity = parseInt($('.quickview-product input[name=quantity]').val());
							var totalPrice = qmoney[i] * quantity;
							var gia = Bizweb.formatMoney(qmoney[i], window.money_format); 
							var totalPriceText = Bizweb.formatMoney(totalPrice, window.money_format);             

							var totalPriceHtml = $('.quickview-product .price').html();


							$('.quickview-product .total-price span').html(totalPriceText);
							$('.quickview-product .price').html(gia);
							currency();

							if(qimage[i]){
								$('.quickview-product .featured-image img').attr('src',qimage[i]);
							}


						}
					}
					for (var i = 0; i < chon.length; i++){


						if (chon[i] == variant_id){             
							var check = true;
						}                       
						else{
						}
					}

					if(check == true){
						$('.quickview-product .btn-addToCart').attr('disabled','disabled');

						$(".quickview-product .btn-addToCart").removeAttr("disabled");
					}

				});

				quickview.find("form.variants .selector-wrapper label").each(function(n, r) {
					$(this).html(t.options[n].name)
				})
				
				var ps = "product-select-" + t.id;
				new Bizweb.OptionSelectors( ps, { 
					product: t, 
					onVariantSelected: selectCallbackQuickView
				});

				if (t.options.length == 1) {

					quickview.find(".selector-wrapper:eq(0)").prepend("<label>" + t.options[0].name + "</label>")
				}
			}
			else {
				quickview.find("form.variants > select").remove();
				var q = '<input type="hidden" name="variantId" value="' + t.variants[0].id + '">';
				quickview.find("form.variants").append(q);
			}
		}

		function productImage() {
			$("#thumblist").owlCarousel({
				navigation: !0,
				items: 4,
				itemsDesktop: [ 1199, 4 ],
				itemsDesktopSmall: [ 979, 4 ],
				itemsTablet: [ 768, 4 ],
				itemsTabletSmall: [ 540, 4 ],
				itemsMobile: [ 360, 4 ]
			}), $.prototype.fancybox && $("li:visible .fancybox, .fancybox.shown").fancybox({
				hideOnContentClick: !0,
				openEffect: "elastic",
				closeEffect: "elastic"
			});
		}
		function updatePricingQuickView() {}

		function validate(i) {
			var e = i || window.event, t = e.keyCode || e.which;
			t = String.fromCharCode(t);
			var a = /[0-9]|\./;
			a.test(t) || (e.returnValue = !1, e.preventDefault && e.preventDefault());
		}

		initQuickView();

		var product = {}, currentLinkQuickView = "", option1 = "", option2 = "";

		$(document).on("click", ".quickview-close, #quick-view-product .quickview-overlay, .fancybox-overlay", function(i) {
			$("#quick-view-product").fadeOut(0), awe_hidePopup(".loading"), $("#quick-view-product").modal("hide");
		});
		$(document).on("click", ".add_to_cart_detail", function(i) {
			i.preventDefault(), $("#quick-view-product").modal("hide");
			var e = $(this), t = e.parents("form");
			$.ajax({
				type: "POST",
				url: "/cart/add.js",
				async: !1,
				data: t.serialize(),
				dataType: "json",
				error: addToCartFail,
				beforeSend: function() {},
				success: addToCartSuccess,
				cache: !1
			});
		});