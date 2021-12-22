export const fade = ({current}: any) => {
  return {
    cardStyle: {
      opacity: current.progress,
    },
  };
};
