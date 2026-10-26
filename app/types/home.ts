
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
    secondaryBtn: {
      text: string;
      linkTo: string;
    };
    image: {
      src: string;
      alt: string;
      counter: string;
      location: string;
    };
    badge: string;
  }
};

export type HomeAboutContent = {
  data: {
    eyebrow: string;
    titleLight: string;
    titleAccent: string;
    description: string;
    linkText: string;
    linkTo: string;
  }
};

export type HomeProgramsContent = {
  data: {
    eyebrow: string;
    titleStart: string;
    titleAccent: string;
    titleEnd: string;
    meta: string;
    programs: Program[];
  }
};

export type Program = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  theme: string;
  linkText: string;
  linkTo: string;
};

export type themes = {

  card: string;
  title: string;
  desc: string;
  link: string;
}


export type Cause = {
  title: string;
  description: string;
  category?: string;
  image: string;
  imageAlt?: string;
  raised: number;
  goal: number;
  currency?: string;
  linkText?: string;
  linkTo?: string;
};

export type HomeCausesContent = {
  data: {
    eyebrow: string;
    titleStart: string;
    titleAccent: string;
    titleEnd: string;
    description: string;
    linkText: string;
    linkTo: string;
    causes: {
      title: string;
      description: string;
      category: string;
      image: string;
      imageAlt: string;
      linkText: string;
      linkTo: string;
    }[];
  }
};

export type Post = {
  title: string;
  excerpt?: string;
  category?: string;
  date?: string;
  readTime?: string;
  image: string;
  imageAlt?: string;
  linkTo?: string;
};

export type HomeBlogContent = {
  data: {
    eyebrow?: string;
    titleStart: string;
    titleAccent: string;
    titleEnd?: string;
    linkText?: string;
    linkTo?: string;
    posts: Post[];
  };
};

export type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  image?: string;
  imageAlt?: string;
};

export type HomeTestimonialsContent = {
  data: {
    eyebrow?: string;
    titleStart: string;
    titleAccent: string;
    titleEnd?: string;
    testimonials: Testimonial[];
  };
};