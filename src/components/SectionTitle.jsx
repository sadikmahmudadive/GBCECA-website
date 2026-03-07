const SectionTitle = ({ subtitle, title, description, light = false, center = true }) => {
  return (
    <div className={`max-w-3xl ${center ? 'mx-auto text-center' : ''} mb-14 md:mb-18`}>
      {subtitle && (
        <span className={`inline-block text-sm font-semibold tracking-[0.2em] uppercase mb-4 ${light ? 'text-accent-300' : 'text-accent-500'}`}>
          {subtitle}
        </span>
      )}
      <h2 className={`text-3xl md:text-4xl lg:text-[2.75rem] font-bold mb-5 leading-tight ${light ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h2>
      {description && (
        <p className={`text-lg leading-relaxed ${light ? 'text-white/80' : 'text-gray-600'}`}>
          {description}
        </p>
      )}
      <div className={`mt-6 h-1 w-24 ${center ? 'mx-auto' : ''} rounded-full bg-linear-to-r from-primary-600 via-accent-400 to-accent-500`} />
    </div>
  );
};

export default SectionTitle;
