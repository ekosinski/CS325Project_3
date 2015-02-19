window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        // Load an image and call it 'logo'.
        //game.load.image( 'b', 'assets/phaser.png' );
        game.load.image( 'background', 'assets/fire_ice.png' );
        //game.load.audio( 'bodyDry', 'assets/01 -Before my body is dry.mp3');
        game.load.image('fire','assets/fire.png');
        game.load.image('ice','assets/ice.png');
        game.load.image('collide','assets/collide.png');
    }
    
    var background;
    var fire;
    var ice;
    var cursors;
    var key1;
    var key2;
    var key3;
    var key4;
    var collide;
    var collide1;

    var bodyDry;
    
    function create() {

        //  We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        background = game.add.tileSprite(0,0,800,600,'background');
        //  A simple background for our game
        //Create the images here
        fire = game.add.sprite(game.world.centerX - 500 ,game.world.centerY, 'fire');
        game.physics.enable(fire, Phaser.Physics.ARCADE);

        ice = game.add.sprite( game.world.centerX + 500 , game.world.centerY, 'ice');
        game.physics.enable(ice, Phaser.Physics.ARCADE);

        collide1 = game.add.sprite(50,150,'collide');
        game.physics.enable(collide1,Phaser.Physics.ARCADE);
        collide1.body.immovable = true;

        collide = game.add.sprite(game.world.centerX, game.world.centerY,'collide');
        game.physics.enable(collide, Phaser.Physics.ARCADE);
        collide.body.immovable = true;

        
        //Makes sure player characters collide with the world.
        fire.body.collideWorldBounds = true;
        ice.body.collideWorldBounds = true;
        collide.body.collideWorldBounds = true;

        key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        key2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
        key3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
        key4 = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
    }

    function update() {
		
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        //bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, this.game.input.activePointer, 500, 500, 500 );

        game.physics.arcade.overlap(fire, ice, crash, null, this);
        //Game rules
        game.debug.text('Red capture Blue!!!', 32, 32);

        collide.body.velocity.x = 0;
        collide.body.velocity.y = 0;

        //Collision blocks
        game.physics.arcade.collide(fire,collide);
        game.physics.arcade.collide(ice,collide);
        game.physics.arcade.collide(fire,collide1);
        game.physics.arcade.collide(ice,collide1);


        //Movement Keys
        cursors = game.input.keyboard.createCursorKeys();

        fire.body.velocity.x = 0;
        fire.body.velocity.y = 0;
        ice.body.velocity.x = 0;
        ice.body.velocity.y = 0;

        if(cursors.left.isDown){
            fire.body.velocity.x = -150;
        }
        else if (cursors.right.isDown){
            fire.body.velocity.x = 150;
        }
        else if (cursors.up.isDown){
            fire.body.velocity.y = -150;
        }
        else if (cursors.down.isDown){
            fire.body.velocity.y = 150;
        }


        if(key1.isDown){
            ice.body.velocity.y = 150;
        }
        else if(key2.isDown){
            ice.body.velocity.y = -150;
        }
        else if(key3.isDown){
            ice.body.velocity.x = -150;
        }
        else if(key4.isDown){
            ice.body.velocity.x = 150;
        }
    }


    function crash(fire, ice){
        ice.kill();
        game.debug.text("Red wins! Refresh to play again.",game.world.centerX,game.world.centerY);
    }
};
