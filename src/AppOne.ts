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

  var YellowSphere = BABYLON.MeshBuilder.CreateSphere(
    'yellow-sphere',
    {
      diameterX: 1,
      diameterY: 0.8,
      diameterZ: 1
    },
    scene
  )
  YellowSphere.material = yellowMaterial
  //(x−x0)2+(y−y0)2+(z−z0)2=r2
  //   const meshInstance = (meshToDublicate: BABYLON.Mesh) => {
  //     for (let i = 0; i < 100; i++) {
  //       let newInstance = meshToDublicate.createInstance(meshToDublicate.name + i)

  //       //   newInstance.rotation.x = meshToDublicate.rotation.x + i / 10
  //       //   newInstance.rotation.y = meshToDublicate.rotation.y + i / 10
  //       //   newInstance.rotation.z = meshToDublicate.rotation.z + i / 10

  //       newInstance.position.x = meshToDublicate.position.x + i / 10
  //       newInstance.position.y = meshToDublicate.position.y + i / 10
  //       newInstance.position.z = meshToDublicate.position.z + i / 10
  //     }
  //   }
  //   meshInstance(YellowSphere)
  const arrayRange = (start: number, stop: number, step: number) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (value, index) => start + index * step
    )
  const twoDeeCircleDraw = (
    meshToDublicate: BABYLON.Mesh,
    diameter: number
  ) => {
    if (diameter <= 0) throw new Error('Inavlid diameter value.')
    const coordinatesYArrayHalf1 = arrayRange(-diameter / 2, 0 / 2, 0.5)
    const coordinatesYArrayHalf2 = arrayRange(1 / 2, diameter / 2, 0.5)
    const coordinatesYArray = [
      ...coordinatesYArrayHalf1,
      ...coordinatesYArrayHalf2
    ]
    console.log(coordinatesYArray)

    for (let i = 0; i < coordinatesYArray.length - 1; i++) {
      let newInstance = meshToDublicate.createInstance(meshToDublicate.name + i)
      let newYCoordinate = coordinatesYArray[i]
      newInstance.position.y = newYCoordinate
      newInstance.position.x = Math.sqrt(
        Math.pow(diameter, 2) - Math.pow(newYCoordinate, 2)
      )
      console.log(Math.pow(diameter, 2) - Math.pow(newYCoordinate, 2))
    }
  }
  twoDeeCircleDraw(YellowSphere, 10)
  return scene
}
