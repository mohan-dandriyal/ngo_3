import Hero from './components/home/Hero';
import home from "@/app/data/home.json";
import blog from '@/app/data/blog.json';

import HomeAbout from './components/home/HomeAbout';
import HomePrograms from './components/home/Homeprograms ';
import HomeCauses from './components/home/Homecauses';
import HomeBlog from './components/home/Homeblog';
import HomeTestimonials from './components/home/Hometestimonials';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-[#faf8f5] font-sans">
      <Hero
        data={{
          ...home.hero.slides[0],
          images: home.hero.slides,
          slider: home.hero.slider,
        }}
      />

      <div className="w-full">
        <HomeAbout data={home.homeAbout} />
      </div>

      <div className="w-full border-t border-[#ede7dc]">
        <HomePrograms data={home.homePrograms} />
      </div>

      <div className="w-full border-t border-[#ede7dc]">
        <HomeCauses data={home.homeCause} />
      </div>

      <div className="w-full border-t border-[#ede7dc]">
        <HomeTestimonials data={home.testimonials} />
      </div>

      <div className="w-full border-t border-[#ede7dc]">
        <HomeBlog data={blog.blog} />
      </div>
    </div>
  );
}
