# rn-voipcall
This is a playground application for Android that aims to do the following:
- Show incoming call UI (likely after receiving a data/non-data notification)
  - depending on the device situation (locked, killed, etc)
- Send socket events
  - when accepting
  - when rejecting
 
### Why am I not using `react-native-callkeep`
- Mostly because of the permissions required just to setup a self-managed service?
- Because I 100% don't know what I'm doing and would like to understand from scratch
