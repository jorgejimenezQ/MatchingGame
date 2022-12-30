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
  isMobile: boolean = false
  scaleValues: { border: number; card: number } = { border: 0.1, card: 2 }

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame: number,
    index: number,
    isMobile: boolean,
    clickCallback: Function
  ) {
    super(scene, x, y, texture, 0)

    this.isMobile = isMobile
    this.index = index
    this.face = frame
    this.faceTexture = texture
    this.cardId = frame

    if (this.isMobile) {
      this.scaleValues = { border: 0.07, card: 1 }
    }

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
    this.border.scale = this.scaleValues.border

    this.scene.add.existing(this.border)
    this.scale = this.scaleValues.card
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
          this.setScale(this.scaleValues.card)
          this.flipTween?.play()
        } else {
          this.setFrame(0)
          this.setScale(this.scaleValues.card)
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

  repositionCard(x: number, y: number) {
    this.x = x
    this.y = y
    this.border.x = x
    this.border.y = y
  }
}
