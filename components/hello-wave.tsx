import Animated from 'react-native-reanimated';

export function HelloWave() {
  return (
    <Animated.Text
      style={{
        fontSize: 50,
        lineHeight: 60,
        marginTop: -6,
        animationName: {
          '50%': { transform: [{ rotate: '25deg' }] },
        },
        animationIterationCount: 4,
        animationDuration: '300ms',
      }}>
        ❤️
    </Animated.Text>
  );
}
