import { Component } from 'react';
class Header extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          
        }
        this.darkLogo = 'images/logos/Logo-small-black.svg'
        this.lightLogo = 'images/logos/Logo-small-white.svg'
        this.lightCloseBtn = 'images/mobile_menu_x.svg'
        
    }
    shouldComponentUpdate(nextProps, nextState){
        const themeChanged = nextProps.theme !== this.props.theme
        const mobileThemeChanged = nextProps.themeMobile !== this.props.themeMobile
        return themeChanged || mobileThemeChanged
    }
    toggleMobileMenu(){
        const {toggleMobileMenu} = this.props;
		toggleMobileMenu();
    }

    slideToContact(){
        const {goToContactSlide} = this.props;
        goToContactSlide()
    }

    handleHeaderLogoClick(){
        //This should change location to second homepage slide directly if not on homepage
        const {goToSlide} = this.props;
        if(goToSlide) {//This checks to see if function exists. It will exist for the normal fixed header but not for the mobile header
            goToSlide(1)
        }
    }

    render(){
        const defaultTheme = 'dark'
        const theme = this.props.theme ? this.props.theme : defaultTheme
        const themeMobile = this.props.themeMobile ? this.props.themeMobile : ''

        let fixedHeaderClasses = 'fixed-header ' + theme + ' ' + themeMobile
        return (
            <header className={fixedHeaderClasses}>
                {this.props.open && 
                    <img alt='Close Button' className="closeBtn" onClick={this.toggleMobileMenu.bind(this)} src={require('./' + this.lightCloseBtn).default} />
                }
                {!this.props.open && 
                    <div className="hamburger" onClick={this.toggleMobileMenu.bind(this)}>
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                }

                <div className="corner-logo-wrapper">
                    <div className="text" onClick={this.handleHeaderLogoClick.bind(this)}>HOBOKEN HEIGHTS<div className="separator"></div></div>
                    <div className="corner-logo-images">
                        <img alt='Hoboken Heights Logo Light' className="corner-logo light" src={require('./' + this.lightLogo).default} onClick={this.handleHeaderLogoClick.bind(this)} />
                        <img alt='Hoboken Heights Logo Dark' className="corner-logo dark" src={require('./' + this.darkLogo).default} onClick={this.handleHeaderLogoClick.bind(this)} />
                    </div>

                </div>
                <div className="mobile-only contact light"><img src={require('./images/mobile_mail.svg').default} alt="" /></div>
                <div className="mobile-only contact dark"><img src={require('./images/mobile_mail_black.svg').default} alt="" /></div>
                <div onClick={this.slideToContact.bind(this)} className="inquiry-link">INQUIRE NOW</div>
            </header>
        )
    }
}

export default Header;
