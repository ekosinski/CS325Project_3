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
    }
    
    var background;
    var fire;
    var ice;
    var cursors;

    var bodyDry;
    
    function create() {

        //  We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        background = game.add.tileSprite(0,0,800,600,'background');
        //  A simple background for our game
        fire = game.add.sprite(game.world.centerX - 50 ,game.world.centerY, 'fire');
        game.physics.enable(fire, Phaser.Physics.ARCADE);

        ice = game.add.sprite( game.world.centerX + 50 , game.world.centerY, 'ice');
        game.physics.enable(ice, Phaser.Physics.ARCADE);
    }

    function update() {
		
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        //bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, this.game.input.activePointer, 500, 500, 500 );
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

       /* if(cursors.w.isDown){
            ice.body.velocity.y = 150;
        }
        else if(cursors.s.isDown){
            ice.body.velocity.y = -150;
        }
        else if(cursors.a.isDown){
            ice.body.velocity.x = -150;
        }
        else if(cursors.d.isDown){
            ice.body.velocity.x = 150;
        }*/
    }
};
