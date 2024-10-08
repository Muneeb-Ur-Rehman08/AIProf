const Pricing = () => {
  return (
    <section className="pricing mega-section  " id="pricing">
		<div className="container">
			<div className="sec-heading  ">
				<div className="content-area">
					<h2 className=" title wow fadeInUp text-center" data-wow-delay=".2s"><span className='hollow-text'>affordable</span>
						pricing plans</h2>
				</div>
				<div className=" cta-area   wow fadeInUp" data-wow-delay=".6s"><a className="cta-btn btn-solid    "
						href="#contact-us">Get in touch<i className="bi bi-arrow-right icon "></i></a></div>
			</div>
			<div className="row">
				<div className="col-12  col-md-6 col-xl-3  mx-auto price-plan ">
					<div className="plan featured   wow fadeInUp  " data-wow-delay=".1s ">
						<div className="plan-head"><i className="flaticon-nft-1 plan-icon"></i>
							<h4 className="plane-name">Free Plan</h4>
							<div className="plan-price" style={{height: "90px"}}>
								<h3 className="price">Forever</h3>
							</div>
						</div>

						<div className="plan-details" style={{marginTop: "30px"}}>
							<ul className="plan-list">
								<li className="plan-feat">
									<span className="feat-text">Ask Me Anything About Learning</span>
								</li>
							</ul>
						</div>
						<div className="plan-cta" style={{marginTop: "60px"}}><a className="cta-btn btn-outline " href="#ask-social">Try Now</a></div>
					</div>
				</div>
				<div className="col-12  col-md-6 col-xl-3  mx-auto price-plan ">
					<div className="plan    wow fadeInUp  " data-wow-delay=".3s ">
						<div className="plan-head"><i className="flaticon-virtual-reality plan-icon"></i>
							<h4 className="plane-name">Shared Plan</h4>
							<div className="plan-price" style={{height: "90px"}}>
								<h3 className="price">25<sup className="currency-symbol">$</sup></h3><span
									className="per">Monthly</span>
							</div>
						</div>

						<div className="plan-details">
							<ul className="plan-list">
								<li className="plan-feat">
									<span className="feat-text">Our Teacher.</span>
								</li>
								<li className="plan-feat">
									<span className="feat-text">Tailored To Your Needs</span>
								</li>
								<li className="plan-feat">
									<span className="feat-text">Not For Profit Discounts</span>
								</li>
							</ul>
						</div>
						<div className="container">
							<button id="paypal-button" type="button">
								<span id="paypal-button-title">
									 Buy 
								</span>
								<span id="paypal-logo">
									<i id="firstPartLogo">Pay</i><i id="secondPartLogo">Pal</i>
								</span>
							</button>
						</div>
					</div>
				</div>
				<div className="col-12  col-md-6 col-xl-3  mx-auto price-plan ">
					<div className="plan  wow fadeInUp  " data-wow-delay=".5s ">
						<div className="plan-head"><i className="flaticon-box plan-icon"></i>
							<h4 className="plane-name">My Plan</h4>

							<div className="plan-price" style={{height: "90px"}}>
							<h3 className="price">99<sup className="currency-symbol">$</sup></h3><span
									className="per">Monthly</span>
							</div>
						</div>
								<div className="plan-details">
									<ul className="plan-list">
										<li className="plan-feat">
											<span className="feat-text">Your Teacher.</span>
										</li>
										<li className="plan-feat">
											<span className="feat-text">Tailored To Your Needs</span>
										</li>
										<li className="plan-feat">
											<span className="feat-text">Not For Profit Discounts</span>
										</li>
									</ul>
								</div>

								<div className="container">
							<button id="paypal-button" type="button">
								<span id="paypal-button-title">
									 Buy 
								</span>
								<span id="paypal-logo">
									<i id="firstPartLogo">Pay</i><i id="secondPartLogo">Pal</i>
								</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
  );
};

export default Pricing;
