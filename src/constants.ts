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

export const tableHeaders = {
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

export enum Disability {
  YES = "Sim",
  NO = "Não",
}

export enum Race {
  BLACK = "Preto(a)",
  BROWN = "Pardo(a)",
  WHITE = "Branco(a)",
  NATIVE = "Indígena",
  YELLOW = "Amarelo(a)",
}

export enum Income {
  MINIMUM_OR_LOWER = "Até um salário mínimo (R$ 1621,00) por pessoa.",
  ABOVE_MINIMUM = "Acima de um salário mínimo (R$1621,00) por pessoa.",
}

// Open string is possible
export enum Education {
  FIRST_YEAR = "Cursando 1º ano do Ensino Médio",
  SECOND_YEAR = "Cursando 2º ano do Ensino Médio",
  THIRD_YEAR = "Cursando 3º ano do Ensino Médio",
  FINISHED = "Ensino Médio completo",
}

// Open string is possible
export enum Highschool {
  PUBLIC = "Integralmente em escola pública.",
  PRIVATE = "Integralmente em escola particular.",
  HALF = "Parte em escola pública, parte em escola particular.",
}

export enum CourseLocation {
  INTERLAGOS = "Antonieta de Barros (Cidade Dutra/Interlagos)",
  CAMPO_LIMPO = "Esperança Garcia (Campo Limpo)",
  CIDADE_ADEMAR = "Maria Firmina dos Reis (Cidade Ademar)",
  JOSE_BONIFACIO = "Tereza de Benguela (José Bonifácio)",
}

export enum SaturdayAvailability {
  BOTH = "Manhã e tarde",
  MORNING = "Apenas pela manhã",
  AFTERNOON = "Apenas à tarde",
  NONE = "Não tenho disponibilidade aos sábados",
}

export enum MemberOfOccupation {
  YES = "Sim",
  NO = "Não",
}

export enum ColumnPosition {
  DATE_TIME_STAMP = 0,
  EMAIL = 1,
  NAME = 2,
  SOCIAL_NAME = 3,
  CPF = 4,
  RG = 5,
  BIRTH_DATE = 6,
  HAS_DISABILITY = 7,
  RACE = 8,
  INCOME = 9,
  EDUCATION = 10,
  HIGHSCHOOL = 11,
  SCHOOL_NAME = 12,
  ADDRESS = 13,
  ZIP_CODE = 14,
  WHATS_APP = 15,
  COURSE_LOCATION = 16,
  SATURDAY_AVAILABILITY = 17,
  IS_MEMBER_OF_OCCUPATION = 18,
  OCCUPATION_NAME = 19,
}
