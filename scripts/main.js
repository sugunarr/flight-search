(function(){
	var obj = {
		"oneWay": [{
			"id": "0",
			"depCity": "Pune",
			"arrCity": "Delhi",
			"price": "8700.00",
			"flightCode": "AI-101",
			"depShort": "PNQ",
			"arrShort": "DEL",
			"depTime": "10.00 AM",
			"arrTime": "12.00 PM",
			"depDate": "01-01-2012",
			"flightImg": "img/pic_3.jpg",
			"return": {
				"id": "0.0",
				"flightCode": "AI-103",
				"price": "9800.00",
				"arrDate": "10-01-2012",
				"depTime": "01.00 PM",
				"arrTime": "04.00 PM"
			}
		},
		{
			"id": "1",
			"depCity": "Pune",
			"arrCity": "Delhi",
			"price": "9000.00",
			"flightCode": "AI-201",
			"depShort": "PNQ",
			"arrShort": "DEL",
			"depTime": "02.00 PM",
			"arrTime": "04.00 PM",
			"depDate": "01-01-2012",
			"flightImg": "img/pic_3.jpg",
			"return": {
				"id": "0.1",
				"flightCode": "AI-203",
				"price": "9200.00",
				"arrDate": "11-01-2012",
				"depTime": "03.00 PM",
				"arrTime": "06.00 PM"
			}
		},
		{
			"id": "2",
			"depCity": "Pune",
			"arrCity": "Delhi",
			"price": "8900.00",
			"flightCode": "AI-303",
			"depShort": "PNQ",
			"arrShort": "DEL",
			"depTime": "9.00 AM",
			"arrTime": "11.00 AM",
			"depDate": "01-01-2012",
			"flightImg": "img/pic_3.jpg",
			"return": {
				"id": "0.2",
				"flightCode": "AI-305",
				"price": "9200.00",
				"arrDate": "10-01-2012",
				"depTime": "01.00 PM",
				"arrTime": "04.00 PM"
			}
		},
		{
			"id": "3",
			"depCity": "Mumbai",
			"arrCity": "Delhi",
			"price": "9600.00",
			"flightCode": "AI-102",
			"depShort": "CSTM",
			"arrShort": "DEL",
			"depTime": "11.00 AM",
			"arrTime": "1.00 PM",
			"depDate": "01-01-2012",
			"flightImg": "img/pic_3.jpg",
			"return": {
				"id": "0.3",
				"flightCode": "AI-103",
				"price": "9800.00",
				"arrDate": "12-01-2012",
				"depTime": "01.00 PM",
				"arrTime": "04.00 PM"
			}
		}]

		}

		
	obj.oneWay.sort(function(a, b) {
	    return parseFloat(a.price) - parseFloat(b.price);
	});

	/* Tab select - 
	* Tab displays form based on the selection,
	* Tab updates contents based on the data provdided [Content-header, Depart time, Arrive time]
	*/

	$(".tab-title").on('click', function(){
		$(".tab-title").removeClass('active');
		$(this).addClass('active');

		var getAttrVal = $(this).data('attr');
		$(".tab-content").removeClass('form-visible').hide();
		$(".tab-content[data-attr='"+ getAttrVal +"']").addClass('form-visible').addClass('form-visible').show();

		var visibleForm = $('form:visible').attr('id');
		var hiddenForm = $('form:hidden').attr('id');
		var depCity = $('#'+ hiddenForm +'  #orgCity').val();
		var destCity = $('#'+ hiddenForm +'  #destCity').val();
		var departureDate = $('#'+ hiddenForm +'  #depDate').val();

		if($('form input[type="text"]').val() != ''){
			$('#'+ visibleForm +'  #orgCity').val(depCity);
			$('#'+ visibleForm +'  #destCity').val(destCity);
			$('#'+ visibleForm +'  #depDate').val(departureDate);
			$('form:visible').submit();
		}
		else if($('form:visible input[type="text"]').val() == '' && $('form:hidden input[type="text"]').val() != ''){
			$('#'+ visibleForm +'  #orgCity').val(depCity);
			$('#'+ visibleForm +'  #destCity').val(destCity);
			$('#'+ visibleForm +'  #depDate').val(departureDate);
			$('form:visible').submit();
		}

		if($(".tab-title[data-attr='tabReturn']").hasClass('active')){
			$(".arr-date, .return-details, .headerReturn").show();
			$(".headerOneWay").hide();
		}else{
			$(".arr-date, .return-details, .headerReturn").hide();
			$(".headerOneWay").show();
		}
	});
	
    //Price Filter
    var contentPrice = '';

	/* On Form Submits,
	* Update the Titles - Departure City, Arrival City
	* Verify the form as oneWay or return
	* Display records accordingly
	* Price filter gets updated
	*/	

	$('form').on('submit', function(e){
		e.preventDefault();
		$('.startSearchDisplay').hide();
		$('.searchResults, .refineSearch').show();
		var depCity = $(this).find('#orgCity').val();
		var destCity = $(this).find('#destCity').val();
		var departureDate = $(this).find('#depDate').val();
		var returnDate = $(this).find('#retDate').val();
		var content = '';
		var size = 0;
		var noContent = '<div class="tripDetails no-flight row text-center">There are no flights</div>';
		depCity = depCity.toLowerCase().replace(/\b[a-z]/g, function(letter) {
		    return letter.toUpperCase();
		});
		destCity = destCity.toLowerCase().replace(/\b[a-z]/g, function(letter) {
		    return letter.toUpperCase();
		});

		$('.title-depCity').text(depCity);
		$('.title-arrCity').text(destCity);
		$('.dep-date span').text(departureDate);
		$('.arr-date span').text(returnDate);
		var priceOneWay= [];
		var priceReturn= [];
	
		for(var i=0;i<obj.oneWay.length;i++){
			if($(this).attr('id') == "returnSearch"){
				if(depCity != obj.oneWay[i].depCity || destCity != obj.oneWay[i].arrCity || departureDate != obj.oneWay[i].depDate || returnDate != obj.oneWay[i].return.arrDate){
					if(size == 0){
						$('.tripDisplay').empty().append(noContent);
					}
				}
				else{
					if(returnDate == obj.oneWay[i].return.arrDate){
						priceReturn.push(obj.oneWay[i].return.price);
						priceReturn.sort(function(a, b) {
						    return parseFloat(a) - parseFloat(b);
						});
						content += '<div class="tripDetails row" data-price="'+ obj.oneWay[i].return.price +'"><div class="col-10 f-left"><h3 class="price">Rs. <span class="price-text">'+ obj.oneWay[i].return.price +'</span></h3><div class="oneWay-details col-6 f-left"><span class="flightCode">'+ obj.oneWay[i].flightCode +'</span><div class="flightDetails"><span class="arrShortTerm">'+ obj.oneWay[i].arrShort +'</span> > <span class="depShortTerm">'+ obj.oneWay[i].depShort +'</span></div><div class="depTime">Depart: <span>'+ obj.oneWay[i].depTime +'</span></div><div class="arrTime">Arrive: <span>'+ obj.oneWay[i].arrTime +'</span></div></div><div class="return-details col-6 f-left"><span class="flightCode">'+ obj.oneWay[i].return.flightCode +'</span><div class="flightDetails"><span class="arrShortTerm">'+ obj.oneWay[i].depShort +'</span> > <span class="depShortTerm">'+ obj.oneWay[i].arrShort +'</span></div><div class="depTime">Depart: <span>'+ obj.oneWay[i].return.depTime +'</span></div><div class="arrTime">Arrive: <span>'+ obj.oneWay[i].return.arrTime +'</span></div></div></div><div class="col-2 f-left"><img src="'+ obj.oneWay[i].flightImg +'" alt="" width="100%" /><input type="button" id="return_'+ obj.oneWay[i].return.id +'"  name="" value="Book this flight"></div></div>'					
						$('.tripDisplay').empty().append(content);
					}
					size++;
				}
			}
			else{
				if(depCity != obj.oneWay[i].depCity || destCity != obj.oneWay[i].arrCity || departureDate != obj.oneWay[i].depDate){
					if(size == 0){
						$('.tripDisplay').empty().append(noContent);
					}
				}
				else{
					priceOneWay.push(obj.oneWay[i].price);
					content += '<div class="tripDetails row" data-price="'+ obj.oneWay[i].price +'"><div class="col-10 f-left"><h3 class="price">Rs. <span class="price-text">'+ obj.oneWay[i].price +'</span></h3><div class="oneWay-details col-6 f-left"><span class="flightCode">'+ obj.oneWay[i].flightCode +'</span><div class="flightDetails"><span class="arrShortTerm">'+ obj.oneWay[i].depShort +'</span> > <span class="depShortTerm">'+ obj.oneWay[i].arrShort +'</span></div><div class="depTime">Depart: <span>'+ obj.oneWay[i].depTime +'</span></div><div class="arrTime">Arrive: <span>'+ obj.oneWay[i].arrTime +'</span></div></div></div><div class="col-2 f-left"><img src="'+ obj.oneWay[i].flightImg +'" alt="" width="100%" /><input type="button" id="oneWay_'+ obj.oneWay[i].id +'" name="" value="Book this flight"></div></div>'					
					$('.tripDisplay').empty().append(content);
					size++;
				}

			}
		}
		//Price Filter Settings
		var oneWaySettings = {
	      min: 0,
	      max: priceOneWay.length - 1,
	      step: 1,
	      range: true,
	      values: [0, priceOneWay.length - 1],
	      slide: function( event, ui ) {
	        $("#amount").val( "Rs." + priceOneWay[ui.values[ 0 ]] + " - Rs." + priceOneWay[ui.values[ 1 ]] );
	        $("#priceFrom").val(priceOneWay[ui.values[ 0 ]]);
	        $("#priceTo").val(priceOneWay[ui.values[ 1 ]]);
              var mi = priceOneWay[ui.values[ 0 ]];
              var mx = priceOneWay[ui.values[ 1 ]];
              filterPrice(mi, mx); 
	      }
	    };
	    var returnSettings = {
	      min: 0,
	      max: priceReturn.length - 1,
	      step: 1,
	      range: true,
	      values: [0, priceReturn.length - 1],
	      slide: function( event, ui ) {
	        $("#amount").val( "Rs." + priceReturn[ui.values[ 0 ]] + " - Rs." + priceReturn[ui.values[ 1 ]] );
	        $("#priceFrom").val(priceReturn[ui.values[ 0 ]]);
	        $("#priceTo").val(priceReturn[ui.values[ 1 ]]);
              var mi = priceReturn[ui.values[ 0 ]];
              var mx = priceReturn[ui.values[ 1 ]];
              filterPrice(mi, mx); 
	      }
	    };

		if($('.no-flight:hidden')){
			if(priceOneWay.length){
				$( "#amount" ).val( "Rs."+ priceOneWay[0] +" - Rs." + priceOneWay[priceOneWay.length - 1]);
				$( "#slider" ).slider(oneWaySettings);
			}
			if(priceReturn.length){
				$( "#amount" ).val( "Rs."+ priceReturn[0] +" - Rs." + priceReturn[priceReturn.length - 1]);
				$( "#slider" ).slider(returnSettings);
			}
		}

	});

	function filterPrice(minPrice, maxPrice) {
      $(".tripDisplay .tripDetails").hide().filter(function () {
          var price = $(this).data("price");
          return price >= minPrice && price <= maxPrice;
      }).show();
  }

})();