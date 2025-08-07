
  export default function MapCard() {
    return (
      <div className="w-full bg-white rounded-xl shadow-lg p-4 flex flex-col items-center">
        <iframe
          title="Yogyakarta Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63344.98207396444!2d110.328797!3d-7.795579!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a578c1b1e1e2b%3A0x401e8f1fc28c6e0!2sYogyakarta!5e0!3m2!1sen!2sid!4v1691500000000!5m2!1sen!2sid"
          width="100%"
          height="500"
          style={{ border: 0, borderRadius: '12px' }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    );
  }

