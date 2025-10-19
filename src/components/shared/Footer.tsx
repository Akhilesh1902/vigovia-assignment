const Footer = () => {
  return (
    <div className="flex p-10 justify-between items-center">
      <div>
        <h2>
          <strong>Vigovia tech pvt. ltd</strong>
        </h2>
        <p>
          Registered Office: Hd-109 Cinnabar Hills,
          <br /> Links Business Park, Karnataka, India.
        </p>
      </div>
      <div>
        <p>
          <strong> Phone:</strong> +91-9504061112
        </p>
        <p>
          <strong> Email ID:</strong> utkarsh@vigovia.com
        </p>
        <p>
          <strong> CIN:</strong> U79110KA2024PTC191890
        </p>
      </div>
      <div className="w-32">
        <img
          src="./logo.png"
          alt="logo_img"
        />
      </div>
    </div>
  );
};

export default Footer;
