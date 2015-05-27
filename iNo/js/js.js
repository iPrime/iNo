var isMobile = false;

function loadScript() {
	isMobile = {
		Android: function() { return navigator.userAgent.match(/Android/i); }, 
		BlackBerry: function() { return navigator.userAgent.match(/BlackBerry/i); }, 
		iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, 
		Opera: function() { return navigator.userAgent.match(/Opera Mini/i); }, 
		Windows: function() { return navigator.userAgent.match(/IEMobile/i); }, 
		any: function() { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
	};

	if (isMobile.any()) { 
		// Wait for device to be ready loading everything
		document.addEventListener('deviceready', onDeviceReady, false);
	} else {
		// For testing on desktop purposes i simulate the onDeviceReady function
		onDeviceReady();
	};
}; 




function onDeviceReady() {

	
		// === MOBILE TESTING ===
	if (isMobile.any()) {
		document.getElementById('todobtn').addEventListener('touchstart', todobtnDown, false);
		document.getElementById('todobtn').addEventListener('touchend',  todopageShow, false);
		document.getElementById('camerabtn').addEventListener('touchstart', camerabtnDown, false);
		document.getElementById('camerabtn').addEventListener('touchend',  camerapageShow, false);
		document.getElementById('batterybtn').addEventListener('touchstart', batterybtnDown, false);
		document.getElementById('batterybtn').addEventListener('touchend',  batterypageShow, false);
	} else {

		// === DESKTOP TESTING ===
		document.getElementById('todobtn').addEventListener('mouseover', todobtnDown, false);
		document.getElementById('todobtn').addEventListener('mouseout',    todobtnUp, false);
		document.getElementById('todobtn').addEventListener('mouseup',  todopageShow, false);
		document.getElementById('camerabtn').addEventListener('mouseover', camerabtnDown, false);
		document.getElementById('camerabtn').addEventListener('mouseout',    camerabtnUp, false);
		document.getElementById('camerabtn').addEventListener('mouseup',  camerapageShow, false);
		document.getElementById('batterybtn').addEventListener('mouseover', batterybtnDown, false);
		document.getElementById('batterybtn').addEventListener('mouseout',  batterybtnUp, false);
		document.getElementById('batterybtn').addEventListener('mouseup',  batterypageShow, false);
	};

	// === EVENTLISTENER BATTERY ===
	window.addEventListener("batterystatus", onBatteryStatus, false);
	window.addEventListener("batterylow", onBatteryLow, false);
	window.addEventListener("batterycritical", onBatteryCritical, false);


	// === TO DO LIST FUNCTION USING jQuery ===
	$('#button').bind('touchend', function(){
        var toAdd = $('input[name=checkListItem]').val();       
    	$('.list').append('<div class="item">' + toAdd + '</div>');
    });
    
    $(document).on('click', '.item', function() {
        $(this).remove();        
        vibrateMobile();		// Vibrate function call when deleting an item    
    });

	// === CALLING CAMERA FUNCTION ===
	$('#makePicture').on('touchend', function(){
		cameraCapture();
	});

}




	// === ACTIVATE NAV TABS ===
	function todopageShow() {
		document.getElementById('todoPage').className='show';
		document.getElementById('cameraPage').className='hidden';
		document.getElementById('batteryPage').className='hidden';
		if (isMobile.any()) { todobtnDown(); camerabtnUp(); batterybtnUp(); };
	};
	function camerapageShow() {
		document.getElementById('todoPage').className='hidden';
		document.getElementById('cameraPage').className='show';
		document.getElementById('batteryPage').className='hidden';
		if (isMobile.any()) { camerabtnDown(); todobtnUp(); batterybtwUp(); };
	};

	function batterypageShow() {
		document.getElementById('todoPage').className='hidden';
		document.getElementById('cameraPage').className='hidden';
		document.getElementById('batteryPage').className='show';
		if (isMobile.any()) { batterybtnDown(); todobtnUp(); camerabtnUp(); };
	};

	// === CREATING FEEDBACK CURRENT PAGE ===
	function todobtnDown() {document.getElementById('todobtn').className='down';};
	function camerabtnDown() {document.getElementById('camerabtn').className='down';};
	function batterybtnDown() {document.getElementById('batterybtn').className='down';};
	function todobtnUp() {document.getElementById('todobtn').className='up';};
	function camerabtnUp() {document.getElementById('camerabtn').className='up';};
	function batterybtnUp() {document.getElementById('batterybtn').className='up';};


	// === BATTERY INFO ===
function onBatteryStatus(info) 
{
    
    console.log("Level: " + info.level + " isPlugged: " + info.isPlugged);
}

	// === GETTING PICTURE ===
function cameraCapture() {

		navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
		    destinationType: Camera.DestinationType.FILE_URI });
		
		function onSuccess(imageURI) {
		    var image = document.getElementById('picture');
		    image.src = imageURI;
		}
		
		function onFail(message) {
		    alert('Failed because: ' + message);
		}

}

	// === VIBRATE FUNCTION ===
function vibrateMobile() {
	// Vibrate for 3 seconds
	navigator.vibrate([500]);
	console.log(navigator.vibrate);
}

	// === BATTERY STAGES ===
function onBatteryStatus(info) {
    document.getElementById('pBar').setAttribute("value", info.level);
    document.getElementById('pValue').innerHTML = info.level;
    document.getElementById('pPlug').innerHTML = info.isPlugged;
    document.getElementById('batteryPage').style.backgroundColor = "#0197d4";
}

function onBatteryLow(info) {
    document.getElementById('pBar').setAttribute("value", info.level);
    document.getElementById('pValue').innerHTML = info.level;
    document.getElementById('pPlug').innerHTML = info.isPlugged;
    batterypageShow();
    document.getElementById('batteryPage').style.backgroundColor = "#0197d4";
}

function onBatteryCritical(info) {
    document.getElementById('pBar').setAttribute("value", info.level);
    document.getElementById('pValue').innerHTML = info.level;
    document.getElementById('pPlug').innerHTML = info.isPlugged;
    batterypageShow();
    document.getElementById('batteryPage').style.backgroundColor = "red";
}
