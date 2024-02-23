import mitt, { type Emitter } from 'mitt'

type MyEvents = {
  editorTitle: string
}

const bus: Emitter<MyEvents> = mitt<MyEvents>()

export default bus
