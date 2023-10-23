import { userModel } from "./user.model";
import { connexion_screen, inscription_screen } from "../../i18n/fr.FR.json"

/****************************CONNEXION*********************************** */
export const connexion_request = (toStore: userModel, setError: any) => {
    let error = false;

    if (!toStore.phone || toStore.phone === "") { setError(connexion_screen.errors.phone_field_empty); error = true }
    if (!toStore.password || toStore.password === "") { setError(connexion_screen.errors.password_field_empty); error = true }
    else if (toStore.password.length < 6) { setError(connexion_screen.errors.incorrect); error = true }

    if (error) return true; else return false;
}

export const forgot_request = (toStore: userModel, setError: any) => {
    let error = false;
    if (!toStore.phone || toStore.phone === "") { setError(connexion_screen.errors.phone_field_empty); error = true }
    if (error) return true; else return false;
}

export const verify_request = (toStore: userModel, setError: any) => {
    let error = false;
    if (!toStore.code || toStore.code === "") { setError("Le code de vérification est requis."); error = true }
    else if (!toStore.id || toStore.id === "") { setError("L'identifiant de l'utilisateur est requis."); error = true }
    if (error) return true; else return false;
}

export const reset_request = (toStore: userModel, setError: any) => {
    let error = false;
    if (!toStore.password || toStore.password === "") { setError(connexion_screen.errors.password_field_empty); error = true }
    else if (toStore.password && toStore.password.length < 6) { setError(connexion_screen.errors.incorrect); error = true }
    else if (toStore.password !== toStore.confirm) { setError(connexion_screen.errors.incorrect); error = true }
    if (error) return true; else return false;
}

/****************************INSCRIPTION*********************************** */

export const inscription_inputs_request = (type: string, toStore: userModel, setError: any) => {
    switch (type) {
        case "infos":
            let error_info = false;
            if (!toStore.phone || toStore.phone === "") { setError(inscription_screen.infos.phone_field); error_info = true }
            else if (!toStore.name || toStore.name === "") { setError(inscription_screen.infos.name); error_info = true }
            else if (!toStore.firstname || toStore.firstname === "") { setError(inscription_screen.infos.firstname); error_info = true }
            else if (!toStore.birthday || toStore.birthday === null) { setError(inscription_screen.infos.birth); error_info = true }
            if (error_info) return true; else return false;

        case "account":
            let error_account = false;
            if (!toStore.address || toStore.address === "") { setError(inscription_screen.account.errors.address_field_empty); error_account = true }
            else if (!toStore.email || toStore.email === "") { setError(inscription_screen.account.errors.email_field_empty); error_account = true }
            if (error_account) return true; else return false;

        case "document":
            let error_document = false;
            if (!toStore.document || toStore.document === "") { setError(inscription_screen.document.errors.choice); error_document = true }
            if (error_document) return true; else return false;


        case "selfie":
            let error_profile = false;
            if (!toStore.profil || toStore.profil === "") { setError(inscription_screen.identity.selfie.errors.photo); error_profile = true }
            if (error_profile) return true; else return false;


        case "signature":
            let error_signature = false;
            if (!toStore.signature || toStore.signature === "") { setError(inscription_screen.identity.signature.errors.signature); error_signature = true }
            else if (!(toStore as any)?.isChecked) { setError(inscription_screen.identity.signature.errors.authorize); error_signature = true }
            if (error_signature) return true; else return false;

        case "finalisation":
            let error_reset = false;
            if (!toStore.password || toStore.password === "") { setError("Un mot de passe est obligatoire"); error_reset = true }
            else if (!toStore.confirm || toStore.confirm === "") { setError("Les mot de passe ne correspondent pas."); error_reset = true }
            else if (toStore.password && toStore.password.length < 6) { setError("Taille du mot de passe trop court"); error_reset = true }
            if (error_reset) return true; else return false;

        default: return false
    }
}

/****************************STATUT GEOLOCALISATION*********************************** */
export const status_geo_montant_validation = (montant: string) => {
    const initialError = { montant: '' }
    let error = initialError

    if (!montant || montant.trim() === '') error = { ...error, montant: 'Veuillez renseigner le montant.' }
    else if (parseInt(montant, 10) < 500) error = { ...error, montant: `Montant doit être d'au moins 500 FCFA.` }

    return { error, initialError }
}

/****************************VITEPAY VALIDATION DATA*********************************** */
export const vitepay_data_validation = (data: { phone: string, montant: string }) => {
    const { phone, montant } = data
    const phone_regex = /^[789][0-9]{7}$/

    const initialError = { phone: '', montant: '' }
    let error = initialError

    if (!phone || phone.trim() === '') error = { ...error, phone: 'Veuillez renseigner le champ.' }
    else if (!phone_regex.test(phone)) error = { ...error, phone: 'Doit être un numéro ORANGE.' }

    if (!montant || montant.trim() === '') error = { ...error, montant: 'Veuillez renseigner le champ.' }
    else if (parseInt(montant, 10) < 500) error = { ...error, montant: `Montant doit être d'au moins 500 FCFA.` }

    return { error, initialError }
}