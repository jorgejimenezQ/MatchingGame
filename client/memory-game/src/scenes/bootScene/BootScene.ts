import bootConfig from './boot.config'
import store from '../../app/store'
import mainSceneConfig from '../mainScene/main.config'
import { cardAssets } from '../../game/gameObjects/cards.asset'

export class BootScene extends Phaser.Scene {
  constructor(private username: string, private cardAsset: any, private cardBorderAsset: any) {
    super({ key: bootConfig.key })

    this.username = store.getState().username.username
    console.log('BootScene create()', this.username)
    this.cardAsset = cardAssets.cardIcon
    this.cardBorderAsset = cardAssets.border
  }

  init() {}

  preload() {
    // Load the card icons
    this.load.spritesheet(this.cardAsset.textureKey, this.cardAsset.image, {
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.image(this.cardBorderAsset.textureKey, this.cardBorderAsset.image)

    const loadText = this.add.text(100, 100, 'Loading...', {
      fontSize: '32px',
      color: '#000000',
      fontFamily: 'Arial',
      fontStyle: 'bold',
    })

    this.load.on('progress', (value: number) => {
      loadText.setText(`Loading... ${Math.round(value * 100)}%`)
    })
  }
  create() {
    // Display a hello from the boot scene
    // const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
    //   fontSize: '32px',
    //   color: '#000000',
    //   fontFamily: 'Arial',
    //   fontStyle: 'bold',
    // }
    // this.add.text(100, 100, `Hello ${this.username} from the boot scene`, textStyle)

    // const card = this.add.sprite(100, 200, cardAssets.textureKey, 0)
    // Start the main scene
    this.scene.start(mainSceneConfig.key)
  }
}
