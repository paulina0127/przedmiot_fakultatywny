const LayoutAuth = ({ children, bgImage }) => {
  const bgImageStyle = {
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundImage: `url(${bgImage})`,
  };

  return (
    <div className="container-fluid">
      <div className="row no-gutter">
        <div className="col-lg-4 col-12 d-grid align-items-center justify-items-center auth-section bg-white">
          {children}
        </div>
        <div className="col-lg-8 d-none d-lg-flex" style={bgImageStyle}></div>
      </div>
    </div>
  );
};

export default LayoutAuth;
