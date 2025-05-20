// utils/videoUtils.ts
export const convertShortsToEmbed = (shortsUrl: string, autoplay = true): string => {
    const videoId = shortsUrl.split('/shorts/')[1]?.split('?')[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0
      }&mute=0&controls=0&modestbranding=1&rel=0&playsinline=1`;
  };
