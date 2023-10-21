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
  redMaterial.diffuseColor = new BABYLON.Color3(1.0, 0, 0)

  var greenMaterial = new BABYLON.StandardMaterial('Green Material', scene)
  greenMaterial.alpha = 1
  greenMaterial.diffuseColor = new BABYLON.Color3(0, 1, 0)

  var redBox = BABYLON.MeshBuilder.CreateBox(
    'red-box',
    {
      width: 3,
      height: 3,
      depth: 3
    },
    scene
  )
  redBox.material = redMaterial
  var blueBox = BABYLON.MeshBuilder.CreateBox(
    'blue-box',
    {
      width: 3,
      height: 3,
      depth: 3
    },
    scene
  )
  blueBox.material = blueMaterial
  var greenBox = BABYLON.MeshBuilder.CreateBox(
    'blue-box',
    {
      width: 3,
      height: 3,
      depth: 3
    },
    scene
  )
  greenBox.material = greenMaterial
  return scene
}
