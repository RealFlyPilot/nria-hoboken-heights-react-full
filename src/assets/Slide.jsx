import {Component} from 'react';
import React from 'react';
import animatedLogo from '../assets/images/Motion_logo.gif';
import downArrow from '../assets/images/downarrow.svg';
import leftArrowBlack from '../assets/images/leftArrowBlack.svg';
import $ from 'jquery'
// import _ from "lodash";

class Slide extends Component {
    constructor(props) {
        super(props);
        this.state = {
			styles: this.props.obj.styles,
            type: this.props.obj.slideTemplate,
        }
    }
    handleTheScroll = e => {
        let element = e.target
		const scrolled = element.scrollTop > 0 ? true : false
        this.props.onSlideScroll(scrolled);
    }

    scrollToNextSlide(noRequireScroll = false) {
		const {goToNextSlide} = this.props;
        goToNextSlide(noRequireScroll);
    }
    goToContactSlide(){
        const {goToContactSlide} = this.props;
        goToContactSlide();
    }
    setAmenityOnDetailsSlide(idx, nextSlide = true){
        const {setAmenityDetailsSlideIdx} = this.props;
        setAmenityDetailsSlideIdx(idx)

        if(nextSlide) this.scrollToNextSlide(true)
        
    }
    setResidencePenthousePath(option){
        const {setResidencePenthousePath} = this.props;
        setResidencePenthousePath(option)
        setTimeout(() => {
            this.scrollToNextSlide(true)
        })
        
    }
    createHubspotForm(){
		const {createHubspotContactForm} = this.props;
		createHubspotContactForm();
    }
    contactFormSubmitted(){
		const {formSubmitted} = this.props;
		formSubmitted();
	}

	contactFormCleared(){
		const {formCleared} = this.props;
		formCleared();
    }
    
    openPrivacyPolicyModal(){
		const {showPrivacyPolicy} = this.props
		showPrivacyPolicy()
    }
    
    delegateScroll(wheelAmt, elementToDelegateScroll, defaultScroll = false){
        const currentDetailsScrollDistance = elementToDelegateScroll.scrollTop
        elementToDelegateScroll.scrollTop = currentDetailsScrollDistance + wheelAmt
        if(defaultScroll){
            if(wheelAmt < 0) {
                elementToDelegateScroll.scrollTop = 0//scroll to top of slide to trigger prevSlide as scroll motion continues
            }
            else {
                const bottomScrollValue = elementToDelegateScroll.scrollHeight - elementToDelegateScroll.offsetHeight
                elementToDelegateScroll.scrollTop = bottomScrollValue
            }
        }
    }

    slideHorizontal(direction) {
		this.props.horizontalSlide(direction);
	}
    render(){
        const slideObj = this.props.obj;
        const slideMethods = {
            scrollToNextSlide: this.scrollToNextSlide.bind(this),
            goToContactSlide: this.goToContactSlide.bind(this),
            delegateScroll: this.delegateScroll.bind(this),

        }
		let slideClasses = "slide "
		let videoClasses = 'background-video'
		let centerTextClasses = 'center';
		let centerBottomClasses = "centerBottom";

        const right_arrow_styles = {
            backgroundImage: 'url('+require('./images/right-arrow-bouncing.svg').default+')'
        }
        const left_arrow_styles = {
            backgroundImage: 'url('+require('./images/left-arrow-bouncing.svg').default+')',
            backgroundPosition: 'right'
        }
        const right_arrow_bouncing = <div className='right_arrow_bouncing' style={right_arrow_styles} onClick={() => this.slideHorizontal('right')}/>
		const left_arrow_bouncing = <div className='left_arrow_bouncing' style={left_arrow_styles} onClick={() => this.slideHorizontal('left')}/>
        const mobileArrows = {
            right_arrow_bouncing,
            left_arrow_bouncing
        }
		const isCurrent = this.props.isCurrent;

        slideClasses += slideObj.slideClasses !== undefined ? " " + slideObj.slideClasses : '';
		if(isCurrent) slideClasses += " runAnimations activeSlide";
		if(this.props.slideViewed) slideClasses += " runAnimationOnce";
		if(slideObj.videoZoomEffect) videoClasses += ' videoZoomEffect'
		slideClasses += slideObj.videoMobileStartPosition ? ' mobile-video-position-' + slideObj.videoMobileStartPosition : ' mobile-video-position-center'
		slideClasses += slideObj.contactFormSlide ? ' contactFormSlide' : '';
		slideClasses += slideObj.enableScrolling ? ' enableScrolling' : '';
		slideClasses += ' slideTemplate-' + slideObj.slideTemplate;
        slideClasses += slideObj.mobileOnly === true ? ' mobile-only' : ''
        slideClasses += slideObj.desktopOnly === true ? ' desktop-only' : ''

        if(slideObj.centerTextClasses) {
			centerTextClasses += ' ' + slideObj.centerTextClasses;
		}

		if(slideObj.mobileHasDifferentContent) {
			centerTextClasses += ' not-mobile';
			centerBottomClasses += ' not-mobile';
		}
		
		let centerTextStyles;
		let slideStyles;
		if(window.innerWidth > 768){
			centerTextStyles = slideObj.centerTextStyles
			slideStyles = this.state.styles
		}
		else {
			centerTextStyles = slideObj.centerTextStylesMobile
			slideStyles = {...this.state.styles, ...slideObj.stylesMobile}
		}

        

		let centerImageStyles;
		if(window.innerWidth > 768){
			centerImageStyles = slideObj.centerImageStyles
		}
		else {
			centerImageStyles = slideObj.centerImageStylesMobile
		}

		return(
            <div className={slideClasses} style={slideStyles} onScroll={this.handleTheScroll}>
                {slideObj.slideTemplate === 'home' && 
                    <SlideHome methods={slideMethods} />
                }
                {slideObj.slideTemplate === 'exteriorLightToggle' && 
                    <SlideExteriorLightToggle mobileArrows={mobileArrows} methods={slideMethods}  configuration={slideObj} />
                }
                {slideObj.slideTemplate === 'fountainPen' &&
                    <SlideFountainPen isCurrent={isCurrent} methods={slideMethods} configuration={slideObj} curridx={this.props.currIdx} />
                }
                {slideObj.slideTemplate === 'patio' &&
                    <SlidePatio mobileArrows={mobileArrows} methods={slideMethods} configuration={slideObj} />
                }
                {slideObj.slideTemplate === 'amenities' &&
                    <SlideAmenities methods={slideMethods} setAmenityOnDetailsSlide={this.setAmenityOnDetailsSlide.bind(this)} configuration={slideObj} />
                }
                {slideObj.slideTemplate === 'amenitiesDetail' &&
                    <SlideAmenitiesDetail setAmenityOnDetailsSlide={this.setAmenityOnDetailsSlide.bind(this)} isCurrent={isCurrent} idx={this.props.amenityDetailsSlideIdx} configuration={slideObj} />
                }
                {slideObj.slideTemplate === 'views' &&
                    <SlideViews configuration={slideObj} />
                }
                {slideObj.slideTemplate === 'residencePenthouse' &&
                    <SlideResidencePenthouse setResidencePenthousePath={this.setResidencePenthousePath.bind(this)} methods={slideMethods}  />
                }
                {slideObj.slideTemplate === 'residencePenthouseFullscreen' &&
                    <SlideResidencePenthouseFullscreen mobileArrows={mobileArrows} residencePenthouse={this.props.residencePenthousePath}  methods={slideMethods} configuration={slideObj}  />
                }
                {slideObj.slideTemplate === 'residencePenthouseDetail' &&
                    <SlideResidencePenthouseDetail mobileArrows={mobileArrows} methods={slideMethods} residencePenthouse={this.props.residencePenthousePath} configuration={slideObj}  />
                }
                {slideObj.slideTemplate === 'developmentTeam' &&
                    <SlideDevelopmentTeam  configuration={slideObj}  />
                }
                {slideObj.slideTemplate === 'founders' &&
                    <SlideFounders  configuration={slideObj}  />
                }
                {slideObj.slideTemplate === 'videoDiscover' &&
                    <SlideVideoDiscover  methods={slideMethods} configuration={slideObj}  />
                }
                {slideObj.slideTemplate === 'neighborhoodCommunity' &&
                    <SlideNeighborhoodCommunity  configuration={slideObj}  />
                }
                {slideObj.slideTemplate === 'map' &&
                    <SlideMap mapHeightLocked={this.props.mapHeightLocked} configuration={slideObj}  />
                }
                {slideObj.slideTemplate === 'contact' &&
                    <SlideContactForm mobileVersion={false} createHubspotContactForm={this.createHubspotForm.bind(this)} formCleared={this.contactFormCleared.bind(this)} formSubmitted={this.contactFormSubmitted.bind(this)} showPrivacyPolicy={this.openPrivacyPolicyModal.bind(this)}  configuration={slideObj}  />
                }
                {slideObj.slideTemplate === 'contactMobile' &&
                    <SlideContactForm mobileVersion={true} createHubspotContactForm={this.createHubspotForm.bind(this)} formCleared={this.contactFormCleared.bind(this)} formSubmitted={this.contactFormSubmitted.bind(this)} showPrivacyPolicy={this.openPrivacyPolicyModal.bind(this)}  configuration={slideObj}  />
                }
            </div>
        )
    }
}


