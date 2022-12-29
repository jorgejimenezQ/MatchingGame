import Phaser from 'phaser'
import { BootScene } from '../scenes/bootScene/BootScene'
import { MainScene } from '../scenes/mainScene/MainScene'
import EndScene from '../scenes/endScene/EndScene'

const gameConfig = {
  type: Phaser.AUTO,
  width: 820,
  height: 450,
  parent: 'game',
  scene: [BootScene, MainScene, EndScene],
  //   scene: [BootScene],
  // scale: {
  //   mode: Phaser.Scale.FIT,
  //   autoCenter: Phaser.Scale.CENTER_BOTH,
  // },
  backgroundColor: '#fdf0d5',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 0,
      },
      debug: true,
    },
    // default: 'matter',
    // matter: {
    //   gravity: {
    //     y: 0,
    //   },
    //   debug: true,
    // },
  },
  //
  plugins: {
    // scene: [
    //   {
    //     plugin: matterPlugin, // The plugin class
    //     key: 'matterCollision', // Where to store in Scene.Systems, e.g. scene.sys.matterCollision
    //     mapping: 'matterCollision', // Where to store in the Scene, e.g. scene.matterCollision
    //   },
    // ],
  },
}

export default gameConfig
