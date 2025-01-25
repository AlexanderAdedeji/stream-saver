import { Instagram } from 'lucide-react'
import React from 'react'



interface PlatformHeroInterface {
    icon:string;
    title: string;
    description: string;
}



const PlatformHero = ({description, icon, title}: PlatformHeroInterface) => {
  return (
    <section className="bg-gradient-to-b from-pink-50 to-white py-16">
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex items-center justify-center mb-8">

        {icon}
        {/* <Instagram className="h-12 w-12 text-pink-600 mr-4" /> */}
        <h1 className="text-4xl font-bold text-gray-900">
            {title}
          {/* Instagram Downloader */}
        </h1>
      </div>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
        {description}
        {/*  */}
      </p>
    </div>
  </section>
  )
}

export default PlatformHero