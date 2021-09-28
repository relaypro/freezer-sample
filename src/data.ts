import { axios } from './api'

const FREEZERS: Record<string, string> = {
  [`33723`]: `main`,
  [`33724`]: `ice cream`,
}

type RawChannel = {
  channel_id: string,
  last_values: string,
}

type RawData = {
  channels: RawChannel[],
}

type Freezer = {
  id: string,
  name: string,
  temperature: number,
}

type Results = {
  success: boolean,
  freezers?: Freezer[],
}

const UPPER_LIMIT = 25
const LOWER_LIMIT = 22

export const fetchFreezers = async (): Promise<Results> => {
  try {
    const { status, data } = await axios.get<RawData>(`https://api.ubibot.com/channels?token_id=abc`)
    if (status !== 200) {
      return { success: false }
    } else {
      const freezers = data.channels.map(channel => {
        const values = JSON.parse(channel.last_values)
        const { field1: temperature } = values
        return {
          id: channel.channel_id,
          name: FREEZERS[channel.channel_id] ?? `unknown`,
          temperature: temperature.value,
        }
      })
      return { success: true, freezers }
    }
  } catch (err) {
    console.error(`failed to fetch data`, err)
    return { success: false }
  }
}

export const fetchOutOfRangeFreezers = async (): Promise<Freezer[]> => {
  const { success, freezers } = await fetchFreezers()
  if (!success) {
    throw new Error(`failed-to-fetch-freezers`)
  } else {
    const outOfRange = freezers?.filter(({ temperature }) => temperature < LOWER_LIMIT || temperature > UPPER_LIMIT)
    if (!outOfRange || outOfRange?.length === 0) {
      return []
    } else {
      return outOfRange
    }
  }
}

export const fetchFreezerByName = async (name?: string): Promise<Freezer> => {
  console.log(`fetchFreezerByName =>`, name)
  if (name) {
    const { success, freezers } = await fetchFreezers()
    if (!success) {
      throw new Error(`failed-to-fetch-freezer`)
    }
    const freezer = freezers?.find(({ name: _name }) => ( _name.toLowerCase() === name.toLowerCase() || soundex(_name) === soundex(name) ))
    if (freezer) {
      return freezer
    } else {
      throw new Error(`failed-to-find-channel`)
    }
  } else {
    throw new Error(`undefined-id`)
  }
}

const codes: Record<string, string> = {
  a: ``, e: ``, i: ``, o: ``, u: ``,
  b: `1`, f: `1`, p: `1`, v: `1`,
  c: `2`, g: `2`, j: `2`, k: `2`, q: `2`, s: `2`, x: `2`, z: `2`,
  d: `3`, t: `3`,
  l: `4`,
  m: `5`, n: `5`,
  r: `6`
}

export const soundex = (s: string): string | null => {
  const a = s.toLowerCase().split(``)
  const f = a.shift()
  if (f) {
    const first = codes[f]

    const r =  f + a
      .map((v) => (codes[v]))
      .filter((v, i, a) => ((i === 0) ? v !== first : v !== a[i - 1]))
      .join(``)

    return (r + `000`).slice(0, 4).toUpperCase()
  }

  return null

}
