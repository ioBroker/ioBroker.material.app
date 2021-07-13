## Settings
- Local URL: "http://localhost:8082"
- Checkbox: Remote access via ioBroker.pro
  - ioBroker.pro email,
  - ioBroker.pro password
  - Local SSID: "actual WiFi" [Use current]

 ## Logic
  - By activation 
   - Check if pro available
   - If yes, check SSID 
        - If current SSID === saved SSID => use local URL
        - If not => https://iobroker.pro/material?user=aaaa&pass=blbla

## img
wifi https://www.flaticon.com/free-icon/wifi_159599?term=wifi&page=1&position=7
see https://www.flaticon.com/free-icon/eye-closeup_63786?term=see&page=1&position=15&page=1&position=15&related_id=63786&origin=search