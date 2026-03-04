export const MAPBOX_API_TOKEN = import.meta.env.VITE_MAPBOX_API_TOKEN;
export const GMAPS_API_TOKEN = import.meta.env.VITE_GMAPS_API_TOKEN;

export const MAPBOX_DIRECTIONS_API_URL = "https://api.mapbox.com/directions/v5";

export const MAPBOX_GEOCODING_API_URL =
  "https://api.mapbox.com/search/geocode/v6/forward";

export const GMAPS_GEOCODING_API_URL =
  "https://maps.googleapis.com/maps/api/geocode/json";

export const GMAPS_DIRECTIONS_API_URL =
  "https://maps.googleapis.com/maps/api/directions/json";

export enum TRANSPORTATIONS {
  WALKING = "WALKING",
  TRANSIT = "TRANSIT",
  DRIVING = "DRIVING",
}

export const NOT_FOUND = "Não encontrado";
export const DEFAULT_PAGE_NAME = "Página 1";
export const DEFAULT_FILE_NAME = "Planilha ordenada.xlsx";

export const GOOGLE_TERMS_LINK = "https://policies.google.com/terms?hl=pt-br";

export const GOOGLE_PRIVACY_LINK =
  "https://policies.google.com/privacy?hl=pt-br";

const tableHeaders = {
  dateTimeStamp: "Carimbo de data/hora",
  email: "Endereço de e-mail",
  name: "Nome completo",
  socialName: "Nome social, se tiver",
  cpf: "CPF (apenas números, sem ponto ou hífen)",
  rg: "RG, se tiver (apenas números, sem ponto ou hífen)",
  birthDate: "Data de nascimento",
  hasDisability: "Pessoa com deficiência",
  race: "Autodeclaração racial",
  income: "Renda familiar",
  education: "Escolaridade",
  highschool: "Você cursa ou cursou o Ensino Médio",
  schoolName: "Colégio em que estuda ou estudou.",
  address: "Endereço",
  zipCode: "CEP",
  whatsApp: "WhatsApp (com DDD)",
  courseLocation:
    "A qual(is) unidade(s) do Cursinho Popular MTST você deseja se candidatar?",
  saturdayAvailability: "Informe sua disponibilidade aos sábados.",
  isMemberOfOccupation: "Você participa de alguma ocupação do MTST?",
  occupationName: "Informe a ocupação na qual você faz sua luta.",
};

const hasDisabilityValues = ["Sim", "Não"];

const raceValues = [
  "Preto(a)",
  "Pardo(a)",
  "Branco(a)",
  "Indígena",
  "Amarelo(a)",
];

const incomeValues = [
  "Até um salário mínimo (R$ 1621,00) por pessoa.",
  "Acima de um salário mínimo (R$1621,00) por pessoa.",
];

const educationValues = [
  "Cursando 1º ano do Ensino Médio",
  "Cursando 2º ano do Ensino Médio",
  "Cursando 3º ano do Ensino Médio",
  "Ensino Médio completo",
  "<open-string>",
];

const highschoolValues = [
  "Integralmente em escola pública.",
  "Integralmente em escola particular.",
  "Parte em escola pública, parte em escola particular.",
  "<open-string>",
];

const courseLocationValues = [
  "Antonieta de Barros (Cidade Dutra/Interlagos)",
  "Esperança Garcia (Campo Limpo)",
  "Maria Firmina dos Reis (Cidade Ademar)",
  "Tereza de Benguela (José Bonifácio)",
];

const saturdayAvailabilityValues = [
  "Manhã e tarde",
  "Apenas pela manhã",
  "Apenas à tarde",
  "Não tenho disponibilidade aos sábados",
];

const isMemberOfOccupationValues = ["Sim", "Não"];
