
export type AboutHeroContent = {
    data: {
        breadcrumb?: { label: string; linkTo?: string }[];
        eyebrow?: string;
        titleStart: string;
        titleAccent: string;
        description?: string;
        linkText?: string;
        linkTo?: string;
        image?: { src: string; alt?: string };
        stats?: { value: number; label: string; prefix?: string; suffix?: string; plain?: boolean }[];
    };
};


export interface MissionItem {
    number: string;
    title: string;
    description: string;
}

export interface MissionImage {
    src: string;
    alt: string;
}

export type Mission = {
    missionPoints : {
        eyebrow?: string;
        titleStart: string;
        titleAccent: string;
        description?: string;
        linkText?: string;
        linkTo?: string;
        listLabel?: string;
        image?: { src: string; alt?: string; captionLabel?: string; caption?: string };
        items?: { number?: string; title: string; description: string }[];
    }
};



export interface VisionImage {
  src: string;
  alt: string;
}

export interface VisionHighlight {
  number: string;
  title: string;
  description: string;
}

export interface Vision {
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  description: string;
  image: VisionImage;
  tag: string;
  highlights: VisionHighlight[];
  linkText: string;
  linkTo: string;
  imageCaption : string
}

export interface JoinMissionImage {
  src: string;
  alt: string;
}

export interface JoinMissionButton {
  text: string;
  link: string;
}

export interface JoinMission {
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  description: string;
  image: JoinMissionImage;
  imageCaption: string;
  primaryButton: JoinMissionButton;
  secondaryButton: JoinMissionButton;
  bottomNote: string;
  footerText: string;
}
