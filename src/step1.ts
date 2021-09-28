import { relay, createWorkflow } from '@relaypro/sdk'
import { Event } from '@relaypro/sdk/dist/enums'

const app = relay()

app.workflow(createWorkflow(relay => {
  relay.on(Event.START, async () => {
    await relay.say(`hello world`)
    await relay.terminate()
  })
}))
