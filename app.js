document.addEventListener("DOMContentLoaded", function (event) {
    
    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
        preload: preload
        , create: create
        , update: update
    });
    
    
    var paddle1;
    var paddle2;
    var ball;
    var ballLaunched;
    var ballVelocity;
    var score1Text;
    var score2Text;
    var score1;
    var score2;
    var gameOver;

    function preload() {
        game.load.image('paddle', 'assets/paddle.png');
        game.load.image('ball', 'assets/ball.png');
        game.load.bitmapFont('font', 'assets/font.png', 'assets/font.fnt');
        Phaser.ScaleManager.RESIZE;
    }

    function create() {
        game.stage.backgroundColor = '#666';
        paddle1 = createPaddle(0, game.world.centerY);
        paddle2 = createPaddle(game.world.width - 3, game.world.centerY);
        ballLaunched = false;
        ballVelocity = 350;
        ball = createBall(game.world.centerX, game.world.centerY);
        game.input.onDown.add(launchBall, this);
        score1Text = game.add.bitmapText(128, 28, 'font', '0', 40);
        score2Text = game.add.bitmapText(game.world.width - 128, 28, 'font', '0', 40);
        score1 = 0;
        score2 = 0;
    }

    function update() {
        score1Text.text = score1;
        score2Text.text = score2;
        controlPaddle(paddle1, game.input.y);
        game.physics.arcade.collide(paddle1, ball);
        game.physics.arcade.collide(paddle2, ball);
        if (ball.body.blocked.left) {
            score2 += 1;
            launchBall();
        }
        else if (ball.body.blocked.right) {
            score1 += 1;
            launchBall();
        }
       
        paddle2.body.velocity.setTo(ball.body.velocity.y-50);
        paddle2.body.velocity.x = 0;
        paddle2.body.maxVelocity.y = 700;
        paddle1.scale.setTo(0.7, 0.7);
        paddle2.scale.setTo(0.7, 0.7);
        ball.scale.setTo(0.7, 0.7);
        
         if (score1 > 0) {
            ballVelocity = 500;
             paddle2.body.velocity.setTo(ball.body.velocity.y-52);
             paddle2.body.velocity.x = 0;
        }
        if (score1 > 1) {
            ballVelocity = 600;
            paddle2.body.velocity.setTo(ball.body.velocity.y-60);
            paddle2.body.velocity.x = 0;
        }
        if (score1 > 2) {
            gameOver = game.add.bitmapText(160, 250, 'font', 'WINNER!', 70);
            game.input.onDown.remove(launchBall, this);
        }
        if (score2 > 2) {
            gameOver = game.add.bitmapText(90, 250, 'font', 'GAME OVER', 70);
            game.input.onDown.remove(launchBall, this);
        }
    }

    function createPaddle(x, y) {
        var paddle = game.add.sprite(x, y, 'paddle');
        paddle.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(paddle);
        paddle.body.collideWorldBounds = true;
        paddle.body.immovable = true;
        return paddle;
    }

    function controlPaddle(paddle, y) {
        paddle.y = y;
        if (paddle.y < paddle.height / 2) {
            paddle.y = paddle.height / 2;
        }
        else if (paddle.y > game.world.height - paddle.height / 2) {
            paddle.y = game.world.height - paddle.height / 2;
        }
    }

    function createBall(x, y) {
        var ball = game.add.sprite(x, y, 'ball');
        ball.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(ball);
        ball.body.collideWorldBounds = true;
        ball.body.bounce.setTo(1, 1);
        return ball;
    }

    function launchBall() {
        if (ballLaunched) {
            ball.x = game.world.centerX;
            ball.y = game.world.centerY;
            ball.body.velocity.setTo(0, 0);
            ballLaunched = false;
        }
        else {
            ball.body.velocity.x = -ballVelocity;
            ball.body.velocity.y = ballVelocity;
            ballLaunched = true;
        }
    }
});