class SlideMap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            satelliteMapEnabled: false,
            enabledListing: null
        }
    }
    toggleMap(){
        const newState = !this.state.satelliteMapEnabled
        this.setState({
            satelliteMapEnabled: newState
        })
    }
    toggleListing(idx){
        // const enabledListingsClone = [...this.state.enabledListings];
        // const index = enabledListingsClone.indexOf(idx)
        // if (index !== -1) {
        //     enabledListingsClone.splice(index, 1);
        //     this.setState({enabledListings: enabledListingsClone});
        // }
        // else {
        //     this.setState({
        //         enabledListings: this.state.enabledListings.concat(idx)
        //     })
        // }
        const indexIsEnabled = this.state.enabledListing === idx
        const newState = indexIsEnabled ? null : idx
        this.setState({
                enabledListing: idx
        })

    }
    render(){
        let mapSectionClasses = 'mapSection'
        mapSectionClasses += this.props.mapHeightLocked ? ' heightLocked' : ' heightNotLocked'

        let satelliteImageContainerClasses = 'satelliteImageContainer'
        satelliteImageContainerClasses += this.state.satelliteMapEnabled ? ' visible' : ''

        const locationListings = this.props.configuration.locationListings

        const toggleBarText = this.state.satelliteMapEnabled ? 'Location View' : 'Satellite View'
        return(
            <>
                <section className={mapSectionClasses}>
                    <div className="mapBackground">
                        <img src={require('./images/map/map01.jpg').default} alt="" className='not-mobile map'/>
                        <img src={require('./images/map/map01_mobile.jpg').default} alt="" className='mobile-only map'/>
                        <div className={satelliteImageContainerClasses}>
                            <img src={require('./images/map/map02.jpg').default} alt="" className='not-mobile map'/>
                            <img src={require('./images/map/map02_mobile.jpg').default} alt="" className='mobile-only map'/>
                        </div>
                    </div>
                    <div className="mapMotionLogo">
                        <img src={require('./images/map/Motion_logo.gif').default} alt="" className="map not-mobile"/>
                        <img src={require('./images/map/Motion_logo_mobile_animateonce.gif').default} alt="" className="map mobile-only"/>
                    </div>
                    <div onClick={this.toggleMap.bind(this)} className="satelliteToggle vertical_toggle_column">
                        <div className="rotatedText">{toggleBarText}</div>
                    </div>
                    <div className="mapSection__locationList">
                        {locationListings.map((amenity, idx) => {
                            const isActive = this.state.enabledListing === idx
                            const locationListingClasses =  isActive ? 'locationListing active' : 'locationListing'
                            const toggleSymbol = isActive ? '-' : '+'
                            return (
                            <div key={idx} onClick={() => this.toggleListing(idx)}  className={locationListingClasses}>
                                <div className="titleDistanceWrapper">
                                    <div className="locationTitle">Lorem Ipsum</div>
                                    <div className="locationDistance">(10 mins)</div>
                                    <div className="toggleButton">{toggleSymbol}</div>
                                </div>
                                <div className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                            </div>
                            )
                        })}
                    </div>
                </section>
            </>
        )
    }
}
class SlideVideoDiscover extends Component {
    nextSlide(noRequireScroll = false){
        this.props.methods.scrollToNextSlide(noRequireScroll)
    }
    render(){
        let videoContainerClasses = 'videoContainer'
        let videoClasses = 'background-video'
        if(this.props.configuration.videoZoomEffect) videoClasses += ' videoZoomEffect startZoomedIn'

        let desktopVideoClasses = videoClasses + ' not-mobile'
        let mobileVideoClasses = videoClasses + ' mobile-only'

        let desktopVideoContainerClasses = videoContainerClasses + ' not-mobile'
        let mobilevideoContainerClasses = videoContainerClasses + ' mobile-only'
        return(
            <>
                {
                    <div className="downArrowContainer">
                        <img alt="Down Arrow" onClick={this.nextSlide.bind(this)} className="downArrow" src={downArrow}></img>
                    </div>
                }
                {
							//Hide landingpage video on FFMobile because it will not autoplay
							//Video is set this way because react does not set muted to true which is required by some devices to allow autoplay
						<div
						className={desktopVideoContainerClasses}
						dangerouslySetInnerHTML={{
							__html: `
							<video
							class="${desktopVideoClasses}"
							${this.props.configuration.videoLoop ? 'loop="true"' : ''}
							muted='muted'
							autoplay='true'
							playsinline='playsinline'
                            preload="metadata"
                            loop="true"
							>
							<source src='/videos/NRIMA_SITE_VIDEO DISCOVER.mp4' type="video/mp4" />
							</video>`
						}}
                        />
				}
                {
							//Hide landingpage video on FFMobile because it will not autoplay
							//Video is set this way because react does not set muted to true which is required by some devices to allow autoplay
						<div
						className={mobilevideoContainerClasses}
						dangerouslySetInnerHTML={{
							__html: `
							<video
							class="${mobileVideoClasses}"
							${this.props.configuration.videoLoop ? 'loop="true"' : ''}
							muted='muted'
							autoplay='true'
							playsinline='playsinline'
                            preload="metadata"
                            loop="true"
							>
							<source src='/videos/NRIMA_SITE_VIDEO DISCOVER Mobile.mp4' type="video/mp4" />
							</video>`
						}}
					/>
				}
            </>
        )
    }
}


