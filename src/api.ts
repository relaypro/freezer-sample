import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const shouldMock = (mockData: string | undefined) => mockData !== undefined && (mockData === `1` || mockData === `true`)

if (shouldMock(process.env.MOCK_DATA)) {
  const mock = new MockAdapter(axios)
  mock.onGet(`https://api.ubibot.com/channels?token_id=abc`).reply(200, {
    channels: [{
      channel_id: `33723`,
      last_values: JSON.stringify({
        field1: {
          value: 22,
        }
      })
    }, {
      channel_id: `33724`,
      last_values: JSON.stringify({
        field1: {
          value: 25.1,
        }
      })
    }]
  })
}

export {
  axios,
}
