input.onButtonPressed(Button.A, function () {
    bird.change(LedSpriteProperty.Y, -1)
    music.play(music.createSoundExpression(WaveShape.Sine, 207, 948, 255, 255, 150, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
})
input.onButtonPressed(Button.B, function () {
    bird.change(LedSpriteProperty.Y, 1)
    music.play(music.createSoundExpression(WaveShape.Sine, 200, 600, 255, 255, 150, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
})
let ticks = 0
let score = 0
let bird: game.LedSprite = null
let obstacles: game.LedSprite[] = []
let emptyObstacleY = randint(0, 4)
let gameSpeed = 1000
bird = game.createSprite(0, 2)
bird.set(LedSpriteProperty.Blink, 300)
game.setScore(score)
basic.showIcon(IconNames.Duck)
music.play(music.builtinPlayableSoundEffect(soundExpression.hello), music.PlaybackMode.InBackground)
basic.forever(function () {
    while (obstacles.length > 0 && obstacles[0].get(LedSpriteProperty.X) == 0) {
        obstacles.removeAt(0).delete()
    }
    for (let obstacle of obstacles) {
        obstacle.change(LedSpriteProperty.X, -1)
    }
    if (ticks % 3 == 0) {
        emptyObstacleY = randint(0, 4)
        for (let index = 0; index <= 4; index++) {
            if (index != emptyObstacleY) {
                obstacles.push(game.createSprite(4, index))
            }
        }
    }
    for (let obstacle of obstacles) {
        // basic.showNumber(score)
        if (obstacle.get(LedSpriteProperty.X) == bird.get(LedSpriteProperty.X) && obstacle.get(LedSpriteProperty.Y) == bird.get(LedSpriteProperty.Y)) {
            music.play(music.builtinPlayableSoundEffect(soundExpression.giggle), music.PlaybackMode.UntilDone)
            game.gameOver()
        }
    }
    ticks += 1
    score += 1
    game.setScore(score)
    gameSpeed += -1
    music.play(music.createSoundExpression(WaveShape.Triangle, 300, 200, 255, 255, 100, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    basic.pause(gameSpeed)
})
