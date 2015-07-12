/**
 * JavaScript
 * 
 * Hit To Bet - Hud.js
 * Created by Christoph Lipphart on 11th July 2015
 * (c) Copyright 2015 Christoph Lipphart
 */

GHud = (function()
{
	var hud = {};

	hud.BetMoneyContainer = null;

	hud.BetLeftWins = null;
	hud.BetRightWins = null;
	hud.MinusBtn = null;
	hud.PlusBtn = null;
	hud.LeftWormBet = null;
	hud.RightWormBet = null;

	// MONEY
	hud.Currency = "€";
	hud.ThousendSep = '.';
	hud.DecimalSep = ',';

	// Possible Bet
	var bets = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 3000, 4000, 5000, 10000, 20000, 30000, 40000, 50000, 100000];
	var betIndex = 3;

	function GetBetValue()
	{
		return bets[betIndex];
	}

	function IncreaseBetValue()
	{
		if (betIndex < bets.length - 1)
		{
			++betIndex;
		}
		return GetBetValue();
	}

	function DecreaseBetValue()
	{
		if (betIndex > 0)
		{
			--betIndex;
		}
		return GetBetValue();
	}

	function CreateBetMoneyContainer()
	{
		hud.BetMoneyContainer = new createjs.Container();
		hud.BetMoneyContainer.x = 400;
		hud.BetMoneyContainer.y = 485;
		GCore.AddVisual(hud.BetMoneyContainer);
	}

	function UpdateYourMoney()
	{
		hud.YourMoney.Label.text = hud.Currency + " " + 
			hud.YourMoney.Value.toMoney(hud.DecimalSep, hud.ThousendSep);
		if (hud.YourMoney.Value < 0)
		{
			hud.YourMoney.Label.color = "#E33";
		}
		else
		{
			hud.YourMoney.Label.color = "#EEE";
		}
	}

	function CreateYourMoney()
	{
		var bg = new createjs.Bitmap(GImages.YourMoney);
		bg.x = 400 - GImages.YourMoney.width * 0.5;
		bg.y = 20;

		var lbl = new createjs.Text("€ 0,00", "12px Arial Black", "#EEE");
		lbl.x = 400;
		lbl.textAlign = "center";
		lbl.textBaseline = "middle";
		lbl.y = bg.y + GImages.YourMoney.height * 0.5;

		GCore.AddVisual(bg);
		GCore.AddVisual(lbl);

		hud.YourMoney = {};
		hud.YourMoney.Value = 500;
		hud.YourMoney.Label = lbl;
		hud.YourMoney.Background = bg;

		UpdateYourMoney();
	}

	function UpdateWormBets()
	{

		var leftTxt = hud.Currency + " " + 
			hud.LeftWormBet.Value.toMoney(hud.DecimalSep, hud.ThousendSep);

		var leftLength = leftTxt.length * 18 + 55;

		hud.LeftWormBet.Background.x = (-GImages.WormBet.width) + leftLength;

		hud.LeftWormBet.Label.text = leftTxt;
		hud.LeftWormBet.Label.x = leftLength * 0.5 - 20;


		var rightTxt = hud.Currency + " " + 
			hud.RightWormBet.Value.toMoney(hud.DecimalSep, hud.ThousendSep);

		var rightLength = rightTxt.length * 18 + 55;

		hud.RightWormBet.Background.x = 800 + GImages.WormBet.width - rightLength;

		hud.RightWormBet.Label.text = rightTxt;
		hud.RightWormBet.Label.x = 820 - rightLength * 0.5;
	}

	function CreateWormBets()
	{
		var left = new createjs.Bitmap(GImages.WormBet);
		left.y = 5;

		var right = new createjs.Bitmap(GImages.WormBet);
		right.scaleX = -1;
		right.y = 5;
		right.x = 800;

		GCore.AddVisual(left);
		GCore.AddVisual(right);

		var leftLbl = new createjs.Text("€ 0,00", "22px Arial Black", "#FF0");
		leftLbl.textAlign = "center";
		leftLbl.textBaseline = "middle";
		leftLbl.y = left.y + GImages.WormBet.height * 0.5;
		var rightLbl = new createjs.Text("€ 0,00", "22px Arial Black", "#FF0");
		rightLbl.textAlign = "center";
		rightLbl.textBaseline = "middle";
		rightLbl.x = right.x - GImages.WormBet.width * 0.5;
		rightLbl.y = right.y + GImages.WormBet.height * 0.5;

		hud.LeftWormBet = {};
		hud.LeftWormBet.Background = left;
		hud.LeftWormBet.Label = leftLbl;
		hud.LeftWormBet.Value = 0;

		hud.RightWormBet = {};
		hud.RightWormBet.Background = right;
		hud.RightWormBet.Label = rightLbl;
		hud.RightWormBet.Value = 0;

		GCore.AddVisual(leftLbl);
		GCore.AddVisual(rightLbl);

		UpdateWormBets();
	}

	function BetForLeft()
	{
		hud.LeftWormBet.Value += hud.CurrentBet.Value * hud.LeftMultiplier.Value;
		hud.YourMoney.Value -= hud.CurrentBet.Value;
		UpdateWormBets();
		UpdateYourMoney();
	}

	function BetForRight()
	{
		hud.RightWormBet.Value += hud.CurrentBet.Value * hud.RightMultiplier.Value;
		hud.YourMoney.Value -= hud.CurrentBet.Value;
		UpdateWormBets();
		UpdateYourMoney();
	}

	function CreateBetButtons()
	{
		var spriteSheet = new createjs.SpriteSheet(
		{
			images: [ GImages.BetBtns ],
			frames: {width: GImages.BetBtns.width, height: GImages.BetBtns.height / 6},
			animations: { lout: 0, lover: 1, ldown: 2, rout: 3, rover: 4, rdown: 5 }
		});

		hud.BetLeftWins = new createjs.Sprite(spriteSheet, "left");
		hud.BetLeftWins.set({ x: -GImages.BetBtns.width, y: 48});
		hud.BetLeftWins.mouseEnabled = true;
		hud.BetMoneyContainer.addChild(hud.BetLeftWins);
		new createjs.ButtonHelper(hud.BetLeftWins, "lout", "lover", "ldown");
		hud.BetLeftWins.on("click", BetForLeft);

		hud.BetRightWins = new createjs.Sprite(spriteSheet, "right");
		hud.BetRightWins.set({ x: 0, y: 48});
		hud.BetRightWins.mouseEnabled = true;
		hud.BetMoneyContainer.addChild(hud.BetRightWins);
		new createjs.ButtonHelper(hud.BetRightWins, "rout", "rover", "rdown");
		hud.BetRightWins.on("click", BetForRight);
	}

	function UpdateMultiplier()
	{
		hud.LeftMultiplier.Label.text  = "x " + GMath.Format(hud.LeftMultiplier.Value, 1);
		hud.RightMultiplier.Label.text = "x " + GMath.Format(hud.RightMultiplier.Value, 1);
		
		hud.BetLeftWins.mouseEnabled = (hud.LeftMultiplier.Value > 1);
		hud.BetLeftWins.alpha = (hud.LeftMultiplier.Value > 1)?1:0.5;
		hud.LeftMultiplier.Background.alpha = (hud.LeftMultiplier.Value > 1)?1:0.5;
		hud.LeftMultiplier.Label.visible = (hud.LeftMultiplier.Value > 1);

		hud.BetRightWins.mouseEnabled = (hud.RightMultiplier.Value > 1);
		hud.BetRightWins.alpha = (hud.RightMultiplier.Value > 1)?1:0.5;
		hud.RightMultiplier.Background.alpha = (hud.RightMultiplier.Value > 1)?1:0.5;
		hud.RightMultiplier.Label.visible = (hud.RightMultiplier.Value > 1);
	}

	hud.EarnMoney = function( FromLeft )
	{
		var value = 0;
		if (FromLeft)
		{
			value = hud.LeftWormBet.Value;
		}
		else
		{
			value = hud.RightWormBet.Value;	
		}
		if (value < 0) value = 0;

		hud.YourMoney.Value += value;
		hud.RightWormBet.Value = 0;
		hud.LeftWormBet.Value = 0;
		UpdateYourMoney();
		UpdateWormBets();
	};

	hud.SetLeftMultiplier = function( value )
	{
		if (value < 1) value = 1;
		hud.LeftMultiplier.Value = Math.round(value * 10) * 0.1;
		UpdateMultiplier();
	};

	hud.SetRightMultiplier = function( value )
	{
		if (value < 1) value = 1;
		hud.RightMultiplier.Value = Math.round(value * 10) * 0.1;
		UpdateMultiplier();
	};

	function CreateMultiplier()
	{
		var left = new createjs.Bitmap(GImages.Multiplier);
		left.x = -GImages.BetBtns.width - GImages.Multiplier.width + 20;
		left.y = 60;
		var right = new createjs.Bitmap(GImages.Multiplier);
		right.x = GImages.BetBtns.width - 20;
		right.y = left.y;

		var llbl = new createjs.Text("x 2.0", "12px Arial Black", "#EEE");
		llbl.textAlign = "center";
		llbl.textBaseline = "middle";
		llbl.x = left.x + GImages.Multiplier.width * 0.5;
		llbl.y = left.y + GImages.Multiplier.height * 0.5;
		var rlbl = llbl.clone();
		rlbl.x = right.x + GImages.Multiplier.width * 0.5;

		hud.BetMoneyContainer.addChild(left);
		hud.BetMoneyContainer.addChild(right);

		hud.BetMoneyContainer.addChild(llbl);
		hud.BetMoneyContainer.addChild(rlbl);

		hud.LeftMultiplier = {};
		hud.LeftMultiplier.Background = left;
		hud.LeftMultiplier.Label = llbl;
		hud.LeftMultiplier.Value = 1;

		hud.RightMultiplier = {};
		hud.RightMultiplier.Background = right;
		hud.RightMultiplier.Label = rlbl;
		hud.RightMultiplier.Value = 1;

		UpdateMultiplier();
	}

	function UpdateCurrentBet()
	{
		hud.CurrentBet.Label.text = hud.Currency + " " + 
			hud.CurrentBet.Value.toMoney(hud.DecimalSep, hud.ThousendSep);
	}

	function CreateCurrentBet()
	{
		hud.CurrentBet = {};

		var bg = new createjs.Bitmap(GImages.CurrentBet);
		bg.set( { x: -GImages.CurrentBet.width * 0.5, y: 0} );
		hud.BetMoneyContainer.addChild(bg);
		hud.CurrentBet.Background = bg;

		var lbl = new createjs.Text("€ 0,00", "18px Arial Black", "#FFF");
		lbl.textAlign = "center";
		lbl.textBaseline = "middle";
		lbl.set( { x: 0, y: GImages.CurrentBet.height * 0.5 } );
		hud.BetMoneyContainer.addChild(lbl);

		hud.CurrentBet.Label = lbl;
		hud.CurrentBet.Value = GetBetValue();

		UpdateCurrentBet();
	}

	function CreateMoneyButtons()
	{
		var spriteSheet = new createjs.SpriteSheet(
		{
			images: [ GImages.MoneyBtns ],
			frames: {width: GImages.MoneyBtns.width, height: GImages.MoneyBtns.height / 6},
			animations: { lout: 0, lover: 1, ldown: 2, rout: 3, rover: 4, rdown: 5 }
		});

		hud.MinusBtn = new createjs.Sprite(spriteSheet, "left");
		hud.MinusBtn.set({ x: -GImages.BetBtns.width, y: 0});
		hud.MinusBtn.mouseEnabled = true;
		hud.BetMoneyContainer.addChild(hud.MinusBtn);
		new createjs.ButtonHelper(hud.MinusBtn, "lout", "lover", "ldown");
		hud.MinusBtn.on("click", function()
		{
			hud.CurrentBet.Value = DecreaseBetValue();
			UpdateCurrentBet();
		});

		hud.PlusBtn = new createjs.Sprite(spriteSheet, "right");
		hud.PlusBtn.set({ x: GImages.BetBtns.width - GImages.MoneyBtns.width, y: 0});
		hud.PlusBtn.mouseEnabled = true;
		hud.BetMoneyContainer.addChild(hud.PlusBtn);
		new createjs.ButtonHelper(hud.PlusBtn, "rout", "rover", "rdown");
		hud.PlusBtn.on("click", function()
		{
			hud.CurrentBet.Value = IncreaseBetValue();
			UpdateCurrentBet();
		});
	}

	hud.Construct = function()
	{
		GCore.GetStage().enableMouseOver(10);

		CreateBetMoneyContainer();
		CreateBetButtons();
		CreateMoneyButtons();
		CreateCurrentBet();
		CreateWormBets();
		CreateYourMoney();
		CreateMultiplier();
	};

	return hud;

})();