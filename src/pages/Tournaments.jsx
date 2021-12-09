import TournamentList from "../components/TournamentList";
import { useTranslation } from "react-i18next";

export default function Tournaments() {
  const { t } = useTranslation();
  return (
    <>
      <h1 className="m-2 text-lg font-semibold"> {t('tournaments')}: </h1>
      <TournamentList/>
    </>
  )
}