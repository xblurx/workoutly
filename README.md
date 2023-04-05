# Workoutly - a simple app for interval training.

## Build and deploy to device
- `npm run build`
- open xcode, create empty `main.jsbundle` file in Workoutly dir
- `npm run create-jsbundle` (make sure that it is present in Workoutly/ dir)
- xcode -> pods -> React Codegen -> build settings -> ios deployment target -> 12.4 (might be changed later)
- xcode -> Workoutly project -> build phases -> copy bundle resources -> add new item -> assets folder (/ios/assets)
- connect device, xcode build



### Requirements
- The user should be able to add custom intervals to a routine, save it, run a routine,
set up sounds between intervals in the settings. 
- Max memory: as small as possible.
- Max space: as small as possible.
- Maintainability
- Definition of success: a working Timer app, available to download from App Store. Definition of failure is opposite of success accordingly.  

### Architecture
Program organization: in the program there is a store that holds the routines data and store for settings data.
There is a component responsible for gathering a routine intervals, and saving intervals data to a store via actions layer.
There is a component responsible to play a routine which is display a current, past and coming interval.
A building block of the program is a component responsible for display some part of user interface and interactivity.
Communication rules between blocks are properties passing (parent -> child), provider pattern.  
Data design / data organization: todo  
Database organization: todo  
UI design: [figma](https://www.figma.com/file/CmzVG3JR7qomdgHpDHQjTs/Timer?node-id=0%3A1&t=JhaN4exrPQQg5xDr-1)  
Resource management: database connections, etc, todo  
Internationalization/Localization: English only, simple json strings.  
Error Processing: High level error boundary, local error boundaries.  




