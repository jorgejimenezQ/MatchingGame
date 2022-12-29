import Phaser from 'phaser'
import { cardAssets } from '../../game/gameObjects/cards.asset'
export default class Card extends Phaser.GameObjects.Sprite {
  clickCallback: Function
  face: number = 0
  faceTexture: string
  flipped: boolean = false
  flipTween: Phaser.Tweens.Tween | null = null
  cardId: number | null = null
  border: Phaser.GameObjects.Image
  index: number

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame: number,
    index: number,
    clickCallback: Function
  ) {
    super(scene, x, y, texture, 0)

    this.index = index
    this.face = frame
    this.faceTexture = texture
    this.cardId = frame

    // Clickable
    this.setInteractive()
    this.clickCallback = clickCallback

    this.on('pointerdown', () => {
      if (this.flipped) return
      this.flipCard()
    })

    // On hover enter
    this.on('pointerover', () => {
      if (this.flipped) return

      // Add tint
      this.setTint(0x00ff00)
      this.border.setTint(0x00ff00)
    })

    // On hover leave
    this.on('pointerout', () => {
      // Remove tint
      this.clearTint()
      this.border.clearTint()
    })

    // Add the card this.border
    this.border = this.scene.add.image(this.x, this.y, cardAssets.border.textureKey)
    this.border.scale = 0.1
    this.scene.add.existing(this.border)
    this.scale = 2
    this.border.setInteractive()

    this.border.on('pointerdown', () => {
      if (this.flipped) return
      this.flipCard()
    })

    // On hover enter
    this.border.on('pointerover', () => {
      if (this.flipped) return
      // Add tint

      this.setTint(0x00ff00)
      this.border.setTint(0x00ff00)
    })

    // On hover leave
    this.border.on('pointerout', () => {
      // Remove tint
      this.clearTint()
      this.border.clearTint()
    })

    this.scene.add.existing(this)

    // Add tween
    this.flipTween = this.scene.tweens.add({
      targets: [this, this.border],
      scaleX: 0,
      duration: 100,
      paused: true,
      onComplete: () => {
        if (this.flipped) {
          this.setFrame(this.face)
          this.setScale(2)
          this.flipTween?.play()
        } else {
          this.setFrame(0)
          this.setScale(2)
          this.flipTween?.play()
        }
      },
    })
  }

  flipCard() {
    this.clickCallback(this)
  }

  flip() {
    this.flipTween?.play()
    this.flipped = false
  }

  destroyCard() {
    this.flipTween?.stop()
    this.flipTween = null
    this.destroy()
    this.border.destroy()
  }
}
