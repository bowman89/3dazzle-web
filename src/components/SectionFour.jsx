function SectionFour() {
  return (
<section className="relative pt-24 pb-24 flex items-center justify-center bg-dark bg-fixed bg-center bg-cover">
  <div className="max-w-5xl w-full mx-auto px-4">
    <div className="mb-8">
      <p className="!text-sm !font-semibold text-gold mb-2">FÅ HJÆLP OG SUPPORT</p>
      <h2 className="text-3xl font-bold mb-2 text-white">Vi er her for at hjælpe dig med dit projekt</h2>
    </div>
    {/* Form */}
    <form className="w-full">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Venstre kolonne */}
        <div className="flex-1 flex flex-col gap-4">
          <div>
            <label className="block font-semibold mb-1 text-white">Navn<span className="text-gold">*</span></label>
            <input type="text" required className="w-full rounded bg-dark-gray border border-gray-700 px-4 py-3 text-white focus:outline-none" placeholder="Fulde navn*" />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-white">E-mail<span className="text-gold">*</span></label>
            <input type="email" required className="w-full rounded bg-dark-gray border border-gray-700 px-4 py-3 text-white focus:outline-none" placeholder="din@mail.dk" />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-white">Telefon<span className="text-gold">*</span></label>
            <input type="tel" required className="w-full rounded bg-dark-gray border border-gray-700 px-4 py-3 text-white focus:outline-none" placeholder="+45" />
          </div>
        </div>
        {/* Højre kolonne */}
        <div className="flex-1 flex flex-col">
          <label className="block font-semibold mb-1 text-white">Message</label>
          <textarea rows={8} required className="w-full h-full rounded bg-dark-gray border border-gray-700 px-4 py-3 text-white focus:outline-none resize-none" placeholder="Din besked..." />
        </div>
      </div>
      {/* Checkbox + Submit (på én linje) */}
      <div className="flex flex-col items-center justify-center gap-2 mt-6 w-full">
  <label className="flex items-center text-sm text-gray-200 justify-center">
    <input type="checkbox" required className="accent-gold mr-2" />
    Jeg accepterer, at I må kontakte mig på baggrund af min henvendelse. <span className="text-gold ml-1">*</span>
  </label>
  <button type="submit" className="bg-gold hover:bg-yellow-600 transition-colors text-dark font-semibold px-8 py-3 rounded w-full md:w-auto mt-4">
    SUBMIT
  </button>
</div>


    </form>
  </div>
</section>

  );
}

export default SectionFour;
