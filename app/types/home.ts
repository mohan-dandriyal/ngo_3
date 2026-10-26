export type HeroImage = {
  src: string;
  alt: string;
  badge?: string;
};

export type HeroContent = {
  data: {
    eyebrow: string;
    titleLight: string;
    titleAccent: string;
    description: string;

    primaryBtn: {
      text: string;
      linkTo: string;
    };

    secondaryBtn?: {
      text: string;
      linkTo: string;
    };

    // Right-side image slider
    images: HeroImage[];

    slider?: {
      autoplay?: boolean;
      interval?: number;
    };
  };
};