class SlideContactForm extends Component {
    createHubspotForm(){
		const {createHubspotContactForm} = this.props;
		createHubspotContactForm();
    }
    contactFormCleared(){
		const {formCleared} = this.props;
		formCleared();
    }
    contactFormSubmitted(){
		const {formSubmitted} = this.props;
		formSubmitted();
    }
    openPrivacyPolicyModal(){
		const {showPrivacyPolicy} = this.props
		showPrivacyPolicy()
	}
    render(){
        const contactLogo = 'images/NRLiving.png'
        const companyAddress = '1300 Manhattan Avenue Union City, NJ 07087'
        const companyName = 'Manhattan Avenue Capital 1300, LLC'
        const agentName = 'Richard Stabile'
        const agentCompany = ''
        const agentPhoneNumber = '201-400-7487'
        const rightsReserved = '© 2020 Hoboken Heights. All rights reserved.'
        const buttonText = 'Privacy Policy'
        return(
            <>
                <div className="contactPageWrapper">
                    <ContactForm mobileVersion={this.props.mobileVersion} createHubspotContactForm={this.createHubspotForm.bind(this)} formCleared={this.contactFormCleared.bind(this)} formSubmitted={this.contactFormSubmitted.bind(this)} />
                    <div className="privacyPolicy not-mobile">
                        <div className="verticalLineContainer">
                            <div className="verticalLine" />
                        </div>
                        
                        <img className='logo' src={require('./'+contactLogo).default}  />
                        <div className="contactInfo">
                            <div className="address">{companyAddress}</div>
                            <div className="address">{companyName}</div>
                            <div className="address">{agentName}</div>
                            <div className="address">{agentCompany}</div>
                            <div className="phone">{agentPhoneNumber}</div>
                            <div className="copyright">{rightsReserved}</div>
                            <a target="_blank" onClick={this.openPrivacyPolicyModal.bind(this)} className="btn light">{buttonText}</a>
                        </div>
                    </div>
                    <div className="mobilePrivacyPolicy mobile-only">
                        <div className="contactInfo">
                            <div className="address">1300 Manhattan Avenue Union City, NJ 07087</div>
                            <div className="address">Manhattan Avenue Capital 1300, LLC</div><br />
                            <div className="address">Richard Stabile</div>
                            <div className="address">RE/MAX Real Estate Limited</div>
                            <a href='tel:2014007487'><div className="phone">201-400-7487</div></a><br />
                            <div className="copyright">© 2020 Hoboken Heights. All rights reserved.</div>
                            <a target="_blank" onClick={this.openPrivacyPolicyModal.bind(this)}>Privacy Policy</a>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

class ContactForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			first_name: '',
			last_name: '',
			email: '',
			mobilephone: '',
			how_you_heard: '',
			how_can_we_help: '',
			// formSubmitted: '',
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.resetForm = this.resetForm.bind(this);
	}

	componentDidMount() {
		//This is a fix to detect changes on the select2
		$(this.refs.how_you_heard).on("change",  (e)=> {
			this.handleInputChange(e)
        })
        this.createHubspotForm()//this is used to create the form on load
	}

	createHubspotForm(){
		const {createHubspotContactForm} = this.props;
		createHubspotContactForm();
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});

		console.log('changed')
	}

	handleSubmit() {
		this.setState ({
			// formSubmitted: true,
			first_name: '',
			last_name: '',
			email: '',
			mobilephone: '',
			how_you_heard: '',
			how_can_we_help: '',
		});
		const {formSubmitted} = this.props;
		formSubmitted();
	}
	resetForm(){
		// this.setState ({
		// 	formSubmitted: null
		// })
		const {formCleared} = this.props;
		formCleared();
	}

	scrollToTop(){
		const {scrollToFirstSlide} = this.props
		scrollToFirstSlide()
	}

    render() {
		let jQuery = $
		let contactFormClasses = 'contactForm';
		// if(this.state.formSubmitted){
		// 	contactFormClasses += ' submitted'
		// }
		const select2Styles = {
			width:"100%"
		}
        const select2Exists = jQuery.fn.select2
        const select2Initialized = jQuery('#how_did_you_hear_of_us_-4c41114a-2807-4884-b5e9-d6b49d56d217').hasClass("select2-hidden-accessible")
		if(!select2Initialized && select2Exists) {
            jQuery('.how_you_heard').select2({
				placeholder: "How did you hear of us?*",
				width: 'resolve',
				minimumResultsForSearch: -1
			});
			const hubspotFormExists = jQuery('#how_did_you_hear_of_us_-4c41114a-2807-4884-b5e9-d6b49d56d217').length
			if(hubspotFormExists) {
                const disabledOptionText = jQuery('#how_did_you_hear_of_us_-4c41114a-2807-4884-b5e9-d6b49d56d217 option:disabled')[0].innerHTML
				jQuery('#how_did_you_hear_of_us_-4c41114a-2807-4884-b5e9-d6b49d56d217').select2({
					placeholder: disabledOptionText,
					width: 'resolve',
					minimumResultsForSearch: -1
				});
			}
		}

        const isMobileVersion = this.props.mobileVersion
        const hubspotFormWrapperId = isMobileVersion ? 'hubspotFormWrapperMobile' : 'hubspotFormWrapper'
		return (
			<form className={contactFormClasses}>
				<div className="submittedFormOverlay">
					<div className="text">THANK YOU!</div>
					<div className="closeBtn" onClick={this.resetForm}>
						<img src={require('./images/form_close_btn.svg').default} />
					</div>
				</div>
				<div className='headline'>FOR INFORMATION PLEASE FILL THE FORM BELOW</div>
				<div className="hubspotFormWrapper" id={hubspotFormWrapperId}>
				</div>
			</form>
		);
	}
}

