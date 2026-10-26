import Hero from './components/home/Hero';
import home from "@/app/data/home.json";
import blog from '@/app/data/blog.json'

import HomeAbout from './components/home/HomeAbout';
import HomePrograms from './components/home/Homeprograms ';
import HomeCauses from './components/home/Homecauses';
import HomeBlog from './components/home/Homeblog';
import HomeTestimonials from './components/home/Hometestimonials';



export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Hero data={home.hero} />

      <div className='bg-[#e8e1d5] w-full'>
        <HomeAbout data={home.homeAbout} />
      </div>

      <div className='bg-[#0a0a09] w-full py-20'>
        <HomePrograms
          data={{
            ...home.homePrograms,
            programs: home.homePrograms.programs.map((program) => ({
              ...program,
              linkText: 'Learn more',
              linkTo: '/programs',
            })),
          }}
        />
      </div>

      <div className='bg-[#e8e1d5] w-full'>
        <HomeCauses
          data={{
            ...home.homeCause,
            causeItem: home.homeCause.causes.map((cause) => ({
              ...cause,
              raised: 0,
              goal: 0,
            })),
          }}
        />
      </div>

      <div className='bg-[#17261e] w-full'>
        <HomeTestimonials data={home.testimonials} />
      </div>

      <div className='bg-[#0a0a09] w-full'>
        <HomeBlog data={blog.blog} />
      </div>
    </div>
  );
}
