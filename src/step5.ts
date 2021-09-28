import { relay, createWorkflow } from '@relaypro/sdk'
import { Event } from '@relaypro/sdk/dist/enums'
import { fetchOutOfRangeFreezers } from './data'

const app = relay()

app.workflow(createWorkflow(relay => {
  relay.on(Event.START, async () => {
    await queryAll()
    await relay.terminate()
  })

  const queryAll = async () => {
    console.log(`query all`)
    const outOfRange = await fetchOutOfRangeFreezers()
    if (outOfRange.length === 0) {
      await relay.say(`All freezers are operating normally`)
    } else {
      for (const freezer of outOfRange) {
        await relay.say(`
          ${freezer.name} is operating at an abnormal
          ${freezer.temperature.toFixed(1)} degrees fahrenheit
        `)
      }
    }
  }
}))
