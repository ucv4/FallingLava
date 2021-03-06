/**
 * Class representing the sideways lava
 */

var SidewaysLava = Class.create({
	
	initialize: function(drawY, moveSpeed, moveRight) {
        this.srcX = 0;
        this.srcY = 0;
        this.width = 16;
        this.height = 24;
        this.drawY = drawY;
        this.moveSpeed = moveSpeed;
        this.moveRight = moveRight;
        this.isDead = false;
        if (this.moveRight)
        {
            this.drawX = 0;
        }
        else
        {
            this.drawX = CANVAS_WIDTH - this.width;
        }
	},

	update: function() 
	{
        if(this.moveRight)
        {
            this.drawX += this.moveSpeed;
        }
        else
        {
            this.drawX -= this.moveSpeed;
        }
	},
	
	draw: function() 
	{
		this.checkPosition()
	    ctxEntities.drawImage(fallingLavaSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
	},
	
	checkPosition: function()
	{
		if(this.isOutOfBounds())
		{
			this.reset();
		}
	},

	reset: function()
	{
		this.drawY = randomRange(0, GROUND_Y);
        if (this.moveRight)
        {
            this.drawX = 0;
        }
        else
        {
            this.drawX = CANVAS_WIDTH - this.width;
        }
	},

	isOutOfBounds: function() 
	{
        return (this.drawX + this.width) >= CANVAS_WIDTH || this.drawX <= 0;
	},
    
    increaseSpeed: function()
    {
        this.moveSpeed += 1;
    }
});