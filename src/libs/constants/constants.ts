export const images = {
    canal_plus: require('../assets/images/canal_plus.png'),
    edm: require('../assets/images/edm.png'),
    somagep: require('../assets/images/somagep.png'),
    startimes: require('../assets/images/startimes.png'),
    vitepay: require('../assets/images/vitepay.png'),
    marker: require('../assets/images/marker.png'),
    auth_bg: require('../assets/images/auth_bg.jpeg'),
    login_bg_img: 'https://picsum.photos/200/300/?blur=2',
    noimage: require('../assets/images/no_img.png'),
    auth_action: require('../assets/images/btn.png'),

    welcome_bg_img: require("../assets/images/IMAGE2.jpg"),
    connexion_bg_img: require("../assets/images/IMAGE3.jpg"),
    register_bg_img: require("../assets/images/IMAGE4.jpg"),
    register_document_bg_img: require("../assets/images/IMAGE5.jpg"),
    register_selfie_bg_img: require("../assets/images/IMAGE7.jpg"),
    register_signature_bg_img: require("../assets/images/IMAGE9.jpg"),
    register_secure_bg_img: require("../assets/images/IMAGE8.jpg"),
    register_finalisation_bg_img: require("../assets/images/IMAGE10.jpg"),
    auth_action_btn_img: require("../assets/images/SKIP_ICON.png"),
    welcome: require("../assets/images/welcome.gif"),

    // tz
    logo_white: require('../assets/images/logo_white.png'),
    avatar: require('../assets/images/avatar.png'),
    logout: require('../assets/images/logout.png'),
    tarif: require('../assets/images/tarif.png'),
    parrainage: require('../assets/images/parrainage.png'),
    partenaire: require('../assets/images/partenaire.png'),
    update: require('../assets/images/update.png'),
    service_client: require('../assets/images/service_client.png'),
    about: require('../assets/images/about.png'),
    status: require('../assets/images/status.png'),
    plus: require('../assets/images/plus.png'),
    minus: require('../assets/images/minus.png'),
    arrow_left: require('../assets/images/arrow_left.png'),
    arrow_right: require('../assets/images/arrow_right.png'),
    home: require('../assets/images/home.png'),
    guichet: require('../assets/images/guichet.png'),
    mobile_money: require('../assets/images/mobile_money.png'),
    visa_recto: require('../assets/images/visa_recto.png'),
    visa_verso: require('../assets/images/visa_verso.png'),
    ika_wari_taa: require('../assets/images/ika_wari_taa.png'),
    facture: require('../assets/images/facture.png'),
    recharge: require('../assets/images/recharge.png'),
    restaurant: require('../assets/images/restaurant.png'),
    paypal: require('../assets/images/paypal.png'),
    facebook: require('../assets/images/facebook.png'),
    geolocalisation: require('../assets/images/geolocalisation.png'),
    malivision: require('../assets/images/malivision.png'),
    uba: require('../assets/images/uba.png'),
    soyatt: require('../assets/images/soyatt.png'),
    yara_oil: require('../assets/images/yara_oil.png'),
    brooklyn_burger: require('../assets/images/brooklyn_burger.png'),
    logineo: require('../assets/images/logineo.png'),
    clock: require('../assets/images/clock.png'),
    coin: require('../assets/images/coin.png'),
    location: require('../assets/images/location.png'),
}

export const videos = {
    welcome: require("../assets/videos/welcome.mp4")
}


export const logger = (title?: string, desc?: string) => {
    if (!title) title = "Log"
    if (desc) {
        console.log(`===============${title}===================`)
        console.log(desc)
        console.log("=================================================")
    }
}

export const handleChangeMobile = (key: string, value: string, setInputs: any) => { setInputs((prevState: any) => ({ ...prevState, [key]: value, })) }

export const allInputsFilled = (inputs: any) => Object.values(inputs).every(value => value !== '' && value !== undefined && value !== null);
export const allInputsEmpty = (inputs: any) => Object.values(inputs).every(value => value === '');