class SlideNeighborhoodCommunity extends Component {
    render(){
        return(
            <>
                <section className="neighborhoodCommunity">
                    <div className="left">
                        <img className='startZoomedIn' alt="neighborhood" src={require('./images/neighborhood.png').default} />
                    </div>
                    <div className="right">
                        <div className="textGroup">
                            <h2>Hoboken Heights Neighborhood and Community</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                        <div className="button_container">
                            <div className="btn light">Lorem ipsum</div>
                            <div className="btn light">Lorem ipsum</div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}
class SlideHome extends Component {
    nextSlide(noRequireScroll = false){
        this.props.methods.scrollToNextSlide(noRequireScroll)
    }
    render(){
        return(
            <>
                <img className="animatedLogo" src={animatedLogo} alt="" onClick={this.nextSlide.bind(this)} />
                <div className="downArrowContainer">
                    <img alt='Down Arrow' onClick={this.nextSlide.bind(this)} className="downArrow" src={downArrow}></img>
                </div>
            </>
        )
    }
}

class SlideExteriorLightToggle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lightsOn: false,
            video: null
        }
        this.lightsOffVideo= '/videos/NIRMA_1_Exterior_High_OFF_Cinemagraphic.mp4'
        this.lightsOnVideo= '/videos/NIRMA_1_Exterior_High_Cinemagraphic.mp4'
    }

    toggleLights(){
        const newLightsState = !this.state.lightsOn
        this.setState({
            lightsOn: newLightsState
        })
    }
    render(){
        let videoContainerClasses = 'videoContainer'
        videoContainerClasses += ' compact'
        const videoContainerClassesLightsOn = videoContainerClasses + ' lightsOn'
        const videoContainerClassesLightsOff = videoContainerClasses + ' lightsOff'
        let videoClasses = 'background-video'
        let lightButtonText = this.state.lightsOn ? 'Turn Off' : 'Turn On'
        if(this.props.configuration.videoZoomEffect) videoClasses += ' videoZoomEffectRepeat startZoomedIn'

        return(
            <>
                <header className='fixed-header'>
                    <div className="hamburger">
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                    <div className="corner-logo-wrapper">
                        <div className="text">HOBOKEN HEIGHTS<div className="separator"></div></div>
                        <img alt="Hoboken Heights Logo" className="corner-logo" src={require('./images/logos/NIRMA_Logo_Symbol_Black.png').default} />
                    </div>
                    <div onClick={this.props.methods.goToContactSlide.bind(this)} className="inquiry-link">INQUIRE NOW</div>
                </header>
                <div onClick={this.toggleLights.bind(this)} className="toggleLights btn">{lightButtonText}</div>
                {
							//Hide landingpage video on FFMobile because it will not autoplay
							//Video is set this way because react does not set muted to true which is required by some devices to allow autoplay
						<div
						className={videoContainerClassesLightsOn}
						dangerouslySetInnerHTML={{
							__html: `
							<video
							class="${videoClasses}"
							${this.props.configuration.videoLoop ? 'loop="true"' : ''}
							muted='muted'
							autoplay='true'
							playsinline='playsinline'
							preload="metadata"
							>
							<source src="${this.lightsOnVideo}" type="video/mp4" />
							</video>`
						}}
					/>
				}
                {!this.state.lightsOn &&
							//Hide landingpage video on FFMobile because it will not autoplay
							//Video is set this way because react does not set muted to true which is required by some devices to allow autoplay
						<div
						className={videoContainerClassesLightsOff}
						dangerouslySetInnerHTML={{
							__html: `
							<video
							class="${videoClasses}"
							${this.props.configuration.videoLoop ? 'loop="true"' : ''}
							muted='muted'
							autoplay='true'
							playsinline='playsinline'
							preload="metadata"
							>
							<source src="${this.lightsOffVideo}" type="video/mp4" />
							</video>`
						}}
					/>
				}
                {this.props.configuration.mobileHasDifferentContent &&
					<div className={"centerBottom mobile-only"}>
						<h1 style={this.props.configuration.mobileContent.centerBottom.lineStyles} className="line" >
							{this.props.configuration.mobileContent.centerBottom.line1LeftArrowBouncing && this.props.mobileArrows.left_arrow_bouncing}
							<div dangerouslySetInnerHTML={{ __html: this.props.configuration.mobileContent.centerBottom.line1}} />
							{this.props.configuration.mobileContent.centerBottom.line1RightArrowBouncing && this.props.mobileArrows.right_arrow_bouncing}
						</h1>
					</div>
				}
            </>
        )
    }
}

class SlideFountainPen extends Component {
    constructor(props) {
        super(props)
        // const 
        // this.throttleVideoParallax = _.throttle(parallaxVideo, 1);
        this.videoContainerRef = React.createRef()
    }
    lockingVideoPosition() {
        // const parentSelector = '.slideTemplate-fountainPen'
        // const textHeight = document.querySelector(parentSelector + ' .textSection').offsetHeight
        // const textHeightMarginTop = parseFloat(window.getComputedStyle(document.querySelector(parentSelector + ' .textSection')).marginTop)
        // const textTop = parseFloat(window.getComputedStyle(document.querySelector('.slideTemplate-fountainPen .textSection')).top)
        // const potentialHeight = textHeight + textHeightMarginTop + textTop
        // const videoHeight = document.querySelector(parentSelector + ' .background-video').clientHeight
        // const currentScrollDistance = document.querySelector(parentSelector).scrollTop;
        // const slideHeight = document.querySelector('.slideTemplate-fountainPen').offsetHeight
        // const scrolledPercent = currentScrollDistance/(potentialHeight - slideHeight)
        // const totalScrollDistance = potentialHeight - videoHeight
        // const videoTopPosition = scrolledPercent * totalScrollDistance
        // console.log(videoTopPosition)
        // // document.querySelector('.slideTemplate-fountainPen .videoContainer').style.top = videoTopPosition + 'px'
        // document.querySelector('.slideTemplate-fountainPen .videoContainer').style.transform = 'translateY('+videoTopPosition+'px)'
        // // window.getComputedStyle(document.querySelector('.slideTemplate-fountainPen .background-video')).top = scrolledPercent * totalScrollDistance
    }
    handleWheel(){
        this.lockingVideoPosition()
        // this.throttleVideoParallax()
    }
    replayVideo() {
        this.videoContainerRef.current.children[0].play()
    }
    render(){
        let videoContainerClasses = 'videoContainer'
        let videoClasses = 'background-video'
        // if(this.props.configuration.videoZoomEffect) videoClasses += ' videoZoomEffect'

        let videoContainerClassesMobile = videoContainerClasses + ' mobile-only'
        let videoContainerClassesDesktop = videoContainerClasses + ' not-mobile'
        if(this.props.isCurrent) this.replayVideo()
        return(
            <> 
                {
                    <div onWheel={() =>this.handleWheel()}     className="textSection">
                        <div className="motionSignature mobile-only">
                            <img src={require('./images/Motion_signature_animateonce.gif').default} alt="" />
                        </div>
                        <h2>4 State-of-the-art Buildings<br />55 Residences | 9 Penthouses</h2>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</p>
                        <p>Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat</p>
                        <div onClick={this.props.methods.goToContactSlide.bind(this)} className="btn dark">Inquire now</div>
                    </div>
                }
                
                {
							//Hide landingpage video on FFMobile because it will not autoplay
							//Video is set this way because react does not set muted to true which is required by some devices to allow autoplay
						<div
                        ref={this.videoContainerRef}
						className={videoContainerClassesDesktop}
						dangerouslySetInnerHTML={{
							__html: `
							<video
							class="${videoClasses}"
							${this.props.configuration.videoLoop ? 'loop="true"' : ''}
							muted='muted'
							autoplay='true'
							playsinline='playsinline'
							preload="metadata"
							>
							<source src='/videos/Motion_signature.mp4' type="video/mp4" />
							</video>`
						}}
					/>
                    
				}
            </>
        )
    }
}


