import { relay, createWorkflow } from '@relaypro/sdk'
import { Event } from '@relaypro/sdk/dist/enums'

import { fetchOutOfRangeFreezers } from './data'

const app = relay()

app.workflow(createWorkflow(relay => {
  relay.on(Event.START, async () => {
    const outOfRange = await fetchOutOfRangeFreezers()
    await relay.say(`number of out of range freezers is ${outOfRange.length}`)
    await relay.terminate()
  })
}))
