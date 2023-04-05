module.exports = {
    Audio: {
        Sound: {
            createAsync: () => ({ sound: { replayAsync: jest.fn, unloadAsync: jest.fn } })
        },
        setAudioModeAsync: jest.fn
    }
}