class SlidePatio extends Component {
    nextSlide(noRequireScroll = false){
        this.props.methods.scrollToNextSlide(noRequireScroll)
    }
    render(){
        let videoContainerClasses = 'videoContainer'
        let videoClasses = 'background-video'
        if(this.props.configuration.videoZoomEffect) videoClasses += ' videoZoomEffect startZoomedIn'
        return(
            <>
                {
                    <div className="downArrowContainer">
                        <img alt="Down Arrow" onClick={this.nextSlide.bind(this)} className="downArrow" src={downArrow}></img>
                    </div>
                }
                {
							//Hide landingpage video on FFMobile because it will not autoplay
							//Video is set this way because react does not set muted to true which is required by some devices to allow autoplay
						<div
						className={videoContainerClasses}
						dangerouslySetInnerHTML={{
							__html: `
							<video
							class="${videoClasses}"
							${this.props.configuration.videoLoop ? 'loop="true"' : ''}
							muted='muted'
							autoplay='true'
							playsinline='playsinline'
							preload="metadata"
							>
							<source src='/videos/NIRMA_2_Patio_High_Cinemagraphic.mp4' type="video/mp4" />
							</video>`
						}}
					/>
				}

                {this.props.configuration.mobileHasDifferentContent &&
					<div className={"centerBottom mobile-only"}>
						<h1 style={this.props.configuration.mobileContent.centerBottom.lineStyles} className="line" >
							{this.props.configuration.mobileContent.centerBottom.line1LeftArrowBouncing && this.props.mobileArrows.left_arrow_bouncing}
							<div dangerouslySetInnerHTML={{ __html: this.props.configuration.mobileContent.centerBottom.line1}} />
							{this.props.configuration.mobileContent.centerBottom.line1RightArrowBouncing && this.props.mobileArrows.right_arrow_bouncing}
						</h1>
					</div>
				}
                
            </>
        )
    }
}

class SlideAmenities extends Component {
    setAmenityDetail(idx){
        const {setAmenityOnDetailsSlide} = this.props;
        setAmenityOnDetailsSlide(idx);
    }
    handleWheelEvent = e => {
        const wheelAmt = e.deltaY
        const querySelector = '.amenities__details'
        const elementToDelegateScroll = document.querySelectorAll(querySelector)[0]
        this.props.methods.delegateScroll(wheelAmt, elementToDelegateScroll)
    }
    
    render(){
        const amenitiesListAdditionalClasses = this.props.configuration.amenitiesListAdditionalClasses
        const amenitiesDetailAdditionalClasses = this.props.configuration.amenitiesDetailAdditionalClasses
        let amenitiesListClasses = 'amenities__list ' 
        amenitiesListClasses += amenitiesListAdditionalClasses ? amenitiesListAdditionalClasses : ''
        let amenitiesDetailsClasses = 'amenities__details ' 
        amenitiesDetailsClasses += amenitiesDetailAdditionalClasses ? amenitiesDetailAdditionalClasses : ''

        return(
            <>
                <section className="amenities">
                    <div className="amenities__details_wrapper">
                        <div className={amenitiesDetailsClasses}>
                            <h2>Luxury Skyline Front Amenities & Services</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            <div onClick={this.props.methods.goToContactSlide.bind(this)} className="btn dark">Inquire now</div>
                        </div>
                    </div>
                    <div onWheel={this.handleWheelEvent.bind(this)}  className={amenitiesListClasses}>
                        <ul>
                            <li onClick={() => this.setAmenityDetail(0)}>Bar</li>
                            <li onClick={() => this.setAmenityDetail(1)}>Children</li>
                            <li onClick={() => this.setAmenityDetail(2)}>Corridor</li>
                            <li onClick={() => this.setAmenityDetail(1)}>Gym</li>
                            <li onClick={() => this.setAmenityDetail(2)}>Grills</li>
                            <li onClick={() => this.setAmenityDetail(0)}>Movie</li>
                            <li onClick={() => this.setAmenityDetail(1)}>Patio</li>
                            <li onClick={() => this.setAmenityDetail(0)}>Pool</li>
                        </ul>
                    </div>
                </section>
            </>
        )
    }
}


class SlideAmenitiesDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            descriptionVisible: false,
            image: null,
            image1IsNew: false,
            title_line1: ' '//animation doesnt work without this
        }
        this.defaultArrowDistanceFromEdge = "40px"
        this.clickedArrowDistanceFromEdge = "25px"
        this.state.rightArrowStyles= {
            right: this.defaultArrowDistanceFromEdge
        }
        this.state.leftArrowStyles= {
            left: this.defaultArrowDistanceFromEdge
        }
    }
    componentDidMount(){
        this.props.configuration.amenities.forEach((amenity) => {
            const img = new Image().src = require('./'+amenity.image).default
            
        })
        this.setAmenityData(this.state.currIdx)
        this.setAmenityTitle()
    }
    componentDidUpdate(){
        const newIdxFromPropsHasChanged = this.props.isCurrent && this.state.lastPropsIdx !== this.props.idx

        if(newIdxFromPropsHasChanged) {
            this.setState({
                lastPropsIdx: this.props.idx,
            })
            this.setAmenityData(this.props.idx)
            // this.setAmenityTitle()//changed title too early when switching slides
        }
    }
    setAmenityData(newIdx){
        if(newIdx === this.state.currIdx) return
        

        //This is to fix horizontal touch event slides
        if(newIdx === -1) newIdx = this.props.configuration.amenities.length - 1
        else if(newIdx === this.props.configuration.amenities.length) newIdx = 0

        // const title_line1 = this.props.configuration.amenities[newIdx].title_line1
        // const title_line2 = this.props.configuration.amenities[newIdx].title_line2
        // const title_line3 = this.props.configuration.amenities[newIdx].title_line3
        // const description = this.props.configuration.amenities[newIdx].description
        const image = this.props.configuration.amenities[newIdx].image
        const image1IsNew = !this.state.image1IsNew
        this.setState({
            // description: description,
            currIdx: newIdx,
            image1IsNew: image1IsNew,
            amenityNameVisibility: false,
            descriptionVisible: false
        })
        if(image1IsNew){
            this.setState({
                image1: image,
            })
        }
        else {
            this.setState({
                image2: image,
            })
        }

        //Set newIdx on App component state
        const {setAmenityOnDetailsSlide} = this.props;
        setAmenityOnDetailsSlide(newIdx, false);
    }
    transitioningAmenityComplete = e => {
        if(e.animationName == 'fadeOut'){
            // console.log('faded Out')
            this.setAmenityTitle()
            this.setState({
                amenityNameVisibility: true
            })
        }
        else if(e.animationName == 'fadeInDriftUp') {
            // console.log('faded In drift up')
        }
    }
    setAmenityTitle(){
        const newIdx = this.state.currIdx
        if(typeof this.props.configuration.amenities[newIdx] == 'undefined') return
        const title_line1 = this.props.configuration.amenities[newIdx].title_line1
        const title_line2 = this.props.configuration.amenities[newIdx].title_line2
        const title_line3 = this.props.configuration.amenities[newIdx].title_line3
        const description = this.props.configuration.amenities[newIdx].description
        this.setState({
            title_line1: title_line1,
            title_line2: title_line2,
            title_line3: title_line3,
            description: description,
        });
    }
    toggleDetailDescription(){
        const newDescriptionState = !this.state.descriptionVisible
        this.setState({
            descriptionVisible: newDescriptionState
        })
    }
    changeAmenity(delta){
        const prevSlide = delta < 0
        let nextAmenity
        if(prevSlide){
            nextAmenity = this.state.currIdx === 0 ? this.props.configuration.amenities.length - 1 : this.state.currIdx - 1
        }
        else {
            nextAmenity = this.state.currIdx === this.props.configuration.amenities.length - 1 ? 0  : this.state.currIdx + 1
        }
        this.setAmenityData(nextAmenity)
    }
    animateRightArrowAndChangeAmenity(){
        this.setState({
            rightArrowStyles: {
                right: this.clickedArrowDistanceFromEdge
            }
        })
        this.changeAmenity(1)
    }
    resetRightArrow(){
        this.setState({
            rightArrowStyles: {
                right: this.defaultArrowDistanceFromEdge
            }
        })
    }
    animateLeftArrowAndChangeAmenity(){
        this.setState({
            leftArrowStyles: {
                left: this.clickedArrowDistanceFromEdge
            }
        })
        this.changeAmenity(-1)
    }
    resetLeftArrow(){
        this.setState({
            leftArrowStyles: {
                left: this.defaultArrowDistanceFromEdge
            }
        })
    }
    activateAmenity(dotIdx){
        this.setAmenityData(dotIdx)
    }
    render(){
        const toggleButtonSrc = this.state.descriptionVisible ? 'images/amenities/Button-.svg' : 'images/amenities/Button+.svg'
        const hasMoreInfoBtn = this.props.configuration.amenities[this.state.currIdx] && this.props.configuration.amenities[this.state.currIdx].moreInfoBtn
        let descriptionClasses = 'amenities_detail__description'
        descriptionClasses += this.state.descriptionVisible ? ' visible' : ''
        const descriptionStyles = {
            backgroundImage: 'url('+require('./images/amenities/blackgradient.png').default+')',
        }

        let image1_classes = 'amenities_detail__image '
        image1_classes += this.state.image1IsNew ? 'new' : 'old'
        let image2_classes = 'amenities_detail__image '
        image2_classes += !this.state.image1IsNew ? 'new' : 'old'
        let amenities_detail_name_classes = 'amenities_detail__name'
        amenities_detail_name_classes += !this.state.amenityNameVisibility ? ' runFadeOutAnimation' : ' runFadeInAnimation'
        amenities_detail_name_classes += this.state.descriptionVisible ? ' riseForDescription' : ''
        let amenities_detail__more_info_classes = 'amenities_detail__more_info'
        
        return (
            <>
                <section className="amenities_detail">
                    <img onTransitionEnd={this.resetRightArrow.bind(this)} alt="Right Arrow" onClick={this.animateRightArrowAndChangeAmenity.bind(this)} style={this.state.rightArrowStyles} className="amenities_detail__arrow amenities_detail__arrow--right" src={require('./images/amenities/rightArrow.svg').default} />
                    <img onTransitionEnd={this.resetLeftArrow.bind(this)} alt="Left Arrow" onClick={this.animateLeftArrowAndChangeAmenity.bind(this)} style={this.state.leftArrowStyles} className="amenities_detail__arrow amenities_detail__arrow--left" src={require('./images/amenities/rightArrow.svg').default} />
                    <img alt="" src={this.state.image1 && require('./'+this.state.image1).default} className={image1_classes}  />
                    <img alt="" src={this.state.image2 && require('./' + this.state.image2).default} className={image2_classes}  />
                    <div className={amenities_detail__more_info_classes}>
                        <div className={amenities_detail_name_classes}>
                            <h3>
                                {this.state.title_line1 && <span onAnimationEnd={this.transitioningAmenityComplete.bind(this)} >{this.state.title_line1}</span>}
                                {this.state.title_line2 && <span>{this.state.title_line2}</span>}
                                {this.state.title_line3 && <span>{this.state.title_line3}</span>}
                                <img alt="" onClick={this.toggleDetailDescription.bind(this)} className="amenities_detail__description_toggler" src={require('./'+toggleButtonSrc).default} />
                            </h3>
                        </div>
                        <div className="amenities_detail__more_info__dots">
                            {this.props.configuration.amenities.map((amenity, i) => {
                                let dotClasses = 'dot'
                                dotClasses += i === this.state.currIdx ? ' active' : ''
                                return (<div key={i} onClick={() => this.activateAmenity(i)} className={dotClasses} />)
                            })}
                        </div>
                        <div className={descriptionClasses} style={descriptionStyles}>
                            <div className="text">
                                <p>{this.state.description}</p>
                            </div>
                        </div>
                    </div>
                    {hasMoreInfoBtn && 
                        <div className="amenities_detail__more_info_btn btn">More Info</div>
                    }
                    
                </section>
            </>
        )
    }
}

