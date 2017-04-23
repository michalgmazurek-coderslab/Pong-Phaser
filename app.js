document.addEventListener("DOMContentLoaded", function (event) {

    var game = new Phaser.Game(400, 300, Phaser.AUTO, '', {
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
    var wievportWidth = parseInt(window.innerWidth);
    var wievportHeight = parseInt(window.innerHeight);

    function preload() {
        game.load.image('paddle', 'assets/paddle.png');
        game.load.image('ball', 'assets/ball.png');
        game.load.bitmapFont('font', 'assets/font.png', 'assets/font.fnt');
        Phaser.ScaleManager.RESIZE;
    }

    function create() {
        game.stage.backgroundColor = '#3c4240';
        paddle1 = createPaddle(0, game.world.centerY);
        paddle2 = createPaddle(game.world.width, game.world.centerY);
        ballLaunched = false;
        ballVelocity = 280;
        ball = createBall(game.world.centerX, game.world.centerY);
        game.input.onDown.add(launchBall, this);
        score1Text = game.add.bitmapText(64, 14, 'font', '0', 20);
        score2Text = game.add.bitmapText(game.world.width - 64, 14, 'font', '0', 20);
        score1 = 0;
        score2 = 0;
        var canvas = document.querySelector("canvas");
        console.log(parseInt(canvas.style.width));
        if (wievportHeight > wievportWidth ) {
            var canvasWidth = parseInt(canvas.style.width);
            var xy = (wievportWidth / canvasWidth) * 0.9;
            canvas.style.transform = "scale(" + xy + ")";
        }
        else if (wievportHeight < wievportWidth ) {
            var canvasHeight = parseInt(canvas.style.height);
            var xy = (wievportHeight / canvasHeight) * 0.9;
            canvas.style.transform = "scale(" + xy + ")";
        }
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
        paddle2.body.maxVelocity.y = 500;
        paddle1.scale.setTo(0.4, 0.4);
        paddle2.scale.setTo(0.4, 0.4);
        ball.scale.setTo(0.4, 0.4);

         if (score1 > 0) {
            ballVelocity = 400;
             paddle2.body.velocity.setTo(ball.body.velocity.y-50);
             paddle2.body.velocity.x = 0;
        }
        if (score1 > 1) {
            ballVelocity = 410;
            paddle2.body.velocity.setTo(ball.body.velocity.y-67);
            paddle2.body.velocity.x = 0;
        }
        if (score1 > 2) {
            gameOver = game.add.bitmapText(70, 125, 'font', 'WINNER!', 40);
            game.input.onDown.remove(launchBall, this);
        }
        if (score2 > 2) {
            gameOver = game.add.bitmapText(20, 125, 'font', 'GAME OVER', 40);
            game.input.onDown.remove(launchBall, this);
        }
    }

    function createPaddle(x, y) {
        var paddle = game.add.sprite(x, y, 'paddle');
        paddle.anchor.setTo(0.1, 0.5);
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

    // var canvas = document.querySelector("ctx.canvas");
    // var wievportWidth = parseInt(window.innerWidth);
    // var wievportHeight = parseInt(window.innerHeight);
    console.log(wievportWidth, wievportHeight);

    // if (wievportWidth > wievportHeight) {
    //     var xy = wievportHeight/wievportWidth;
    //     canvas.style.transform = "scale(" + xy + ")"
    // }


});
