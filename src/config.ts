interface Config {
  apiUrl: string,
}

const localConfig: Config = {
  apiUrl: 'http://localhost:8081/api',
}

const prodConfig: Config = {
  apiUrl: "https://api-cgt.guarico.gob.ve/api"
}

export const config = import.meta.env.VITE_ENV === 'local' ? localConfig : prodConfig