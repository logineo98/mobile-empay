export const images = {
    logo_png: require('../assets/images/logo_png.png'),
    virtal_card: require('../assets/images/carte.jpg'),
    canal_plus: require('../assets/images/canal_plus.png'),
    edm: require('../assets/images/edm.jpg'),
    somagep: require('../assets/images/somagep.jpg'),
    startimes: require('../assets/images/startimes.jpg'),
    vitepay: require('../assets/images/vitepay.png'),
    marker: require('../assets/images/marker.png'),
    bg: require('../assets/images/bg.jpg'),
    login_bg_img: 'https://picsum.photos/200/300/?blur=2',
    passport: require('../assets/images/passport.jpg'),
    avatar: require('../assets/images/avatar1.png'),
    noimage: require('../assets/images/no_img.png')
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