import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      //navigation
      "signIn": "Sign in",
      "signOut": "Sign out",
      "register": "Register",
      "tournaments": "Tournaments",
      "tournament": "Tournament",
      "editTournament": "Edit tournament",
      "addTournament": "Add tournament",
      "saveTournament": "Save tournament",
      "cashgames": "Cashgames",
      "cashgames": "Cashgame",
      "editCashgame": "Edit cashgame",
      "addCashgame": "Add cashgame",
      "saveCashgame": "Save cashgame",
      "places": "Places",

      //form
      "entrants": "Entrants",
      "finished": "Finished",
      "buyin": "Buyin",
      "cashed": "Cashed",
      "inFor": "In for",
      "outFor": "Out for",
      "smallBlind": "Small blind",
      "bigBlind": "Big blind",

      //place
      "country": "Country",
      "postalCode": "Postal code",
      "city": "City",
      "street": "Street",
      "houseNumber": "House number",

      //other
      "username": "Username",
      "password": "Password",
      "date": "Date",
      "place": "Place",
      "search": "Search",
      "loading": "Loading...",
      "cancel": "Cancel",

      //error
      "noCashgames": "There are no cashgames!",
      "noTournaments": "There are no tournaments!",
      "noPlaces": "There are no places!",
      "noPlacesFilter": "There are no places with this filter!",
      "samePassword": "Both passwords need to be identical!",
      "loginFailed": "Login failed, try again!",
      "registerFailed": "Registration failed, try again!",
    }
  },
  nl: {
    translation: {
      //navigation
      "signIn": "Inloggen",
      "signOut": "Uitloggen",
      "register": "Registreren",
      "tournaments": "Toernooien",
      "tournament": "Toernooi",
      "editTournament": "Toernooi aanpassen",
      "addTournament": "Toernooi toevoegen",
      "saveTournament": "Toernooi opslaan",
      "cashgames": "Cashgames",
      "cashgame": "Cashgame",
      "editCashgame": "Cashgame aanpassen",
      "addCashgame": "Cashgame toevoegen",
      "saveCashgame": "Cashgame opslaan",
      "places": "Plaatsen",
      
      //form
      "entrants": "Deelnemers",
      "finished": "Geëindigd",
      "buyin": "Inkoop",
      "cashed": "Winst",
      "inFor": "In voor",
      "outFor": "Uit voor",
      "smallBlind": "Small blind",
      "bigBlind": "Big blind",

      //place
      "country": "Land",
      "postalCode": "Postcode",
      "city": "Stad",
      "street": "Straat",
      "houseNumber": "Huis nummer",

      //other
      "username": "Gebruikersnaam",
      "password": "Wachtwoord",
      "date": "Datum",
      "place": "Plaats",
      "search": "Zoeken",
      "loading": "Laden...",
      "cancel": "Annuleer",

      //error
      "noCashgames": "Er zijn geen cashgames!",
      "noTournaments": "Er zijn geen toernooien!",
      "noPlaces": "Er zijn geen plaatsen!",
      "noPlacesFilter": "Er zijn geen plaatsen met deze filter!",
      "samePassword": "Beide wachtwoorden moeten gelijk zijn!",
      "loginFailed": "Login mislukt, probeer opnieuw!",
      "registerFailed": "Registratie mislukt, probeer opnieuw!",
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: document.querySelector('html').lang, // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;