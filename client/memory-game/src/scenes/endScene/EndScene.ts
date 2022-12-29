import endSceneConfig from './end.config'

export default class EndScene extends Phaser.Scene {
  winner: string
  winnerScore: number
  constructor() {
    super({ key: endSceneConfig.key })
  }
  init({ username, score }) {
    this.winner = username
    this.winnerScore = score
    console.log('winner: ' + this.winner)
    console.log('winnerScore: ' + this.winnerScore)
  }
  preload() {}
  create() {
    // Create a winning screen with the winner's name and score
    this.add.text(100, 100, `Winner: ${this.winner}`)
    this.add.text(100, 200, `Score: ${this.winnerScore}`)

    // // Create a button to restart the game
    // const restartButton = this.add.text(100, 300, 'Restart')
    // restartButton.setInteractive()
    // restartButton.on('pointerdown', () => {
    //     this.scene.start('boot')
    //     }
    // )
  }
}
