class Tamagotchi {
	constructor(name){
		this.hunger = 1;
		this.fatigue = 1;
		this.boredom = 1;
		this.age = 0;
		this.dead = false;
		this.name = name;
		this.timeOfLife = 0
	}
	getOlder() {
		this.age++
		$('#age').text(this.age);
	}
	getHunger() {
		this.hunger++
		$('#hunger').text(this.hunger);
	}
	getFatigued() {
		this.fatigue++
		$('#fatigue').text(this.fatigue);
	}
	getBored() {
		this.boredom++
		$('#boredom').text(this.boredom);
	}
	graveyard(reason){
		console.log(`${this.name} died from ${reason} `);
		$('img').attr('src', 'sadpika.png');
	}

	evolve(){
		if (this.timeOfLife>= 120){
			$('img').attr('src', 'happyraichu.png');
			$('img').css('width', '40%');
			$('img').css('height', '40%');
		}	
	}
}

document.getElementById("metrics").style.display = "none"
document.getElementById("image").style.display = "none"
const game = {
	myPet: null, 
	intervalID: null,
	time: 0,
	lightsON:false,

 	start(name) {
		const myPet2 = new Tamagotchi(name);
		this.myPet = myPet2;
		$('#name').text(this.myPet.name)
		$('#input-name').val("")
		document.getElementById("metrics").style.display = ""
		document.getElementById("image").style.display = ""
		this.startTimer();


	},
	startTimer() {
		this.intervalID = setInterval(() => {
			
			this.time++
			this.myPet.timeOfLife++
			this.reasonOfDeath = "";
			const timeInMillisecond = this.time * 1000

			if (timeInMillisecond % 15000 === 0){	
				this.myPet.getHunger();
			}
			if (timeInMillisecond % 15000 === 0){	
				this.myPet.getBored()
      		}

			if (timeInMillisecond % 15000 === 0){	
				this.myPet.getFatigued();
			}
      		if (timeInMillisecond % 30000 === 0){	
      			this.myPet.getOlder();
      			this.myPet.evolve();
      			this.time = 0;
			}

      		if (this.myPet.hunger>=10){
      			this.myPet.dead = true;
      			this.reasonOfDeath = "hunger";
      		}
      		if (this.myPet.fatigue>=10){
				this.myPet.dead = true;
				this.reasonOfDeath = "exhaustion";
      		}
      		if (this.myPet.boredom>=10){
      			this.myPet.dead = true;
      			this.reasonOfDeath = "boredom";
    
      		}

      		if (this.myPet.dead){
      			clearInterval(this.intervalID)
      			this.myPet.graveyard(this.reasonOfDeath)
      		}
      		
    	 }, 100)

	},

	feedThePet() {
		if (this.myPet.hunger>1){
			this.myPet.hunger--
			$('#hunger').text(this.myPet.hunger);
		}
	},

	playWithThePet() {
		if (this.myPet.boredom>1){	
			this.myPet.boredom--
			$('#boredom').text(this.myPet.boredom);
		}
	},
	moveLeft(){
		$('#image').css('justify-content', 'flex-start')
	},
	moveRight(){
		$('#image').css('justify-content', 'flex-end')
	},
	moveUp(){
		$('#image').css('align-items', 'flex-start')
	},
	moveDown(){
		$('#image').css('align-items', 'flex-end')
	},
	lightswitch() {
		
		if (this.lightsON){
			if (this.myPet.fatigue >1){
				this.myPet.fatigue--
				$('#fatigue').text(this.myPet.fatigue);
			    $('#screen').css('background', 'url("/Users/tylergump/sei-bromeliad/projects/tamagochi-mini-project/tenor.gif")');
				$('#screen').css('background-size', 'cover');
				$('img').attr('src', 'Pokemon-Pikachu-PNG-Images.png');
			    this.lightsON = false;
			}
		}else{
			this.myPet.fatigue--
			$('#fatigue').text(this.myPet.fatigue);
			$('#screen').css('background', 'url("https://github.com/tylergump/tamagochi-mini-project/blob/main/nightime.gif")');
			$('#screen').css('background-size', 'cover');
			$('img').attr('src', 'Cute-Pikachu-PNG-Clipart.png');
			this.lightsON = true;
		}
	}

}


$('#form').on('submit',(event)=>{
	event.preventDefault()
	const newName = $('#input-name').val()
	game.start(newName)
	$('#screen').css('background-image', 'url("/Users/tylergump/sei-bromeliad/projects/tamagochi-mini-project/tenor.gif")')
})

$('.button').on('click',(event)=>{
	
	const e = $(event.target);	

	if (e.attr('id') === "light"){
		
		game.lightswitch() 
	}
	if (e.attr('id') === "feed"){
		
		game.feedThePet();
	}
	if (e.attr('id') === "play"){
		
		game.playWithThePet()
	}
	if (e.attr('id') === "left"){
	
		game.moveLeft()
	}
	if (e.attr('id') === "right"){
	
		game.moveRight()
	}
	if (e.attr('id') === "up"){
	
		game.moveUp()
	}
	if (e.attr('id') === "down"){
	
		game.moveDown()
	}
})