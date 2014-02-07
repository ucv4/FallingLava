/**
 * The main game file
 */

//Grabs the background and front canvases
var backgroundCanvas = document.getElementById("backgroundCanvas"),
    backgroundContext = backgroundCanvas.getContext("2d"),
    canvasEntities = document.getElementById("canvasEntities"),
    ctxEntities = canvasEntities.getContext("2d");

//Constants for the background
var CANVAS_WIDTH = backgroundCanvas.width,
    CANVAS_HEIGHT = backgroundCanvas.height,
    GROUND_Y = 400,
    LAVA_START_AMOUNT = 5,
    BACKGROUND_IMAGE_PATH = "images/background.png",
    LOAD_EVENT = "load",
    KEY_DOWN_EVENT = "keydown",
    KEY_UP_EVENT = "keyup";

var entities = new Array(),	
	player = new Player(),
    lavas = new Array(),
    isPlaying = false,
    requestAnimFrame =  window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.oRequestAnimationFrame ||
                        window.msRequestAnimationFrame ||
                        function(callback) {
                            window.setTimeout(callback, 1000 / 60);
                        },
    bgSprite = new Image();
bgSprite.src = BACKGROUND_IMAGE_PATH;
bgSprite.addEventListener(LOAD_EVENT, init, false);


function init() 
{
    document.addEventListener(KEY_DOWN_EVENT, function(event) {checkKey(event, true);}, false);
    document.addEventListener(KEY_UP_EVENT, function(event) {checkKey(event, false);}, false);
    entities.push(player);
    initializeLavas();
    begin();
}

function initializeLavas()
{
	for (var i = 0; i <= LAVA_START_AMOUNT; i++)
	{
		entities.push(new Lava(randomRange(0, CANVAS_WIDTH), randomRange(1, 10)))
	}
}

function begin()
{
    backgroundContext.drawImage(bgSprite, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    isPlaying = true;
    requestAnimFrame(loop);
}

function update() 
{
    clearCtx(ctxEntities);
    for (var i = 0; i < entities.length; i++)
    {
    	entities[i].update();
    	if(!(entities[i] instanceof Player) && collision(entities[i], player))
    	{
    		player.isDead = true;
    		isPlaying = false;
    	}
    }
}

function draw() 
{
    for (var i = 0; i < entities.length; i++)
    {
    	entities[i].draw();
    }
}

function loop() 
{
    if (isPlaying) 
    {
        update();
        draw();
        requestAnimFrame(loop);
    }
}

function clearCtx(ctx) 
{
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function checkKey(event, isKeyDown) 
{
    var keyID = event.keyCode || event.which;
    if (keyID === 39) // Right arrow
    { 
        player.isRightKey = isKeyDown;
        event.preventDefault();
    }
    if (keyID === 37) // Left arrow
    {
        player.isLeftKey = isKeyDown;
        event.preventDefault();
    }
    if (keyID === 32) // SpaceBar
    { 
        player.isSpaceBar = isKeyDown;
        event.preventDefault();
    }
}