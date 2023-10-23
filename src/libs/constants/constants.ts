export const images = {
    logo_png: require('../assets/images/logo_png.png'),
    canal_plus: require('../assets/images/canal_plus.png'),
    edm: require('../assets/images/edm.png'),
    somagep: require('../assets/images/somagep.png'),
    startimes: require('../assets/images/startimes.png'),
    vitepay: require('../assets/images/vitepay.png'),
    marker: require('../assets/images/marker.png'),
    bg: require('../assets/images/bg.jpg'),
    auth_bg: require('../assets/images/auth_bg.jpeg'),
    login_bg_img: 'https://picsum.photos/200/300/?blur=2',
    noimage: require('../assets/images/no_img.png'),
    auth_action: require('../assets/images/btn.png'),


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

export const allInputsFilled = (inputs: any) => Object.values(inputs).every(value => value !== '');
export const allInputsEmpty = (inputs: any) => Object.values(inputs).every(value => value === '');