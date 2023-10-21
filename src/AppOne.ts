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

  var yellowMaterial = new BABYLON.StandardMaterial('Yellow Material', scene)
  yellowMaterial.alpha = 1
  yellowMaterial.diffuseColor = new BABYLON.Color3(1, 1, 0)

  var redMaterial = new BABYLON.StandardMaterial('Red Material', scene)
  redMaterial.alpha = 1
  redMaterial.diffuseColor = new BABYLON.Color3(1.0, 0, 0)

  var blackMaterial = new BABYLON.StandardMaterial('Red Material', scene)
  blackMaterial.alpha = 1
  blackMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0)

  var planeMaterial = new BABYLON.StandardMaterial('Plane Material', scene)
  planeMaterial.alpha = 1
  planeMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1)

  var redCone = BABYLON.MeshBuilder.CreateCylinder(
    'red-cone',
    {
      diameterBottom: 3,
      height: 3,
      diameterTop: 0
    },
    scene
  )
  redCone.material = redMaterial
  var yelloFace = BABYLON.MeshBuilder.CreateSphere(
    'yellow-face',
    {
      diameter: 3
    },
    scene
  )
  yelloFace.material = yellowMaterial

  var eyeRight = BABYLON.MeshBuilder.CreateSphere(
    'eye-right',
    {
      diameter: 1
    },
    scene
  )
  eyeRight.material = blackMaterial

  var eyeLeft = BABYLON.MeshBuilder.CreateSphere(
    'eye-right',
    {
      diameter: 1
    },
    scene
  )
  eyeLeft.material = blackMaterial

  var nose = BABYLON.MeshBuilder.CreateSphere(
    'nose',
    {
      diameter: 1
    },
    scene
  )
  nose.material = redMaterial

  var body = BABYLON.MeshBuilder.CreateSphere(
    'body',
    {
      diameter: 5
    },
    scene
  )
  body.material = redMaterial

  var Plane = BABYLON.MeshBuilder.CreatePlane(
    'plane',
    {
      width: 5,
      height: 5
    },
    scene
  )
  Plane.material = planeMaterial
  return scene
}
