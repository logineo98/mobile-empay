import messaging from '@react-native-firebase/messaging'

export const format_date = (timestamp: string) => {
    const dateObj = new Date(timestamp);

    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1; // Les mois dans JavaScript sont indexés à partir de 0, donc on ajoute 1
    const year = dateObj.getFullYear();

    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const seconds = dateObj.getSeconds();

    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    return `${formattedDate} à ${formattedTime}`;
}

export const debug = (title?: string, message?: string | any) => {
    const timestamp = new Date().toISOString();
    console.log('\n')
    console.log(`==================${title}======================`)
    console.log(`[${format_date(timestamp)}] ${message}`);
    console.log(`================================================`)
    console.log('\n')

}

export function Expired(date: number) {
    return date < new Date().getTime()
}

export function supprimerOccurrence(chaine: string, occurrenceASupprimer: string) {
    let tableauDeMots = chaine.split(occurrenceASupprimer);

    let chaineNettoyee = tableauDeMots.join('');

    return chaineNettoyee;
}

export const inputSeparatorMille = (v: string, fieldName: string, setInputs: any) => {
    const inputValue = v.replace(/[^0-9]/g, '') // supprimer tous les caractères qui ne sont pas des chiffres
    const formattedValue = Number(inputValue).toLocaleString() // ajouter un séparateur de milliers
    setInputs((prevState: any) => ({ ...prevState, [fieldName]: formattedValue }))
}

export const formatNumberWithSpaces = (data: string) => data?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

export const deleteSeparator = (input: string) => { return input.replace(/\D/g, '') }

export const isPair = (value: number) => value % 2 === 0


export async function requestUserPermission(subject?: any) {
    const authStatus = await messaging().requestPermission()
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL

    if (!subject || subject === '' || subject?.length <= 0) {
        if (enabled) {
            if (enabled) {
                let i = 0
                if (i === 0) {
                    i = i + 1
                    messaging().subscribeToTopic('empay_mobile')
                        .then(() => console.log('Subscribed to topic: EMPAY'));
                }
            }
        }
    }

    //custom subscribe 
    if (subject && (subject !== undefined || subject?.length > 0)) {
        if (enabled) {
            let i = 0
            if (i === 0) {
                i = i + 1

                subject?.forEach((sub: any) => {
                    messaging().subscribeToTopic(`${sub}`)
                        .then(() => console.log(`Subscribed to topic: ${sub}`)).catch(err => console.log(err));
                })
            }
        }
    }

}

export const formatCardNumber = (inputString: string) => inputString?.replace(/(\d{4})(?=\d)/g, '$1 ')

export const getFourthLastCaractere = (nb: string) => (parseInt(nb, 10) % 10000).toString()