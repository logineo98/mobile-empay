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
            if (!toStore.name || toStore.name === "") { setError(inscription_screen.infos.errors.name_field_empty); error_info = true }
            else if (!toStore.phone || toStore.phone === "") { setError(inscription_screen.infos.errors.phone_field_empty); error_info = true }
            else if (!toStore.firstname || toStore.firstname === "") { setError(inscription_screen.infos.errors.firstname); error_info = true }
            else if (!toStore.birthday || toStore.birthday === null) { setError(inscription_screen.infos.errors.birthday_empty); error_info = true }
            else if (!toStore.address || toStore.address === null) { setError(inscription_screen.infos.errors.email_empty); error_info = true }
            if (error_info) return true; else { setError(""); return false; }


        case "emergency":

            let error_emergency = false;
            if (!toStore.contactName || toStore.contactName === "") { setError(inscription_screen.emergency.errors.name_field_empty); error_emergency = true }
            else if (!toStore?.contactFirstname || toStore?.contactFirstname === "") { setError(inscription_screen.emergency.errors.firstname_field_empty); error_emergency = true }
            else if (!toStore?.contactAddress || toStore?.contactAddress === null) { setError(inscription_screen.emergency.errors.address_field_empty); error_emergency = true }
            else if (!toStore?.contactPhone || toStore?.contactPhone === "") { setError(inscription_screen.emergency.errors.phone_field_empty); error_emergency = true }
            else if (!toStore?.contactEmail || toStore?.contactEmail === null) { setError(inscription_screen.emergency.errors.email_field_empty); error_emergency = true }
            else if (!toStore?.contactRelationship || toStore?.contactRelationship === null) { setError(inscription_screen.emergency.errors.relationship_field_empty); error_emergency = true }
            if (error_emergency) return true; else { setError(""); return false; }


        case "infos2":
            let error_info2 = false;
            if (!toStore.residenceCountry || toStore.residenceCountry === "") { setError(inscription_screen.infosSupp.errors.residenceCountry_field_empty); error_info2 = true }
            else if (!toStore.city || toStore.city === "") { setError(inscription_screen.infosSupp.errors.city_field_empty); error_info2 = true }
            else if (!toStore.nationality || toStore.nationality === "") { setError(inscription_screen.infosSupp.errors.nationality_field_empty); error_info2 = true }
            else if (!toStore.placeOfBirth || toStore.placeOfBirth === null) { setError(inscription_screen.infosSupp.errors.placeOfBirth_field_empty); error_info2 = true }
            else if (!toStore.nameOnCard || toStore.nameOnCard === null) { setError(inscription_screen.infosSupp.errors.nameOnCard_field_empty); error_info2 = true }
            else if (!toStore.currentActivity || toStore.currentActivity === null) { setError(inscription_screen.infosSupp.errors.currentActivity_field_empty); error_info2 = true }
            else if (!toStore.fieldOfActivity || toStore.fieldOfActivity === null) { setError(inscription_screen.infosSupp.errors.fieldOfActivity_field_empty); error_info2 = true }
            if (error_info2) return true; else { setError(""); return false; }

        case "account":
            let error_account = false;
            if (!toStore.address || toStore.address === "") { setError(inscription_screen.account.errors.address_field_empty); error_account = true }
            else if (!toStore.email || toStore.email === "") { setError(inscription_screen.account.errors.email_field_empty); error_account = true }
            if (error_account) return true; else { setError(""); return false; }

        case "document":
            let error_document = false;
            if (!toStore.document || toStore.document === "") { setError(inscription_screen.document.errors.choice); error_document = true }
            else if (!toStore?.documentNumber || toStore?.documentNumber === "") { setError(inscription_screen.document.errors.document_number_empty); error_document = true }
            else if (!toStore?.documentDeliveryDate || toStore?.documentDeliveryDate === "") { setError(inscription_screen.document.errors.document_delivery_empty); error_document = true }
            else if (!toStore?.documentLicensingAuthority || toStore?.documentLicensingAuthority === "") { setError(inscription_screen.document.errors.document_autority_empty); error_document = true }
            else if (!toStore?.documentExpirationDate || toStore?.documentExpirationDate === "") { setError(inscription_screen.document.errors.document_expiration_empty); error_document = true }
            if (error_document) return true; else { setError(""); return false; }


        case "selfie":
            let error_profile = false;
            if (!toStore.profil || toStore.profil === "") { setError(inscription_screen.identity.selfie.errors.photo); error_profile = true }
            if (error_profile) return true; else { setError(""); return false; }


        case "signature":
            let error_signature = false;
            if (!toStore.signature || toStore.signature === "") { setError(inscription_screen.identity.signature.errors.signature); error_signature = true }
            else if (!(toStore as any)?.isChecked) { setError(inscription_screen.identity.signature.errors.authorize); error_signature = true }
            if (error_signature) return true; else { setError(""); return false; }

        case "finalisation":
            let error_reset = false;
            if (!toStore.password || toStore.password === "") { setError("Un mot de passe est obligatoire"); error_reset = true }
            else if (toStore.password && toStore.password.length < 6) { setError("Taille du mot de passe trop court"); error_reset = true }
            else if (!toStore.confirm || toStore.confirm === "") { setError("Les mot de passe ne correspondent pas."); error_reset = true }
            else if (toStore.password && (toStore.password !== toStore?.confirm)) { setError("Les mot de passe ne correspondent pas."); error_reset = true }
            if (error_reset) return true; else { setError(""); return false; }

        default: return false
    }
}

/****************************STATUT GEOLOCALISATION VALIDATION*********************************** */
export const status_geo_montant_validation = (montant: string, montant_total: number) => {
    const initialError = { montant: '' }
    let error = initialError

    if (!montant || montant.trim() === '') error = { ...error, montant: 'Veuillez renseigner le montant.' }
    else if (montant_total < parseInt(montant, 10)) error = { ...error, montant: `Votre montant disponible est insuffisant.` }
    else if (parseInt(montant, 10) < 1) error = { ...error, montant: `Montant doit être d'au moins 1 FCFA.` }

    return { error, initialError }
}

/****************************RECHARGE VITEPAY VALIDATION DATA*********************************** */
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
