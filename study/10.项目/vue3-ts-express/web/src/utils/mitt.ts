import mitt, { type Emitter } from 'mitt'

type MyEvents = {
  editorTitle: number
}

const bus: Emitter<MyEvents> = mitt<MyEvents>()

export default bus