class SlideViews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeSliderValue: 0,
            activeView: null,
            image: null,
            previousActiveKey: null
        }
        
    }
    componentDidMount(){
        // this.props.configuration.views.forEach((view) => {
        //     const img = new Image().src = require('./'+view.image).default
        // })
        this.setNewTime(0)
    }
    handleTimeChange(event){
        const rangeValue = event.target.value
        
        if(this.isInt(rangeValue)){
            //when the user is dragging thumb and ends up exactly on an int value, not a float
            this.setNewTime(rangeValue)
        }
        else {
            this.setState({
                timeSliderValue: rangeValue
            })
        }
    }
    handleMouseUp(event){
        const rangeValue = event.target.value
        if(!this.isInt(rangeValue)){
            const closestInt = Math.round(rangeValue);
            this.setNewTime(closestInt)
        }
    }
    isInt(n) {
        return n % 1 === 0;
    }
    setNewTime(key){
        this.setState({
            timeSliderValue: key,
        })
        const previousKey = this.state.activeView
        if(key == previousKey) return
        // const image1IsNew = !this.state.image1IsNew
        this.setState({
            activeView: key,
            // image1IsNew: image1IsNew,
            previousActiveKey: previousKey,
            isTransitioning: true
        })
        // const image = this.props.configuration.views[key].image
        // if(image1IsNew){
        //     this.setState({
        //         image1: image,
        //     })
        // }
        // else {
        //     this.setState({
        //         image2: image,
        //     })
        // }
    }
    handleTransitionEnd  = e => {
        this.setState({
            isTransitioning: false,
            previousActiveKey: null
        })
    }
    render(){
        const mapped_images_classes = 'views_section__image startZoomedIn'
        const activeImageKey = this.state.activeView
        const isTransitioning = this.state.isTransitioning
        const views_section__bottom_classes = isTransitioning ? 'views_section__bottom isTransitioning' : 'views_section__bottom'
        return(
            <>
                <section className="views_section">
                    <div className="views_section__top">
                        <h2>Signature Views 24/7</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                    <div className={views_section__bottom_classes}>
                        {this.props.configuration.views &&
                            <>
                                {this.props.configuration.views.map((view, i) => {
                                    const isActiveImage = i == activeImageKey
                                    const isPreviouslyActiveImage = i == this.state.previousActiveKey
                                    let imageClasses = mapped_images_classes
                                    if(isActiveImage) imageClasses = mapped_images_classes + ' active'
                                    else if(isPreviouslyActiveImage) imageClasses = mapped_images_classes + ' previouslyActive'
                                    return (<img key={view.image} alt={view.displayTime} src={require('./' + view.image).default} className={imageClasses} onTransitionEnd={this.handleTransitionEnd.bind(this)} />)
                                })}       
                            </>
                        }
                        <div className="views_section__timeSlider">
                            <input onMouseUp={this.handleMouseUp.bind(this)} onTouchEnd={this.handleMouseUp.bind(this)} onChange={this.handleTimeChange.bind(this)} type="range" min="0" max={this.props.configuration.views.length - 1} step="0.005" value={this.state.timeSliderValue}/>
                            <ul className="views_section__timeList">
                                {this.props.configuration.views.map((view, i) => {
                                    const listClasses = i == this.state.activeView ? 'active' : ''
                                    return (<li className={listClasses} key={i}>{view.displayTime} {view.ampm}</li>)
                                })}
                            </ul>
                            <div className="visibleSliderLine"></div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

class SlideResidencePenthouse extends Component {
    setResidencePenthousePath = option => {
        const {setResidencePenthousePath} = this.props;
        setResidencePenthousePath(option);
    }
    render(){
        return(
            <>
                <div onClick={() => this.setResidencePenthousePath('residence')} className="btn">Residences</div>
                <div onClick={() => this.setResidencePenthousePath('penthouse')} className="btn">Penthouses</div>
            </>
        )
    }
}

class SlideResidencePenthouseFullscreen extends Component {
    componentDidMount(){
        //preload images
        new Image().src = require('./'+'images/penthouse/penthousebed.png').default
        new Image().src = require('./'+'images/residence/residence.png').default
        
    }
    nextSlide(noRequireScroll = false){
        this.props.methods.scrollToNextSlide(noRequireScroll)
    }
    render(){
        const fullscreenImage = this.props.residencePenthouse == 'penthouse' ? 'images/penthouse/penthousebed.png' : 'images/residence/residence.png'
        return(
            <>
                {
                    <div className="downArrowContainer">
                        <img alt="Down Arrow" onClick={this.nextSlide.bind(this)} className="downArrow" src={downArrow}></img>
                    </div>
                }
                <div className="fullscreenImageWrapper">
                    <img className='residencePenthouseFullscreenImage' alt="" src={require('./'+fullscreenImage).default} />
                </div>
                {this.props.configuration.mobileHasDifferentContent &&
					<div className={"centerBottom mobile-only"}>
						<h1 style={this.props.configuration.mobileContent.centerBottom.lineStyles} className="line" >
							{this.props.configuration.mobileContent.centerBottom.line1LeftArrowBouncing && this.props.mobileArrows.left_arrow_bouncing}
							<div dangerouslySetInnerHTML={{ __html: this.props.configuration.mobileContent.centerBottom.line1}} />
							{this.props.configuration.mobileContent.centerBottom.line1RightArrowBouncing && this.props.mobileArrows.right_arrow_bouncing}
						</h1>
					</div>
				}
            </>
        )
    }
}

class SlideResidencePenthouseDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imageExpanded: false
        }
    }
    
    handleWheelEvent = e => {
        const wheelAmt = e.deltaY
        const querySelector = '.residencePenthouseDetail__details'
        const elementToDelegateScroll = document.querySelectorAll(querySelector)[0]
        this.props.methods.delegateScroll(wheelAmt, elementToDelegateScroll, this.state.imageExpanded)
    }
    toggleImageExpansion(){
        const newImageState = !this.state.imageExpanded
        this.setState({
            imageExpanded: newImageState
        })
    }
    render(){
        const imageIsExpanded = this.state.imageExpanded
        let details_classes = 'residencePenthouseDetail'
        details_classes += imageIsExpanded ? ' expandImage' : ''
        const isPenthouse = this.props.residencePenthouse === 'penthouse'
        
        const image = isPenthouse ? 'images/penthouse/penthouse.jpg' : 'images/residence/residence.png'
        const page_title = isPenthouse ? 'Exclusive Luxury Penthouses' : 'Our Residences'
        const page_description = isPenthouse ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        const featuresArray = isPenthouse ? [
            'Lorem Ipsum Lorem Ipsum',
            'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum',
            'Lorem Ipsum Lorem Ipsum',
            'Lorem Ipsum Lorem Ipsum Lorem',
            'Lorem Ipsum',
            'Lorem Ipsum Lorem Ipsum Lorem Ipsum',
            'Lorem Ipsum Lorem',
            'Lorem Ipsum Lorem Ipsum',
            ] : 
            [
                'Residence Ipsum Lorem Ipsum',
                'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum',
                'Lorem Ipsum Lorem Ipsum',
                'Lorem Ipsum Lorem Ipsum Lorem',
                'Lorem Ipsum',
                'Lorem Ipsum Lorem Ipsum Lorem Ipsum',
                'Lorem Ipsum Lorem',
                'Lorem Ipsum Lorem Ipsum',
            ]
        let imageContainerClasses = 'residencePenthouseDetail__image_container '
        imageContainerClasses += this.props.configuration.imageContainerAdditionalClasses ? this.props.configuration.imageContainerAdditionalClasses : ''
        let residencePenthouseDetailsClasses = 'residencePenthouseDetail__details '
        residencePenthouseDetailsClasses += this.props.configuration.imageDetailsAdditionalClasses ? this.props.configuration.imageDetailsAdditionalClasses : ''

        return(
            <>
                <section className={details_classes}>
                    <div className={residencePenthouseDetailsClasses}>
                        <h2>{page_title}</h2>
                        <p>{page_description}</p>
                        <div className="residencePenthouseDetail__features_list">
                            <div className="heading">Features:</div>
                            <ul>
                                {featuresArray.map((feature, i) => {
                                    return (<li key={i}>{feature}</li>)
                                })}
                            </ul>
                        </div>
                        <div className="residencePenthouseDetail__arrow_button_container">
                            <div className="leftArrowContainer">
                                <img alt='Left Arrow' className="leftArrow" src={leftArrowBlack}></img>
                            </div>
                            <div onClick={this.props.methods.goToContactSlide.bind(this)} className="btn light">Inquire now</div>
                        </div>
                    </div>
                    <div onWheel={this.handleWheelEvent.bind(this)} className={imageContainerClasses}>
                        <div onClick={this.toggleImageExpansion.bind(this)} className="residencePenthouseDetail__expand_toggler vertical_toggle_column">
                            {imageIsExpanded && 
                                <div><img src={require('./'+'images/toggleExpansion-.svg').default} alt=""/></div>
                            }
                            {!imageIsExpanded && 
                                <div><img src={require('./'+'images/toggleExpansion+.svg').default} alt=""/></div>
                            }
                        </div>
                        <div className="fullscreenImageWrapper">
                            <img src={require('./'+image).default} alt=""/>
                        </div>
                    </div>
                    {this.props.configuration.mobileHasDifferentContent &&
                        <div className={"centerBottom mobile-only"}>
                            <h1 style={this.props.configuration.mobileContent.centerBottom.lineStyles} className="line" >
                                {this.props.configuration.mobileContent.centerBottom.line1LeftArrowBouncing && this.props.mobileArrows.left_arrow_bouncing}
                                <div dangerouslySetInnerHTML={{ __html: this.props.configuration.mobileContent.centerBottom.line1}} />
                                {this.props.configuration.mobileContent.centerBottom.line1RightArrowBouncing && this.props.mobileArrows.right_arrow_bouncing}
                            </h1>
                        </div>
                    }
                </section>
            </>
        )
    }
}


