window.onload = function(){
(function () {
	console.log('이퀄')
	var audio,
		analyser,
		audioContext,
		length,
		sourceNode;

	var distance;

	audio = new Audio();
	audio.src = 'krr.mp3';
	audio.volume = 0.1;
	init();

	document.getElementById('mute').addEventListener('click', (e) => {
		audio.volume = 0;
		$(mute).css('display','none')
	})
	// document.getElementById('vol').addEventListener('change', (e) => {
	//     audio.volume = e.target.value / 1000;
	// })

	function init() {
		audio.addEventListener('canplay', function () { //Event fires when the audio file has loaded and the file can be played
			length = audio.duration;
			distance = Math.round(window.innerWidth / length);
			console.log(length);
			audioContext = (audioContext || new AudioContext()); //Create the audio context
			analyser = (analyser || audioContext.createAnalyser()); //Use the pre-existing analyser or create a new one if one didn't exist before
			analyser.smoothingTimeConstant = 0.75;
			analyser.fftsize = 512;

			sourceNode = audioContext.createMediaElementSource(audio);
			sourceNode.connect(analyser);
			sourceNode.connect(audioContext.destination);

			audio.play();
			draw();
		});
	}
	//Canvas stuff

	var canvas = document.getElementById('visualiser');
	var canvasContext = canvas.getContext('2d'),
		width = canvas.width = window.innerWidth;
	height = canvas.height = window.innerHeight / 2;

	function draw() {

		canvasContext.clearRect(0, 0, width, height);
		var freqArray = new Uint8Array(analyser.frequencyBinCount);
		analyser.getByteFrequencyData(freqArray);
		//console.log(freqArray.length);
		//analyser.getByteTimeDomainData(freqArray);
		var degs = (2 * Math.PI) / freqArray.length;
		var barHeight, x = 0, c = 0, barWidth = (width / freqArray.length) * 2.5;
		for (var i = 0; i < freqArray.length; i++) {
			barHeight = freqArray[i];

			canvasContext.fillStyle = 'hsla(' + ((i / 2) + Math.floor(c)) + ', ' + 100 + '%,' + 60 + '%,' + (0.5 + barHeight / 512) + ')';
			canvasContext.fillRect(x, (height / 2) - (barHeight / 2), barWidth, barHeight / 2);
			canvasContext.fillStyle = 'hsla(' + ((i / 2) + Math.ceil(c)) + ', ' + 80 + '%,' + 60 + '%,' + (0.2) + ')';
			canvasContext.fillRect(x, (height / 2) + (barHeight / 2) + 5, barWidth, -barHeight / 2);
			canvasContext.fill();

			x += barWidth + 1;

			c += 0.5;
		}



		requestAnimationFrame(draw);
	}

	//Draw some initial stuff
	function drawInit() {
		var x = 0, c = 0;
		canvasContext.clearRect(0, 0, width, height);
		var barWidth = (width / 1024) * 2.5;
		var barHeight = height / 4;
		for (var i = 0; i < 1024; i++) {
			canvasContext.fillStyle = 'hsla(' + ((i / 2) + Math.floor(c)) + ', ' + 100 + '%,' + 60 + '%,' + (0.5 + barHeight / 512) + ')';
			canvasContext.fillRect(x, (height / 2) - (barHeight / 2), barWidth, barHeight / 2);
			canvasContext.fillStyle = 'hsla(' + ((i / 2) + Math.ceil(c)) + ', ' + 80 + '%,' + 60 + '%,' + (0.2) + ')';
			canvasContext.fillRect(x, (height / 2) + (barHeight / 2) + 5, barWidth, -barHeight / 2);
			canvasContext.fill();

			x += barWidth + 1;

			c += 0.5;
		}
	}

	drawInit();

	$('.index').slick({
		centerMode: true,
		centerPadding: '60px',
		slidesToShow: 3,
		responsive: [
			{
				breakpoint: 500,
				settings: {
					arrows: false,
					centerMode: true,
					centerPadding: '40px',
					slidesToShow: 3
				}
			},
	
			{
				breakpoint: 480,
				settings: {
					arrows: false,
					centerMode: true,
					centerPadding: '40px',
					slidesToShow: 1
				}
			}
		],
		autoplay: true,
		autoplaySpeed: 4000
	});
})();
};