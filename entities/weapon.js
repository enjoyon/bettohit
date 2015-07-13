/**
 * JavaScript
 * 
 * Hit To Bet - worm.js
 * Created by Christoph Lipphart on 9th July 2015
 * (c) Copyright 2015 Christoph Lipphart
 */

function GWeapon(Image, Config, IsLeft)
{
	// Weapon Visual
	this.Image = Image;
	this.Visual = new createjs.Container();
	this.ImageVisual = new createjs.Bitmap(Image);
	
	this.Visual.addChild( this.ImageVisual );

	if (IsLeft)
	{
		this.Visual.rotation = -Config.BaseRotation;
		this.ImageVisual.x = -this.Image.width * 0.5 + Config.LOffsetX;
		this.ImageVisual.y = Config.LOffsetY;
	}
	else
	{
		this.Visual.rotation = Config.BaseRotation;
		this.ImageVisual.scaleX = -1;
		this.ImageVisual.x = Config.ROffsetX;
		this.ImageVisual.y = Config.ROffsetY;
	}

	// Weapon Config
	this.IsBackground = Config.IsBackground;
	this.Strength = Config.Strength;
	this.Config = Config;
	this.IsLeft = IsLeft;
	this.Sound = Config.Sound;

	this.SoundPPC = new createjs.PlayPropsConfig().set({delay: Config.SoundDelay});

	// Weapon Attacking
	this.CoolDown = 1;
	this.IsAttacking = false;

	// Worms
	this.Owner		= null;
	this.Opponent	= null;

	// DEBUG: 
	// this.DebugVis = new createjs.Shape();
	// this.DebugVis.graphics.beginFill("#f00").drawCircle(0, 0, 15);
	// this.Visual.addChild(this.DebugVis);

	// Start idle animation
	this.DoIdle();
}

/**
 * Specifies the owner of this weapon
 */
GWeapon.prototype.SetOwner = function( Owner )
{
	this.Owner = Owner;
};

/**
 * Specifies the opponent to the owner of this weapon
 */
GWeapon.prototype.SetOpponent = function( Opponent )
{
	this.Opponent = Opponent;
};

/**
 * Determines if this weapon can attack currently.
 * Weapons can only attack if they are not currently
 * attacking or are in its cool down state.
 */
GWeapon.prototype.CanAttack = function()
{
	return (!this.IsAttacking) && this.CoolDown <= 0;
};

/**
 * Callback when the weapon finished its attack.
 */
GWeapon.OnFinishAttack = function( w )
{
	w.CoolDown = w.Config.CoolDown * 0.5 + Math.random() * w.Config.CoolDown;
	w.IsAttacking = false;
	w.DoIdle();
};

/**
 * Callback when the weapon should attack the opponent.
 */
GWeapon.OnAttackOpponent = function( w )
{
	w.Opponent.ReceiveImpact( w.Strength );
};

/**
 * Executes an attack of the weapon.
 */
GWeapon.prototype.DoAttack = function()
{
	createjs.Sound.play(this.Sound, this.SoundPPC);

	console.log("Do Attack");

	this.IsAttacking = true;

	var sign = 1;
	if (this.IsLeft)
	{
		sign = -1;
	}

	createjs.Tween.get(this.Visual, {}, null, true)
		.to({rotation: sign * this.Config.ReadyAngle}, 400, createjs.Ease.cubicInOut) // get ready
		.wait(200)
		.to({rotation: sign * this.Config.AttackAngle}, 70, createjs.Ease.cubicIn) // attack
		.call(GWeapon.OnAttackOpponent, [this])
		.to({rotation: sign * 60}, 70, createjs.Ease.cubicIn) // bounce back
		.wait(100)
		.to({rotation: sign * 145}, 1000, createjs.Ease.cubicInOut) // return to idle
		.call(GWeapon.OnFinishAttack, [this]);
};

/**
 * Starts an idle animation for the weapon
 */
GWeapon.prototype.DoIdle = function()
{
	console.log("Do Idle");

	var sign = 1;

	// adjust the angle of the weapon for left and right
	if (this.IsLeft)
	{
		sign = -1;
	}

	createjs.Tween.get(this.Visual, {loop: true}, null, true)
		.to({rotation: 130 * sign}, 2000 + Math.random() * 800, createjs.Ease.quadInOut)
		.to({rotation: (140 * sign + Math.random() * 10)}, 2000 + Math.random() * 800, createjs.Ease.quadInOut)
		.to({rotation: (130 * sign + Math.random() * 10)}, 2000 + Math.random() * 800, createjs.Ease.quadInOut)
		.to({rotation: (140 * sign + Math.random() * 10)}, 2000 + Math.random() * 800, createjs.Ease.quadInOut)
		.to({rotation: (130 * sign + Math.random() * 10)}, 2000 + Math.random() * 800, createjs.Ease.quadInOut)
		.to({rotation: (140 * sign + Math.random() * 10)}, 2000, createjs.Ease.cubicInOut)
		.to({rotation: 130 * sign}, 2000 + Math.random() * 800, createjs.Ease.quadInOut);

};

/**
 * Ticks this worm and all its components
 */
GWeapon.prototype.Tick = function ( Worm, dt )
{
	if (this.CoolDown > 0)
	{
		this.CoolDown -= dt;
	}

	this.Visual.x = Worm.GetWeaponPositionX();
	this.Visual.y = Worm.GetWeaponPositionY();
};

/**
 * Tries to fight with the weapon
 */
GWeapon.prototype.Attack = function()
{
	if (this.CanAttack())
	{
		this.DoAttack();
	}
};
