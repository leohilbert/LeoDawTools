# LeoDawTools
https://leo-daw-tools.netlify.app/

This app contains a collection of tools to help you make music.
Currently it only contains a Midi-Remap tool, but this will change as soon as I need more! :)

## Midi Remap
Allows you to easily map drum-midis from one note-map to another. Simply drop in your Pitchmaps and drag&drop the source-notes upon the target-notes.
If your Pitchmap is not supported yet, please open an issue with an example PitchMap you want to use and I will try to integrate it.

### Currently supported PitchMaps:
* Studio One 
  * Location: C:\Users\USERNAME\Documents\Studio One\Presets\User Presets\Pitch Names
  
### Nodes
- if notes in your Source-MIDI are not mapped to any target-value, 
  it will be mapped to the highest note possible (G8/127). If you need to use that note let me know, 
  and I will find another solution. :)
  
This is my first React or Express project, so feedback is always welcome!