class SlideFounders extends Component {

    render(){
        const founderImage = this.props.configuration.founderImage
        const founderHeadline = this.props.configuration.founderHeadline
        const founderTagline = this.props.configuration.founderTagline
        const founderBenefits = this.props.configuration.founderBenefits
        return(
            <>
                <div className="founderSlideContainer">
                    <img className="founderImage" src={require('./'+founderImage).default} alt=""/>
                    <div className="founderSlideWrapper">
                    {founderHeadline &&
                        <h2 className="founderHeadline">{founderHeadline}</h2>
                    }
                    {founderTagline &&
                        <p className="founderTagline">{founderTagline}</p>
                    }
                    {founderBenefits &&
                        <div className="founderBenefits">
                            {Object.entries(founderBenefits).map(([key, value]) => {
                                return(
                                <div key={key} className="benefitPair">
                                    <div className="count">{parseInt(key)+1}</div>
                                    <div className="benefit">{value}</div>
                                </div>
                                )
                            })}
                        </div>
                    }
                    </div>
                </div>
            </>
        )
    }
}

class SlideDevelopmentTeam extends Component {
    render(){
        let textGroupClasses = 'textGroup '
        textGroupClasses += this.props.configuration.textGroupAdditionalClasses ? this.props.configuration.textGroupAdditionalClasses : ''
        let rightSideClasses = 'right '
        rightSideClasses += this.props.configuration.rightSideAdditionalClasses ? this.props.configuration.rightSideAdditionalClasses : ''
        let buttonGroupClasses = 'developmentTeam__button_group '
        buttonGroupClasses += this.props.configuration.buttonGroupAdditionalClasses ? this.props.configuration.buttonGroupAdditionalClasses : ''
        
        return(
            <section className='developmentTeam'>
                <div className='left '>
                    <div className={textGroupClasses}>
                        <h2 className='developmentTeam__page_title'>Development Team Story</h2>
                        <p className='developmentTeam__paragraph'>For more than a decade, National Realty Investment Advisors - NRIA has delivered and continues to build upon a history of exceptional performance as a vertically-integrated real estate investment, management and development firm. We have extensive experience with full-service construction and complete renovation of planned unit townhomes, single-family luxury residences, condominiums, multifamily, and mixed-use rental developments strategically located in many of the most dynamic urban markets across the East Coast. Our team's collective depth of knowledge within these specific markets continues to yield compelling opportunities across the real estate investment risk spectrum.</p>
                        <div className="developmentTeam__headline">Real estate investment company overview</div>
                        <p className='developmentTeam__paragraph'>Founded in 2006, NRIA has grown to be one of the nation's leading specialists in institutional-caliber private real estate investment management with over $1.25B AUM, focusing on luxury townhome, condominium and multifamily acquisition and development in many supply constrained, high barrier-to-entry markets along the east coast.</p>
                        <p className='developmentTeam__paragraph'>An evolving through-cycle management commitment to long-term growth through active market, property/project-type, and sector selection allows our diversified investment strategy to continually deliver high, low-volatile returns. As a result, not only has our liquidity profile as a real estate investment & development firm incrementally improved, it has laid a solid function for significatnt future growth.</p>
                    </div>
                    <div className={buttonGroupClasses}>
                        <div className="btn light">NRIA</div>
                        <div className="btn light">NR Living</div>
                        <div className="btn light">NRIA EB-5</div>
                    </div>
                </div>
                <div className={rightSideClasses}>
                <h2 className='developmentTeam__page_title invisible'>Development Team Story</h2>
                    <div className="video">
                        <img alt="video" src={require('./images/video_placeholder.png').default} />
                    </div>
                    <div className="developmentTeam__copyright_logo_container">
                        <div className="copyright">&copy; National Realty Investment Advisors, LLC. All rights reserved</div>
                        <div className="nriaLogo">
                            <img alt="NRIA Logo" src={require('./images/logos/logo_NRIA.png').default} />
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Slide;