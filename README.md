@relaypro/fridge-sample

# fridge-sample

`fridge-sample` a NodeJS server sample that bridges a temperature WiFi sensor and a Relay Workflow.

## TRIGGERS

* Sensor Offline: If the temperature sensor fails to report data at 15 minutes, alert the nearest Relay.
* Sensor Threshold: If the temperature sensor crosses a "too high" or "too low" threshold, alert the nearest Relay.
* Assistant Speech: Relay user can use the Relay Assistant to query status via voice. More details below.

## ALERTS

For both the offline and threshold triggers, the alert should be sent to the nearest Relay device and repeat
until acknowledged by a button tap. The alert content should report TTS information about which freezer is
experiencing the issue and the nature of the issue. For instance

  > Main Freezer temperature is too high at 32 degrees celcius. Tap to acknowledge and accept task.
  > Main Freezer is offline. Tap to acknowledge and accept task.

Once an operator has acknowledged accepted the task they can resolve the issue is by tapping the Relay against
the NFC tag on the Freezer, thus confirming that they went in person to inspect. The Relay prompts for speech input
describing the resolution into the Relay device. The resolution is recorded for future reference.

## STATUS QUERY

Through the Relay Assistant, Query recent data via voice.

* "Status" =>  "All freezers are operating normally"
* "Temperature Main Freezer" => "Main Freezer temperature is 26 degrees Fahrenheit"

# Workflow Configuration

```

```
