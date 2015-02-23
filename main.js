enchant();

var BALL_IMAGE = "img/ball.png";

window.onload = function() {
	var game = new Core(320, 320);
	game.rootScene.backgroundColor = "white";
	game.preload(BALL_IMAGE);
	
	var createBall = function(argx, argy) {
		//ボールの論理座標と速度
		var x = argx;
		var y = argy;
		var z = 20;
		var vx = 1;
		var vy = 1;
		var vz = -1;
		
		//スプライトの初期化と登録
		var sprite = new Sprite(6, 6);
		sprite.image = game.assets[BALL_IMAGE];
		game.rootScene.addChild(sprite);
		
		//フレーム毎のコールバック
		sprite.addEventListener("enterframe", function() {
			// 論理座標上で動く
			x += vx;
			if (x < 0 || x >= 100) {　//はみ出したら 
				x -= vx;　// 移動はキャンセル
				vx = -vx; // 弾性衝突
			}
			y += vy;
			if (y < 0 || y >= 100) { 
				y -= vy;
				vy = -vy; 
			}
			z += vz;
			if (z <= 0) {
				vz = -vz;
			} else {
				vz -= 1; // 重力加速度
			}
			
			//論理座標を画面に投影
			sprite.moveTo(x + y * 0.5 + 50, 250 - y * 1.732 / 2.0 - z);
		});

		return sprite;
	};

	game.myFrameCounter = 0;
	game.rootScene.onenterframe = function() {
		//ルートのフレーム毎処理
		//console.log("game.rootScene.onenterframe");
		if (game.myFrameCounter >= 500) return; // 作成するボールは500個まで
		game.myFrameCounter++;
		
		var x = 0;
		var y = 0;
		x += Math.floor(Math.random() * 100);
		y += Math.floor(Math.random() * 100);
			
		createBall(x, y);
	};
	
	game.start();
	
};


