import React from "react";

export default function DireccionSection() {
  const mapLink =
    "https://www.google.com/maps/place/Licorer%C3%ADa+Spondylus/@-0.2101856,-78.401727,18.09z/data=!4m6!3m5!1s0x91d5910059e2bc93:0x8498fb8684965190!8m2!3d-0.2093466!4d-78.4016459!16s%2Fg%2F11lds01shb?entry=ttu";

  return (
    <section className="max-w-[1200px] mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-[1.2rem] lg:text-[1.6rem]  font-bold lg:font-semibold ">
          Dirección
        </h2>
        <p className="text-[.8rem] border-[1px] border-gray-200 text-gray-500 hover:text-gray-800 px-4 rounded-[4px]">
          Ver en
          <a target="_blank" referrerPolicy="no-referrer" href={mapLink}>
            <span className="underline ">google maps</span>
          </a>
        </p>
      </div>
      <div className="flex flex-col  text-[.8rem]">
        <p className="mb-1">
          Tumbaco intersección entre Gonzalo Pizarro y Gonzalo Meneses.
        </p>
        <a target="_blank" referrerPolicy="no-referrer" href={mapLink}>
          <iframe
            onTouchMove={() => blur()}
            onFocus={() => blur()}
            className="w-full lg:h-[550px] h-[400px] mb-2 border-0 border-gray-100 outline-none focus:outline-none"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d498.723955091913!2d-78.40140038846633!3d-0.2095323254906829!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d5910059e2bc93%3A0x8498fb8684965190!2sLicorer%C3%ADa%20Spondylus!5e0!3m2!1ses-419!2sec!4v1712890100485!5m2!1ses-419!2sec"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </a>
      </div>
    </section>
  );
}
