import { relay, createWorkflow } from '@relaypro/sdk'
import { Event } from '@relaypro/sdk/dist/enums'
import { fetchOutOfRangeFreezers } from './data'

const app = relay()

app.workflow(createWorkflow(relay => {
  relay.on(Event.START, async () => {
    const outOfRange = await fetchOutOfRangeFreezers()
    if (outOfRange.length === 0) {
      await relay.say(`All freezers are operating normally`)
    } else {
      await relay.say(`${outOfRange.length} freezers are operating abnormally`)
    }
    await relay.terminate()
  })
}))
