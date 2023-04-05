import { useEffect, useState } from 'react';
import { workoutEnd, changeStep } from '../components/sounds';
import { Audio } from 'expo-av';

type SoundName = 'workoutEnd' | 'changeStep';

type Sounds = Record<
    SoundName,
    { src: Audio.Sound; play: () => Promise<unknown> }
>;

const soundMap = {
    workoutEnd,
    changeStep,
};

const useSound = () => {
    const [sounds, setSounds] = useState<Sounds>({} as Sounds);

    useEffect(() => {
        const loadSounds = async () => {
            await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });

            try {
                for await (const [key, src] of Object.entries(soundMap)) {
                    const { sound } = await Audio.Sound.createAsync(src);
                    const play = async () => {
                        try {
                            await sound.replayAsync();
                        } catch (error) {
                            console.warn('Sound error: ', { error });
                        }
                    };

                    setSounds(prev => ({
                        ...prev,
                        [key]: { src: sound, play },
                    }));
                }
            } catch (error) {
                console.log('Error loading sounds: ', error);
            }
        };

        loadSounds();

        return () => {
            for (let sound of Object.values(sounds)) {
                if (sound) sound.src.unloadAsync();
            }
        };
    }, []);

    return sounds;
};

export default useSound;
