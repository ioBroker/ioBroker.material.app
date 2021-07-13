export const forModal = ({current, next}) => {
  return {
    cardStyle: {
      opacity: next
        ? next.progress.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 0.5, 0],
          })
        : current.progress.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0.5, 1],
          }),
      transform: [
        {
          scale: current
            ? current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              })
            : 1,
        },
      ],
    },
  };
};
