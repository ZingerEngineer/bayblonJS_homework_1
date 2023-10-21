import * as BABYLON from 'babylonjs'
export class AppOne {
  engine: BABYLON.Engine
  scene: BABYLON.Scene

  constructor(readonly canvas: HTMLCanvasElement) {
    this.engine = new BABYLON.Engine(canvas)
    window.addEventListener('resize', () => {
      this.engine.resize()
    })
    this.scene = createScene(this.engine, this.canvas)
  }

  debug(debugOn: boolean = true) {
    if (debugOn) {
      this.scene.debugLayer.show({ overlay: true })
    } else {
      this.scene.debugLayer.hide()
    }
  }

  run() {
    this.debug(true)
    this.engine.runRenderLoop(() => {
      this.scene.render()
    })
  }
}

var createScene = function (engine: BABYLON.Engine, canvas: HTMLCanvasElement) {
  var scene = new BABYLON.Scene(engine)
  var camera = new BABYLON.FreeCamera(
    'camera1',
    new BABYLON.Vector3(0, 5, -10),
    scene
  )
  camera.setTarget(BABYLON.Vector3.Zero())
  camera.attachControl(canvas, true)

  var light = new BABYLON.HemisphericLight(
    'light',
    new BABYLON.Vector3(0, 1, 0),
    scene
  )

  light.intensity = 0.7

  var blueMaterial = new BABYLON.StandardMaterial('Blue Material', scene)
  blueMaterial.alpha = 1
  blueMaterial.diffuseColor = new BABYLON.Color3(0, 0, 1)

  var redMaterial = new BABYLON.StandardMaterial('Red Material', scene)
  redMaterial.alpha = 1
  redMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0)

  var blueArrowHand = BABYLON.MeshBuilder.CreateCylinder(
    'blue-cylinder',
    {
      height: 5,
      diameter: 2
    },
    scene
  )
  blueArrowHand.material = redMaterial

  var cone = BABYLON.MeshBuilder.CreateCylinder(
    'cone',
    {
      height: 5,
      diameterTop: 0,
      diameterBottom: 2
    },
    scene
  )
  cone.material = redMaterial
  var cone = BABYLON.MeshBuilder.CreateCylinder(
    'cone',
    {
      height: 5,
      diameterTop: 0,
      diameterBottom: 2
    },
    scene
  )
  cone.material = redMaterial
  return scene
}
