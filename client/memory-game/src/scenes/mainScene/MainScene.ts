import mainSceneConfig from './main.config'
import Card from '../../game/gameObjects/Card'
import { cardAssets } from '../../game/gameObjects/cards.asset'
import store from '../../app/store'
import {
  playerOneScore,
  playerTwoScore,
  setFirstPlayerCurrentTurn,
} from '../../features/gameSession/gameSessionSlice'
import connection from '../../connection/connection'
import endSceneConfig from '../endScene/end.config'
import { constants } from 'buffer'

export class MainScene extends Phaser.Scene {
  cards: Card[] = []
  cardIndexes: number[] = []
  currentMovingCards: number[] | null = null
  currentSelection: Card[] = []
  currentTurn: boolean = false
  currentStreak: number = 0
  playerTwoSelection: Card[] = []
  playerTwoSelectionQueue: number[] = []

  constructor() {
    super({ key: mainSceneConfig.key })

    this.cardIndexes = store.getState().gameSession.cardIndexes
    const firstPlayer = store.getState().gameSession.firstPlayer
    if (firstPlayer === connection.connectionId) {
      this.currentTurn = true
      store.dispatch(setFirstPlayerCurrentTurn(true))
    }

    // Create an array with 24 cards
    this.cards = new Array(24)

    // Create an align grid
  }

  create() {
    // Create the cards
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 3; j++) {
        const x = 100 + i * 90
        const y = 100 + j * 140
        const index = j * 8 + i

        // Get a random card from the available cards
        const newCard = new Card(
          this,
          x,
          y,
          cardAssets.cardIcon.textureKey,
          this.cardIndexes[index],
          index,
          this.handleCardClick.bind(this)
        )

        // this.cards.push(newCard)
        this.cards[index] = newCard
        this.add.existing(newCard)
      }
    }

    connection.socket.on('playerTurn', (streak: number) => {
      // Empty playerTwoSelectionQueue
      while (this.playerTwoSelectionQueue.length > 0) {
        const index = this.playerTwoSelectionQueue.shift()
        this.handlePlayerTwoCardClick(index)
      }

      this.currentTurn = true
      store.dispatch(setFirstPlayerCurrentTurn(true))
    })

    connection.socket.on('addScore', () => {
      store.dispatch(playerTwoScore())
    })
    connection.socket.on('flipCard', (index: number) => {
      this.playerTwoSelectionQueue.push(index)
    })

    connection.socket.on('mainScene', () => {
      this.scene.restart()
    })

    // connection.socket.on('gameOver', (winner) => {
    //   this.scene.start(endSceneConfig.key, winner)
    // })
  }

  update() {
    if (this.playerTwoSelectionQueue.length > 0) {
      const index = this.playerTwoSelectionQueue.shift()
      this.handlePlayerTwoCardClick(index)
    }
  }

  match(cardA: Card, cardB: Card) {
    // Add a 1 second delay before removing the cards
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        cardA.destroyCard()
        cardB.destroyCard()
      },
    })

    this.currentStreak++
    store.dispatch(playerOneScore())
    connection.socket.emit('match')
  }

  misMatch(cardA: Card, cardB: Card) {
    // Set time event to flip the cards back after 2 seconds
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        cardA.flip()
        cardB.flip()
        store.dispatch(setFirstPlayerCurrentTurn(false))
      },
    })

    connection.socket.emit('turnOver', this.currentStreak)
    this.currentStreak = 0
    this.currentTurn = false
  }

  handleCardClick(card: Card, player = 1) {
    if (!this.currentTurn) return

    card.flip()
    card.flipped = true

    connection.socket.emit('cardClick', card.index)

    this.currentSelection.push(card)
    if (this.currentSelection.length === 2) {
      const tempCard1 = this.currentSelection[0]
      const tempCard2 = this.currentSelection[1]
      if (tempCard1.cardId === tempCard2.cardId) {
        this.match(tempCard1, tempCard2)
      } else {
        this.misMatch(tempCard1, tempCard2)
      }
      this.currentSelection = []
    }
  }

  handlePlayerTwoCardClick(index: number) {
    const card = this.cards[index]

    card.flip()
    card.flipped = true

    this.playerTwoSelection.push(card)
    if (this.playerTwoSelection.length === 2) {
      const tempCard1 = this.playerTwoSelection[0]
      const tempCard2 = this.playerTwoSelection[1]
      if (tempCard1.cardId === tempCard2.cardId) {
        // Add a 1 second delay before removing the cards
        this.time.addEvent({
          delay: 1000,
          callback: () => {
            tempCard1.destroyCard()
            tempCard2.destroyCard()
            // store.dispatch(playerTwoScore())
          },
        })
      } else {
        // Set time event to flip the cards back after 2 seconds
        this.time.addEvent({
          delay: 1000,
          callback: () => {
            tempCard1.flip()
            tempCard2.flip()
          },
        })
      }
      this.playerTwoSelection = []
    }
  }
}
