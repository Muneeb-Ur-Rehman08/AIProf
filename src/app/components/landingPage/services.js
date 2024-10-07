import React from 'react';

const Services = () => {
  return (
	<section className="services services-boxed mega-section  text-center" id="services">
		<div className="container">
			<div className="sec-heading">
				<div className="content-area">
					<h2 className="title wow fadeInUp" data-wow-delay=".2s">Our Services</h2>
					<p className="subtitle wow fadeInUp " data-wow-delay=".4s">

					</p>
				</div>
                <div className="cta-links-area wow fadeInUp " data-wow-delay=".4s justify-content-center">
                    <a id="toggleButton2" className="btn-outline cta-link cta-link-primary" href="https://www.youtube.com/watch?v=VbZe2mliU5w" target="_blank" alt="what is AI Prof video">
                        Demo Video <i className="bi bi-arrow-right icon "></i>
					</a>
                </div>
			</div>
			<div className="row gx-4 gy-4 services-row ">
				<div className="col-12 col-md-6  col-lg-4 mx-auto ">
					{/* <!--Start First service box--> */}
					<div className="box service-box  wow fadeInUp reveal-start" data-wow-offset="0" data-wow-delay=".1s">
						<div className="service-icon"><i className="flaticon-calendar font-icon"></i></div><span
							className="service-num hollow-text">1 </span>
						<div className="service-content">
							<h3 className="service-title">Customized learning</h3>
						</div>
					</div>
					{/* <!-- End First service box   --> */}
				</div>
				<div className="col-12 col-md-6  col-lg-4 mx-auto ">
					{/* <!--Start Second service box--> */}
					<div className="box service-box  wow fadeInUp reveal-start" data-wow-offset="0" data-wow-delay=".2s">
						<div className="service-icon"><i className="flaticon-book font-icon"></i></div><span
							className="service-num hollow-text">2 </span>
						<div className="service-content">
							<h3 className="service-title">Infinite Topics</h3>
						</div>
					</div>
					{/* <!-- End Second service box--> */}
				</div>
				<div className="col-12 col-md-6  col-lg-4 mx-auto">
					{/* <!--Start Third service box--> */}
					<div className="box service-box  wow fadeInUp reveal-start" data-wow-offset="0" data-wow-delay=".3s">
						<div className="service-icon"><i className="flaticon-nanotechnology font-icon"></i></div><span
							className="service-num hollow-text">3 </span>
						<div className="service-content">
							<h3 className="service-title">AI-Driven Solutions</h3>
						</div>
					</div>
					{/* <!-- End Third service box--> */}
				</div>
				<div className="col-12 col-md-6 col-lg-4 mx-auto">
					{/* <!--Start fourth service box--> */}
					<div className="box service-box  wow fadeInUp reveal-start" data-wow-offset="0" data-wow-delay=".4s">
						<div className="service-icon"><i className="flaticon-clipboard font-icon"></i></div><span
							className="service-num hollow-text">4 </span>
						<div className="service-content">
							<h3 className="service-title">Immediate Assessment</h3>
						</div>
					</div>
					{/* <!-- End fourth service box   --> */}
				</div>
				<div className="col-12 col-md-6  col-lg-4 mx-auto  ">
					{/* <!--Start 5th service box--> */}
					<div className="box service-box  wow fadeInUp reveal-start" data-wow-offset="0" data-wow-delay=".5s">
						<div className="service-icon"><i className="flaticon-medal font-icon"></i></div><span
							className="service-num hollow-text">5 </span>
						<div className="service-content">
							<h3 className="service-title">Available 24/7</h3>
						</div>
					</div>
					{/* <!-- End 5th service box--> */}
				</div>
				<div className="col-12 col-md-6  col-lg-4 mx-auto  ">
					{/* <!--Start 6th service box--> */}
					<div className="box service-box  wow fadeInUp  reveal-start" data-wow-offset="0" data-wow-delay=".6s">
						<div className="service-icon"><i className="flaticon-growth font-icon"></i></div><span
							className="service-num hollow-text">6 </span>
						<div className="service-content">
							<h3 className="service-title">Increased Productivity</h3>
						</div>
					</div>
					{/* <!-- End 6th service box--> */}
				</div>
			</div>
		</div>
	</section>
  );
};

export default Services;