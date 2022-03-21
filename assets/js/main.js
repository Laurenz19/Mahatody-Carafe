import Carafe from './models/carafe.js'
import Event from './models/event.js'

let event = new Event(new Carafe(4), new Carafe(3), 2)

event.start()
